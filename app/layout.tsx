import "./globals.css";
export const metadata={
  metadataBase:new URL("https://tiltclub.in"),
  title:{default:"TILT — More buyers. Lower prices.",template:"%s | TILT"},
  description:"Join live buying drops. Commit at your price. More buyers unlock lower prices.",
  alternates:{canonical:"/"},
  openGraph:{
    type:"website",
    url:"https://tiltclub.in",
    siteName:"TILT",
    title:"TILT — More buyers. Lower prices.",
    description:"Join live buying drops. Commit at your price. More buyers unlock lower prices."
  },
  twitter:{
    card:"summary_large_image",
    title:"TILT — More buyers. Lower prices.",
    description:"Join live buying drops. Commit at your price. More buyers unlock lower prices."
  }
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}