"use server";

import { createClient } from "@/supabase/supabaseServer";

export const getCurrentWorkspaceData=async(workspaceId:string)=>{
    const supabase=createClient();

    const {data,error}=await supabase.from('workspaces').select('*').eq('id',workspaceId).single();

    return [data,error];
}