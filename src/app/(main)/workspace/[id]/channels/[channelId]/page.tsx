import { getCurrentWorkspaceData } from '@/actions/get-current-workspace-data';
import { getUserData } from '@/actions/get-user-data';
import { getUserWorkspaceData } from '@/actions/get-user-workspace-data';
import { getWorkspaceChannels } from '@/actions/get-workspace-channels';
import InfoSection from '@/components/info-section';
import Sidebar from '@/components/sidebar';
import { redirect } from 'next/navigation';
import { Workspace as UserWorkspace } from '@/types/app';
import React from 'react'
import ChatHeader from '@/components/chat-header';
import Typography from '@/components/ui/Typography';
import TextEditor from '@/components/text-editor';

const page = async ({ params: { id, channelId } }: { params: { id: string; channelId: string; } }) => {

    // console.log(id);

    const userData = await getUserData();

    if (!userData) {
        return redirect('/auth');
    }
    const [userWorkspaceData, userWorkspaceError] = await getUserWorkspaceData(userData.workspaces!);

    const [currentWorkspaceData, currentWorkspaceError] = await getCurrentWorkspaceData(id);

    const userWorkspaceChannels = await getWorkspaceChannels(
        currentWorkspaceData.id,
        userData.id
    );

    const currentChannelData = userWorkspaceChannels.find(
        channel => channel.id === channelId
    );
    if (!currentChannelData) {
        redirect('/')
    }

    return (
        <div className='hidden md:block '>
            <div className='h-[calc(100vh-256px)]  overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2 '>
                <Sidebar userWrokspaceData={userWorkspaceData as UserWorkspace[]} currentWorkspaceData={currentWorkspaceData} userData={userData} />
                <InfoSection userData={userData} currentWorkspaceData={currentWorkspaceData} workspaceChannels={userWorkspaceChannels} currentChannelId={channelId} />
                <div className='p-4 relative w-full overflow-hidden'>
                    <ChatHeader title={currentChannelData.name} />

                    <div className='mt-10'>
                        <Typography text='Chat Content' variant='h4' />
                    </div>
                </div>
            </div>

            <div className='m-4'>
                <TextEditor apiUrl='/api/web-socket/messages' type='channel' channel={currentChannelData} workspaceData={currentWorkspaceData} />
            </div>

        </div>
    )
}

export default page