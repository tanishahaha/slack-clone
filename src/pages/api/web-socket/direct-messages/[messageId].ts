import { getUserDataPages } from "@/actions/get-user-data-pages";
import supabaseServerClientPages from "@/supabase/supabaseServerPages";
import { SocketIoApiResponse } from "@/types/app";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest } from "next";

export default async function handler(
    req: NextApiRequest,
    res: SocketIoApiResponse
) {
    if (!['DELETE', 'PATCH'].includes(req.method!)) {
        return res.status(405).json({ error: 'method not allowed' });
    }

    try {
        const userData = await getUserDataPages(req, res);

        if (!userData) {
            return res.status(401).json({ error: 'unauthorized' });
        }

        const { messageId } = req.query;
        const { content } = req.body;

        if (!messageId) {
            return res.status(400).json({ error: 'invalid request' });
        }

        const supabase = supabaseServerClientPages(req, res);

        const { data: messageData, error } = await supabase.from('direct_messages').select(`
            *,
            user_one:users!direct_messages_user_one_fkey(*),
            user_two:users!direct_messages_user_two_fkey(*)
            `).eq('id', messageId).single();

        if (error || !messageData) {
            return res.status(404).json({
                error: 'message not found'
            })
        }

        const isMessageOwner = userData.id === messageData.user_one.id || userData.id === messageData.user_two.id;

        const isAdmin = userData.type === 'admin';

        const isRegulator = userData.type === 'regulator';

        const canEditMessage = isMessageOwner || isAdmin || isRegulator || !messageData.is_deleted;

        if (!canEditMessage) {
            return res.status(403).json({
                error: 'forbidden'
            })
        }

        if (req.method === 'PATCH') {
            if (!isMessageOwner) {
                return res.status(403).json({
                    error: 'forbidden'
                })
            }

            await updateMessageContent(supabase, messageId as string, content);
        } else if (req.method === 'DELETE') {
            await deleteMessage(supabase, messageId as string);
        }

        const { data: updateMessage, error: messageError } = await supabase.from('direct_messages').select(
            `*,
            user_one:users!direct_messages_user_one_fkey(*),
            user_two:users!direct_messages_user_two_fkey(*),
            user:users!direct_messages_user_fkey(*)
            `
        ).eq('id', messageId).single();


        if (messageError || !updateMessage) {
            return res.status(404).json({
                error: "message not found"
            })
        }

        res?.socket?.server?.io?.emit('direct_message:update', updateMessage);

        return res.status(200).json({ message: updateMessage })


    } catch (error) {
        return res.status(500).json({ error: 'error sending message' });
    }
}

async function updateMessageContent(supabase: SupabaseClient, messageId: string, content: string) {
    await supabase.from('direct_messages').update({
        content,
        updated_at: new Date().toISOString(),
    }).eq('id', messageId).select(`*,
        user_one:users!direct_messages_user_one_fkey(*),
        user_two:users!direct_messages_user_two_fkey(*)
        `).single();
}

async function deleteMessage(supabase: SupabaseClient, messageId: string) {
    await supabase.from('direct_messages').update({
        content: 'this message has been deleted',
        file_url: null,
        is_deleted: true,
    }).eq('id', messageId).select(`*,
        user_one:users!direct_messages_user_one_fkey(*),
        user_two:users!direct_messages_user_two_fkey(*)
        `
    ).single();
}