import { workspaceInvite } from '@/actions/workspace-invite';
import { createClient } from '@/supabase/supabaseServer';
import { redirect } from 'next/navigation';
import React from 'react'

const InvitePage = async ({ params: { invite: inviteCode } }: { params: { invite: string }; }) => {

    await workspaceInvite(inviteCode);

    const supabase = await createClient();
    const { data } = await supabase.from('workspaces').select("*").eq("invite_code", inviteCode).single();

    if (data) {
        redirect(`/workspace/${data.id}`);
    } else {
        redirect(`/create-workspace`);
    }

}

export default InvitePage