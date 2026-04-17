export default function Footer() {
  return (
    <footer style={{background:"#0d2444",color:"rgba(255,255,255,0.6)",padding:"40px 20px 24px"}}>
      <div style={{maxWidth:1100,margin:"0 auto"}}>
        <div style={{display:"flex",flexWrap:"wrap",gap:40,marginBottom:32,justifyContent:"space-between"}}>
          <div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <span style={{color:"#FF4466",fontSize:18,fontWeight:900}}>✦</span>
              <span style={{color:"#fff",fontSize:16,fontWeight:800}}>LFD Bible Display</span>
            </div>
            <p style={{fontSize:13,maxWidth:280,lineHeight:1.6}}>Logiciel gratuit de projection biblique pour eglises et ministeres. Fait avec amour pour la gloire de DIEU.</p>
          </div>
          <div>
            <div style={{color:"#fff",fontWeight:700,marginBottom:12,fontSize:13,textTransform:"uppercase",letterSpacing:"0.5px"}}>Liens</div>
            {[{href:"/#download",label:"Telecharger"},{href:"/#support",label:"Soutenir"},{href:"/help",label:"Aide & Tutoriels"},{href:"/#about",label:"A propos"}].map(l => (
              <div key={l.href} style={{marginBottom:6}}>
                <a href={l.href} style={{color:"rgba(255,255,255,0.6)",fontSize:13,textDecoration:"none"}}>{l.label}</a>
              </div>
            ))}
          </div>
          <div>
            <div style={{color:"#fff",fontWeight:700,marginBottom:12,fontSize:13,textTransform:"uppercase",letterSpacing:"0.5px"}}>Contact</div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              {[
                {href:"https://wa.me/2290143260596",label:"WhatsApp",bg:"#25D366"},
                {href:"https://facebook.com/LFDWEB",label:"Facebook",bg:"#1877F2"},
                {href:"https://linkedin.com/in/gerard-sononkpon",label:"LinkedIn",bg:"#0A66C2"},
                {href:"https://t.me/+2290162758703",label:"Telegram",bg:"#229ED9"},
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  style={{background:s.bg,color:"#fff",padding:"6px 12px",borderRadius:6,fontSize:12,fontWeight:700,textDecoration:"none"}}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(255,255,255,0.1)",paddingTop:20,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
          <span style={{fontSize:12}}>© 2025 LFD Bible Display — par Gerard Sononkpon, le teknon de DIEU</span>
          <span style={{fontSize:12}}>Logiciel 100% gratuit pour la gloire de DIEU</span>
        </div>
      </div>
    </footer>
  )
}