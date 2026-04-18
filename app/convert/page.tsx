'use client'

import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const BIBLE_BOOKS = [
  {name:"Genese",short:"Gen",ch:50,t:"OT"},{name:"Exode",short:"Exo",ch:40,t:"OT"},
  {name:"Levitique",short:"Lev",ch:27,t:"OT"},{name:"Nombres",short:"Nom",ch:36,t:"OT"},
  {name:"Deuteronome",short:"Deu",ch:34,t:"OT"},{name:"Josue",short:"Jos",ch:24,t:"OT"},
  {name:"Juges",short:"Jug",ch:21,t:"OT"},{name:"Ruth",short:"Rut",ch:4,t:"OT"},
  {name:"1 Samuel",short:"1Sa",ch:31,t:"OT"},{name:"2 Samuel",short:"2Sa",ch:24,t:"OT"},
  {name:"1 Rois",short:"1Ro",ch:22,t:"OT"},{name:"2 Rois",short:"2Ro",ch:25,t:"OT"},
  {name:"Psaumes",short:"Psa",ch:150,t:"OT"},{name:"Matthieu",short:"Mat",ch:28,t:"NT"},
  {name:"Marc",short:"Mar",ch:16,t:"NT"},{name:"Luc",short:"Luc",ch:24,t:"NT"},
  {name:"Jean",short:"Jea",ch:21,t:"NT"},{name:"Actes",short:"Act",ch:28,t:"NT"},
  {name:"Romains",short:"Rom",ch:16,t:"NT"},{name:"Apocalypse",short:"Apo",ch:22,t:"NT"}
]

