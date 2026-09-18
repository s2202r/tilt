import {otpEmail} from "@/lib/emailTemplates";
export const runtime="nodejs";

function b64(s:string){return Uint8Array.from(Buffer.from(s,"base64"))}
async function verifyWebhook(req:Request,payload:string){
  const raw=process.env.SEND_EMAIL_HOOK_SECRET||"";
  const secret=raw.replace(/^v1,whsec_/,"");
  if(!secret)return false;
  const id=req.headers.get("webhook-id")||"";
  const ts=req.headers.get("webhook-timestamp")||"";
  const sigHeader=req.headers.get("webhook-signature")||"";
  if(!id||!ts||!sigHeader)return false;
  const age=Math.abs(Date.now()/1000-Number(ts));if(!Number.isFinite(age)||age>300)return false;
  const key=await crypto.subtle.importKey("raw",b64(secret),{name:"HMAC",hash:"SHA-256"},false,["verify"]);
  const data=new TextEncoder().encode(id+"."+ts+"."+payload);
  const sigs=sigHeader.split(" ").map(x=>x.trim()).filter(Boolean).map(x=>x.startsWith("v1,")?x.slice(3):x);
  for(const s of sigs){try{if(await crypto.subtle.verify("HMAC",key,b64(s),data))return true}catch{}}
  return false;
}
export async function POST(req:Request){
  const payload=await req.text();
  if(!(await verifyWebhook(req,payload)))return Response.json({error:{http_code:401,message:"Invalid webhook signature"}},{status:401});
  const body=JSON.parse(payload);
  const to=body?.user?.email;
  const token=body?.email_data?.token;
  const action=body?.email_data?.email_action_type||"login";
  if(!to||!token)return Response.json({error:{http_code:400,message:"Missing email or token"}},{status:400});
  const apiKey=process.env.RESEND_API_KEY;
  if(!apiKey)return Response.json({error:{http_code:500,message:"RESEND_API_KEY missing"}},{status:500});
  const mail=otpEmail(String(token),String(action));
  const res=await fetch("https://api.resend.com/emails",{method:"POST",headers:{"Authorization":"Bearer "+apiKey,"Content-Type":"application/json"},body:JSON.stringify({from:"TILT <noreply@tiltclub.in>",to:[to],subject:mail.subject,html:mail.html})});
  if(!res.ok){const detail=await res.text();return Response.json({error:{http_code:res.status,message:detail}},{status:500})}
  return Response.json({});
}