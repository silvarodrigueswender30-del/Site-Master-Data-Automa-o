'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Problem() {
  const cornFilledRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    /* ── corn-filled — animação do SVG crescendo ── */
    const cornEl = cornFilledRef.current
    if (cornEl) {
      gsap.fromTo(
        cornEl,
        { height: '0em' },
        {
          height: 'auto',
          ease: 'none',
          scrollTrigger: {
            trigger: cornEl,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        }
      )
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    /*
     * .second-section
     * z-index: 4 | background-color: var(--beige) → #F5F0E8 | height: 66em | position: relative
     * Mobile (<768px): height: auto
     * → Cor adaptada para Sticker: bg-[#0A0A0A] (fundo escuro do projeto)
     */
    <section
      id="s-second"
      className="relative z-[4] bg-[#0A0A0A] h-[66em] max-md:h-auto"
    >
      {/*
       * .w-layout-blockcontainer.container
       * w-layout-blockcontainer: max-width: 940px | mx-auto | display: block
       * .container (override): width: 100% | max-width: none | height: 100% | display: block
       * Mobile (<768px): max-width: none
       * → .container sobrescreve o blockcontainer, então: w-full h-full block
       */}
      <div className="w-full h-full block">

        {/*
         * .second-section-wrap
         * grid-template-columns: 1fr 1fr | grid-template-rows: auto | height: 100% | display: grid
         * Mobile (<992px): flex-flow: column | grid-template-columns: 1fr | display: flex
         * Mobile (<768px): padding: 0
         */}
        <div className="grid grid-cols-2 grid-rows-[auto] h-full max-lg:flex max-lg:flex-col">

          {/*
           * .most-fertilizers-mobile
           * display: none (desktop) | Mobile (<992px): display: flex | padding: 6em var(--padding-web)
           * background-color: var(--beige) → adaptado para Sticker: bg-[#0A0A0A]
           * Mobile (<768px): padding: 4.63em 1em
           */}
          <div
            className="
              hidden
              max-lg:flex max-lg:flex-col max-lg:justify-start max-lg:items-start
              max-lg:pt-[6em] max-lg:pb-[6em] max-lg:px-[var(--padding-web)]
              max-lg:bg-[#0A0A0A]
              max-md:pt-[4.63em] max-md:pb-[4.63em] max-md:px-[1em]
            "
          >
            {/*
             * .up-to-70-title
             * gap: 1em | flex-flow: column | width: 36.2em | display: flex
             * Mobile (<992px): width: 35em
             * Mobile (<768px): width: 20.1em
             */}
            <div
              className="
                flex flex-col gap-[1em]
                w-[36.2em]
                max-lg:w-[35em]
                max-md:w-full max-md:max-w-[20.1em]
              "
            >
              {/*
               * .h2-style.green
               * color: var(--heading-color) → adaptado: #D4A574 (--sticker-gold)
               * letter-spacing: -.03em | font-weight: 500 | display: block
               * font-size: 3.6em (desktop) | 3em (tablet) | 2em (mobile) | line-height: 93%
               * font-family: Aeonik → sua fonte primária serifada editorial
               */}
              <h2
                text-split=""
                className="
                  block text-[#D4A574] tracking-[-0.03em] font-medium
                  text-[3.6em] leading-[93%]
                  mt-0 mb-0
                  max-lg:text-[3em]
                  max-md:text-[2em] max-md:leading-[100%]
                "
              >
                A maioria dos tratamentos nunca chega ao resultado
              </h2>

              {/*
               * .text-16-regular-caps.green
               * color: var(--main-green) → adaptado: #C2847A (--sticker-nude)
               * text-transform: uppercase | font-family: Aeonik | font-size: 1em | line-height: 130%
               * Mobile (<768px): font-size: .86em
               */}
              <div
                className="
                  text-[#C2847A] uppercase font-[Aeonik,Arial,sans-serif]
                  text-[1em] leading-[130%] mb-0
                  max-md:text-[0.86em]
                "
              >
                Muitos procedimentos evaporam em promessas. Deixando você com resultados parciais, tempo perdido e dinheiro desperdiçado.
              </div>
            </div>
          </div>

          {/*
           * .corn-video-wrap-new
           * height: 100% | padding-bottom: 3em | padding-left: var(--padding-web)
           * justify-content: flex-start | align-items: flex-end | display: flex | position: relative
           * Mobile (<992px): flex-flow: column | justify-content: flex-start | align-items: flex-start
           *                   width: 100% | height: 50em | display: flex | overflow: hidden
           * Mobile (<768px): height: 29.75em
           */}
          <div
            data-w-id="7e8b480f-fad0-4834-a1f1-c0b6f92922da"
            className="
              relative flex justify-start items-end
              h-full pb-[3em] pl-[var(--padding-web)]
              max-lg:flex-col max-lg:justify-start max-lg:items-start
              max-lg:w-full max-lg:h-[50em] max-lg:overflow-hidden
              max-md:h-[29.75em]
            "
          >
            {/*
             * .farmer-video
             * object-fit: cover | width: 100% | height: 100% | position: absolute | inset: 0%
             */}
            <video
              muted
              loop
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/videos/corn_luxury_optimized.mp4" type="video/mp4" />
              Seu navegador não suporta vídeos.
            </video>

            {/*
             * .corn-text-wrap
             * z-index: 1 | gap: 1.25em | flex-flow: column | width: 37em | display: flex | position: relative
             * Mobile (<992px): display: none
             */}
            <div
              className="
                relative z-[1] flex flex-col gap-[1.25em] w-[37em]
                max-lg:hidden
              "
            >
              {/*
               * .h2-style (sem .green)
               * color: #fff | letter-spacing: -.01em | font-weight: 500
               * font-size: 3.6em | line-height: 93% | mt-0 mb-0
               */}
              <h2
                text-split=""
                className="
                  text-white tracking-[-0.01em] font-medium
                  text-[3.6em] leading-[93%] mt-0 mb-0
                "
              >
                A maioria dos tratamentos nunca chega ao resultado
              </h2>

              {/*
               * .description-wrap
               * width: 28.7em
               */}
              <div className="w-[28.7em]">
                {/*
                 * .text-16-regular-caps (base, sem modificador)
                 * color: var(--beige) → adaptado: #F5F0E8 (--sticker-bone)
                 * text-transform: uppercase | font-size: 1em | line-height: 130%
                 * Mobile (<768px): font-size: .8em
                 */}
                <div
                  className="
                    text-[#F5F0E8] uppercase font-[Aeonik,Arial,sans-serif]
                    text-[1em] leading-[130%] mb-0
                    max-md:text-[0.8em]
                  "
                >
                  Muitos procedimentos evaporam em promessas. Deixando você com resultados parciais, tempo perdido e dinheiro desperdiçado.
                </div>
              </div>
            </div>
          </div>

          {/*
           * .up-to-70-wrap
           * padding-top: 5em | padding-right: var(--padding-web) | padding-left: 3.13em
           * flex-flow: column | justify-content: space-between | align-items: flex-start | display: flex
           * Mobile (<992px): padding-top: 3em | padding-left: var(--padding-web)
           * Mobile (<768px): padding: 4.63em 1em 4em | gap: 3em
           */}
          <div
            className="
              flex flex-col justify-between items-start
              pt-[5em] pr-[var(--padding-web)] pl-[3.13em]
              max-lg:pt-[3em] max-lg:pl-[var(--padding-web)]
              max-md:pt-[4.63em] max-md:pr-[1em] max-md:pb-[4em] max-md:pl-[1em] max-md:gap-[3em]
            "
          >
            {/*
             * .up-to-70-title
             * gap: 1em | flex-flow: column | width: 36.2em | display: flex
             * Mobile (<992px): width: 35em
             * Mobile (<768px): width: 20.1em
             */}
            <div
              className="
                flex flex-col gap-[1em] w-[36.2em]
                max-lg:w-[35em]
                max-md:w-[20.1em]
              "
            >
              {/*
               * .h2-style.green → cor adaptada para Sticker: #D4A574
               */}
              <h2
                text-split=""
                className="
                  block text-[#D4A574] tracking-[-0.03em] font-medium
                  text-[3.6em] leading-[93%] mt-0 mb-0
                  max-lg:text-[3em]
                  max-md:text-[2em] max-md:leading-[100%]
                "
              >
                Até 85% da gordura eliminada com método comprovado.
              </h2>

              {/*
               * .text-16-regular.green
               * color: var(--main-green) → adaptado: #C2847A | line-height: 125%
               * text-transform: none | font-size: 1em
               */}
              <div
                className="
                  text-[#C2847A] font-[Aeonik,Arial,sans-serif]
                  text-[1em] leading-[125%] mt-0 mb-0
                "
              >
                Fonte: Estudos clínicos internos, 2024
              </div>
            </div>

            {/*
             * .corn-animated-wrap
             * justify-content: center | align-items: flex-end | width: 100% | display: flex
             * Mobile (<768px): position: relative
             */}
            <div
              className="
                flex justify-center items-end w-full
                max-md:relative
              "
            >
              {/*
               * .corn-outlined
               * width: 40.63em
               */}
              <img
                src="https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68b9aad0bc1a4852e6d4097f_Group%20214.svg"
                loading="lazy"
                alt="Corn Outline"
                className="w-[40.63em]"
              />

              {/*
               * .corn-filled
               * object-fit: cover | object-position: 50% 100%
               * width: 40.63em | height: 11em (inicial, GSAP anima para auto) | position: absolute
               * GSAP: ref={cornFilledRef} — animação de height 0em → auto via ScrollTrigger
               */}
              <img
                ref={cornFilledRef}
                src="https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68b9aaf6a2ba79178ea028ce_Group%20215.svg"
                loading="lazy"
                alt="Corn Filled"
                style={{ height: '0em' }}
                className="absolute object-cover object-[50%_100%] w-[40.63em]"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
