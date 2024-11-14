import type { NextApiRequest, NextApiResponse } from 'next';
import {
    createServerClient,
    serializeCookieHeader,

} from '@supabase/ssr';

export default function supabaseServerClientPages(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return Object.entries(req.cookies).map(([name, value]) => ({ name, value: value ?? '' }));
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) => {
                            const ser = serializeCookieHeader(name, value, options);
                            res.appendHeader('Set-cookie', ser);
                        }
                        )
                    } catch {
                        console.log("kuch tho hua")
                    }
                },
            },
        }
    );

    return supabase;
}