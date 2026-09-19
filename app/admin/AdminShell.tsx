"use client";
import {usePathname} from "next/navigation";
import {useState} from "react";

const items=[
  ["/admin","Dashboard"],
  ["/admin/deals","Deals"],
  ["/admin/products","Products"],
  ["/admin/sellers","Sellers"],
  ["/admin/payments","Payments"],
  ["/admin/orders","Orders"],
  ["/admin/insights","Insights"],
  ["/admin/settings","Settings"],
];

export default function AdminShell({children,title,subtitle}:{children:React.ReactNode;title:string;subtitle?:string}){
  const path=usePathname();const[open,setOpen]=useState(false);
  return <div className="adminLayout">
    <aside className={"adminSidebar "+(open?"open":"")}>
      <div className="adminBrandRow"><a href="/" className="adminBrand">TILT CONTROL</a><button className="adminClose" onClick={()=>setOpen(false)}>×</button></div>
      <nav className="adminMenu">{items.map(([href,label])=><a key={href} href={href} className={path===href?"active":""} onClick={()=>setOpen(false)}>{label}</a>)}</nav>
      <div className="adminSideFoot"><span>ADMIN</span><a href="/">Back to TILT</a></div>
    </aside>
    {open&&<button className="adminBackdrop" aria-label="Close menu" onClick={()=>setOpen(false)}/>}
    <main className="adminMain">
      <header className="adminTopbar">
        <button className="adminMenuBtn" onClick={()=>setOpen(true)}>☰</button>
        <div><span className="sectionKicker">ADMIN</span><h1>{title}</h1>{subtitle&&<p>{subtitle}</p>}</div>
      </header>
      <div className="adminContent">{children}</div>
    </main>
  </div>
}