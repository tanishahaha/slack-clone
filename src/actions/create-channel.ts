'use server';

import { createClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";

export const createChannel = async ({
    name, workspaceId, userId
}: {
    workspaceId: string;
    name: string;
    userId: string;

}) => {
    const supabase = createClient();
    const userData = await getUserData();

    if (!userData) {
        return { error: 'user not found' };
    }

    const { error, data: channelRecord } = await supabase.from("channels").insert({
        name,
        user_id: userId,
        workspace_id: workspaceId,
    }).select('*');

    if (error) {
        return { error: "insert channel error" }
    }

    // updaate channel membersarray

    const [, channelError] = await updateChannelMembers(channelRecord[0].id, userId);

    if (channelError) {
        return { error: "channel member adding error" }
    }

    const [, userChannelError] = await addChannelToUser(channelRecord[0].id, userId);

    if (userChannelError) {
        return { error: "adding channel to user error" }
    }

    const [, workspaceChannelError] = await addChannelToWorkspace(workspaceId, channelRecord[0].id);

    if (workspaceChannelError) {
        return { error: "workspace channel error" }
    }

}

export const updateChannelMembers = async (channelId: string, userId: string) => {

    const supabase = createClient();
    const { data: updateChannelData, error: updateChannelError } = await supabase.rpc('update_channel_members', {
        new_member: userId,
        channel_id: channelId
    });

    return [updateChannelData, updateChannelError];
}

export const addChannelToUser = async (channelId: string, userId: string) => {
    const supabase = createClient();

    const { data: userChannelData, error: userChannelError } = await supabase.rpc('update_user_channels', {
        user_id: userId,
        channels_id: channelId
    })

    return [userChannelData, userChannelError]
}

const addChannelToWorkspace = async (workspaceId: string, channelId: string) => {
    const supabase = createClient();
    const { data: workspaceChannelData, error: workspaceChannelError } = await supabase.rpc('add_channel_to_workspace', {
        channel_id: channelId,
        workspace_id: workspaceId
    });

    return [workspaceChannelData, workspaceChannelError];
}

export const updateChannelRegulators = async (userId: string, channelId: string) => {
    const supabase = await createClient();

    const { data: updateChannelData, error: updateChannelError } = await supabase.rpc('update_channel_regulators', {
        new_regulator: userId,
        channel_id: channelId,
    })

    return [updateChannelData, updateChannelError];
}