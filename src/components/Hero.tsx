'use client'

/**
 * Hero.tsx v6 — Método Sticker
 * ─────────────────────────────────────────────────────────────────
 * CORREÇÃO PRINCIPAL v6: ZERO RE-RENDER POR TICK DE SCROLL
 *
 *  PROBLEMA v5:
 *    setScrollProgress(p) era chamado a cada pixel de scroll.
 *    Em telas 144Hz isso são ~144 re-renders/segundo do componente
 *    Hero inteiro → JS thread ocupado → mouse lag → jitter.
 *
 *  SOLUÇÃO v6:
 *    1. scrollProgress STATE removido completamente.
 *    2. ScrollProgressDots agora lê uma CSS Variable (--hero-progress)
 *       que é atualizada via gsap.set() — zero React, zero re-render.
 *    3. O indicador "Scroll" some via CSS opacity transition na var.
 *    4. setActiveCardIds e setActiveTextIds continuam existindo mas
 *       só disparam quando há mudança real (hysteresis garante isso).
 *
 *  RESULTADO:
 *    Durante o scroll normal: 0 re-renders do Hero.
 *    Na transição de card: 1 re-render cirúrgico.
 *    Mouse lag: eliminado.
 *
 * ─────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─────────────────────────────────────────────
// CONSTANTES
// ─────────────────────────────────────────────
const TOTAL_FRAMES = 138
const SCROLL_HEIGHT = '1000vh'

const FRAME_SRC = (i: number) =>
  `/videos/pasta-hero/frames/frame_${String(i).padStart(4, '0')}.webp`

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
const progressToFrame = (p: number): number =>
  Math.min(Math.round(p * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1)

// ─────────────────────────────────────────────
// TIPOS
// ─────────────────────────────────────────────
interface CardConfig {
  id: number
  title: string
  body: string
  enterAt: number
  leaveAt: number
  side: 'left' | 'right'
  topClamp: string
}

interface TextConfig {
  id: number
  label: string
  line1: string
  line2?: string
  enterAt: number
  leaveAt: number
  align: 'left' | 'right'
  sizeClamp: string
  topClamp: string
}

// ─────────────────────────────────────────────
// JANELAS DE SCROLL — 4 × 25%
// ─────────────────────────────────────────────
const W1_IN = 0.01; const W1_OUT = 0.24
const W2_IN = 0.26; const W2_OUT = 0.49
const W3_IN = 0.51; const W3_OUT = 0.74
const W4_IN = 0.76; const W4_OUT = 0.99

// ─────────────────────────────────────────────
// TEXTOS EDITORIAIS
// ─────────────────────────────────────────────
const EDITORIAL_TEXTS: TextConfig[] = [
  {
    id: 10, label: '— Tecnologia',
    line1: 'Escaneamento', line2: 'mineral de precisão',
    enterAt: W1_IN, leaveAt: W1_OUT, align: 'right',
    sizeClamp: 'clamp(30px, 4.8vw, 72px)',
    topClamp: 'clamp(110px, 18vh, 175px)',
  },
  {
    id: 11, label: '— Ativo',
    line1: 'Areia dourada', line2: 'em movimento',
    enterAt: W2_IN, leaveAt: W2_OUT, align: 'left',
    sizeClamp: 'clamp(28px, 4.5vw, 68px)',
    topClamp: 'clamp(110px, 18vh, 170px)',
  },
  {
    id: 12, label: '— Protocolo',
    line1: 'Doze etapas', line2: 'certificadas',
    enterAt: W3_IN, leaveAt: W3_OUT, align: 'right',
    sizeClamp: 'clamp(30px, 4.8vw, 72px)',
    topClamp: 'clamp(115px, 19vh, 180px)',
  },
  {
    id: 13, label: '— Resultado',
    line1: 'Uma sessão.', line2: 'Transformação real.',
    enterAt: W4_IN, leaveAt: W4_OUT, align: 'left',
    sizeClamp: 'clamp(28px, 4.5vw, 68px)',
    topClamp: 'clamp(110px, 18vh, 172px)',
  },
]

// ─────────────────────────────────────────────
// GLASS CARDS
// ─────────────────────────────────────────────
const CARDS: CardConfig[] = [
  {
    id: 1, title: 'Diagnóstico Preciso',
    body: 'Análise tridimensional da pele com imageamento de alta resolução.',
    enterAt: W1_IN, leaveAt: W1_OUT, side: 'left',
    topClamp: 'clamp(280px, 52vh, 440px)',
  },
  {
    id: 2, title: 'Ativo Mineral Dourado',
    body: 'Partículas de areia ativadas por micro-ondas terapêuticas.',
    enterAt: W2_IN, leaveAt: W2_OUT, side: 'right',
    topClamp: 'clamp(280px, 52vh, 430px)',
  },
  {
    id: 3, title: 'Protocolo Exclusivo',
    body: 'Sequência de 12 etapas em laboratório suíço certificado.',
    enterAt: W3_IN, leaveAt: W3_OUT, side: 'left',
    topClamp: 'clamp(285px, 53vh, 445px)',
  },
  {
    id: 4, title: 'Resultado em 75 min',
    body: 'Firmeza, luminosidade e uniformidade em uma única sessão.',
    enterAt: W4_IN, leaveAt: W4_OUT, side: 'right',
    topClamp: 'clamp(280px, 52vh, 435px)',
  },
]

// ─────────────────────────────────────────────
// PRÉ-CARREGAMENTO
// ─────────────────────────────────────────────
function preloadFrames(
  onProgress: (n: number) => void,
  onComplete: (imgs: HTMLImageElement[]) => void,
) {
  const images: HTMLImageElement[] = new Array(TOTAL_FRAMES)
  let done = 0
  for (let i = 0; i < TOTAL_FRAMES; i++) {
    const img = new Image()
    img.decoding = 'async'
    img.src = FRAME_SRC(i + 1)
    const finish = () => {
      done++
      onProgress(done)
      if (done === TOTAL_FRAMES) onComplete(images)
    }
    img.onload = finish
    img.onerror = finish
    images[i] = img
  }
}

// ─────────────────────────────────────────────
// HERO COMPONENT
// ─────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const framesRef = useRef<HTMLImageElement[]>([])
  const frameIdxRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  // Refs para hysteresis — evita re-renders desnecessários
  const activeCardsRef = useRef<Set<number>>(new Set())
  const activeTextsRef = useRef<Set<number>>(new Set())

  const [loadPct, setLoadPct] = useState(0)
  const [ready, setReady] = useState(false)
  const [activeCardIds, setActiveCardIds] = useState<Set<number>>(new Set())
  const [activeTextIds, setActiveTextIds] = useState<Set<number>>(new Set())

  // ── Cover-fit draw ─────────────────────────
  const drawFrame = useCallback((idx: number) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const img = framesRef.current[idx]
    if (!img?.complete || !img.naturalWidth) return

    const cw = canvas.width, ch = canvas.height
    const iw = img.naturalWidth, ih = img.naturalHeight
    const scale = Math.max(cw / iw, ch / ih)
    const sw = iw * scale, sh = ih * scale
    const sx = (cw - sw) / 2, sy = (ch - sh) / 2

    ctx.clearRect(0, 0, cw, ch)
    ctx.drawImage(img, sx, sy, sw, sh)
  }, [])

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    drawFrame(frameIdxRef.current)
  }, [drawFrame])

  // ── 1. Preload ──────────────────────────────
  useEffect(() => {
    preloadFrames(
      (n) => setLoadPct(Math.round((n / TOTAL_FRAMES) * 100)),
      (imgs) => { framesRef.current = imgs; setReady(true) },
    )
  }, [])

  // ── 2. ScrollTrigger ────────────────────────
  useEffect(() => {
    if (!ready) return
    const section = sectionRef.current
    const canvas = canvasRef.current
    if (!section || !canvas) return

    resizeCanvas()
    drawFrame(0)
    window.addEventListener('resize', resizeCanvas)

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${SCROLL_HEIGHT}`,
        pin: true,
        pinSpacing: true,

        /**
         * scrub: 3
         * Canvas "persegue" o scroll com ~300ms de inércia.
         * Cria a sensação de peso/luxo e faz os cards parecerem
         * parados enquanto o fundo anima devagar.
         */
        scrub: 3,

        onUpdate(self) {
          const p = self.progress

          // ── 1. Frame canvas (zero React) ─────────────
          const targetIdx = progressToFrame(p)
          if (targetIdx !== frameIdxRef.current) {
            frameIdxRef.current = targetIdx
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            rafRef.current = requestAnimationFrame(() => drawFrame(targetIdx))
          }

          // ── 2. CSS Variable para dots (zero React) ───
          // gsap.set injeta a var direto no DOM — sem setState,
          // sem re-render, sem impacto no mouse.
          // O componente ScrollProgressDots lê via CSS.
          section.style.setProperty('--hero-progress', String(p))

          // ── 3. Scroll indicator some (zero React) ────
          // Lido pelo CSS do elemento via opacity condicional
          section.style.setProperty(
            '--hero-scroll-hint-opacity',
            p > 0.03 ? '0' : '1',
          )

          // ── 4. Cards: re-render APENAS se mudou ──────
          const cleanCards = new Set<number>()
          CARDS.forEach((c) => {
            if (p >= c.enterAt && p <= c.leaveAt) cleanCards.add(c.id)
          })
          const cardsChanged =
            cleanCards.size !== activeCardsRef.current.size ||
            [...cleanCards].some((id) => !activeCardsRef.current.has(id))

          if (cardsChanged) {
            activeCardsRef.current = cleanCards
            setActiveCardIds(new Set(cleanCards))
          }

          // ── 5. Textos: re-render APENAS se mudou ─────
          const cleanTexts = new Set<number>()
          EDITORIAL_TEXTS.forEach((t) => {
            if (p >= t.enterAt && p <= t.leaveAt) cleanTexts.add(t.id)
          })
          const textsChanged =
            cleanTexts.size !== activeTextsRef.current.size ||
            [...cleanTexts].some((id) => !activeTextsRef.current.has(id))

          if (textsChanged) {
            activeTextsRef.current = cleanTexts
            setActiveTextIds(new Set(cleanTexts))
          }
        },
      })

      ScrollTrigger.refresh()
    }, section)

    return () => {
      ctx.revert()
      window.removeEventListener('resize', resizeCanvas)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [ready, drawFrame, resizeCanvas])

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        background: '#0A0A0A',
        contain: 'paint',
        // CSS vars iniciais — lidas pelos subcomponentes via style inline
        ['--hero-progress' as string]: '0',
        ['--hero-scroll-hint-opacity' as string]: '1',
      }}
    >
      {/* ── CANVAS ────────────────────────── */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 0,
          display: 'block', width: '100%', height: '100%',
        }}
      />

      {/* ── VIGNETTES ───────────────────────── */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 85% at 52% 48%, transparent 38%, rgba(10,10,10,0.60) 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '22%', zIndex: 11, pointerEvents: 'none',
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.60) 0%, transparent 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: '30%', zIndex: 11, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.30) 55%, transparent 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', inset: 0, zIndex: 12, pointerEvents: 'none',
        opacity: 0.016,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(245,240,232,1) 2px, rgba(245,240,232,1) 3px)',
        backgroundSize: '100% 3px',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, bottom: 0,
        width: '32%', zIndex: 13, pointerEvents: 'none',
        background: 'linear-gradient(to right, rgba(10,10,10,0.45) 0%, transparent 100%)',
      }} />
      <div aria-hidden style={{
        position: 'absolute', top: 0, right: 0, bottom: 0,
        width: '28%', zIndex: 13, pointerEvents: 'none',
        background: 'linear-gradient(to left, rgba(10,10,10,0.40) 0%, transparent 100%)',
      }} />

      {/* ── SVG WATERMARK ─────────────────── */}
      <div aria-hidden style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        zIndex: 20, pointerEvents: 'none',
        height: 'clamp(52px,12vh,115px)',
        display: 'flex', alignItems: 'flex-end',
        overflow: 'hidden', paddingBottom: '6px',
      }}>
        <img src="/assets/METODO-STICKER.svg" alt="" style={{
          width: '100%', height: '100%',
          objectFit: 'contain', objectPosition: 'center bottom',
          opacity: 0.06, filter: 'brightness(0) invert(1)',
        }} />
      </div>

      {/* ── PROGRESS DOTS (lê CSS var, zero re-render) ── */}
      <ScrollProgressDots />

      {/* ── TEXTOS EDITORIAIS ─────────────── */}
      {EDITORIAL_TEXTS.map((txt) => (
        <EditorialText
          key={txt.id}
          txt={txt}
          active={activeTextIds.has(txt.id)}
        />
      ))}

      {/* ── GLASS CARDS ───────────────────── */}
      {CARDS.map((card) => (
        <GlassCard
          key={card.id}
          card={card}
          active={activeCardIds.has(card.id)}
        />
      ))}

      {/* ── SCROLL INDICATOR (lê CSS var) ─── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 'clamp(30px,5vh,50px)',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: '10px',
          // Lê a CSS var — zero re-render do React
          opacity: 'var(--hero-scroll-hint-opacity, 1)' as unknown as number,
          transition: 'opacity 0.6s',
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontSize: '10px', letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.38)', fontWeight: 300,
        }}>Scroll</span>
        <ScrollArrow />
      </div>

      {/* ── LOADING OVERLAY ───────────────── */}
      {!ready && <LoadingOverlay pct={loadPct} />}
    </section>
  )
}

