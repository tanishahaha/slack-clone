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
import ChatGroup from '@/components/chat-group';

const page = async ({ params: { workspaceId, channelId } }: { params: { workspaceId: string; channelId: string; } }) => {

    // console.log(id);

    const userData = await getUserData();

    if (!userData) {
        return redirect('/auth');
    }
    const [userWorkspaceData,] = await getUserWorkspaceData(userData.workspaces!);

    const [currentWorkspaceData,] = await getCurrentWorkspaceData(workspaceId);

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
            <ChatGroup type='Channel' userData={userData} currentChannelData={currentChannelData} currentWorkspaceData={currentWorkspaceData} userWorkspaceChannels={userWorkspaceChannels} slug={workspaceId} chatId={channelId} socketUrl='/api/web-socket/messages' socketQuery={{ channelId: currentChannelData.id, workspaceId: currentWorkspaceData.id }} apiUrl='/api/messages' headerTitle={currentChannelData.name} paramKey='channelId' paramValue={channelId} userWorkspaceData={userWorkspaceData as UserWorkspace[]} />

        </div>
    )
}

export default page