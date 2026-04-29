import { useState, useEffect, useRef } from 'react'

const locations = [
  { id: 'uberlandia', className: 'usa', city: 'Uberlândia', state: 'MG', info: 'Protocolos exclusivos e centro de treinamento.' },
  { id: 'sp', className: 'bolivia', city: 'São Paulo', state: 'SP', info: 'Unidade conceito e certificação Ultra MD.' },
  { id: 'bh', className: 'uk', city: 'Belo Horizonte', state: 'MG', info: 'Referência em CrioEndolift no estado.' },
  { id: 'brasilia', className: 'ireland-new', city: 'Brasília', state: 'DF', info: 'Unidade premium com atendimento VIP.' },
  { id: 'rj', className: 'spain', city: 'Rio de Janeiro', state: 'RJ', info: 'Especialistas em remodelação corporal.' },
  { id: 'goiania', className: 'serbia', city: 'Goiânia', state: 'GO', info: 'Pioneirismo em tecnologias não invasivas.' },
]

const locationPositions: Record<string, string> = {
  usa: 'top-[32%] left-[9%]          max-lg:top-[33.5%] max-lg:left-[15.5%] max-md:top-[25%] max-md:left-[1%]',
  bolivia: 'bottom-[32.5%] left-[19.5%]  max-lg:bottom-[33.5%] max-lg:left-[24.5%] max-md:bottom-[27%] max-md:left-[16.5%]',
  uk: 'top-[22%] left-[44%]          max-lg:top-[24.5%] max-lg:left-[45%] max-md:top-[13%] max-md:left-[53%]',
  'ireland-new': 'top-[25%] left-[41%]          max-lg:top-[26%] max-lg:left-[42.5%] max-md:top-[17%] max-md:left-[49%]',
  spain: 'top-[31.5%] left-[42%]        max-lg:top-[32.5%] max-lg:left-[43.5%] max-md:top-[26%] max-md:left-[51%]',
  serbia: 'top-[28.5%] left-[51.5%]      max-lg:top-[29%] max-lg:left-[51%] max-md:top-[21%] max-md:right-[32%] max-md:left-auto',
}

