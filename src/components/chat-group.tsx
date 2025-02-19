"use client";

import { Channels, User, Workspace } from "@/types/app";
import { FC, useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import InfoSection from "@/components/info-section";
import ChatHeader from "@/components/chat-header";
import TextEditor from "@/components/text-editor";
import ChatMessages from "@/components/chat-messages";
import SearchBar from "@/components/search-bar";
import { useSearchParams } from "next/navigation";
import VideoChat from "@/components/video-chat";

type ChatGroupProps = {
    type: 'Channel' | 'DirectMessage';
    socketUrl: string;
    apiUrl: string;
    headerTitle: string;
    chatId: string;
    socketQuery: Record<string, string>;
    paramKey: 'channelId' | 'recipientId';
    paramValue: string;
    userData: User;
    currentChannelData: Channels | undefined;
    currentWorkspaceData: Workspace;
    userWorkspaceData: Workspace[];
    userWorkspaceChannels: Channels[];
    slug: string;
}

const ChatGroup: FC<ChatGroupProps> = ({ type, socketUrl, apiUrl, headerTitle, chatId, socketQuery, paramKey, paramValue, userData, currentChannelData, currentWorkspaceData, userWorkspaceData, userWorkspaceChannels }) => {

    const [isVideoCall, setIsVideoCall] = useState<boolean>(false);

    const searchParams = useSearchParams();

    useEffect(() => {
        const callParam = searchParams?.get('call');
        setIsVideoCall(callParam === 'true');
    }, [searchParams, chatId])

    return (<>
        <div className='h-[calc(100vh-256px)]  overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2 '>

            <Sidebar userWrokspaceData={userWorkspaceData as Workspace[]} currentWorkspaceData={currentWorkspaceData} userData={userData} />

            <InfoSection userData={userData} currentWorkspaceData={currentWorkspaceData} workspaceChannels={userWorkspaceChannels} currentChannelId={type === "Channel" ? currentChannelData?.id : undefined} />

            <SearchBar currentWorkspaceData={currentWorkspaceData} currentChannelData={currentChannelData} loggedInUserId={userData.id} />

            <div className='p-4 relative w-full overflow-hidden'>
                <ChatHeader title={headerTitle} chatId={chatId} userData={userData} />


                <div className='mt-10'>

                    {
                        !isVideoCall && (

                            <ChatMessages userData={userData} name={currentChannelData?.name ?? userData.name ?? 'USERNAME'} workspaceData={currentWorkspaceData} chatId={chatId} type={type} apiUrl={apiUrl} socketQuery={socketQuery} socketUrl={socketUrl} paramKey={paramKey} paramValue={paramValue} channelData={currentChannelData} />
                        )
                    }

                    {
                        isVideoCall && (
                            <VideoChat chatId={type === 'Channel' ? currentChannelData?.id! : chatId} userData={userData} />
                        )
                    }
                </div>
            </div>
        </div>

        <div className='m-4'>

            {

                !isVideoCall && (

                    <TextEditor apiUrl={socketUrl} channel={currentChannelData} workspaceData={currentWorkspaceData} userData={userData} type={type} recipientId={type === 'DirectMessage' ? chatId : undefined} />
                )
            }
        </div>

    </>)
}

export default ChatGroup