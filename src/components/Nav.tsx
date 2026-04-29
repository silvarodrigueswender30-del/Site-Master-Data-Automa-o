'use client'

import { useState, useEffect } from 'react'

/**
 * Nav.tsx — Fix de scroll instability
 * ─────────────────────────────────────────────────────────────────
 * PROBLEMA ANTERIOR:
 *   window.addEventListener('scroll', ...) ouve o scroll NATIVO.
 *   Com Lenis + scrollerProxy, o scroll nativo da window está
 *   dessincronizado do scroll virtual do Lenis — o Nav "pulava"
 *   e causava repaint em momentos errados, contribuindo para o jitter.
 *
 * SOLUÇÃO:
 *   Usar ScrollTrigger.create() para detectar quando passou de 50px.
 *   O ScrollTrigger já está sincronizado com o Lenis via scrollerProxy,
 *   então a transição do Nav acontece no momento certo, sem competição.
 *
 *   Alternativa igualmente válida:
 *   lenis.on('scroll', ({ scroll }) => setScrolled(scroll > 50))
 *   — mas requer acesso à instância do Lenis fora do App.tsx.
 *   ScrollTrigger.create é mais simples e já disponível globalmente.
 * ─────────────────────────────────────────────────────────────────
 */

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // ── ScrollTrigger em vez de window.addEventListener('scroll') ──
    // ScrollTrigger está sincronizado com o Lenis via scrollerProxy.
    // Quando o scroll passa de 50px: scrolled = true → Nav escurece.
    // Quando volta abaixo de 50px: onLeaveBack → scrolled = false.
    const trigger = ScrollTrigger.create({
      start: '50px top',         // dispara quando scroll > 50px
      onEnter: () => setScrolled(true),
      onLeaveBack: () => setScrolled(false),
    })

    return () => trigger.kill()
  }, [])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'clamp(14px,2vh,24px) clamp(20px,4vw,48px)',
        background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(212,165,116,0.15)'
          : '1px solid transparent',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease',
        // will-change evita repaint no browser durante a transição
        willChange: 'background',
      }}>

        {/* ── LOGO / MARCA ─────────────────────────── */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <img
            src="/assets/METODO-STICKER.svg"
            alt="Método Sticker"
            style={{
              height: 'clamp(18px,2.5vh,26px)',
              filter: 'brightness(0) invert(1)',
              objectFit: 'contain',
            }}
          />
        </div>

        {/* ── MENU BUTTON ──────────────────────────── */}
        <button
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#F5F0E8',
            padding: 0,
            zIndex: 1,
          }}
        >
          <HamburgerSVG open={menuOpen} />
          <span style={{
            fontSize: 'clamp(10px,1.1vw,12px)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 300,
          }}>
            {menuOpen ? 'Fechar' : 'Menu'}
          </span>
        </button>

        {/* ── CTA AGENDAR ──────────────────────────── */}
        <a
          href="#agendar"
          style={{
            fontSize: 'clamp(10px,1.1vw,12px)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            fontWeight: 300,
            color: '#F5F0E8',
            textDecoration: 'none',
            border: '1px solid rgba(212,165,116,0.28)',
            padding: 'clamp(8px,1vh,12px) clamp(14px,2vw,24px)',
            transition: 'background 0.3s',
            zIndex: 1,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background =
              'rgba(212,165,116,0.12)'
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
          }}
        >
          Agendar
        </a>
      </nav>

      {/* ── SIDEBAR MENU ─────────────────────────────
          Abre lateralmente quando menuOpen = true
      ─────────────────────────────────────────────── */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 'clamp(280px, 35vw, 420px)',
        background: 'rgba(10,10,10,0.97)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(212,165,116,0.12)',
        zIndex: 200,
        transform: menuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex',
        flexDirection: 'column',
        padding: 'clamp(60px,10vh,90px) clamp(32px,5vw,56px)',
        gap: '2rem',
        pointerEvents: menuOpen ? 'auto' : 'none',
      }}>
        {/* Links do menu */}
        {[
          { label: 'Início', href: '#' },
          { label: 'Sobre', href: '#sobre' },
          { label: 'Protocolo', href: '#protocolo' },
          { label: 'Resultados', href: '#resultados' },
          { label: 'Agendar', href: '#agendar' },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            style={{
              color: '#F5F0E8',
              textDecoration: 'none',
              fontSize: 'clamp(22px,3vw,32px)',
              fontFamily: "'Georgia','Times New Roman',serif",
              fontWeight: 300,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              transition: 'color 0.25s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#D4A574'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color = '#F5F0E8'
            }}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Overlay escuro ao abrir menu */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 150,
            background: 'rgba(10,10,10,0.50)',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}
    </>
  )
}

// ─────────────────────────────────────────────
// ÍCONE HAMBURGER — anima para X quando aberto
// ─────────────────────────────────────────────
function HamburgerSVG({ open }: { open: boolean }) {
  return (
    <svg
      width="20" height="14"
      viewBox="0 0 20 14"
      fill="none"
      aria-hidden
      style={{ transition: 'transform 0.3s' }}
    >
      <line
        x1="0" y1="1" x2="20" y2="1"
        stroke="#F5F0E8" strokeWidth="0.85"
        style={{
          transformOrigin: 'center',
          transition: 'transform 0.3s, opacity 0.3s',
          transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none',
        }}
      />
      <line
        x1="0" y1="7" x2="14" y2="7"
        stroke="#D4A574" strokeWidth="0.85"
        style={{
          transition: 'opacity 0.3s',
          opacity: open ? 0 : 1,
        }}
      />
      <line
        x1="0" y1="13" x2="20" y2="13"
        stroke="#F5F0E8" strokeWidth="0.85"
        style={{
          transformOrigin: 'center',
          transition: 'transform 0.3s',
          transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
        }}
      />
    </svg>
  )
}
