import {createClient} from "@supabase/supabase-js";
import {newDropEmail} from "@/lib/emailTemplates";
export const runtime="nodejs";
export const maxDuration=60;
const SUPABASE_URL="https://eyboryymmcpwspjxidmk.supabase.co";
const SUPABASE_ANON="sb_publishable_n4GU_D-91B2YxLt3O6JqLA_QrwHUChF";

async function sendOne(to:string,subject:string,html:string){
  const key=process.env.RESEND_API_KEY;
  if(!key)throw new Error("RESEND_API_KEY missing");
  const r=await fetch("https://api.resend.com/emails",{method:"POST",headers:{Authorization:"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({from:"TILT <noreply@tiltclub.in>",to:[to],subject,html})});
  return r.ok;
}

export async function POST(req:Request){
  const authorization=req.headers.get("authorization")||"";
  if(!authorization.startsWith("Bearer "))return Response.json({error:"Unauthorized"},{status:401});
  const token=authorization.slice(7);
  const sb=createClient(SUPABASE_URL,SUPABASE_ANON,{global:{headers:{Authorization:authorization}}});
  const{data:{user}}=await sb.auth.getUser(token);
  if(!user)return Response.json({error:"Unauthorized"},{status:401});
  const{data:me}=await sb.from("profiles").select("role").eq("id",user.id).single();
  if(me?.role!=="admin")return Response.json({error:"Admin required"},{status:403});

  const{dropId}=await req.json();
  const{data:drop,error}=await sb.from("drops").select("id,slug,status,products(brand,name,image_url,reference_price),drop_tiers(price)").eq("id",dropId).single();
  if(error||!drop||drop.status!=="live")return Response.json({error:"Live drop not found"},{status:404});

  const{data:people,error:pe}=await sb.rpc("get_drop_email_recipients");
  if(pe)return Response.json({error:pe.message},{status:500});
  const product:any=drop.products;
  const tiers:any[]=drop.drop_tiers||[];
  const lowest=tiers.length?Math.min(...tiers.map(x=>Number(x.price))):null;
  const mail=newDropEmail({brand:product.brand,name:product.name,slug:drop.slug,image:product.image_url,referencePrice:Number(product.reference_price),bestPrice:lowest});
  const recipients=[...new Set((people||[]).map((x:any)=>x.email).filter(Boolean))] as string[];

  let sent=0;
  for(const email of recipients){if(await sendOne(email,mail.subject,mail.html))sent++}
  return Response.json({sent,total:recipients.length});
}