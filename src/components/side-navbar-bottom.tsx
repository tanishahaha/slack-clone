"use client"
import { User, Workspace } from '@/types/app'
import React, { FC } from 'react'
import { FiPlus } from 'react-icons/fi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { GoDot, GoDotFill } from 'react-icons/go'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Typography from './ui/Typography';
import { GiNightSleep } from "react-icons/gi"
import { FaRegCalendarCheck } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';
import { IoDiamondOutline } from 'react-icons/io5';
import { UsecolorPreferences } from '@/provider/color-preferences';
import PreferencesDialog from './preferences-dialog';

type SidenavbarBottomProps = {
    currentWorkspaceData: Workspace,
    userData: User
}
const SidenavbarBottom: FC<SidenavbarBottomProps> = ({ currentWorkspaceData, userData }) => {

    let backgroundColor = 'bg-primary-dark';
    const { color } = UsecolorPreferences();
    if (color === 'green') {
        backgroundColor = 'bg-[#245501]';
    } else if (color === 'blue') {
        backgroundColor = 'bg-[#023047]';
    }
    // console.log(userWorkspaceData)

    return (
        <div className='flex flex-col space-y-3'>
            <div className='bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300 hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10'>
                <FiPlus size={28} />
            </div>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div>
                            <Popover>
                                <PopoverTrigger>
                                    <div className='h-10 w-10 relative cursor-pointer'>
                                        <div className='h-full w-full rounded-lg overflow-hidden'>
                                            <Image className='object-cover w-full h-full' src={userData.avatar_url} alt={userData.name || 'user'} width={300} height={300} />

                                            <div className={cn('absolute z-10 rounded-full -right-[20%] -bottom-1', backgroundColor)}>
                                                {
                                                    userData.is_away ? <GoDot className="text-white text-xl" /> : <GoDotFill className="text-green-500" size={17} />
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </PopoverTrigger>
                                <PopoverContent side="right">
                                    <div>
                                        <div className='flex space-x-3'>
                                            <Avatar>
                                                <AvatarImage src={userData.avatar_url} />
                                                <AvatarFallback>
                                                    {userData.name && userData.name.slice(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className='flex flex-col '>
                                                <Typography text={userData.name || userData.email} variant='p' className='font-semibold ' />

                                                <div className='flex items-center space-x-[0.1rem]'>
                                                    {
                                                        userData.is_away ? (<GiNightSleep size={12} />)
                                                            :
                                                            (
                                                                <GoDotFill className='text-green-500' size={'17'} />
                                                            )
                                                    }
                                                    <span className='text-xs tracking-wider'>
                                                        {userData.is_away ? "Away" : 'Active'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='border group cursor-pointer mt-4 mb-2 p-1 rounded flex items-center space-x-2'>
                                            <FaRegCalendarCheck className='group-hover:hidden ' />
                                            <BsPencil className="hidden group-hover:block" />
                                            <Typography variant='p' text={'In a meeting'} className='text-sm text-gray-600 tracking-tight' />
                                        </div>

                                        <div className='flex flex-col space-y-1'>
                                            <Typography variant='p' text={userData.is_away ? "Set yourself as active" : "Set yourself as away"} className='hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer tracking-wide' />

                                            <Typography variant='p' text="Clear status" className='hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer tracking-wide' />
                                            <div className='flex gap-2 items-center hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer'>

                                                <Typography variant='p' text={`Upgrade ${currentWorkspaceData.slug}`} className=' tracking-wide' />
                                                <IoDiamondOutline className="text-orange-400" />
                                            </div>


                                            <PreferencesDialog />
                                            <hr className='bg-gray-400' />
                                            <Typography variant='p' text="Profile" className='hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer tracking-wide' />
                                            <hr className='bg-gray-400' />

                                            <Typography variant='p' text={`Sign out of ${currentWorkspaceData.slug}`} className='hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer tracking-wide' />
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        </div>
                    </TooltipTrigger>

                    <TooltipContent className='text-white bg-black border-black ' side='right'>
                        <Typography variant='p' text={userData.name || userData.email} />

                    </TooltipContent>

                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default SidenavbarBottom