// ─────────────────────────────────────────────
// SCROLL PROGRESS DOTS
// Lê --hero-progress via CSS — zero setState, zero re-render
// ─────────────────────────────────────────────
function ScrollProgressDots() {
  const dotsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Verifica qual janela está ativa comparando a CSS var
    // usando requestAnimationFrame para não bloquear o main thread
    let rafId: number
    let lastActive = 0

    function update() {
      const section = dotsRef.current?.closest('.hero-section') as HTMLElement | null
      if (section) {
        const p = parseFloat(section.style.getPropertyValue('--hero-progress') || '0')
        const active = p < 0.25 ? 1 : p < 0.50 ? 2 : p < 0.75 ? 3 : 4

        if (active !== lastActive) {
          lastActive = active
          const dots = dotsRef.current?.querySelectorAll('[data-dot]')
          dots?.forEach((dot, i) => {
            const el = dot as HTMLElement
            const isActive = i + 1 === active
            el.style.width = isActive ? '20px' : '6px'
            el.style.background = isActive
              ? '#D4A574'
              : 'rgba(245,240,232,0.25)'
          })
        }
      }
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      ref={dotsRef}
      style={{
        position: 'absolute',
        right: 'clamp(14px,2.5vw,28px)',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        display: 'flex', flexDirection: 'column',
        gap: '10px', pointerEvents: 'none',
      }}
    >
      {[1, 2, 3, 4].map((n) => (
        <div
          key={n}
          data-dot={n}
          style={{
            width: '6px', height: '1px',
            background: 'rgba(245,240,232,0.25)',
            transition: 'all 0.5s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// EDITORIAL TEXT
// ─────────────────────────────────────────────
function EditorialText({ txt, active }: { txt: TextConfig; active: boolean }) {
  const isLeft = txt.align === 'left'
  return (
    <div style={{
      position: 'absolute', zIndex: 25,
      left: isLeft ? 'clamp(20px,5vw,60px)' : 'auto',
      right: isLeft ? 'auto' : 'clamp(20px,5vw,60px)',
      top: txt.topClamp,
      maxWidth: isLeft ? '38vw' : '40vw',
      transition: 'opacity 0.70s cubic-bezier(0.22,1,0.36,1), transform 0.70s cubic-bezier(0.22,1,0.36,1)',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(22px)',
      pointerEvents: 'none',
      willChange: 'opacity, transform',
    }}>
      <div style={{
        fontSize: 'clamp(9px,0.85vw,11px)',
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: '#D4A574', fontWeight: 300, marginBottom: '10px',
        fontFamily: "'Georgia',serif",
      }}>
        {txt.label}
      </div>
      <div style={{
        fontSize: txt.sizeClamp,
        fontFamily: "'Georgia','Times New Roman',serif",
        fontWeight: 300, lineHeight: 1.05, color: '#F5F0E8',
        letterSpacing: '-0.02em', textShadow: '0 2px 28px rgba(10,10,10,0.60)',
      }}>
        {txt.line1}
      </div>
      {txt.line2 && (
        <div style={{
          fontSize: txt.sizeClamp,
          fontFamily: "'Georgia','Times New Roman',serif",
          fontWeight: 300, lineHeight: 1.05,
          color: 'rgba(212,165,116,0.80)',
          letterSpacing: '-0.02em', textShadow: '0 2px 28px rgba(10,10,10,0.60)',
        }}>
          {txt.line2}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────
// GLASS CARD
// ─────────────────────────────────────────────
function GlassCard({ card, active }: { card: CardConfig; active: boolean }) {
  const isLeft = card.side === 'left'
  return (
    <div style={{
      position: 'absolute', zIndex: 30,
      left: isLeft ? 'clamp(16px,5vw,56px)' : 'auto',
      right: isLeft ? 'auto' : 'clamp(16px,5vw,56px)',
      top: card.topClamp,
      width: 'clamp(185px,21vw,275px)',
      transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
      opacity: active ? 1 : 0,
      transform: active ? 'translateX(0)' : isLeft ? 'translateX(-24px)' : 'translateX(24px)',
      pointerEvents: active ? 'auto' : 'none',
      willChange: 'opacity, transform',
    }}>
      <div style={{
        background: 'rgba(10,10,10,0.42)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(212,165,116,0.15)',
        borderRadius: '12px',
        padding: 'clamp(16px,2.2vw,24px)',
      }}>
        <div style={{
          width: '24px', height: '1px',
          background: '#D4A574', opacity: 0.70, marginBottom: '10px',
        }} />
        <h3 style={{
          margin: '0 0 6px',
          fontFamily: "'Georgia','Times New Roman',serif",
          fontWeight: 300, fontSize: 'clamp(12px,1.3vw,15px)',
          lineHeight: 1.2, color: '#F5F0E8', letterSpacing: '0.01em',
        }}>
          {card.title}
        </h3>
        <p style={{
          margin: 0, fontFamily: "'Georgia',sans-serif",
          fontWeight: 300, fontSize: 'clamp(10px,1vw,12px)',
          lineHeight: 1.6, color: 'rgba(245,240,232,0.55)', letterSpacing: '0.01em',
        }}>
          {card.body}
        </p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// LOADING OVERLAY
// ─────────────────────────────────────────────
function LoadingOverlay({ pct }: { pct: number }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: '#0A0A0A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: '28px',
    }}>
      <img src="/assets/METODO-STICKER.svg" alt="Carregando"
        style={{ height: '28px', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
      />
      <div style={{
        width: 'clamp(160px,22vw,210px)', height: '1px',
        background: 'rgba(212,165,116,0.15)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, bottom: 0, left: 0,
          background: '#D4A574', width: `${pct}%`,
          transition: 'width 0.25s ease-out',
        }} />
      </div>
      <span style={{
        fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase',
        color: 'rgba(212,165,116,0.50)', fontWeight: 300, marginTop: '-14px',
      }}>
        {pct}%
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────
// ÍCONES
// ─────────────────────────────────────────────
function HamburgerSVG() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden>
      <line x1="0" y1="1" x2="20" y2="1" stroke="#F5F0E8" strokeWidth="0.85" />
      <line x1="0" y1="7" x2="14" y2="7" stroke="#D4A574" strokeWidth="0.85" />
      <line x1="0" y1="13" x2="20" y2="13" stroke="#F5F0E8" strokeWidth="0.85" />
    </svg>
  )
}

function ScrollArrow() {
  return (
    <>
      <style>{`
        @keyframes heroScrollBounce {
          0%,100%{transform:translateY(0)}
          50%{transform:translateY(6px)}
        }
        @keyframes heroScrollDot {
          0%{transform:translateY(0);opacity:1}
          75%{transform:translateY(9px);opacity:0.1}
          100%{transform:translateY(0);opacity:1}
        }
      `}</style>
      <svg width="16" height="28" viewBox="0 0 16 28" fill="none" aria-hidden
        style={{ animation: 'heroScrollBounce 2s ease-in-out infinite' }}>
        <rect x="6.5" y="0" width="3" height="16" rx="1.5" fill="rgba(212,165,116,0.22)" />
        <rect x="6.5" y="0" width="3" height="6" rx="1.5" fill="#D4A574"
          style={{ animation: 'heroScrollDot 2s ease-in-out infinite' }} />
        <path d="M3 21L8 26L13 21" stroke="rgba(212,165,116,0.38)" strokeWidth="1" fill="none" />
      </svg>
    </>
  )
}
