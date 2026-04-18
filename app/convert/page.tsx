'use client'

import { useState, useCallback } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const BIBLE_BOOKS = [
  {name:"Genese",short:"Gen",ch:50,t:"OT"},{name:"Exode",short:"Exo",ch:40,t:"OT"},
  {name:"Levitique",short:"Lev",ch:27,t:"OT"},{name:"Nombres",short:"Nom",ch:36,t:"OT"},
  {name:"Deuteronome",short:"Deu",ch:34,t:"OT"},{name:"Josue",short:"Jos",ch:24,t:"OT"},
  {name:"Juges",short:"Jug",ch:21,t:"OT"},{name:"Ruth",short:"Rut",ch:4,t:"OT"},
  {name:"1 Samuel",short:"1Sa",ch:31,t:"OT"},{name:"2 Samuel",short:"2Sa",ch:24,t:"OT"},
  {name:"1 Rois",short:"1Ro",ch:22,t:"OT"},{name:"2 Rois",short:"2Ro",ch:25,t:"OT"},
  {name:"1 Chroniques",short:"1Ch",ch:29,t:"OT"},{name:"2 Chroniques",short:"2Ch",ch:36,t:"OT"},
  {name:"Esdras",short:"Esd",ch:10,t:"OT"},{name:"Nehemie",short:"Neh",ch:13,t:"OT"},
  {name:"Esther",short:"Est",ch:10,t:"OT"},{name:"Job",short:"Job",ch:42,t:"OT"},
  {name:"Psaumes",short:"Psa",ch:150,t:"OT"},{name:"Proverbes",short:"Pro",ch:31,t:"OT"},
  {name:"Ecclesiaste",short:"Ecc",ch:12,t:"OT"},{name:"Cantique",short:"Can",ch:8,t:"OT"},
  {name:"Esaie",short:"Esa",ch:66,t:"OT"},{name:"Jeremie",short:"Jer",ch:52,t:"OT"},
  {name:"Lamentations",short:"Lam",ch:5,t:"OT"},{name:"Ezechiel",short:"Eze",ch:48,t:"OT"},
  {name:"Daniel",short:"Dan",ch:12,t:"OT"},{name:"Osee",short:"Ose",ch:14,t:"OT"},
  {name:"Joel",short:"Joe",ch:3,t:"OT"},{name:"Amos",short:"Amo",ch:9,t:"OT"},
  {name:"Abdias",short:"Abd",ch:1,t:"OT"},{name:"Jonas",short:"Jon",ch:4,t:"OT"},
  {name:"Michee",short:"Mic",ch:7,t:"OT"},{name:"Nahum",short:"Nah",ch:3,t:"OT"},
  {name:"Habacuc",short:"Hab",ch:3,t:"OT"},{name:"Sophonie",short:"Sop",ch:3,t:"OT"},
  {name:"Aggee",short:"Agg",ch:2,t:"OT"},{name:"Zacharie",short:"Zac",ch:14,t:"OT"},
  {name:"Malachie",short:"Mal",ch:4,t:"OT"},
  {name:"Matthieu",short:"Mat",ch:28,t:"NT"},{name:"Marc",short:"Mar",ch:16,t:"NT"},
  {name:"Luc",short:"Luc",ch:24,t:"NT"},{name:"Jean",short:"Jea",ch:21,t:"NT"},
  {name:"Actes",short:"Act",ch:28,t:"NT"},{name:"Romains",short:"Rom",ch:16,t:"NT"},
  {name:"1 Corinthiens",short:"1Co",ch:16,t:"NT"},{name:"2 Corinthiens",short:"2Co",ch:13,t:"NT"},
  {name:"Galates",short:"Gal",ch:6,t:"NT"},{name:"Ephesiens",short:"Eph",ch:6,t:"NT"},
  {name:"Philippiens",short:"Phi",ch:4,t:"NT"},{name:"Colossiens",short:"Col",ch:4,t:"NT"},
  {name:"1 Thessaloniciens",short:"1Th",ch:5,t:"NT"},{name:"2 Thessaloniciens",short:"2Th",ch:3,t:"NT"},
  {name:"1 Timothee",short:"1Ti",ch:6,t:"NT"},{name:"2 Timothee",short:"2Ti",ch:4,t:"NT"},
  {name:"Tite",short:"Tit",ch:3,t:"NT"},{name:"Philemon",short:"Phm",ch:1,t:"NT"},
  {name:"Hebreux",short:"Heb",ch:13,t:"NT"},{name:"Jacques",short:"Jac",ch:5,t:"NT"},
  {name:"1 Pierre",short:"1Pi",ch:5,t:"NT"},{name:"2 Pierre",short:"2Pi",ch:3,t:"NT"},
  {name:"1 Jean",short:"1Je",ch:5,t:"NT"},{name:"2 Jean",short:"2Je",ch:1,t:"NT"},
  {name:"3 Jean",short:"3Je",ch:1,t:"NT"},{name:"Jude",short:"Jud",ch:1,t:"NT"},
  {name:"Apocalypse",short:"Apo",ch:22,t:"NT"}
]

