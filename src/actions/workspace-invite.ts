"use server";

import { createClient } from "@/supabase/supabaseServer";
import { getUserData } from "@/actions/get-user-data";
import { addMemberToWorkspace } from "@/actions/add-member-to-workspace";
import { updatUserWorkspace } from "@/actions/update-user-workspace";

export const workspaceInvite = async (inviteCode: string) => {
    const supabase = createClient();
    const userData = await getUserData();

    if (!userData?.id) {
        console.log("User data is missing or invalid.");
        return;
    }

    const { data, error } = await supabase.from("workspaces").select("*").eq("invite_code", inviteCode).single();

    if (error || !data) {
        console.log(error || "Workspace not found.");
        return;
    }

    const isUserMember = data.members?.includes(userData.id);

    if (isUserMember) {
        console.log("User is already a member.");
        return;
    }

    if (data.super_admin === userData.id) {
        console.log("User is the super admin of this workspace.");
        return;
    }

    if (!data.id) {
        console.log("Workspace ID is missing.");
        return;
    }

    await addMemberToWorkspace(userData.id, data.id);
    await updatUserWorkspace(userData.id, data.id);
};
