import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function HelpPage() {
  const tutos = [
    {
      num: "01",
      title: "Installer LFD Bible Display",
      steps: [
        "Telechargez le fichier .exe depuis la page d accueil",
        "Double-cliquez sur le fichier installe",
        "Suivez les instructions d installation",
        "Lancez le logiciel depuis le bureau"
      ]
    },
    {
      num: "02",
      title: "Importer une Bible",
      steps: [
        "Cliquez sur + Ajouter une Bible dans le panneau gauche",
        "Selectionnez votre fichier Bible (format JSON LFD, OSIS, USFM)",
        "Le logiciel convertit automatiquement le format",
        "La Bible apparait dans la liste et est prete a utiliser"
      ]
    },
    {
      num: "03",
      title: "Projeter un verset",
      steps: [
        "Selectionnez une Bible dans le panneau gauche",
        "Choisissez un livre puis un chapitre",
        "Cliquez sur un verset pour le selectionner",
        "Cliquez sur Projeter ou double-cliquez sur le verset"
      ]
    },
    {
      num: "04",
      title: "Personnaliser le style",
      steps: [
        "Cliquez sur l onglet Style dans le ruban",
        "Changez la couleur de fond et du texte",
        "Ajustez la taille et la police",
        "Utilisez les presets Noir, Rouge, Blanc, Nuit"
      ]
    },
    {
      num: "05",
      title: "Projeter une image",
      steps: [
        "Cliquez sur le bouton Image dans la barre d outils",
        "Selectionnez votre image (JPG, PNG, GIF, WebP)",
        "L image apparait dans la galerie et sur la TV",
        "Cliquez sur l image dans la galerie pour la reprojeter"
      ]
    },
    {
      num: "06",
      title: "Utiliser la camera",
      steps: [
        "Cliquez sur le bouton Camera dans la barre d outils",
        "Autorisez l acces a la camera",
        "Le flux camera s affiche sur la TV en qualite maximale",
        "Cliquez encore sur Camera pour arreter"
      ]
    },
    {
      num: "07",
      title: "Utiliser l assistant IA",
      steps: [
        "Cliquez sur + IA dans la barre d outils",
        "Configurez votre cle API Claude (console.anthropic.com)",
        "Posez vos questions bibliques directement",
        "L IA peut suggerer des versets et expliquer des passages"
      ]
    },
    {
      num: "08",
      title: "Raccourcis clavier",
      steps: [
        "F5 : Projeter / Ouvrir la projection",
        "F6 : Geler l ecran",
        "F7 : Ecran noir",
        "← → : Verset precedent / suivant"
      ]
    },
  ]

  return (
    <main>
      <Navbar />
      <section style={{background:"linear-gradient(135deg,#1e3d7b,#0d2444)",padding:"60px 20px",textAlign:"center"}}>
        <h1 style={{color:"#fff",fontSize:40,fontWeight:900,marginBottom:12}}>Aide & Tutoriels</h1>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:18}}>Tout ce que vous devez savoir pour utiliser LFD Bible Display</p>
      </section>

      <section style={{padding:"60px 20px",background:"#f8f9fc"}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(380px,1fr))",gap:20}}>
            {tutos.map(t => (
              <div key={t.num} style={{background:"#fff",borderRadius:12,padding:28,boxShadow:"0 2px 12px rgba(13,36,68,0.06)",border:"1px solid #e8ecf5"}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
                  <div style={{background:"linear-gradient(135deg,#1e3d7b,#0d2444)",color:"#fff",width:40,height:40,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,flexShrink:0}}>
                    {t.num}
                  </div>
                  <h3 style={{fontSize:17,fontWeight:700,color:"#0d2444"}}>{t.title}</h3>
                </div>
                <ol style={{paddingLeft:0,listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
                  {t.steps.map((step, i) => (
                    <li key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,color:"#444",lineHeight:1.6}}>
                      <span style={{background:"#eef3ff",color:"#1a3a6b",width:22,height:22,borderRadius:50,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0,marginTop:1}}>{i+1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>

          <div style={{background:"linear-gradient(135deg,#1e3d7b,#0d2444)",borderRadius:16,padding:40,marginTop:40,textAlign:"center"}}>
            <h3 style={{color:"#fff",fontSize:22,fontWeight:800,marginBottom:12}}>Besoin d aide supplementaire ?</h3>
            <p style={{color:"rgba(255,255,255,0.7)",fontSize:15,marginBottom:24}}>Notre equipe est disponible pour vous aider</p>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <a href="https://wa.me/2290143260596" target="_blank" rel="noreferrer"
                style={{background:"#25D366",color:"#fff",padding:"10px 20px",borderRadius:8,fontSize:14,fontWeight:700,textDecoration:"none"}}>
                WhatsApp
              </a>
              <a href="https://t.me/+2290162758703" target="_blank" rel="noreferrer"
                style={{background:"#229ED9",color:"#fff",padding:"10px 20px",borderRadius:8,fontSize:14,fontWeight:700,textDecoration:"none"}}>
                Telegram
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}