const BOOK_MAP: Record<string,{name:string,short:string,t:string}> = {
  gen:{name:"Genese",short:"Gen",t:"OT"},exo:{name:"Exode",short:"Exo",t:"OT"},
  lev:{name:"Levitique",short:"Lev",t:"OT"},num:{name:"Nombres",short:"Nom",t:"OT"},
  deu:{name:"Deuteronome",short:"Deu",t:"OT"},jos:{name:"Josue",short:"Jos",t:"OT"},
  jdg:{name:"Juges",short:"Jug",t:"OT"},jug:{name:"Juges",short:"Jug",t:"OT"},
  rut:{name:"Ruth",short:"Rut",t:"OT"},"1sa":{name:"1 Samuel",short:"1Sa",t:"OT"},
  "2sa":{name:"2 Samuel",short:"2Sa",t:"OT"},"1ki":{name:"1 Rois",short:"1Ro",t:"OT"},
  "2ki":{name:"2 Rois",short:"2Ro",t:"OT"},psa:{name:"Psaumes",short:"Psa",t:"OT"},
  pro:{name:"Proverbes",short:"Pro",t:"OT"},isa:{name:"Esaie",short:"Esa",t:"OT"},
  jer:{name:"Jeremie",short:"Jer",t:"OT"},eze:{name:"Ezechiel",short:"Eze",t:"OT"},
  dan:{name:"Daniel",short:"Dan",t:"OT"},mat:{name:"Matthieu",short:"Mat",t:"NT"},
  mrk:{name:"Marc",short:"Mar",t:"NT"},mar:{name:"Marc",short:"Mar",t:"NT"},
  luk:{name:"Luc",short:"Luc",t:"NT"},joh:{name:"Jean",short:"Jea",t:"NT"},
  act:{name:"Actes",short:"Act",t:"NT"},rom:{name:"Romains",short:"Rom",t:"NT"},
  rev:{name:"Apocalypse",short:"Apo",t:"NT"},
  genesis:{name:"Genese",short:"Gen",t:"OT"},exodus:{name:"Exode",short:"Exo",t:"OT"},
  psalms:{name:"Psaumes",short:"Psa",t:"OT"},matthew:{name:"Matthieu",short:"Mat",t:"NT"},
  mark:{name:"Marc",short:"Mar",t:"NT"},luke:{name:"Luc",short:"Luc",t:"NT"},
  john:{name:"Jean",short:"Jea",t:"NT"},acts:{name:"Actes",short:"Act",t:"NT"},
  romans:{name:"Romains",short:"Rom",t:"NT"},revelation:{name:"Apocalypse",short:"Apo",t:"NT"},
  genese:{name:"Genese",short:"Gen",t:"OT"},exode:{name:"Exode",short:"Exo",t:"OT"},
  psaumes:{name:"Psaumes",short:"Psa",t:"OT"},matthieu:{name:"Matthieu",short:"Mat",t:"NT"},
  marc:{name:"Marc",short:"Mar",t:"NT"},luc:{name:"Luc",short:"Luc",t:"NT"},
  jean:{name:"Jean",short:"Jea",t:"NT"},actes:{name:"Actes",short:"Act",t:"NT"},
  romains:{name:"Romains",short:"Rom",t:"NT"},apocalypse:{name:"Apocalypse",short:"Apo",t:"NT"},
}

