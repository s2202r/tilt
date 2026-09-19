"use client";
import {useEffect,useState} from "react";
import AdminShell from "./AdminShell";
import LoadingOverlay from "../LoadingOverlay";
import {useAdminGuard} from "./useAdminGuard";

export default function AdminDashboard(){
  const{s,ready,error}=useAdminGuard();const[busy,setBusy]=useState(true);const[stats,setStats]=useState({live:0,pending:0,sellers:0,orders:0});
  useEffect(()=>{if(!ready)return;(async()=>{setBusy(true);const[a,b,c,d]=await Promise.all([
    s.from("drops").select("id",{count:"exact",head:true}).eq("status","live"),
    s.from("commitments").select("id",{count:"exact",head:true}).eq("status","pending"),
    s.from("sellers").select("id",{count:"exact",head:true}),
    s.from("orders").select("id",{count:"exact",head:true})
  ]);setStats({live:a.count||0,pending:b.count||0,sellers:c.count||0,orders:d.count||0});setBusy(false)})()},[ready]);
  if(error)return <div className="authShell"><div className="authCard"><h1>TILT Admin</h1><p>{error}</p></div></div>;
  if(!ready)return <LoadingOverlay label="Verifying admin…"/>;
  return <AdminShell title="Dashboard" subtitle="A quick view of what needs your attention.">
    {busy&&<LoadingOverlay label="Loading dashboard…"/>}
    <div className="adminStatGrid">
      <a href="/admin/deals" className="adminStatCard"><span>LIVE DEALS</span><strong>{stats.live}</strong><small>Manage drops and bids</small></a>
      <a href="/admin/payments" className="adminStatCard"><span>PENDING PAYMENTS</span><strong>{stats.pending}</strong><small>Verify commitment proofs</small></a>
      <a href="/admin/sellers" className="adminStatCard"><span>SELLERS</span><strong>{stats.sellers}</strong><small>Create and manage sellers</small></a>
      <a href="/admin/orders" className="adminStatCard"><span>ORDERS</span><strong>{stats.orders}</strong><small>Review buyer orders</small></a>
    </div>
    <section className="adminPanel"><span className="sectionKicker">QUICK ACTIONS</span><div className="adminQuickActions">
      <a href="/admin/products">Create product + deal</a><a href="/admin/sellers">Create seller</a><a href="/admin/payments">Verify payment</a><a href="/admin/insights">View buyer insights</a>
    </div></section>
  </AdminShell>
}