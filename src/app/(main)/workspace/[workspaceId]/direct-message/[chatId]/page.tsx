import { getCurrentWorkspaceData } from "@/actions/get-current-workspace-data";
import { getUserData } from "@/actions/get-user-data";
import { getUserWorkspaceData } from "@/actions/get-user-workspace-data";
import { getWorkspaceChannels } from "@/actions/get-workspace-channels";
import ChatGroup from "@/components/chat-group";
import { Workspace } from "@/types/app";
import { redirect } from "next/navigation";

const ChatPage = async ({ params: { workspaceId, chatId } }: { params: { workspaceId: string; chatId: string } }) => {

    const userData = await getUserData();
    if (!userData) return redirect('/auth');

    const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);
    const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

    const userWorkspaceChannels = await getWorkspaceChannels(workspaceId, userData.id);

    const currentChannelData = userWorkspaceChannels.find(channel => channel.id === chatId);
    // if (!currentChannelData) {
    //     redirect('/')
    // }


    return (
        <div>
            <ChatGroup

                userData={userData}
                type='DirectMessage'
                currentChannelData={currentChannelData}
                currentWorkspaceData={currentWorkspaceData}
                slug={workspaceId}
                userWorkspaceData={userWorkspaceData as Workspace[]}
                userWorkspaceChannels={userWorkspaceChannels}
                chatId={chatId}
                socketUrl='/api/web-socket/direct-messages'
                socketQuery={{
                    channelId: currentChannelData?.id!,
                    workspaceId: currentWorkspaceData.id,
                    recipientId: chatId,
                }}
                apiUrl='/api/direct-messages'
                headerTitle="DIRECT MESSAGE"
                paramKey='recipientId'
                paramValue={chatId}
            />
        </div>
    )
}
export default ChatPage;