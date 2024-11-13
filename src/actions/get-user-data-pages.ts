import supabaseServerClientPages from "@/supabase/supabaseServerPages";
import { User } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";

export const getUserDataPages = async (req: NextApiRequest, res: NextApiResponse): Promise<User | null> => {
    const supabase = supabaseServerClientPages(req, res);
    // const supabase=createClient()

    const { data: { user }, } = await supabase.auth.getUser();
    console.log(user);

    if (!user) {
        console.log("No user", user);
        return null;
    }

    const { data, error } = await supabase.from('users').select('*').eq('id', user.id);

    if (error) {
        console.log(error);
        return null
    }

    return data ? data[0] : null;
}