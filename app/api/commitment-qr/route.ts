import QRCode from "qrcode";
export const runtime="nodejs";
export async function GET(req:Request){
  const url=new URL(req.url);
  const amount=Number(url.searchParams.get("amount")||0);
  if(!Number.isFinite(amount)||amount<=0)return new Response("Invalid amount",{status:400});
  const payload=[
    "PAYEE: TILT",
    "ACCOUNT: 127361900001700",
    "IFSC: YESB0001273",
    "AMOUNT: INR "+amount.toFixed(2)
  ].join("\n");
  const svg=await QRCode.toString(payload,{type:"svg",margin:2,errorCorrectionLevel:"M"});
  return new Response(svg,{headers:{"Content-Type":"image/svg+xml","Cache-Control":"no-store"}});
}