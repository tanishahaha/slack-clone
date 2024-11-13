
"use server"

import { createClient } from "@/supabase/supabaseServer"

export const addMemberToWorkspace=async(userId:string, workspaceId:number)=>{
    const supabase=createClient();

    const {data:addMemberWorkspaceData, error:addMemberWorkspaceError} = await supabase.rpc('add_member_to_workspace',{
        user_id:userId,
        workspace_id:workspaceId
    })

    return [addMemberWorkspaceData,addMemberWorkspaceError]
}