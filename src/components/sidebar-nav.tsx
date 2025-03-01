import { Workspace } from '@/types/app'
import { FC, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Typography from '@/components/ui/Typography';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { RiHome2Fill } from 'react-icons/ri';
import { PiChatsTeardrop } from 'react-icons/pi'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import CreateWorkspace from '@/components/create-workspace';
import { useRouter } from 'next/navigation';
import ProgressBar from '@/components/progress-bar';
import { cn } from '@/lib/utils';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

type SidebarNavProps = {
    userWorkspaceData: Workspace[];
    currentWorkspaceData: Workspace;
}

const SidebarNav: FC<SidebarNavProps> = ({ currentWorkspaceData, userWorkspaceData }) => {



    const [switchingWorkspace, setSwitchingWorkspace] = useState(false);
    const router = useRouter();

    const switchWorkspace = (id: string) => {
        setSwitchingWorkspace(true);
        router.push(`/workspace/${id}`);
        setSwitchingWorkspace(false);
    }

    const copyInviteLink = (inviteCode: string) => {
        const currentDomain = window.location.origin;

        navigator.clipboard.writeText(`${currentDomain}/create-workspace/${inviteCode}`);

        toast.success("Invite Link Copied to clipboard");
    }

    return (
        <nav>
            <ul className='flex flex-col space-y-4'>
                <li>
                    <div className='cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden '>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Avatar>
                                    <AvatarImage src={currentWorkspaceData.image_url || ''} alt={currentWorkspaceData.name} className='object-cover w-full h-full' />
                                    <AvatarFallback className='bg-slate-700 text-white '>
                                        <Typography text={currentWorkspaceData.name.slice(0, 2)} variant='p' />
                                    </AvatarFallback>
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent side='bottom' className='w-[350px] p-0 ml-4'>


                                <Card className='w-full border-0 ' >
                                    <CardContent className='flex p-0 flex-col'>
                                        {
                                            switchingWorkspace ?
                                                <div className='m-2'>

                                                    <ProgressBar />
                                                </div> :
                                                userWorkspaceData.map((workspace) => {
                                                    const isActive = currentWorkspaceData.id === workspace.id;
                                                    return (
                                                        <div key={workspace.id} className={cn(isActive && `bg-blue-700 text-white`, ' px-2 py-1 flex gap-2 cursor-pointer')} onClick={() => !isActive && switchWorkspace(workspace.id)}>
                                                            <Avatar>
                                                                <AvatarImage src={workspace.image_url || ''} alt={workspace.name} className='object-cover w-full h-full' />
                                                                <AvatarFallback className='bg-slate-700 text-white'>
                                                                    <Typography text={workspace.name.slice(0, 2)} variant='p' />
                                                                </AvatarFallback>
                                                            </Avatar>

                                                            <div>
                                                                <Typography variant='p' text={workspace.name} className='text-small' />

                                                                <div className='flex items-center gap-x-2'>

                                                                    <Typography variant='p' text='Copy Invite Link' className='text-xs lg:text-xs' />
                                                                    <Copy onClick={() => copyInviteLink(workspace.invite_code!)} size={18} />
                                                                </div>

                                                            </div>
                                                        </div>


                                                    )
                                                }

                                                )
                                        }

                                        <Separator />
                                        <CreateWorkspace />

                                    </CardContent>
                                </Card>

                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className='flex flex-col items-center cursor-pointer group text-white'>

                        <div className='p-2 rounded-lg bg-[rgba(255,255,255,0.3)]'>
                            <RiHome2Fill size={24} className='group-hover:scale-125 transition-all duration-300' />
                        </div>
                        <Typography variant='p' text='Home' className='text-sm' />
                    </div>
                </li>
                <li>
                    <div className='flex flex-col items-center cursor-pointer group text-white'>

                        <div className='p-2 rounded-lg bg-[rgba(255,255,255,0.3)]'>
                            <PiChatsTeardrop size={24} className='group-hover:scale-125 transition-all duration-300' />
                        </div>
                        <Typography variant='p' text='Dms' className='text-sm' />
                    </div>
                </li>
            </ul>
        </nav>
    )
}

export default SidebarNav