export default function Trials() {
  const [activeId, setActiveId] = useState('uberlandia')

  const headingRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const ctaImgRef = useRef<HTMLImageElement>(null)
  const boxFirstRef = useRef<HTMLDivElement>(null)
  const boxSecondRef = useRef<HTMLDivElement>(null)
  const ctaTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const items: { el: Element; delay: number }[] = [
      { el: headingRef.current!, delay: 0 },
      { el: subtitleRef.current!, delay: 0.12 },
      { el: mapRef.current!, delay: 0.22 },
      { el: ctaImgRef.current!, delay: 0 },
      { el: boxFirstRef.current!, delay: 0.15 },
      { el: boxSecondRef.current!, delay: 0.3 },
      { el: ctaTextRef.current!, delay: 0.18 },
    ].filter(({ el }) => el != null)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            el.style.transitionDelay = el.dataset.animDelay ?? '0s'
            el.classList.add('trials-visible')
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.12 }
    )
    items.forEach(({ el, delay }) => {
      (el as HTMLElement).dataset.animDelay = `${delay}s`
      observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        /* ── animações de entrada ── */
        .trials-anim       { opacity:0; transform:translateY(32px);  transition:opacity .75s ease, transform .75s ease; }
        .trials-anim-left  { opacity:0; transform:translateX(-28px); transition:opacity .75s ease, transform .75s ease; }
        .trials-anim-scale { opacity:0; transform:scale(0.97);       transition:opacity .8s ease,  transform .8s ease; }
        .trials-visible    { opacity:1 !important; transform:none !important; }

        /* ── location-info hover reveal (desktop only) ── */
        @media screen and (min-width: 992px) {
          .location-info {
            transition: 0.55s ease-out all;
            max-height: 0px;
            display: flex;
            pointer-events: none;
            opacity: 0;
          }
          .location-hover.active .location-info {
            max-height: 500px;
            opacity: 1;
          }
        }

        /*
         * ── BOXES DESKTOP (Farm CSS L3511–3528) ──────────────────────────
         *
         * .fiels-trial-box-info (base):
         *   z-index:1 | position:absolute | inset:0% 0% auto auto
         *   → top:0, right:0 | width:15.8em | height:15.5em
         *
         * .fiels-trial-box-info.second:
         *   top:15.55em | right:15.9em
         */
        .fiels-trial-box-info {
          position: absolute;
          top: 0;
          right: 0;
          bottom: auto;
          left: auto;
          z-index: 1;
          display: flex;
          flex-direction: column;
          width: 15.8em;
          height: 15.5em;
          padding: 0;
        }
        .fiels-trial-box-info.second {
          top: 15.55em;
          right: 15.9em;
        }

        /*
         * ── BOXES MOBILE @479px (Farm CSS L12828–12841) ──────────────────
         *
         * .fiels-trial-box-info.first:
         *   width:50vw | height:11.38em
         *   inset: -11.38em auto auto 0%
         *   → top:-11.38em | right:auto | bottom:auto | left:0
         *   background:#7c914c → Sticker: rgba(212,165,116,0.15)
         *
         * .fiels-trial-box-info.second:
         *   width:50vw | height:11.38em
         *   inset: -11.38em 0% auto auto
         *   → top:-11.38em | right:0 | bottom:auto | left:auto
         *   background:#596a33 → Sticker: rgba(194,132,122,0.15)
         *
         * NOTA: overflow:visible na .field-trials-cta no mobile
         * é o que permite os boxes subirem acima da seção (top negativo).
         */
        @media screen and (max-width: 479px) {
          .fiels-trial-box-info.first {
            top: -11.38em;
            right: auto;
            bottom: auto;
            left: 0%;
            width: 50vw;
            height: 11.38em;
            background: rgba(212, 165, 116, 0.15) !important;
            backdrop-filter: none !important;
            border: none !important;
          }
          .fiels-trial-box-info.second {
            top: -11.38em;
            right: 0%;
            bottom: auto;
            left: auto;
            width: 50vw;
            height: 11.38em;
            background: rgba(194, 132, 122, 0.15) !important;
            backdrop-filter: none !important;
            border: none !important;
          }
        }

        /*
         * ── INSIDE DOS BOXES (Farm CSS L4029–4038) ───────────────────────
         * .fiels-trial-box-info--inside:
         *   gap:.75em | flex-col | justify-between | items-start
         *   height:100% | padding:1.5em
         *
         * @479px L12981: padding:1em
         */
        .fiels-trial-box-info--inside {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.75em;
          height: 100%;
          padding: 1.5em;
        }
        @media screen and (max-width: 479px) {
          .fiels-trial-box-info--inside {
            padding: 1em;
          }
        }

        /*
         * ── text-27-regular (Farm CSS L3530–3543) ────────────────────────
         * desktop: color:#4c5b20→#D4A574 | font-size:1.69em | weight:500
         *          line-height:120% | display:block
         *
         * @479px L12842: display:none (esconde no mobile — mostra o mobile version)
         */
        .text-27-regular {
          color: #D4A574;
          font-size: 1.69em;
          font-weight: 500;
          line-height: 120%;
          letter-spacing: -0.01em;
          margin: 0;
          display: block;
        }
        .text-27-regular.h-100 {
          line-height: 110%;
        }
        @media screen and (max-width: 479px) {
          .text-27-regular {
            display: none;
          }
        }

        /*
         * ── text-27-regular-mobile ───────────────────────────────────────
         * Farm CSS L4465: display:none (desktop)
         * @479px: display:block | color:#fff | font-size:1.3em | line-height:105%
         */
        .text-27-regular-mobile {
          display: none;
          color: #ffffff;
          font-size: 1.3em;
          font-weight: 500;
          line-height: 105%;
          letter-spacing: -0.01em;
          margin: 0;
        }
        @media screen and (max-width: 479px) {
          .text-27-regular-mobile {
            display: block;
          }
        }
      `}</style>

      {/*
       * .field-trials
       * Farm L3397: background-color:var(--beige) → #0A0A0A
       * @991px L11192: position:relative
       */}
      <section id="s-trials" className="relative bg-[#0A0A0A]">
        <div className="w-full h-full block">

          {/*
           * .field-trials-wrap
           * Farm L3401: grid 1fr 1fr | border-top:1px solid #4e553833
           * @991px L11195: flex-col | display:flex
           * @479px L12796: border-top:none
           */}
          <div className="
            grid grid-cols-2 gap-0
            border-t border-[#D4A57433]
            max-lg:flex max-lg:flex-col
            max-md:border-t-0
          ">

            {/*
             * .field-trials-content
             * Farm L3411: flex-col | justify-between | items-start
             *   max-width:50vw | padding-top:3.13em | overflow:hidden
             * @991px L11199: max-width:100%
             * @479px L12799: padding-top:0 | padding-bottom:12em
             */}
            <div className="
              flex flex-col justify-between items-start
              max-w-[50vw] pt-[3.13em] overflow-hidden
              max-lg:max-w-full
              max-md:pt-0 max-md:pb-[12em]
            ">

              {/*
               * .field-trials-content_heading
               * Farm L3477: width:31em | pl:1.88em | gap:1.5em | flex-col
               * @479px L12812: width:100% | pl:1em | pr:1em
               */}
              <div className="
                flex flex-col gap-[1.5em] w-[31em] pl-[1.88em]
                max-md:w-full max-md:pl-[1em] max-md:pr-[1em]
              ">
                {/*
                 * .field-trials-content_title
                 * Farm L3486: width:19em
                 * @479px L12817: width:auto
                 */}
                <div ref={headingRef} className="w-[19em] max-md:w-auto trials-anim-left">
                  <h2
                    text-split=""
                    className="block text-[#D4A574] tracking-[-0.03em] font-medium text-[3.6em] leading-[93%] mt-0 mb-0 max-md:text-[2em] max-md:leading-[100%]"
                  >
                    Unidades Sticker em Atividade
                  </h2>
                </div>

                <div ref={subtitleRef} className="text-[#C2847A] uppercase text-[1em] leading-[130%] mb-0 trials-anim">
                  Estamos expandindo nossos protocolos exclusivos para os principais centros de estética do Brasil. Atualmente presentes em Minas Gerais, São Paulo, Rio de Janeiro, Distrito Federal e Goiás.
                </div>
              </div>

              {/*
               * .field-trials-map
               * Farm L3490: width:100% | height:39.5em | transition:all 1s
               * @479px L12820: height:auto
               */}
              <div className="w-full h-[39.5em] transition-all duration-1000 max-md:h-auto">
                <div ref={mapRef} className="relative flex justify-center items-center w-full h-full trials-anim-scale">

                  {/*
                   * .map-item
                   * Farm L3496: flex:none | width:61.75em | max-width:none
                   * @991px: width:100%
                   * @479px L12823: object-fit:cover | object-position:35% 50% | height:22em
                   */}
                  <img
                    src="/images/mapa-brasil.svg"
                    loading="lazy"
                    alt=""
                    className="flex-none w-[61.75em] max-w-none max-lg:w-full max-md:object-cover max-md:object-[35%_50%] max-md:h-[22em]"
                  />

                  {locations.map((loc) => (
                    <div
                      key={loc.id}
                      className={`
                        location-hover ${loc.className}
                        absolute cursor-pointer flex justify-center items-center
                        ${locationPositions[loc.className] ?? ''}
                        ${activeId === loc.id ? 'active' : ''}
                      `}
                      onMouseEnter={() => setActiveId(loc.id)}
                      onMouseLeave={() => setActiveId('')}
                    >
                      <img
                        src="https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/69d6420e002fdcd5f4040c5f_marker.svg"
                        loading="lazy" alt=""
                        className="w-[1.5em] max-lg:w-[1.25em] max-md:w-[1em]"
                      />
                      <div className="
                        location-info absolute flex-col
                        w-[9.25em] h-[9.25em] bottom-[3.6em] -left-[3em]
                        bg-[rgba(212,165,116,0.15)] backdrop-blur-[8px]
                        border border-[rgba(212,165,116,0.2)] rounded-[0.25em] overflow-hidden
                      ">
                        <div className="flex flex-col gap-[0.4em] p-[1em_1em_1em_1.2em]">
                          <div className="text-[#F5F0E8] text-[1.4em] font-medium leading-[105%] tracking-[-0.01em] mt-0 mb-0">
                            {loc.city}, {loc.state}
                          </div>
                          <div className="text-[#F5F0E8] uppercase text-[0.9em] leading-[120%]">
                            {loc.info}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* .plus-wrap — tablet/mobile only */}
                  <div className="
                    hidden
                    max-lg:flex max-lg:justify-center max-lg:items-center
                    max-lg:absolute max-lg:bottom-[2em] max-lg:right-[2em]
                    max-lg:z-[1] max-lg:w-[3.5em] max-lg:h-[3.5em]
                    max-lg:border max-lg:border-[#D4A574]
                    max-lg:bg-[#0A0A0A] max-lg:rounded-[0.4em]
                    max-md:w-[2.5em] max-md:h-[2.5em] max-md:bottom-[1em] max-md:right-[1em]
                  ">
                    <img
                      src="https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68cbaf5aacce1183f44df4a4_8plus.svg"
                      loading="lazy" alt=""
                      className="w-[1.1em] h-[1.1em] max-md:w-[0.9em] max-md:h-[0.9em]"
                    />
                  </div>

                </div>
              </div>
            </div>

            {/*
             * .field-trials-cta
             * Farm L3421:
             *   justify-content:flex-start | align-items:flex-end
             *   height:57.5em | pb:3.75em | pl:3.75em
             *   display:flex | position:relative | overflow:hidden
             * @991px L11202: pl:1.88em | border-top:1px solid #b7b8a033
             * @479px L12803:
             *   height:32.81em | pl:1em | pr:1em
             *   overflow:VISIBLE ← permite boxes com top negativo subirem acima
             */}
            <div
              data-w-id="9903e210-d82a-41ac-ea03-a62e28cb4a56"
              className="
                relative flex justify-start items-end overflow-hidden
                h-[57.5em] pb-[3.75em] pl-[3.75em]
                max-lg:pl-[1.88em] max-lg:border-t max-lg:border-[#b7b8a033]
                max-md:h-[32.81em] max-md:pl-[1em] max-md:pr-[1em] max-md:overflow-visible
              "
            >

              {/* .capsusta-img — imagem de fundo */}
              <img
                ref={ctaImgRef}
                src="/images/resultado-cta.avif"
                loading="lazy"
                sizes="(max-width: 767px) 100vw, (max-width: 991px) 728px, 940px, 100vw"
                srcSet="/images/resultado-cta-p-500.avif 500w, /images/resultado-cta-p-800.avif 800w, /images/resultado-cta-p-1080.avif 1080w, /images/resultado-cta.avif 2313w"
                alt=""
                className="absolute inset-0 z-0 w-full h-full object-cover trials-anim"
              />

              {/*
               * .fiels-trial-box-info.first
               * Classes CSS definidas no <style> acima:
               *   Desktop → top:0, right:0, w:15.8em, h:15.5em
               *   @479px  → top:-11.38em, left:0, w:50vw, h:11.38em
               */}
              <div
                ref={boxFirstRef}
                data-w-id="ac7801f1-7ed1-25ee-c7b3-7205520c690c"
                className="fiels-trial-box-info first trials-anim bg-[rgba(245,240,232,0.07)] backdrop-blur-[20px] border border-[rgba(212,165,116,0.2)]"
              >
                <div className="fiels-trial-box-info--inside">
                  <div className="max-[479px]:w-[6em]">
                    <h3 className="text-27-regular-mobile">Próxima Avaliação</h3>
                    <h3 className="text-27-regular">Próxima Avaliação</h3>
                  </div>
                  <div className="text-[#C2847A] uppercase text-[0.9em] leading-[120%]">
                    junho 2025 — novos horários disponíveis.
                  </div>
                </div>
              </div>

              {/*
               * .fiels-trial-box-info.second
               * Classes CSS definidas no <style> acima:
               *   Desktop → top:15.55em, right:15.9em, w:15.8em, h:15.5em
               *   @479px  → top:-11.38em, right:0, w:50vw, h:11.38em
               */}
              <div
                ref={boxSecondRef}
                data-w-id="6b2ee82d-b3a5-6581-754e-cfad6c04cf04"
                className="fiels-trial-box-info second trials-anim bg-[rgba(245,240,232,0.07)] backdrop-blur-[20px] border border-[rgba(212,165,116,0.2)]"
              >
                <div className="fiels-trial-box-info--inside">
                  <div className="max-[479px]:w-[6em]">
                    <h3 className="text-27-regular-mobile">Por que compartilhamos</h3>
                    <h3 className="text-27-regular h-100">Por que compartilhamos</h3>
                  </div>
                  <div className="text-[#C2847A] uppercase text-[0.9em] leading-[120%]">
                    Resultados reais superam promessas de marketing.
                  </div>
                </div>
              </div>

              {/* .field-trials-cta_text */}
              <div ref={ctaTextRef} className="relative z-[1] flex flex-col justify-between items-start gap-[1.25em] trials-anim">
                <div className="w-[34em] max-md:w-full">
                  <h2
                    text-split=""
                    className="text-white tracking-[-0.01em] font-medium text-[3.6em] leading-[93%] mt-0 mb-0 max-md:text-[2em]"
                  >
                    Seja a primeira a experimentar o CrioEndolift. Vagas abertas para junho.
                  </h2>
                </div>
                <a
                  data-lenis-stop=""
                  href="https://wa.me/5534992360120"
                  className="relative bg-transparent no-underline py-[0.88em] px-[0.75em] transition-all duration-300"
                >
                  <div className="relative z-[1] flex justify-between items-center gap-[0.63em]">
                    <div className="rounded-full w-[0.25em] h-[0.25em] bg-[#D4A574]" />
                    <div className="text-[#D4A574] uppercase text-[1em] leading-[130%]">Agendar agora</div>
                    <div className="rounded-full w-[0.25em] h-[0.25em] bg-[#D4A574]" />
                  </div>
                  <div className="absolute inset-0 rounded-[0.25em] bg-[#D4A574] hover:bg-[#C2847A] transition-colors duration-300" style={{ zIndex: 0 }} />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}