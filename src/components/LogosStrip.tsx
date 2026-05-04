/*
 * LogosStrip.tsx — Barra de logos com scroll infinito (marquee)
 * v4 — fundo transparente com fade que reflete o gradiente da Hero
 */

const logos = [
  {
    src: 'https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68b947f63b9e157c84ed0463_Frame%20675679694.avif',
    alt: 'Thrive by SVG Ventures',
    width: 'w-[9.38em] max-lg:w-[7em]',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68b9482bca1433c95ae72faf_IFA-Logo_InnovationForAll_000%201.avif',
    alt: 'IFA Innovation For All',
    width: 'w-[7.88em] max-lg:w-[6em]',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68b948608538d29553d0112b_Page-1.avif',
    alt: 'TechCrunch',
    width: 'w-[12.06em] max-lg:w-[11em]',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68b9487abc006b909d22d258_main-logo%201.avif',
    alt: 'AgTech Navigator',
    width: 'w-[11.25em] max-lg:w-[10em]',
  },
  {
    src: 'https://cdn.prod.website-files.com/68b5b8542c5c0a63b1d91b3b/68b9495bdd067615739eb0cf_Frame%20675679696.avif',
    alt: 'SOSV',
    width: 'w-[6.25em] max-lg:w-[5em]',
  },
]

export default function LogosStrip() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .logos-marquee {
          animation: marquee 40s linear infinite;
        }
        .logos-marquee:hover {
          animation-play-state: paused;
        }

        /* Fade lateral esquerdo e direito para suavizar as bordas do marquee */
        .logos-fade-left {
          background: linear-gradient(to right, #060E1C 0%, transparent 100%);
        }
        .logos-fade-right {
          background: linear-gradient(to left, #060E1C 0%, transparent 100%);
        }
      `}</style>

      {/*
       * Fundo: gradiente vertical de transparent (topo) → #0A0A0A (base)
       * Isso cria a continuidade visual com o fade escuro da Hero
       * sem tocar em nenhum outro componente.
       *
       * negative margin-top puxa a seção para cima, sobrepondo levemente
       * a borda inferior da Hero e eliminando qualquer linha de corte.
       */}
      <div
        className="
          relative z-[3] flex items-center
          w-full overflow-hidden
          h-[17em]
          -mt-[6em]
          max-lg:h-[18em]
          max-md:h-auto max-md:py-[2em] max-md:-mt-[4em]
        "
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, #060E1C 55%)',
        }}
      >
        {/* Fade lateral esquerdo */}
        <div className="logos-fade-left absolute left-0 top-0 h-full w-[8em] z-10 pointer-events-none" />

        {/* Faixa de logos duplicada para loop contínuo */}
        <div
          className="
            logos-marquee flex items-center w-max
            gap-[3.5em] max-lg:gap-[3em] max-md:gap-[2em]
          "
        >
          {[...logos, ...logos].map((logo, i) => (
            <img
              key={`${i}-${logo.alt}`}
              src={logo.src}
              loading="lazy"
              alt={i >= logos.length ? '' : logo.alt}
              aria-hidden={i >= logos.length ? 'true' : undefined}
              className={`${logo.width} flex-shrink-0 opacity-30 hover:opacity-70 grayscale brightness-200 contrast-50 mix-blend-screen transition-all duration-300`}
            />
          ))}
        </div>

        {/* Fade lateral direito */}
        <div className="logos-fade-right absolute right-0 top-0 h-full w-[8em] z-10 pointer-events-none" />
      </div>
    </>
  )
}