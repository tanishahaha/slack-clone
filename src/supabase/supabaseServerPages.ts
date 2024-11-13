import { createClient } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";

export default function supabaseServerClientPages(req: NextApiRequest, res: NextApiResponse) {

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
    return supabase;
}