function resolveBook(key: string) {
  return BOOK_MAP[key.toLowerCase().trim()] || {name:key.trim(),short:key.trim().substring(0,3).toUpperCase(),t:"OT"}
}

function convertJSON(data: any, name: string, fname: string): any {
  const id = "bible_" + fname.replace(/[^a-z0-9]/gi,"_") + "_" + Date.now()
  if (data.books && Array.isArray(data.books)) { if (name) data.name = name; return data }
  const extractTexts = (obj: any): string[] => {
    if (typeof obj === "string" && obj.trim().length > 10) return [obj.trim()]
    if (Array.isArray(obj)) return obj.flatMap((i:any) => extractTexts(i))
    if (typeof obj === "object" && obj !== null) return Object.values(obj).flatMap((v:any) => extractTexts(v))
    return []
  }
  const allTexts = extractTexts(data)
  if (allTexts.length === 0) return null
  const books: any[] = []
  let textIdx = 0, bookOrder = 1
  for (const b of BIBLE_BOOKS) {
    if (textIdx >= allTexts.length) break
    const chapters: Record<string,string[]> = {}
    for (let c = 1; c <= b.ch && textIdx < allTexts.length; c++) {
      const text = allTexts[textIdx]
      const verses = text.split(/(?<=[.!?;])\s+(?=[A-Z\u00C0-\u00DC])/).filter((s:string) => s.trim().length > 5)
      chapters[String(c)] = verses.length > 1 ? verses : [text]
      textIdx++
    }
    if (Object.keys(chapters).length > 0) books.push({name:b.name,shortName:b.short,testament:b.t,order:bookOrder++,chapters})
  }
  return {id, name:name||fname, language:"fr", books}
}

function convertTXT(text: string, name: string, fname: string): any {
  const id = "bible_" + fname.replace(/[^a-z0-9]/gi,"_") + "_" + Date.now()
  const lines = text.split(/\r?\n/)
  const booksMap = new Map<string,{name:string,short:string,t:string,chapters:Record<string,string[]>}>()
  let currentBook = "", currentCh = "1"
  const addVerse = (bookKey:string, ch:string, v:number, txt:string) => {
    const def = resolveBook(bookKey)
    if (!booksMap.has(def.name)) booksMap.set(def.name, {...def, chapters:{}})
    const book = booksMap.get(def.name)!
    if (!book.chapters[ch]) book.chapters[ch] = []
    book.chapters[ch][v-1] = txt
  }
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    const mdBook = t.match(/^#{1,3}\s+(.+)$/)
    if (mdBook) { currentBook = mdBook[1].trim(); currentCh = "1"; continue }
    const mdVerse = t.match(/^\[(\d+):(\d+)\]\s+(.+)$/)
    if (mdVerse && currentBook) { addVerse(currentBook, mdVerse[1], parseInt(mdVerse[2]), mdVerse[3]); continue }
    const stdVerse = t.match(/^([A-Z1-9][A-Z0-9]{1,4})\s+(\d+):(\d+)\s+(.+)$/)
    if (stdVerse) { addVerse(stdVerse[1], stdVerse[2], parseInt(stdVerse[3]), stdVerse[4]); continue }
    const pipeVerse = t.match(/^([^|]+)\|(\d+)\|(\d+)\|(.+)$/)
    if (pipeVerse) { addVerse(pipeVerse[1], pipeVerse[2], parseInt(pipeVerse[3]), pipeVerse[4]); continue }
    const longVerse = t.match(/^(\d?\s?[A-Za-z\u00C0-\u024F]+(?:\s[A-Za-z\u00C0-\u024F]+)?)\s+(\d+):(\d+)\s+(.+)$/)
    if (longVerse) { addVerse(longVerse[1].trim(), longVerse[2], parseInt(longVerse[3]), longVerse[4]); continue }
    const chVerse = t.match(/^(\d+):(\d+)\s+(.+)$/)
    if (chVerse && currentBook) { addVerse(currentBook, chVerse[1], parseInt(chVerse[2]), chVerse[3]); continue }
  }
  if (booksMap.size === 0) return null
  const books = Array.from(booksMap.values()).map((b,i) => ({
    name:b.name, shortName:b.short, testament:b.t, order:i+1,
    chapters:Object.fromEntries(Object.entries(b.chapters).map(([ch,vs]) => [ch,(vs as string[]).filter(Boolean)]))
  }))
  return {id, name:name||fname, language:"fr", books}
}

