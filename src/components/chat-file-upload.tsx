import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from "zod";
import { v4 as uuid } from "uuid"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from "react"
import { toast } from 'sonner';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Channels, User, Workspace } from '@/types/app';
import { File } from 'lucide-react';
import Typography from '@/components/ui/Typography';
import { createClient } from '@/supabase/supabaseClient';

type ChatFilesProps = {
    userData: User;
    workspaceData: Workspace;
    channel?: Channels;
    recipientId?: string;
    toggleFileUploadModal: () => void;
}

const formSchema = z.object({
    file: z.instanceof(FileList).refine(files => files?.length === 1, "File is required").refine(files => {
        const file = files?.[0];
        return (file?.type === 'applicaiton/pdf' || file?.type.startsWith('image/'))
    }, "File must be an image or a pdf")
})

const ChatFileUpload: FC<ChatFilesProps> = ({ channel, workspaceData, userData, toggleFileUploadModal, recipientId }) => {

    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: undefined
        }
    })

    const imageRef = form.register('file');

    async function handleUpload(values: z.infer<typeof formSchema>) {
        setIsUploading(true);
        const uniqueId = uuid();
        const file = values?.file[0];
        if (!file) return;

        const supabase = createClient();

        let fileTypePrefix = '';
        if (file.type == 'application/pdf') {
            fileTypePrefix = 'pdf';
        } else if (file.type.startsWith('image/')) {
            fileTypePrefix = 'img';
        }

        const fileName = `chat/${fileTypePrefix}-${uniqueId}`;
        const { data, error } = await supabase.storage.from("chat-files").upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
        })

        if (error) {
            console.log(error);
            return { error: error.message }
        }


        if (recipientId) {
            const { error: directmessageError } = await supabase.from("direct_messages").insert({
                file_url: data.path,
                user: userData.id,
                user_one: userData.id,
                user_two: recipientId
            })
            if (directmessageError) {
                console.log("error inserting message");
                return { error: directmessageError.message }

            }



        } else {
            const { error: messageError } = await supabase.from("messages").insert({
                file_url: data.path,
                user_id: userData.id,
                workspace_id: workspaceData.id,
                channel_id: channel?.id
            })
            if (messageError) {
                console.log("error inserting message");
                return { error: messageError.message }
            }
        }


        setIsUploading(false);
        toggleFileUploadModal();
        toast.success("file uploaded successfully")
        form.reset()


    }


    return (
        <Card>
            <CardContent className='p-6 space-y-4'>
                <div className='border border-dashed border-gray-300 rounded-lg flex flex-col gap-1 p-6 items-center'>
                    <File className='w-12 h-12' />
                    <span className='text-sm font-medium text-gray-500'>
                        <Typography text='Drag and Drop your files here' variant='p' />
                    </span>

                </div>

                <div className="space-y-2 text-sm">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleUpload)} className='space-y-8'>
                            <FormField

                                control={form.control}
                                name='file'
                                render={({ field }) => <FormItem>
                                    <FormLabel htmlFor='file' className='text-sm font-medium'>
                                        File
                                    </FormLabel>

                                    <FormControl>
                                        <Input type='file' accept='image/*, application/pdf' {...imageRef} placeholder='Choose a file' onChange={event => field.onChange(event.target?.files)} />
                                    </FormControl>
                                </FormItem>}

                            />

                            <Button type='submit' disabled={isUploading}>Submit</Button>
                        </form>
                    </Form>

                </div>

            </CardContent>
        </Card>
    )
}

export default ChatFileUpload