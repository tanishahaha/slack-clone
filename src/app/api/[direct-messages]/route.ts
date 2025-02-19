import { getUserData } from "@/actions/get-user-data";
import { createClient } from "@/supabase/supabaseServer";
import { NextResponse } from "next/server";

function getPagination(page: number, size: number) {
    const limit = size ? +size : 10;
    const from = page ? page * limit : 0;
    const to = page ? from + limit - 1 : limit - 1;

    return { from, to }
}

export async function GET(req: Request) {
    try {
        const supabase = await createClient();
        const userData = await getUserData();

        if (!userData) return new NextResponse('unauthorized', { status: 401 });

        const { searchParams } = new URL(req.url);
        const userId = userData.id;

        const recipientId = searchParams.get('recipientId');

        if (!recipientId) return new NextResponse('Bad Request', { status: 400 });

        const page = Number(searchParams.get('page'));
        const size = Number(searchParams.get('size'));

        const { from, to } = getPagination(page, size);

        const { data, error } = await supabase
            .from('direct_messages')
            .select(
                `*, 
    user_one:user_one(*), 
    user_two:user_two(*)`
            )
            .or(
                `and(user_one.eq.${userId},user_two.eq.${recipientId}),and(user_one.eq.${recipientId},user_two.eq.${userId})`
            )
            .range(from, to)
            .order('created_at', { ascending: true });






        if (error) {
            console.log(error)
            return new NextResponse('internal server error', {
                status: 500
            })
        }

        return NextResponse.json({ data });
    } catch (error) {
        return new NextResponse('internal server error', {
            status: 500
        })

    }
}