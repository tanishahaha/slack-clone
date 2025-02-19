"use client"
import { createClient } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react"

export const useChatFile = (filePath: string) => {
    const [publicUrl, setPublicUrl] = useState('');
    const [fileType, setFileType] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const supabase = createClient();

    useEffect(() => {
        const fetchFile = async () => {
            try {
                const { data: { publicUrl }, } = await supabase.storage.from('chat-files').getPublicUrl(filePath);
                console.log(publicUrl);

                if (publicUrl) {
                    setPublicUrl(publicUrl);

                    if (filePath.startsWith('chat/img-')) {
                        setFileType('image');
                    } else if (filePath.startsWith('chat/pdf-')) {
                        setFileType('pdf');
                    }
                }
            } catch (error: any) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        if (filePath) {
            fetchFile();
        }
    }, [filePath, supabase.storage])

    return { publicUrl, fileType, loading, error }
}