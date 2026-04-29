import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_CONFIG = {
  total: 139,
  folder: 'https://farm-minerals.b-cdn.net/frames/tab', // Ajuste para sua pasta local se necessário
  prefix: 'frame_',
  extension: 'webp',
}

export default function Capsule() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const bgLayerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const section = sectionRef.current
    const bgLayer = bgLayerRef.current
    if (!canvas || !section || !bgLayer) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function setCanvasSize() {
      if (!canvas || !ctx) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.scale(dpr, dpr)
    }
    setCanvasSize()

    const images: (HTMLImageElement | undefined)[] = []
    let loaded = 0
    const total = FRAME_CONFIG.total
    const frameObj = { frame: 0 }

    function drawFrame(i: number) {
      const img = images[i]
      if (!img || !ctx || !canvas) return
      const dpr = window.devicePixelRatio || 1
      const cw = canvas.width / dpr
      const ch = canvas.height / dpr
      const iw = img.width
      const ih = img.height
      const scale = Math.max(cw / iw, ch / ih) // Efeito Cover perfeito
      const x = cw / 2 - (iw * scale) / 2
      const y = ch / 2 - (ih * scale) / 2
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, x, y, iw * scale, ih * scale)
    }

    const onResize = () => {
      setCanvasSize()
      drawFrame(Math.round(frameObj.frame))
    }
    window.addEventListener('resize', onResize)

    function startScroll() {
      drawFrame(0)

      // Timeline Única (Controla o Canvas e o Pinning)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: bgLayer, // Pina apenas o fundo absoluto
          pinSpacing: false, // O conteúdo dita a altura
        },
      })

      // Animação dos Frames
      tl.to(frameObj, {
        frame: total - 1,
        ease: 'none',
        onUpdate: () => drawFrame(Math.round(frameObj.frame)),
      })

      // Efeito de Fade nos Textos de Storytelling
      gsap.utils.toArray('.story-fade').forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: el,
              start: 'top 70%',
              end: 'top 30%',
              scrub: true
            }
          }
        )
      })
    }

    // Carregamento de Imagens
    canvas.style.opacity = '0'
    for (let i = 0; i < total; i++) {
      const img = new Image()
      const n = String(i + 1).padStart(4, '0') // Ex: frame_0001.webp
      img.src = `${FRAME_CONFIG.folder}/${FRAME_CONFIG.prefix}${n}.${FRAME_CONFIG.extension}`
      img.onload = () => {
        images[i] = img
        loaded++
        if (loaded === total) {
          gsap.to(canvas, { opacity: 1, duration: 1 })
          startScroll()
        }
      }
    }

    return () => {
      window.removeEventListener('resize', onResize)
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="capsule-native relative w-full bg-[#0A0A0A] overflow-hidden">

      {/* ── LAYER 1: BACKGROUND (Canvas Pínado pelo GSAP) ── */}
      <div ref={bgLayerRef} className="capsule-bg-layer absolute top-0 left-0 w-full h-screen z-0 pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full object-cover" id="capsule-canvas" />
        <div className="absolute inset-0 bg-[#0A0A0A]/40 z-10" /> {/* Overlay de contraste */}
      </div>

      {/* ── LAYER 2: STORYTELLING (Em Fluxo, define a altura do scroll) ── */}
      <div className="capsule-story-layer relative z-20 w-full">
        <div className="h-[30vh]"></div> {/* Espaço inicial */}

        {/* Bloco 1: Esquerda */}
        <div className="story-fade min-h-screen flex items-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-tight">
              O quanto você poderia transformar — <span className="text-[#D4A574]">se nada fosse desperdiçado?</span>
            </h2>
          </div>
        </div>

        {/* Bloco 2: Direita */}
        <div className="story-fade min-h-screen flex items-center justify-end px-6 md:px-16 lg:px-24 max-w-7xl mx-auto text-left md:text-right">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-[#F5F0E8] leading-tight mb-8">
              Encontramos um <br className="hidden md:block" />caminho melhor
            </h2>
            <p className="text-base md:text-lg text-[#F5F0E8]/70 uppercase tracking-widest leading-relaxed mb-10">
              Conheça os protocolos Sticker. Tecnologia de ponta que redefine os resultados em estética corporal.
            </p>
            <a href="https://wa.me/5534992360120" className="inline-flex items-center gap-4 px-8 py-4 border border-[#D4A574]/30 bg-white/5 backdrop-blur-md text-[#F5F0E8] uppercase tracking-tighter hover:bg-[#D4A574]/15 transition-all duration-300">
              <span>Saiba mais</span>
              <div className="w-2 h-2 rounded-full bg-[#D4A574]" />
            </a>
          </div>
        </div>

        <div className="h-[20vh]"></div> {/* Espaço antes do Reveal */}
      </div>

      {/* ── LAYER 3: REVEAL (Fundo Sólido #0A0A0A, Cobre o Canvas) ── */}
      <div className="capsule-reveal-layer relative z-30 bg-[#0A0A0A] w-full pt-32 pb-32 border-t border-[#D4A574]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">

          {/* SVG "Meet" - Contido e Responsivo */}
          <div className="mb-32 flex justify-center w-full">
            <img
              src="https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/69c132c2acc4342bbdc24ecc_meet.svg"
              alt="Meet Sticker"
              className="w-full max-w-[700px] h-auto block"
            />
          </div>

          {/* Cards de Benefícios (Grid 3 Colunas) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            {[
              { title: 'CrioEndolift', desc: 'Laser de alta potência com retração de pele simultânea. Resultados comparáveis à cirurgia sem o bisturi.' },
              { title: 'Ultra MD — FDA', desc: 'Único certificado internacional de eficácia. Exclusividade Sticker em MG.' },
              { title: 'Sem efeito rebote', desc: 'Resultados rápidos, indolores e duradouros — sem comprometer sua rotina.' }
            ].map((card, i) => (
              <div key={i} className="p-10 bg-[#F5F0E8]/[0.02] border border-[#D4A574]/15 hover:border-[#D4A574]/40 transition-colors duration-300 group">
                <img src="https://cdn.prod.website-files.com/693293123c1384ae5e258a60/693293123c1384ae5e258aef_detail%20small.svg" className="w-6 opacity-40 mb-8 group-hover:opacity-100 transition-opacity" alt="" />
                <h3 className="text-2xl text-[#F5F0E8] mb-4 font-light">{card.title}</h3>
                <p className="text-sm text-[#D4A574] uppercase tracking-widest leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>

          {/* Steps de Processo (Grid 2x2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#D4A574]/15">
            {[
              { t: 'Sem equipamentos novos', d: 'Nossos protocolos se integram à sua rotina. Sem internação, sem pós-operatório longo.' },
              { t: 'Zero efeito rebote', d: 'Tecnologias que cortam o problema na origem — sem mascarar sintomas.' },
              { t: 'Resultados em 48h', d: 'Crioexposição 360° com resultados visíveis a partir de 48 horas da primeira sessão.' },
              { t: 'Acompanhamento total', d: 'Nutricional incluso nos principais procedimentos. Cuidado completo do início ao resultado.' }
            ].map((step, i) => (
              <div key={i} className={`p-10 md:p-14 border-b border-[#D4A574]/15 ${i % 2 === 0 ? 'md:border-r' : ''}`}>
                <h3 className="text-3xl text-[#F5F0E8] mb-4 font-light">{step.t}</h3>
                <p className="text-[#F5F0E8]/50 uppercase text-sm tracking-widest leading-relaxed">{step.d}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}