"use server"

import { createClient } from "@/supabase/supabaseServer"

export const getUserWorkspaceData=async(workspaceIds:Array<string>)=>{
    const supabase=createClient();
    const {data,error}= await supabase.from('workspaces').select('*').in('id',workspaceIds);

    return [data,error];
}