'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FRAME_CONFIG = {
  total: 139,
  folder: 'https://farm-minerals.b-cdn.net/frames/tab',
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
      const scale = Math.max(cw / iw, ch / ih)
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

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          pin: bgLayer,
          pinSpacing: false,
        },
      }).to(frameObj, {
        frame: total - 1,
        ease: 'none',
        onUpdate: () => drawFrame(Math.round(frameObj.frame)),
      })

      gsap.utils.toArray('.story-fade').forEach((el: any) => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1,
            scrollTrigger: { trigger: el, start: 'top 70%', end: 'top 30%', scrub: true },
          }
        )
      })
    }

    canvas.style.opacity = '0'
    for (let i = 0; i < total; i++) {
      const img = new Image()
      const n = String(i + 1).padStart(4, '0')
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
    <section
      ref={sectionRef}
      className="relative z-[3] bg-[#4A7C8E] h-[250em] -mt-[10em] max-[991px]:h-[300em] max-[479px]:bg-[#3A3A3A] max-[479px]:mt-0"
    >
      <div className="h-full relative">
        <div ref={bgLayerRef} className="sticky top-0 z-[1] w-full">
          {/* Canvas Wrapper - Visible on desktop, specifically padding on mobile */}
          <div className="absolute inset-0 w-full h-screen flex justify-center items-center max-[479px]:pt-[20em]">
            <canvas
              ref={canvasRef}
              id="capsule-canvas"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Background Layer */}
          <div className="absolute inset-0 z-0 h-screen bg-[#4A7C8E] max-[479px]:h-[100dvh]" />

          {/* Start Text */}
          <div className="relative z-[2] h-screen pt-[5em] pr-[1.88em] pl-[1.88em] flex flex-col justify-between items-start max-[991px]:pt-[3em] max-[479px]:pt-[4.63em] max-[479px]:pl-[1em]">
            <div className="relative z-[1] w-[35.4em] max-[991px]:sticky max-[991px]:top-[7em] max-[479px]:w-full max-[479px]:top-[5em]">
              <h2 className="block m-0 font-[Aeonik,Arial,sans-serif] text-[3.6em] font-medium leading-[93%] tracking-[-0.03em] text-[#D4A574] max-[479px]:text-[2.4em]">
                O quanto você poderia transformar — se nada fosse desperdiçado?
              </h2>
            </div>

            <img
              src="/images/capsule.avif"
              loading="lazy"
              alt=""
              className="relative z-[1] self-center w-[31.06em] h-[31.06em] object-contain max-[479px]:w-[20em] max-[479px]:h-[20em]"
              style={{ mixBlendMode: 'lighten' }}
            />
          </div>
        </div>

        {/* Second Block - Desktop */}
        <div className="story-fade flex justify-end items-start w-full px-[1.88em] pt-[12.5em] max-[991px]:hidden">
          <div className="flex flex-col items-start gap-y-[2.5em] w-[21.1em]">
            <div className="flex flex-col gap-y-[1.5em]">
              <h2 className="block m-0 font-[Aeonik,Arial,sans-serif] text-[3.6em] font-medium leading-[93%] tracking-[-0.03em] text-[#D4A574]">
                Encontramos um caminho melhor
              </h2>
              <p className="m-0 font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] uppercase text-[#F5F0E8]/70">
                Conheça os protocolos Sticker. Tecnologia de ponta que redefine os resultados em estética corporal.
              </p>
            </div>

            <a
              href="https://wa.me/5534992360120"
              className="relative flex-none py-[.88em] px-[.75em] no-underline bg-transparent group"
            >
              <div className="relative z-[1] flex items-center justify-between gap-x-[.63em]">
                <span className="rounded-full w-[.25em] h-[.25em] bg-[#D4A574] flex-none" />
                <span className="font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] uppercase text-[#D4A574]">
                  conhecer os protocolos
                </span>
                <span className="rounded-full w-[.25em] h-[.25em] bg-[#D4A574] flex-none" />
              </div>
              <div className="absolute inset-0 w-full rounded-[.25em] border-[.08em] border-[#D4A574] group-hover:bg-[#D4A574]/10 transition-colors duration-300" />
            </a>
          </div>
        </div>

        {/* Mobile Story Header */}
        <div className="hidden max-[991px]:flex max-[991px]:flex-col max-[991px]:items-start max-[991px]:absolute max-[991px]:top-0 max-[991px]:left-0 max-[991px]:gap-y-[2.5em] max-[991px]:w-full max-[991px]:px-[1.88em] max-[991px]:pt-[3em] max-[479px]:z-0 max-[479px]:gap-y-[2em]">
          <div className="flex flex-col gap-y-[1em]">
            <h2 className="block m-0 font-[Aeonik,Arial,sans-serif] text-[3.6em] font-medium leading-[93%] tracking-[-0.03em] text-[#D4A574] max-[479px]:text-[2.4em]">
              Encontramos um caminho melhor
            </h2>
            <p className="m-0 font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] uppercase text-[#F5F0E8]/70 max-[479px]:text-[.86em]">
              Conheça os protocolos Sticker. Tecnologia de ponta que redefine os resultados em estética corporal.
            </p>
          </div>
        </div>

        {/* Benefit Cards */}
        <div className="relative z-[2] px-[1.88em] grid grid-cols-3 gap-[1.88em] mt-[12.5em] max-[991px]:w-[100vw] max-[479px]:flex max-[479px]:flex-row max-[479px]:gap-[1.5em] max-[479px]:mt-0 max-[479px]:p-[0_1em_10em] max-[479px]:sticky max-[479px]:top-[20em] max-[479px]:overflow-hidden">
          {/* Card 1 */}
          <div
            className="flex flex-col justify-between items-start gap-y-[1.88em] h-[16.13em] p-[1.25em] rounded-[.4em] max-[479px]:flex-none max-[479px]:w-[22em]"
            style={{
              background: 'rgba(245, 240, 232, 0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 165, 116, 0.20)',
            }}
          >
            <div className="flex flex-col gap-y-[.75em] w-[18em]">
              <img
                src="https://cdn.prod.website-files.com/693293123c1384ae5e258a60/693293123c1384ae5e258aef_detail%20small.svg"
                alt=""
                className="w-[2.25em] h-[2.25em] max-[479px]:w-[1.6em] max-[479px]:h-[1.6em]"
              />
              <h3 className="m-0 font-[Aeonik,Arial,sans-serif] text-[1.69em] font-normal leading-[110%] tracking-[-0.01em] text-[#D4A574] max-[479px]:w-[70%] max-[479px]:text-[1.5em] max-[479px]:font-medium max-[479px]:leading-[100%]">
                CrioEndolift
              </h3>
            </div>
            <div className="font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] uppercase text-[#F5F0E8] mb-0">
              Laser de alta potência com retração de pele simultânea. Resultados comparáveis à cirurgia sem o bisturi.
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="flex flex-col justify-between items-start gap-y-[1.88em] h-[16.13em] p-[1.25em] rounded-[.4em] max-[479px]:flex-none max-[479px]:w-[22em] max-[479px]:relative max-[479px]:top-[2em]"
            style={{
              background: 'rgba(245, 240, 232, 0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 165, 116, 0.20)',
            }}
          >
            <div className="flex flex-col gap-y-[.75em] w-[19em] max-[479px]:w-full">
              <img
                src="https://cdn.prod.website-files.com/693293123c1384ae5e258a60/693293123c1384ae5e258aef_detail%20small.svg"
                alt=""
                className="w-[2.25em] h-[2.25em] max-[479px]:w-[1.6em] max-[479px]:h-[1.6em]"
              />
              <h3 className="m-0 font-[Aeonik,Arial,sans-serif] text-[1.69em] font-normal leading-[110%] tracking-[-0.01em] text-[#D4A574] max-[479px]:w-[70%] max-[479px]:text-[1.5em] max-[479px]:font-medium max-[479px]:leading-[100%]">
                Ultra MD — FDA
              </h3>
            </div>
            <div className="font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] uppercase text-[#F5F0E8] mb-0">
              Único certificado internacional de eficácia. Exclusividade Sticker em MG. Sem efeito rebote.
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="flex flex-col justify-between items-start gap-y-[1.88em] h-[16.13em] p-[1.25em] rounded-[.4em] max-[479px]:flex-none max-[479px]:w-[22em] max-[479px]:relative max-[479px]:top-[4em]"
            style={{
              background: 'rgba(245, 240, 232, 0.07)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 165, 116, 0.20)',
            }}
          >
            <div className="flex flex-col gap-y-[.75em] w-[21em] max-[479px]:w-full">
              <img
                src="https://cdn.prod.website-files.com/693293123c1384ae5e258a60/693293123c1384ae5e258aef_detail%20small.svg"
                alt=""
                className="w-[2.25em] h-[2.25em] max-[479px]:w-[1.6em] max-[479px]:h-[1.6em]"
              />
              <h3 className="m-0 font-[Aeonik,Arial,sans-serif] text-[1.69em] font-normal leading-[110%] tracking-[-0.01em] text-[#D4A574] max-[479px]:w-[70%] max-[479px]:text-[1.5em] max-[479px]:font-medium max-[479px]:leading-[100%]">
                Sem efeito rebote
              </h3>
            </div>
            <div className="font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] uppercase text-[#F5F0E8] mb-0">
              Resultados rápidos, indolores e duradouros — sem comprometer sua rotina.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

