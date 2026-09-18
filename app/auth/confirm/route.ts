import {NextResponse} from "next/server";
import {createServerClient} from "@supabase/ssr";
import {cookies} from "next/headers";

type CookieToSet={
  name:string;
  value:string;
  options?:Parameters<Awaited<ReturnType<typeof cookies>>["set"]>[2];
};

export async function GET(req:Request){
  const url=new URL(req.url);
  const code=url.searchParams.get("code");
  const next=url.searchParams.get("next")||"/dashboard";

  if(code){
    const store=await cookies();
    const supabase=createServerClient(
      "https://eyboryymmcpwspjxidmk.supabase.co",
      "sb_publishable_n4GU_D-91B2YxLt3O6JqLA_QrwHUChF",
      {
        cookies:{
          getAll(){
            return store.getAll();
          },
          setAll(cookiesToSet:CookieToSet[]){
            cookiesToSet.forEach(({name,value,options})=>{
              store.set(name,value,options);
            });
          }
        }
      }
    );

    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(new URL(next,url.origin));
}
