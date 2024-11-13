"use server"
import { createClient } from "@/supabase/supabaseServer"
import { Channels } from "@/types/app";

export const getWorkspaceChannels = async (workspaceId: string, userId: string) => {
    const supabase = createClient();

    const { data: workspaceData, error: workspaceError } = await supabase.from("workspaces").select('channels').eq('id', workspaceId).single();

    if (workspaceError) {
        console.log(workspaceError);
        return [];
    }
    const channelIds = workspaceData.channels;
    if (!channelIds || channelIds.length == 0) {
        return [];
    }

    const { data: channelsData, error: channelsError } = await supabase.from('channels').select("*").in('id', channelIds);

    if (channelsError) {
        return [];
    }

    const userWorkspaceChannels = channelsData.filter(channel => channel.members.includes(userId))

    return userWorkspaceChannels as Channels[];
}