function convertXML(text: string, name: string, fname: string): any {
  const id = "bible_" + fname.replace(/[^a-z0-9]/gi,"_") + "_" + Date.now()
  const isZefania = text.includes("<XMLBIBLE") || text.includes("<BIBLEBOOK")
  const isOSIS = text.includes("<osis") || text.includes('type="book"') || text.includes("<verse osisID")

  if (isZefania) {
    const biblenameMatch = text.match(/biblename="([^"]+)"/)
    const bibleName2 = name || (biblenameMatch ? biblenameMatch[1] : fname)
    const books: any[] = []
    const allBookMatches = [...text.matchAll(/<BIBLEBOOK([^>]*)>([\s\S]*?)<\/BIBLEBOOK>/g)]
    for (const bm of allBookMatches) {
      const attrs = bm[1], bookContent = bm[2]
      const bnameMatch = attrs.match(/bname="([^"]*)"/)
      const bnumberMatch = attrs.match(/bnumber="([^"]*)"/)
      const bookName = bnameMatch ? bnameMatch[1] : "Livre " + (bnumberMatch ? bnumberMatch[1] : books.length+1)
      const bookNum = bnumberMatch ? parseInt(bnumberMatch[1]) : books.length+1
      const chapters: Record<string,string[]> = {}
      const chapterMatches = [...bookContent.matchAll(/<CHAPTER[^>]*cnumber="([^"]*)"[^>]*>([\s\S]*?)<\/CHAPTER>/g)]
      for (const cm of chapterMatches) {
        const verseMatches = [...cm[2].matchAll(/<VERS[^>]*vnumber="([^"]*)"[^>]*>([\s\S]*?)<\/VERS>/g)]
        const verses: string[] = []
        for (const vm of verseMatches) {
          const vText = vm[2].replace(/<[^>]+>/g,"").trim()
          if (vText) verses[parseInt(vm[1])-1] = vText
        }
        if (verses.length > 0) chapters[cm[1]] = verses.filter(Boolean)
      }
      if (Object.keys(chapters).length > 0)
        books.push({name:bookName,shortName:bookName.substring(0,3).toUpperCase(),testament:bookNum<=39?"OT":"NT",order:books.length+1,chapters})
    }
    return books.length > 0 ? {id, name:bibleName2, language:"fr", books} : null
  }

  if (isOSIS) {
    const titleMatch = text.match(/<title[^>]*>([^<]+)<\/title>/)
    const bibleName2 = name || (titleMatch ? titleMatch[1].trim() : fname)
    const verseMap: Record<string,Record<string,string[]>> = {}
    const verseMatches = [...text.matchAll(/<verse[^>]*osisID="([^"]*)"[^>]*>([\s\S]*?)<\/verse>/g)]
    for (const vm of verseMatches) {
      const ref = vm[1].split(" ")[0].split(".")
      if (ref.length < 3) continue
      const [book, ch, v] = ref
      const vText = vm[2].replace(/<[^>]+>/g,"").trim()
      if (!verseMap[book]) verseMap[book] = {}
      if (!verseMap[book][ch]) verseMap[book][ch] = []
      verseMap[book][ch][parseInt(v)-1] = vText
    }
    if (Object.keys(verseMap).length === 0) {
      const milestones = [...text.matchAll(/<verse[^>]*sID="([^"]*)"[^/]*/g)]
      for (const mm of milestones) {
        const ref = mm[1].split(" ")[0].split(".")
        if (ref.length < 3) continue
        const [book, ch, v] = ref
        const after = text.substring(text.indexOf(mm[0]) + mm[0].length + 1)
        const endTag = after.search(/<verse[^>]*eID/)
        const vText = after.substring(0, endTag > 0 ? endTag : 300).replace(/<[^>]+>/g,"").trim()
        if (!verseMap[book]) verseMap[book] = {}
        if (!verseMap[book][ch]) verseMap[book][ch] = []
        verseMap[book][ch][parseInt(v)-1] = vText
      }
    }
    const books = Object.entries(verseMap).map(([osisId, chapters], i) => ({
      name:osisId, shortName:osisId.substring(0,3).toUpperCase(), testament:i<39?"OT":"NT", order:i+1,
      chapters:Object.fromEntries(Object.entries(chapters).map(([ch,vs]) => [ch,(vs as string[]).filter(Boolean)]))
    }))
    return books.length > 0 ? {id, name:bibleName2, language:"fr", books} : null
  }
  return null
}

