import { getUserDataPages } from "@/actions/get-user-data-pages";
import supabaseServerClientPages from "@/supabase/supabaseServerPages";
import { SocketIoApiResponse } from "@/types/app";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: SocketIoApiResponse
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'method not allowed' });
    }

    try {
        const userData = await getUserDataPages(req, res);
        if (!userData) {
            return res.status(401).json({ error: 'unauthorized' });
        }

        const { recipientId } = req.query;
        if (!recipientId) {
            return res.status(400).json({ error: 'invalid request' });
        }

        const { content, fileUrl } = req.body;
        const supabase = supabaseServerClientPages(req, res);

        const { data, error: sendingMessageError } = await supabase.from('direct_messages').insert({
            content,
            file_url: fileUrl,
            user: userData.id,
            user_one: userData.id,
            user_two: recipientId,
        }).select('*, user(*), user_one(*), user_two(*)').order('created_at', { ascending: false }).single();

        if (sendingMessageError) {
            console.log('direct error');
            return res.status(500).json({ error: 'error' });
        }

        res?.socket?.server?.io?.emit('direct-message:post', data);

        return res.status(200).json({ message: 'message sent' })
    } catch (error) {
        return res.status(500).json({ error: 'error sending message' })

    }
}