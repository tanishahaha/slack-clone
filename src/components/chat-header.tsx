import { FC } from 'react'
import Typography from './ui/Typography';
import { IoMdHeadset } from 'react-icons/io'
import { User } from '@/types/app';
import { useRouter, useSearchParams } from 'next/navigation';

type ChatHeaderProps = {
    title: string;
    chatId: string;
    userData: User;
}

const ChatHeader: FC<ChatHeaderProps> = ({ title }) => {


    const router = useRouter();
    const searchParams = useSearchParams();


    const handleCall = () => {
        const currentParams = new URLSearchParams(searchParams?.toString());

        if (currentParams.has('call')) {
            currentParams.delete('call');
        } else {
            currentParams.append('call', 'true');
        }

        router.push(`?${currentParams.toString()}`)
    }
    return (
        <div className='absolute z-20 h-10 top-0 left-0 w-full'>
            <div className='h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)]  border-b-white/30 shadow-md'>
                <Typography text={`${title}`} variant='p' />
                <IoMdHeadset className="text-primary cursor-pointer" size={24} onClick={handleCall} />


            </div>

        </div>
    )
}

export default ChatHeader