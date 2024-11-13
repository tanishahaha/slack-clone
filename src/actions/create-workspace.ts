"use server"

import { createClient } from "@/supabase/supabaseServer";
import { getUserData } from "./get-user-data";
import { updatUserWorkspace } from "./update-user-workspace";
import { addMemberToWorkspace } from "./add-member-to-workspace";

export const createWorkspace = async ({ imageUrl, name, slug, invite_code }: { imageUrl?: string; name: string; slug: string; invite_code: string; }) => {
    const supabase = createClient();
    const userData = await getUserData();
    if (!userData) {
        return { error: 'No user data' }
    }

    console.log("name", name)
    const { data: workspacerecord, error } = await supabase.from('workspaces').insert({
        image_url: imageUrl,
        name: name,
        super_admin: userData.id,
        slug: slug,
        invite_code: invite_code,
    }).select('*');

    if (error) {
        return { error: error };
    }

    const [, updateWorkspaceError] = await updatUserWorkspace(userData.id, workspacerecord[0].id);

    if (updateWorkspaceError) {
        return { error: updateWorkspaceError };
    }



    const [, addMemberWorkspaceError] = await addMemberToWorkspace(userData.id, workspacerecord[0].id);

    if (addMemberWorkspaceError) {
        return { error: addMemberWorkspaceError };
    }
}