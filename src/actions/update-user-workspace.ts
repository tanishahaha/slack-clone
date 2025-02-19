
"use server"

import { createClient } from "@/supabase/supabaseServer"

export const updatUserWorkspace = async (userId: string, workspaceId: string) => {
    const supabase = createClient();

    const { data: updateWorkspaceData, error: updateWorkspaceError } = await supabase.rpc("add_workspace_to_user", { user_id: userId, new_workspace: workspaceId })

    return [updateWorkspaceData, updateWorkspaceError]
}