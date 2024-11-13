"use client";

import React, { FC, useState } from 'react'
import Typography from './ui/Typography';
import { Button } from './ui/button';
import CreateChannelDialog from './create-channel-dialog';
import { usecolorPreferences } from '@/provider/color-preferences';
import { cn } from '@/lib/utils';

const NoDataScreen: FC<{ workspaceName: string; userId: string; workspaceId: string }> = ({ userId, workspaceId, workspaceName }) => {

    const [dialogOpen, setDialogOpen] = useState(false);

    const { color } = usecolorPreferences();
    let textCol = 'text-primary-light';

    if (color === 'green') {
        textCol = "text-[#245501]";
    } else if (color === 'blue') {
        textCol = 'text-[#023047]'
    }

    return (
        <div className=' w-full h-[calc(100vh-63px)] p-4'>
            <Typography text={`Welcome to the ${workspaceName} workspace!`} variant='h3' />
            <Typography text={`Get started by creating a channel or by direct messaging.`} variant='p' className='my-2' />

            <div className='w-fit'>
                <Button className={cn(`w-full my-2 bg-white border border-slate-500 hover:text-white hover:bg-slate-700`, textCol)} onClick={() => setDialogOpen(true)} variant='secondary' >
                    <Typography variant='p' text='Create Channel' />
                </Button>
            </div>

            <CreateChannelDialog workspaceId={workspaceId} userId={userId} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
        </div>
    )
}

export default NoDataScreen