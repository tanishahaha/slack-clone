import React, { FC } from 'react'
import Typography from './ui/Typography';
import { IoMdHeadset } from 'react-icons/io'

type ChatHeaderProps = {
    title: string;
}

const ChatHeader: FC<ChatHeaderProps> = ({ title }) => {
    return (
        <div className='absolute h-10 top-0 left-0 w-full'>
            <div className='h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)]  border-b-white/30 shadow-md'>
                <Typography text={`${title}`} variant='p' />
                <IoMdHeadset className="text-primary" size={24} />


            </div>

        </div>
    )
}

export default ChatHeader