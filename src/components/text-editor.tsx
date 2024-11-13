"use client"

import React, { FC, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Button } from './ui/button'
import { Send } from 'lucide-react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit';
import PlaceHolder from '@tiptap/extension-placeholder';
import MenuBar from './menu-bar'
import axios from 'axios';
import { Channels, Workspace } from '@/types/app'

type TextEditorProps = {
    apiUrl: string;
    type: 'channel' | 'directMessage';
    channel: Channels;
    workspaceData: Workspace;
}

const TextEditor: FC<TextEditorProps> = ({ apiUrl, type, channel, workspaceData }) => {
    const [content, setContent] = useState('');
    const editor = useEditor({
        extensions: [
            StarterKit,
            PlaceHolder.configure({
                placeholder: `Message #${type === 'channel' ? channel.name : workspaceData.name}`,
            }),
        ],
        autofocus: true,
        content,
        onUpdate({ editor }) {
            setContent(editor.getHTML());
        },
    });

    const handleSend = async () => {
        // console.log(content)
        if (content.length < 2) return;

        try {
            await axios.post(`${apiUrl}?channelId=${channel?.id}&id=${workspaceData?.id}`, {
                content,
            });

            setContent('');
            editor?.commands.setContent('');

        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className='p-1 border dark:border-zinc-500 border-neutral-700 rounded-md relative overflow-hidden w-full'>
            <div className='sticky top-0 z-10 '>
                {
                    editor && <MenuBar editor={editor} />
                }

            </div>
            <div className='h-[150px] pt-11 flex w-full grow-1'>
                <EditorContent editor={editor} className='prose w-full h-full dark:text-white leading-[1.5px] overflow-y-hidden whitespace-pre-wrap ' />

            </div>

            <div className='absolute top-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6'>
                <FiPlus size={28} className='dark:text-black' />
            </div>

            <Button size={"sm"} className='absolute bottom-1 right-1' onClick={() => handleSend} disabled={content.length < 2}>
                <Send />
            </Button>

        </div>
    )
}

export default TextEditor