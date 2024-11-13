import { Workspace } from '@/types/app'
import React, { FC, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Typography from './ui/Typography';
import { Card, CardContent } from './ui/card';
import { Separator } from './ui/separator';

import { RiHome2Fill } from 'react-icons/ri';
import { PiChatsTeardrop } from 'react-icons/pi'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import CreateWorkspace from './create-workspace';
import { useRouter } from 'next/navigation';
import ProgressBar from './progress-bar';
import { cn } from '@/lib/utils';

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
                                                        <div key={workspace.id} className={cn(isActive && `bg-blue-700 text-white`, ' px-2 py-1 flex gap-2 cursor-pointer')} onClick={() => switchWorkspace(workspace.id)}>
                                                            <Avatar>
                                                                <AvatarImage src={workspace.image_url || ''} alt={workspace.name} className='object-cover w-full h-full' />
                                                                <AvatarFallback className='bg-slate-700 text-white'>
                                                                    <Typography text={workspace.name.slice(0, 2)} variant='p' />
                                                                </AvatarFallback>
                                                            </Avatar>

                                                            <div>
                                                                <Typography variant='p' text={workspace.name} className='text-small' />
                                                                <Typography variant='p' text={workspace.invite_code || ''} className='text-xs lg:text-xs' />
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