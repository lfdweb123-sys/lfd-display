"use client"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Fermer le menu quand on clique sur un lien
  const handleLinkClick = () => {
    setOpen(false)
  }

  return (
    <nav style={{background:"linear-gradient(180deg,#1e3d7b,#0d2444)",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 12px rgba(0,0,0,0.2)"}}>
      <div style={{maxWidth:1100,margin:"0 auto",padding:"0 20px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60}}>
        
        {/* Logo */}
        <Link href="/" style={{display:"flex",alignItems:"center",gap:10,textDecoration:"none"}} onClick={handleLinkClick}>
          <span style={{color:"#FF4466",fontSize:20,fontWeight:900}}>✦</span>
          <span style={{color:"#fff",fontSize:18,fontWeight:800,letterSpacing:"-0.5px"}}>LFD Bible Display</span>
        </Link>

        {/* Desktop Menu */}
        {!isMobile && (
          <div style={{display:"flex",gap:6,alignItems:"center"}}>
            {[
              {href:"/",label:"Accueil"},
              {href:"/#download",label:"Télécharger"},
              {href:"/#support",label:"Soutenir"},
              {href:"/help",label:"Aide"},
            ].map(l => (
              <Link key={l.href} href={l.href} style={{color:"rgba(255,255,255,0.8)",fontSize:14,fontWeight:500,padding:"6px 12px",borderRadius:6,textDecoration:"none",transition:"all 0.15s",hover:{color:"#fff",background:"rgba(255,255,255,0.1)"}}}>
                {l.label}
              </Link>
            ))}
            <Link href="/#download" style={{background:"#C0001A",color:"#fff",fontSize:14,fontWeight:700,padding:"8px 16px",borderRadius:7,textDecoration:"none",marginLeft:6,transition:"all 0.15s",hover:{background:"#a00016"}}}>
              Télécharger
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button
            onClick={() => setOpen(!open)}
            style={{
              background:"transparent",
              border:"none",
              cursor:"pointer",
              padding:"10px",
              display:"flex",
              flexDirection:"column",
              gap:"6px",
              zIndex:101
            }}
          >
            <span style={{
              display:"block",
              width:"25px",
              height:"2px",
              background:"#fff",
              transition:"all 0.3s",
              transform: open ? "rotate(45deg) translate(5px, 6px)" : "none"
            }} />
            <span style={{
              display:"block",
              width:"25px",
              height:"2px",
              background:"#fff",
              transition:"all 0.3s",
              opacity: open ? 0 : 1
            }} />
            <span style={{
              display:"block",
              width:"25px",
              height:"2px",
              background:"#fff",
              transition:"all 0.3s",
              transform: open ? "rotate(-45deg) translate(5px, -6px)" : "none"
            }} />
          </button>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && open && (
        <div
          style={{
            position:"fixed",
            top:60,
            left:0,
            right:0,
            background:"linear-gradient(180deg,#1e3d7b,#0d2444)",
            padding:"20px",
            display:"flex",
            flexDirection:"column",
            gap:"12px",
            boxShadow:"0 4px 12px rgba(0,0,0,0.3)",
            borderTop:"1px solid rgba(255,255,255,0.1)",
            zIndex:99
          }}
        >
          {[
            {href:"/",label:"Accueil"},
            {href:"/#download",label:"Télécharger"},
            {href:"/#support",label:"Soutenir"},
            {href:"/help",label:"Aide"},
          ].map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={handleLinkClick}
              style={{
                color:"rgba(255,255,255,0.9)",
                fontSize:16,
                fontWeight:500,
                padding:"12px 16px",
                borderRadius:8,
                textDecoration:"none",
                transition:"all 0.15s",
                textAlign:"center",
                background:"rgba(255,255,255,0.05)"
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#download"
            onClick={handleLinkClick}
            style={{
              background:"#C0001A",
              color:"#fff",
              fontSize:16,
              fontWeight:700,
              padding:"12px 16px",
              borderRadius:8,
              textDecoration:"none",
              textAlign:"center",
              marginTop:"8px"
            }}
          >
            Télécharger maintenant
          </Link>
        </div>
      )}
    </nav>
  )
}