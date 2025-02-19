import { getUserData } from "@/actions/get-user-data";
import { createClient } from "@/supabase/supabaseServer";
import { NextResponse } from "next/server";

function getPagination(page: number, size: number) {
    const limit = size ? +size : 10;
    const from = page ? page * limit : 0;
    const to = page ? from + limit - 1 : limit - 1;

    return { from, to };
}

export async function GET(req: Request) {
    try {
        const supabase = createClient();
        const userData = await getUserData();
        const { searchParams } = new URL(req.url);
        const channelId = searchParams.get('channelId');

        if (!userData) {
            return new Response('Unauthorized', { status: 401 });
        }

        if (!channelId) {
            return new Response('Bad Request', { status: 400 })
        }

        const page = Number(searchParams.get('page'));
        const size = Number(searchParams.get('size'));

        const { from, to } = getPagination(page, size);
        const { data, error } = await supabase.from("messages").select("*, user:user_id(*)").eq('channel_id', channelId).range(from, to).order('created_at', { ascending: true });

        if (error) {
            console.log("get message error");
            return new Response("Bad request", { status: 400 });
        }

        return NextResponse.json({ data })


    } catch (error) {
        console.log("server error", error);
        return new Response("Internal server error", { status: 500 })

    }
}