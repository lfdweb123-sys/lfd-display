"use client"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { FeexPayProvider, FeexPayButton } from "@feexpay/react-sdk"
import "@feexpay/react-sdk/style.css"

export default function Home() {
  return (
    <main>
      <Navbar />

      <section style={{background:"linear-gradient(135deg,#1e3d7b 0%,#0d2444 100%)",padding:"80px 20px",textAlign:"center"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,68,102,0.15)",border:"1px solid rgba(255,68,102,0.3)",borderRadius:20,padding:"6px 16px",marginBottom:24}}>
            <span style={{color:"#FF4466",fontSize:13,fontWeight:700}}>&#10022; Logiciel 100% Gratuit</span>
          </div>

          <h1 style={{color:"#fff",fontSize:"clamp(32px,5vw,56px)",fontWeight:900,lineHeight:1.15,marginBottom:20,letterSpacing:"-1px"}}>
            LFD Bible Display
          </h1>

          <p style={{color:"rgba(255,255,255,0.75)",fontSize:"clamp(16px,2vw,20px)",lineHeight:1.7,maxWidth:600,margin:"0 auto 36px"}}>
            Projetez vos versets bibliques sur TV ou projecteur. Simple, rapide, puissant. Con&#231;u pour les &#233;glises et minist&#232;res.
          </p>

          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            
              href="#download"
              style={{background:"#C0001A",color:"#fff",padding:"14px 32px",borderRadius:8,fontSize:16,fontWeight:800,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:8,boxShadow:"0 4px 20px rgba(192,0,26,0.4)"}}
            >
              T&#233;l&#233;charger gratuitement
            </a>

            
              href="/help"
              style={{background:"rgba(255,255,255,0.1)",color:"#fff",padding:"14px 32px",borderRadius:8,fontSize:16,fontWeight:700,textDecoration:"none",border:"1px solid rgba(255,255,255,0.2)"}}
            >
              Voir les tutoriels
            </a>
          </div>
        </div>
      </section>

      <section style={{padding:"80px 20px",background:"#f8f9fc"}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <h2 style={{textAlign:"center",fontSize:32,fontWeight:800,color:"#0d2444",marginBottom:12}}>
            Tout ce dont vous avez besoin
          </h2>

          <p style={{textAlign:"center",color:"#666",marginBottom:48,fontSize:16}}>
            Une solution compl&#232;te pour vos cultes et r&#233;unions
          </p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20}}>
            {[
              {icon:"📖",title:"Plusieurs Bibles",desc:"Importez autant de traductions que vous voulez."},
              {icon:"🎨",title:"Styles personnalis&#233;s",desc:"Changez les couleurs en temps r&#233;el."},
              {icon:"📷",title:"Camera en direct",desc:"Projetez votre camera sur la TV."},
              {icon:"🖼",title:"Images & Annonces",desc:"Projetez des images facilement."},
              {icon:"🔍",title:"Recherche rapide",desc:"Trouvez un verset rapidement."},
              {icon:"✦",title:"Assistant IA",desc:"IA int&#233;gr&#233;e pour expliquer les versets."},
            ].map(f => (
              <div key={f.title} style={{background:"#fff",borderRadius:12,padding:28,boxShadow:"0 2px 12px rgba(13,36,68,0.06)",border:"1px solid #e8ecf5"}}>
                <div style={{fontSize:36,marginBottom:14}}>{f.icon}</div>
                <h3 style={{fontSize:18,fontWeight:700,color:"#0d2444",marginBottom:8}}>{f.title}</h3>
                <p style={{color:"#666",fontSize:14,lineHeight:1.7}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="download" style={{padding:"80px 20px",background:"#fff"}}>
        <div style={{maxWidth:700,margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontSize:36,fontWeight:800,color:"#0d2444",marginBottom:12}}>
            T&#233;l&#233;charger LFD Bible Display
          </h2>

          <p style={{color:"#666",fontSize:16,marginBottom:40,lineHeight:1.7}}>
            Gratuit pour toujours. Compatible Windows 10/11.
          </p>

          <div style={{background:"linear-gradient(135deg,#1e3d7b,#0d2444)",borderRadius:16,padding:40,marginBottom:24}}>
            <div style={{fontSize:64,marginBottom:16}}>&#10022;</div>

            <div style={{color:"#fff",fontSize:22,fontWeight:800,marginBottom:8}}>
              LFD Bible Display v1.0.0
            </div>

            <div style={{color:"rgba(255,255,255,0.6)",fontSize:14,marginBottom:28}}>
              Windows 10/11 &#8226; 64-bit &#8226; ~120 MB
            </div>

            
              href={process.env.NEXT_PUBLIC_GOOGLE_DRIVE_LINK!}
              target="_blank"
              rel="noreferrer"
              style={{background:"#C0001A",color:"#fff",padding:"16px 40px",borderRadius:8,fontSize:18,fontWeight:800,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:10,boxShadow:"0 4px 20px rgba(192,0,26,0.4)"}}
            >
              T&#233;l&#233;charger maintenant
            </a>
          </div>
        </div>
      </section>

      <section id="support" style={{padding:"80px 20px",background:"#fff"}}>
        <div style={{maxWidth:600,margin:"0 auto",textAlign:"center"}}>
          <h2 style={{fontSize:32,fontWeight:800,color:"#0d2444",marginBottom:16}}>
            Soutenir le projet
          </h2>

          <p style={{color:"#666",fontSize:16,marginBottom:24,lineHeight:1.7}}>
            LFD Bible Display est 100% gratuit. Votre soutien nous aide &#224; maintenir et am&#233;liorer le logiciel.
          </p>

          <div style={{marginBottom:16}} className="feexpay-black-btn">
            <style>{`
              .feexpay-black-btn button {
                background-color: #000000 !important;
                color: #ffffff !important;
                font-weight: 700 !important;
                padding: 12px 32px !important;
                border-radius: 8px !important;
                font-size: 16px !important;
                border: none !important;
                cursor: pointer !important;
                transition: background-color 0.2s !important;
              }
              .feexpay-black-btn button:hover {
                background-color: #222222 !important;
              }
            `}</style>

            <FeexPayProvider>
              <FeexPayButton
                amount={1000}
                description="Soutien maintenance LFD Bible Display"
                token={process.env.NEXT_PUBLIC_FEEXPAY_TOKEN!}
                id={process.env.NEXT_PUBLIC_FEEXPAY_ID!}
                customId={Date.now().toString()}
                mode="LIVE"
                currency="XOF"
                case=""
                callback={(response) => { console.log(response) }}
                buttonText="Soutenir le logiciel"
              />
            </FeexPayProvider>
          </div>

          <p style={{color:"#999",fontSize:13}}>
            Votre soutien : 1000 FCFA (~1.50&#8364;). Modifiable sur la page de paiement.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  )
}