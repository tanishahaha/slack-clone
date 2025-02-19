"use server";

import { createClient } from "@/supabase/supabaseServer";

export const getCurrentWorkspaceData = async (workspaceId: string) => {
    const supabase = createClient();

    const { data, error } = await supabase.from('workspaces').select('*, channels(*)').eq('id', workspaceId).single();

    if (error) {
        return [null, error];
    }

    const { members } = data;

    const memberDetails = await Promise.all(members.map(async (memberId: string) => {
        const { data: userData, error: userError } = await supabase.from('users').select("*").eq('id', memberId).single();

        if (userError) {
            console.log(`error fetching user ${memberId}`)
            return null;
        }

        return userData;
    }))

    data.members = memberDetails.filter(member => member !== null);
    console.log('current workspace data', data)

    return [data, error];
}

