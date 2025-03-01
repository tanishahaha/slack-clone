"use client"
import { FC } from 'react'
import { Editor } from '@tiptap/react'
import { Bold, Code, Italic, List, ListOrdered, SquareCode, Strikethrough } from 'lucide-react'
import Typography from '@/components/ui/Typography'
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface EmojiIn {
    native: string;
    // Add other properties as needed, such as emoji code, category, etc.
}

const MenuBar: FC<{ editor: Editor }> = ({ editor }) => {
    return (
        <div className='flex items-center flex-wrap gap-2 absolute z-10 top-0 left-0 w-full p-2 bg-neutral-400 dark:bg-neutral-900 '>
            <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'hover:bg-slate-600 bg-blue-700 text-white font-bold' : 'hover:bg-slate-600 bg-white text-black'} >
                <Bold className='w-5 h-5 ' />
            </button>

            <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'hover:bg-slate-600 bg-blue-700 text-white font-bold' : 'hover:bg-slate-600 bg-white text-black'} >
                <Italic className='w-5 h-5 ' />
            </button>

            <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'hover:bg-slate-600 bg-blue-700 text-white font-bold' : 'hover:bg-slate-600 bg-white text-black'} >
                <Strikethrough className='w-5 h-5' />
            </button>

            <Typography text='|' variant='h6' className='mx-2' />

            <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={editor.isActive('bulletList') ? 'hover:bg-slate-600 bg-blue-700 text-white font-bold' : 'hover:bg-slate-600 bg-white text-black'} >
                <List className='w-5 h-5' />
            </button>

            <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={editor.isActive('orderedList') ? 'hover:bg-slate-600 bg-blue-700 text-white font-bold' : 'hover:bg-slate-600 bg-white text-black'} >
                <ListOrdered className='w-5 h-5' />
            </button>

            <Typography text='|' variant='h6' className='mx-2' />


            <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()} className={editor.isActive('code') ? 'hover:bg-slate-600 bg-blue-700 text-white font-bold' : 'hover:bg-slate-600 bg-white text-black'} >
                <Code className='w-5 h-5' />
            </button>

            <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive("codeBlock") ? 'hover:bg-slate-600 bg-blue-700 text-white font-bold' : 'hover:bg-slate-600 bg-white text-black'} >
                <SquareCode className='w-5 h-5 ' />
            </button>

            <Typography text='|' variant='h6' className='mx-2' />

            <Popover>
                <PopoverTrigger>
                    <button>
                        <Typography text='😀' variant='h6' />
                    </button>
                </PopoverTrigger>
                <PopoverContent className='w-fit p-0'>
                    <Picker data={data} onEmojiSelect={(emoji: EmojiIn) => editor.chain().focus().insertContent(emoji.native).run()} />
                </PopoverContent>
            </Popover>




        </div>
    )
}

export default MenuBar