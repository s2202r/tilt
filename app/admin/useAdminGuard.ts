"use client";
import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase";
export function useAdminGuard(){
  const s=createClient();const[ready,setReady]=useState(false);const[error,setError]=useState("");
  useEffect(()=>{(async()=>{const{data:{user}}=await s.auth.getUser();if(!user){location.replace("/admin/login");return}const{data}=await s.from("profiles").select("role").eq("id",user.id).single();if(data?.role!=="admin"){setError("Access denied.");return}setReady(true)})()},[]);
  return {s,ready,error};
}