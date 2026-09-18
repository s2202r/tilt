import type {MetadataRoute} from "next";
export default function manifest():MetadataRoute.Manifest{return{
  name:"TILT — More buyers. Lower prices.",
  short_name:"TILT",
  description:"Join live buying drops. Commit at your price. More buyers unlock lower prices.",
  start_url:"/",
  scope:"/",
  display:"standalone",
  orientation:"portrait-primary",
  background_color:"#09090b",
  theme_color:"#d7ff3f",
  categories:["shopping","business"],
  icons:[
    {src:"/icon.svg",sizes:"any",type:"image/svg+xml",purpose:"any"},
    {src:"/icon.svg",sizes:"any",type:"image/svg+xml",purpose:"maskable"}
  ]
}}