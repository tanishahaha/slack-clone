"use server";

import { createClient } from "@/supabase/supabaseServer";

export async function registerWithEmail({email}:{email:string}){
    // console.log(email)
    const supabase=await createClient();
    const currentOrigin = process.env.NEXT_CURRENT_ORIGIN;

    const response=await supabase.auth.signInWithOtp({email,options:{
        emailRedirectTo:currentOrigin,
    }})

    return JSON.stringify(response);
}