'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Numbers() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    /* ── green-line: scale lateral ── */
    gsap.fromTo(
      '.green-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
      }
    );

    /* ── numberstext: fade + slide ── */
    gsap.fromTo(
      '[numberstext]',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    /*
     * .numbers
     * z-index: 6 | background-color: var(--beige) → #0A0A0A (Sticker bg)
     * margin-top: 0 | position: relative
     */
    <section
      ref={sectionRef}
      id="s-numbers"
      className="relative z-[6] bg-[#0A0A0A] mt-0"
    >
      {/*
       * .w-layout-blockcontainer.container
       * w-full h-full block (container override — igual ao Problem)
       */}
      <div className="w-full h-full block">

        {/*
         * .numbers-wrap
         * grid-template-columns: 1fr 1fr | grid-template-rows: auto
         * height: 100% | min-height: 100vh | display: grid
         * Tablet (<992px): flex-flow: column | display: flex
         */}
        <div
          className="
            grid grid-cols-2 grid-rows-[auto] h-full min-h-screen
            max-lg:flex max-lg:flex-col
          "
        >

          {/*
           * .numbers-video
           * height: 100% | position: relative | overflow: hidden
           * Tablet (<992px): order: 1 | width: 100% | height: 50em
           * Mobile (<768px): height: 30.63em
           */}
          <div
            className="
              relative h-full overflow-hidden
              max-lg:order-1 max-lg:w-full max-lg:h-[50em]
              max-md:h-[30.63em]
            "
          >
            {/*
             * .farmer-video
             * object-fit: cover | width: 100% | height: 100%
             * position: absolute | inset: 0%
             */}
            <video
              muted
              loop
              playsInline
              autoPlay
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source
                type="video/mp4"
                src="https://farm-minerals.b-cdn.net/farm_main_video.mp4"
              />
            </video>
          </div>

          {/*
           * .numbers-content
           * padding: 3.13em var(--padding-web) 3.13em 3.13em
           * gap: 10em | flex-flow: column
           * justify-content: space-between | align-items: flex-start | display: flex
           * Tablet (<992px): width: 100% | padding-left: var(--padding-web)
           * Mobile (<768px): gap: 4em | padding: 4em 1em
           */}
          <div
            className="
              flex flex-col justify-between items-start
              gap-[10em]
              pt-[3.13em] pr-[var(--padding-web)] pb-[3.13em] pl-[3.13em]
              max-lg:w-full max-lg:pl-[var(--padding-web)]
              max-md:gap-[4em] max-md:p-[4em_1em]
            "
          >
            {/*
             * .h2-style.green
             * color: var(--heading-color) → #D4A574 (Sticker gold)
             * letter-spacing: -.03em | font-weight: 500
             * font-size: 3.6em | line-height: 93%
             * Mobile (<768px): font-size: 2em
             */}
            <h2
              text-split-delay="0.2"
              className="
                block text-[#D4A574] tracking-[-0.03em] font-medium
                text-[3.6em] leading-[93%] mt-0 mb-0
                max-md:text-[2em] max-md:leading-[100%]
              "
            >
              Resultados
              <br />
              Comprovados.
            </h2>

            {/*
             * .numbers-list
             * gap: 3.2em | flex-flow: column | width: 100%
             * padding-bottom: 5em | display: flex | position: relative
             * Mobile (<768px): gap: 2.38em
             */}
            <div
              className="
                relative flex flex-col gap-[3.2em] w-full pb-[5em]
                max-md:gap-[2.38em]
              "
            >

              {/*
               * .number-item.first
               * grid-template-columns: 1fr 10.25em | gap: 16px
               * justify-content: space-between | align-items: flex-end
               * width: 100% | padding-bottom: 1em | display: grid | position: relative
               * Mobile (<768px): grid-template-columns: 1fr 9em | padding-bottom: .6em
               */}
              <div
                className="
                  relative grid w-full pb-[1em]
                  gap-[16px] items-end justify-between
                  [grid-template-columns:1fr_10.25em]
                  max-md:[grid-template-columns:1fr_9em] max-md:pb-[0.6em]
                "
              >
                {/*
                 * .text-80-regular
                 * color: var(--heading-color) → #D4A574
                 * letter-spacing: -.02em | font-weight: 400
                 * font-size: 3.9em | line-height: 90%
                 * Mobile (<768px): font-size: 2.8em
                 */}
                <div
                  numberstext=""
                  className="
                    text-[#D4A574] tracking-[-0.02em] font-normal
                    text-[3.9em] leading-[90%] mt-0 mb-0
                    max-md:text-[2.8em]
                  "
                >
                  4
                </div>
                {/*
                 * .text-16-regular-caps.green
                 * color: var(--main-green) → #C2847A (Sticker nude)
                 * text-transform: uppercase | font-size: 1em | line-height: 130%
                 */}
                <div
                  numberstext=""
                  className="text-[#C2847A] uppercase font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] mb-0"
                >
                  continentes testados
                </div>
                {/*
                 * .green-line
                 * background-color: var(--green-light) → #D4A574 a 50% (Sticker)
                 * opacity: .5 | width: 100% | height: 1px
                 * position: absolute | inset: auto 0% 0%
                 * transform-origin: left (para animação GSAP scaleX)
                 */}
                <div
                  className="green-line absolute bottom-0 left-0 right-0 h-px w-full opacity-50 origin-left"
                  style={{ backgroundColor: '#D4A574' }}
                />
              </div>

              {/* Item 2 — .number-item.action */}
              <div
                className="
                  relative grid w-full pb-[1em]
                  gap-[16px] items-end justify-between
                  [grid-template-columns:1fr_10.25em]
                  max-md:[grid-template-columns:1fr_9em] max-md:pb-[0.6em]
                "
              >
                <div
                  numberstext=""
                  className="
                    text-[#D4A574] tracking-[-0.02em] font-normal
                    text-[3.9em] leading-[90%] mt-0 mb-0
                    max-md:text-[2.8em]
                  "
                >
                  100x
                </div>
                <div
                  numberstext=""
                  className="text-[#C2847A] uppercase font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] mb-0"
                >
                  menor custo de transporte
                </div>
                <div
                  className="green-line absolute bottom-0 left-0 right-0 h-px w-full opacity-50 origin-left"
                  style={{ backgroundColor: '#D4A574' }}
                />
              </div>

              {/* Item 3 */}
              <div
                className="
                  relative grid w-full pb-[1em]
                  gap-[16px] items-end justify-between
                  [grid-template-columns:1fr_10.25em]
                  max-md:[grid-template-columns:1fr_9em] max-md:pb-[0.6em]
                "
              >
                <div
                  numberstext=""
                  className="
                    text-[#D4A574] tracking-[-0.02em] font-normal
                    text-[3.9em] leading-[90%] mt-0 mb-0
                    max-md:text-[2.8em]
                  "
                >
                  0.5 ton
                </div>
                <div
                  numberstext=""
                  className="text-[#C2847A] uppercase font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] mb-0"
                >
                  CO₂ economizado por acre – sem custo extra
                </div>
                <div
                  className="green-line absolute bottom-0 left-0 right-0 h-px w-full opacity-50 origin-left"
                  style={{ backgroundColor: '#D4A574' }}
                />
              </div>

              {/* Item 4 */}
              <div
                className="
                  relative grid w-full pb-[1em]
                  gap-[16px] items-end justify-between
                  [grid-template-columns:1fr_10.25em]
                  max-md:[grid-template-columns:1fr_9em] max-md:pb-[0.6em]
                "
              >
                <div
                  numberstext=""
                  className="
                    text-[#D4A574] tracking-[-0.02em] font-normal
                    text-[3.9em] leading-[90%] mt-0 mb-0
                    max-md:text-[2.8em]
                  "
                >
                  ≥5×
                </div>
                <div
                  numberstext=""
                  className="text-[#C2847A] uppercase font-[Aeonik,Arial,sans-serif] text-[1em] leading-[130%] mb-0"
                >
                  retorno* sobre cada real investido
                </div>
                <div
                  className="green-line absolute bottom-0 left-0 right-0 h-px w-full opacity-50 origin-left"
                  style={{ backgroundColor: '#D4A574' }}
                />
              </div>

              {/*
               * .small-info
               * width: 26em | position: absolute | inset: auto auto 0% 0%
               * Mobile (<768px): width: 90% | bottom: 1em
               */}
              <div
                className="
                  absolute bottom-0 left-0 w-[26em]
                  max-md:w-[90%] max-md:bottom-[1em]
                "
              >
                {/*
                 * .text-14-caps.green.small-description
                 * color: var(--main-green) → #C2847A | font-size: .9em
                 * text-transform: uppercase | line-height: 120%
                 */}
                <div
                  className="
                    text-[#C2847A] uppercase font-[Aeonik,Arial,sans-serif]
                    text-[0.9em] leading-[120%] flex-none
                  "
                >
                  *Igual ou superior ao ROI publicado pelos principais programas;
                  baseado em estudos clínicos e práticas de emissão zero.
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}