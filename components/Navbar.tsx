"use client"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav style={{background:"linear-gradient(180deg,#1e3d7b,#0d2444)",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}}>
          <span style={{color:"#FF4466",fontSize:20,fontWeight:900}}>✦</span>
          <span style={{color:"#fff",fontSize:18,fontWeight:800,letterSpacing:"-0.5px"}}>LFD Bible Display</span>
        </Link>
        <div style={{display:"flex",gap:6,alignItems:"center"}}>
          {[
            {href:"/",label:"Accueil"},
            {href:"/#download",label:"Telecharger"},
            {href:"/#support",label:"Soutenir"},
            {href:"/help",label:"Aide"},
          ].map(l => (
            <Link key={l.href} href={l.href} style={{color:"rgba(255,255,255,0.8)",fontSize:14,fontWeight:500,padding:"6px 12px",borderRadius:6,textDecoration:"none",transition:"all 0.15s"}}>
              {l.label}
            </Link>
          ))}
          <Link href="/#download" style={{background:"#C0001A",color:"#fff",fontSize:14,fontWeight:700,padding:"8px 16px",borderRadius:7,textDecoration:"none",marginLeft:6}}>
            Telecharger
          </Link>
        </div>
      </div>
    </nav>
  )
}