export default function ConvertPage() {
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [bibleName, setBibleName] = useState("")
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)

  const convertToLFD = (data: any, name: string, fname: string): any => {
    const id = "bible_" + fname.replace(/[^a-z0-9]/gi, "_") + "_" + Date.now()
    if (data.books && Array.isArray(data.books)) { if (name) data.name = name; return data }
    if (Array.isArray(data) && data[0]?.c !== undefined) {
      const books: any[] = []
      let chapIdx = 0, bookOrder = 1
      for (const b of BIBLE_BOOKS) {
        if (chapIdx >= data.length) break
        const chapters: Record<string,string[]> = {}
        for (let c = 1; c <= b.ch && chapIdx < data.length; c++) {
          const text = data[chapIdx].c ?? ""
          const verses = text.split(/(?<=[.!?;])\s+(?=[A-Z])/).filter((s: string) => s.trim().length > 5)
          chapters[String(c)] = verses.length > 1 ? verses : [text]
          chapIdx++
        }
        books.push({name:b.name,shortName:b.short,testament:b.t,order:bookOrder++,chapters})
      }
      return {id,name:name||fname,language:"fr",books}
    }
    if (typeof data === "object" && !Array.isArray(data)) {
      const keys = Object.keys(data)
      if (keys.length > 0 && typeof data[keys[0]] === "object") {
        const books = keys.map((bookName: string, bi: number) => {
          const chapters: Record<string,string[]> = {}
          Object.entries(data[bookName]).forEach(([ch,chapData]: [string,any]) => {
            if (typeof chapData === "object" && !Array.isArray(chapData)) chapters[ch] = Object.values(chapData).map((v:any) => String(v))
            else if (typeof chapData === "string") chapters[ch] = [chapData]
            else if (Array.isArray(chapData)) chapters[ch] = chapData.map((v:any) => String(v))
          })
          return {name:bookName,shortName:bookName.substring(0,3).toUpperCase(),testament:bi<39?"OT":"NT",order:bi+1,chapters}
        })
        return {id,name:name||fname,language:"fr",books}
      }
    }
    if (Array.isArray(data) && data[0]?.text !== undefined) {
      const booksMap = new Map<string,any>()
      data.forEach((v:any) => {
        const bn = v.book ?? "Livre"
        if (!booksMap.has(bn)) booksMap.set(bn,{name:bn,chapters:{}})
        const book = booksMap.get(bn)
        const ch = String(v.chapter ?? 1)
        if (!book.chapters[ch]) book.chapters[ch] = []
        book.chapters[ch][parseInt(v.verse ?? 1)-1] = v.text ?? ""
      })
      const books = Array.from(booksMap.values()).map((b:any,i:number) => ({...b,shortName:b.name.substring(0,3).toUpperCase(),testament:i<39?"OT":"NT",order:i+1}))
      return {id,name:name||fname,language:"fr",books}
    }
    return null
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const fname = file.name.replace(/\.json$/i, "")
    setFileName(fname)
    if (!bibleName) setBibleName(fname)
    setError(""); setResult(""); setLoading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const raw = JSON.parse(ev.target?.result as string)
        const converted = convertToLFD(raw, bibleName || fname, fname)
        if (!converted) { setError("Format non reconnu."); setLoading(false); return }
        setResult(JSON.stringify(converted, null, 2))
        setLoading(false)
      } catch { setError("Fichier JSON invalide."); setLoading(false) }
    }
    reader.readAsText(file)
  }

  const download = () => {
    const blob = new Blob([result], {type:"application/json"})
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = (bibleName || fileName || "bible") + "_LFD.json"; a.click()
  }

  return (
    <main>
      <Navbar />
      <section style={{background:"linear-gradient(135deg,#1e3d7b,#0d2444)",padding:"60px 20px",textAlign:"center"}}>
        <h1 style={{color:"#fff",fontSize:40,fontWeight:900,marginBottom:12}}>Convertisseur de Bible</h1>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:18}}>Convertissez n importe quel fichier JSON au format LFD Bible Display</p>
      </section>
      <section style={{padding:"60px 20px",background:"#f8f9fc",minHeight:"60vh"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <div style={{background:"#fff",borderRadius:14,padding:32,boxShadow:"0 4px 20px rgba(13,36,68,0.08)",border:"1px solid #e2e6f0",marginBottom:24}}>
            <h2 style={{fontSize:20,fontWeight:800,color:"#0d2444",marginBottom:20}}>Importez votre fichier JSON</h2>
            <div style={{marginBottom:16}}>
              <label style={{display:"block",fontSize:14,fontWeight:600,color:"#555",marginBottom:6}}>Nom de la Bible</label>
              <input value={bibleName} onChange={e => setBibleName(e.target.value)}
                placeholder="Ex: Louis Segond 1910, NEG 1979..."
                style={{width:"100%",padding:"10px 14px",border:"2px solid #e2e6f0",borderRadius:7,fontSize:15,fontFamily:"inherit",outline:"none"}} />
            </div>
            <label style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",border:"2px dashed #1a3a6b",borderRadius:10,padding:"40px 20px",cursor:"pointer",background:"#f0f4ff",gap:12}}>
              <div style={{fontSize:48}}>📂</div>
              <div style={{fontSize:16,fontWeight:700,color:"#1a3a6b"}}>Cliquez pour choisir un fichier JSON</div>
              <div style={{fontSize:13,color:"#888"}}>Formats: LFD, tableau chapitres, versets, dictionnaire</div>
              <input type="file" accept=".json" onChange={handleFile} style={{display:"none"}} />
            </label>
            {loading && <div style={{textAlign:"center",padding:20,color:"#1a3a6b",fontWeight:700}}>Conversion en cours...</div>}
            {error && <div style={{marginTop:16,padding:12,background:"#fff5f5",border:"1px solid #fcc",borderRadius:7,color:"#C0001A",fontSize:14}}>{error}</div>}
          </div>
          {result && (
            <div style={{background:"#fff",borderRadius:14,padding:32,boxShadow:"0 4px 20px rgba(13,36,68,0.08)",border:"1px solid #e2e6f0"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
                <h2 style={{fontSize:20,fontWeight:800,color:"#0d2444"}}>Conversion reussie !</h2>
                <button onClick={download} style={{background:"#C0001A",color:"#fff",padding:"10px 24px",border:"none",borderRadius:7,fontSize:15,fontWeight:700,cursor:"pointer"}}>
                  Telecharger fichier LFD
                </button>
              </div>
              <div style={{fontSize:13,color:"#666",marginBottom:12}}>{JSON.parse(result).books?.length} livres convertis</div>
              <pre style={{background:"#f8f9fc",border:"1px solid #e2e6f0",borderRadius:7,padding:16,fontSize:12,overflow:"auto",maxHeight:300,color:"#333"}}>
                {result.substring(0,1000)}...
              </pre>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  )
}
