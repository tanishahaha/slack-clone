"use server"
import supabaseServerClientPages from "@/supabase/supabaseServerPages";
import { NextApiRequest, NextApiResponse } from "next";



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not allowed" });
    }

    try {
        const supabase = supabaseServerClientPages(req, res);

        const { data: userData } = await supabase.auth.getUser();
        const userID = userData.user?.id;
        console.log("server", userData.user);


        if (!userData) {
            return res.status(401).json({ message: "Unauthorized" });

        }



        const { channelId, id } = req.query;
        if (!channelId || !id) {
            return res.status(400).json({ message: 'Bad Request' })
        }

        const { content, fileUrl } = req.body;

        if (!content && !fileUrl) {
            return res.status(400).json({ message: "Bad request" });
        }


        const { data: channelData } = await supabase.from("channels").select('*').eq('id', channelId).contains('members', [userID]);

        if (!channelData?.length) {
            return res.status(403).json({ message: 'Channel not found' });
        }

        const { data: creatingMessageData, error: creatingMessageError } = await supabase.from('messages').insert({
            user_id: userID,
            workspace_id: id,
            channel_id: channelId,
            content: content,
            file_url: fileUrl,
        }).select("*,user:user_id(*)").single();

        if (creatingMessageError) {
            console.log("message creation error");
            return res.status(500).json({ message: "internal server error" });
        }
        console.log(creatingMessageData)

        return res.status(201).json({ message: "Message created successfully" });



    } catch (err) {
        console.log("Message creation error", err);
        return res.status(500).json({ message: 'Internal server error' })
    }
}