function countStats(data: any) {
  const books = data.books?.length || 0
  let chapters = 0, verses = 0
  for (const b of (data.books || [])) {
    const chs = Object.values(b.chapters || {})
    chapters += chs.length
    for (const vs of chs) verses += (vs as string[]).length
  }
  return {books, chapters, verses}
}

export default function ConvertPage() {
  const [result, setResult] = useState("")
  const [error, setError] = useState("")
  const [bibleName, setBibleName] = useState("")
  const [fileName, setFileName] = useState("")
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<{books:number,chapters:number,verses:number}|null>(null)
  const [dragOver, setDragOver] = useState(false)

  const processFile = useCallback((file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase() || ''
    const fname = file.name.replace(/\.[^.]+$/, "")
    setFileName(fname)
    if (!bibleName) setBibleName(fname)
    setError(""); setResult(""); setStats(null); setLoading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const text = ev.target?.result as string
        const name = bibleName || fname
        let converted: any = null
        if (ext === 'json') {
          converted = convertJSON(JSON.parse(text), name, fname)
        } else if (ext === 'txt') {
          converted = convertTXT(text, name, fname)
        } else if (['xml','osis','zef'].includes(ext)) {
          converted = convertXML(text, name, fname)
        } else {
          setError("Format non supporte. Utilisez JSON, TXT ou XML."); setLoading(false); return
        }
        if (!converted) { setError("Impossible de convertir ce fichier."); setLoading(false); return }
        const resultStr = JSON.stringify(converted, null, 2)
        setResult(resultStr)
        setStats(countStats(converted))
        setLoading(false)
      } catch(e) { setError("Erreur lors de la conversion: " + (e as any).message); setLoading(false) }
    }
    reader.readAsText(file)
  }, [bibleName])

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
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
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:18,marginBottom:24}}>Convertissez vos fichiers Bible au format LFD Bible Display</p>
        <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
          {["JSON","TXT","XML Zefania","OSIS XML"].map(f => (
            <span key={f} style={{background:"rgba(255,255,255,0.15)",color:"#fff",padding:"6px 14px",borderRadius:20,fontSize:13,fontWeight:600}}>{f}</span>
          ))}
        </div>
      </section>

      <section style={{padding:"60px 20px",background:"#f8f9fc",minHeight:"60vh"}}>
        <div style={{maxWidth:800,margin:"0 auto"}}>
          <div style={{background:"#fff",borderRadius:14,padding:32,boxShadow:"0 4px 20px rgba(13,36,68,0.08)",border:"1px solid #e2e6f0",marginBottom:24}}>
            <div style={{marginBottom:20}}>
              <label style={{display:"block",fontSize:14,fontWeight:600,color:"#555",marginBottom:6}}>Nom de la Bible (optionnel)</label>
              <input value={bibleName} onChange={e => setBibleName(e.target.value)}
                placeholder="Ex: Louis Segond 1910, NEG 1979, Parole de Vie..."
                style={{width:"100%",padding:"10px 14px",border:"2px solid #e2e6f0",borderRadius:7,fontSize:15,fontFamily:"inherit",outline:"none"}} />
            </div>

            <label
              onDragOver={e => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",
                border: dragOver ? "2px solid #C0001A" : "2px dashed #1a3a6b",
                borderRadius:10,padding:"40px 20px",cursor:"pointer",
                background: dragOver ? "#fff0f0" : "#f0f4ff",gap:12,transition:"all 0.2s"}}>
              <div style={{fontSize:48}}>📂</div>
              <div style={{fontSize:16,fontWeight:700,color:"#1a3a6b"}}>
                {dragOver ? "Deposez le fichier ici" : "Cliquez ou glissez votre fichier"}
              </div>
              <div style={{fontSize:13,color:"#888"}}>Formats supportes : .json · .txt · .xml · .osis</div>
              <input type="file" accept=".json,.txt,.xml,.osis,.zef" onChange={handleFile} style={{display:"none"}} />
            </label>

            {loading && (
              <div style={{textAlign:"center",padding:24,color:"#1a3a6b",fontWeight:700}}>
                <div style={{fontSize:32,marginBottom:8}}>⏳</div>
                Conversion en cours...
              </div>
            )}
            {error && (
              <div style={{marginTop:16,padding:14,background:"#fff5f5",border:"1px solid #fcc",borderRadius:8,color:"#C0001A",fontSize:14,display:"flex",gap:8,alignItems:"center"}}>
                <span>⚠️</span> {error}
              </div>
            )}
          </div>

          {result && stats && (
            <div style={{background:"#fff",borderRadius:14,padding:32,boxShadow:"0 4px 20px rgba(13,36,68,0.08)",border:"1px solid #e2e6f0"}}>
              <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20,flexWrap:"wrap",gap:12}}>
                <div>
                  <h2 style={{fontSize:20,fontWeight:800,color:"#0d2444",marginBottom:4}}>✅ Conversion reussie !</h2>
                  <div style={{fontSize:13,color:"#666"}}>{fileName}</div>
                </div>
                <button onClick={download} style={{background:"#C0001A",color:"#fff",padding:"12px 28px",border:"none",borderRadius:8,fontSize:15,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",gap:8}}>
                  ⬇ Telecharger le fichier LFD
                </button>
              </div>

              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}}>
                {[
                  {label:"Livres",value:stats.books,icon:"📚"},
                  {label:"Chapitres",value:stats.chapters,icon:"📖"},
                  {label:"Versets",value:stats.verses.toLocaleString(),icon:"✍️"},
                ].map(s => (
                  <div key={s.label} style={{background:"#f0f4ff",borderRadius:10,padding:"16px",textAlign:"center"}}>
                    <div style={{fontSize:24,marginBottom:4}}>{s.icon}</div>
                    <div style={{fontSize:22,fontWeight:800,color:"#0d2444"}}>{s.value}</div>
                    <div style={{fontSize:13,color:"#666"}}>{s.label}</div>
                  </div>
                ))}
              </div>

              <pre style={{background:"#f8f9fc",border:"1px solid #e2e6f0",borderRadius:8,padding:16,fontSize:12,overflow:"auto",maxHeight:250,color:"#333",lineHeight:1.6}}>
                {result.substring(0,800)}...
              </pre>
            </div>
          )}

          <div style={{background:"#fff",borderRadius:14,padding:28,marginTop:24,border:"1px solid #e2e6f0"}}>
            <h3 style={{fontSize:16,fontWeight:800,color:"#0d2444",marginBottom:16}}>Formats supportes</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:10}}>
              {[
                {fmt:"JSON LFD natif",desc:'{"books":[...]}',icon:"🟢"},
                {fmt:"JSON quelconque",desc:"Tout format JSON",icon:"🔵"},
                {fmt:"TXT standard",desc:"GEN 1:1 texte",icon:"🟡"},
                {fmt:"TXT markdown",desc:"### Livre + [1:1]",icon:"🟡"},
                {fmt:"XML Zefania",desc:"<BIBLEBOOK><VERS>",icon:"🟠"},
                {fmt:"OSIS XML",desc:'<verse osisID="">',icon:"🟠"},
              ].map(f => (
                <div key={f.fmt} style={{background:"#f8f9fc",borderRadius:8,padding:12,border:"1px solid #e8ecf5"}}>
                  <div style={{fontSize:14,fontWeight:700,color:"#1a3a6b",marginBottom:4}}>{f.icon} {f.fmt}</div>
                  <code style={{fontSize:11,color:"#888"}}>{f.desc}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
