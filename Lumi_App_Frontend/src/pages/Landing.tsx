import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { C, BlobBG, Deco, MarqueeStrip, WaveDivider, Particles, useSceneObserver } from '../components/landing/cinematic';

import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';
import rosaLogo from '../assets/images/rosa_vivido_logo_completo-removebg-preview.png';
import blancoLogo from '../assets/images/logo_completo_blanco-removebg-preview.png';
import azulIcon from '../assets/images/icono_lumi_azul-removebg-preview.png';
import pastelIcon from '../assets/images/rosapastelicon-removebg-preview.png';
import pastelLogo from '../assets/images/rosa_pastel_logo_completo-removebg-preview.png';

/* ═══ DATA ═══ */
const capabilities = [
  { title: 'Compania Emocional', desc: 'Conversaciones empaticas, musica, cuentos y juegos cognitivos. Presente cuando la familia no puede estar.', accent: C.rosa, rotate: '-1.5deg' },
  { title: 'Monitoreo de Salud', desc: 'Signos vitales en tiempo real: frecuencia cardiaca, temperatura, oxigenacion. Deteccion de anomalias 24/7.', accent: C.azul, rotate: '1deg' },
  { title: 'Deteccion de Caidas', desc: 'Sensores de alta precision que detectan caidas al instante. Alerta inmediata a familiares con ubicacion exacta.', accent: C.rosa, rotate: '-0.5deg' },
  { title: 'Alertas de Entorno', desc: 'Detecta movimiento, temperatura extrema y humo. Reacciona ante situaciones de riesgo antes de que escalen.', accent: C.neon, rotate: '1.5deg' },
  { title: 'Boton SOS', desc: 'Un solo toque envia alerta de emergencia con ubicacion GPS a todos los contactos. Respuesta en segundos.', accent: C.rosa, rotate: '-1deg' },
  { title: 'Recordatorios', desc: 'Medicamentos, citas medicas, comidas. LUMI recuerda todo y lo comunica con voz calida y paciencia infinita.', accent: C.azul, rotate: '0.5deg' },
];

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const [loadPhase, setLoadPhase] = useState<'scale'|'pulse'|'flash'|'exit'|'done'>('scale');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [detailModal, setDetailModal] = useState(false);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setLoadPhase('pulse'), 650);
    const t2 = setTimeout(() => setLoadPhase('flash'), 1100);
    const t3 = setTimeout(() => setLoadPhase('exit'), 1200);
    const t4 = setTimeout(() => { setLoadPhase('done'); setLoading(false); }, 1750);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  useSceneObserver([loading]);

  useEffect(() => {
    if (loading) return;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY, h = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress(h > 0 ? y / h : 0);
          if (heroImgRef.current) heroImgRef.current.style.transform = `translateY(${y * 0.35}px)`;
          if (heroTextRef.current) heroTextRef.current.style.transform = `translateY(${y * -0.25}px)`;
          const spd = Math.max(4, 25 - y * 0.008);
          document.querySelectorAll<HTMLElement>('.marquee-track:not(.fast)').forEach(t => { t.style.animationDuration = `${spd}s`; });
          ticking = false;
        }); ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loading]);

  const scrollCarousel = useCallback((dir: 'left'|'right') => {
    carouselRef.current?.scrollBy({ left: dir === 'right' ? 360 : -360, behavior: 'smooth' });
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center" style={{ background: C.dark, ...(loadPhase === 'exit' ? { animation: 'loader-exit 500ms ease-in forwards' } : {}) }}>
        {loadPhase === 'flash' && <div className="absolute inset-0" style={{ background: C.rosa, animation: 'loader-flash 100ms ease-out forwards' }} />}
        <img src={rosaLogo} alt="LUMI" className="w-40 lg:w-56 h-auto relative z-10" style={{
          ...(loadPhase === 'scale' ? { animation: 'loader-scale 600ms ease-out forwards' } : {}),
          ...(loadPhase === 'pulse' ? { animation: 'loader-pulse 400ms ease-in-out forwards', opacity: 1 } : {}),
          ...(loadPhase === 'flash' || loadPhase === 'exit' ? { opacity: 1, transform: 'scale(1)' } : {}),
        }} />
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-[3px] z-[90] pointer-events-none" style={{ height: `${scrollProgress * 100}%`, background: C.rosa, transition: 'height 0.05s linear' }} />

      {/* Detail modal */}
      {detailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: `${C.dark}f2`, backdropFilter: 'blur(12px)' }} onClick={() => setDetailModal(false)}>
          <div className="w-full h-full flex flex-col items-center justify-center p-8 relative" style={{ animation: 'scaleIn 0.4s ease-out forwards' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setDetailModal(false)} className="absolute top-8 right-8 text-3xl font-light transition-colors" style={{ color: `${C.white}60` }}>&times;</button>
            <img src={rosaLogo} alt="Lumi" className="w-48 lg:w-64 h-auto mb-10 opacity-90" style={{ animation: 'float 4s ease-in-out infinite' }} />
            <h3 style={{ fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white, textAlign: 'center' }}>Conoce a <span style={{ color: C.rosa }}>LUMI</span></h3>
            <p className="mt-6 text-base lg:text-lg max-w-lg text-center leading-relaxed" style={{ color: C.grey }}>Un bot fisico inteligente que cuida, acompana y protege a quienes mas amas. Tecnologia con alma, disenada en Latinoamerica.</p>
            <div className="flex gap-4 mt-10">
              <Link to="/about" className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-[0.1em]" style={{ background: C.rosa, color: C.white }}>Explorar</Link>
              <Link to="/contact" className="px-8 py-3 rounded-full text-sm font-bold uppercase tracking-[0.1em] border" style={{ borderColor: `${C.white}20`, color: C.white }}>Contacto</Link>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════
          SCENE 1 — HERO (light, off-white) — landonorris style
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene is-visible relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: C.light }}>
        <BlobBG color={C.grey} opacity={0.06} className="w-[700px] h-[700px] -top-40 -left-40" />
        <BlobBG color={C.grey} opacity={0.04} className="w-[500px] h-[500px] -bottom-20 -right-20" />
        <Particles count={12} color={`${C.rosa}30`} />
        <Deco style={{ top: '15%', left: '8%' }}>&#x2726;</Deco>
        <Deco style={{ top: '25%', right: '12%' }}>&#x2B21;</Deco>
        <Deco style={{ bottom: '20%', left: '15%' }}>&#x25C8;</Deco>
        <Deco style={{ bottom: '30%', right: '8%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>001</Deco>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[200%] h-px rotate-[25deg] top-[30%] -left-1/2" style={{ background: `${C.grey}15` }} />
          <div className="absolute w-[200%] h-px rotate-[-15deg] top-[60%] -left-1/2" style={{ background: `${C.grey}10` }} />
        </div>
        <div className="absolute pointer-events-none" style={{ width: 200, height: 200, borderRadius: '50%', border: `1px solid ${C.grey}15`, top: '10%', right: '20%', animation: 'spin-slow 30s linear infinite' }} />

        {/* MASSIVE bleeding text — parallax faster */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h1 ref={heroTextRef} className="anim-scale-in delay-1 whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 20vw, 320px)', lineHeight: 0.85, letterSpacing: '-0.05em', fontWeight: 900, textTransform: 'uppercase', color: `${C.dark}07` }}>LUMI BOT</h1>
        </div>

        {/* Center subject — parallax slower */}
        <div ref={heroImgRef} className="relative z-10 flex flex-col items-center anim-scale-in delay-2" data-hover onClick={() => setDetailModal(true)} style={{ cursor: 'none' }}>
          <img src={rosaIcon} alt="Lumi" className="w-48 sm:w-64 lg:w-80 h-auto drop-shadow-2xl" style={{ animation: 'float 5s ease-in-out infinite' }} />
          <div className="absolute inset-0 -m-8 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.rosa}12 0%, transparent 70%)` }} />
        </div>

        {/* Bottom-left card */}
        <div className="absolute bottom-8 left-6 lg:bottom-12 lg:left-12 anim-reveal-up delay-4" style={{ maxWidth: 220 }}>
          <div className="rounded-xl p-4 border" style={{ borderColor: `${C.dark}10`, background: `${C.light}cc` }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: C.grey }}>Bot Inteligente</p>
            <svg viewBox="0 0 180 30" className="my-2 w-full" fill="none"><path d="M0 15h40l10-10h20l10 10h30l5-5h25l10 10h30" stroke={C.rosa} strokeWidth="1.5" opacity="0.3" strokeDasharray="4 3" style={{ animation: 'dash-move 3s linear infinite' }} /></svg>
            <p className="text-sm font-bold" style={{ color: C.dark }}>Compania que cuida</p>
            <p className="text-[10px] mt-0.5" style={{ color: C.grey }}>Voz, sensores, expresiones LED, SOS</p>
          </div>
        </div>

        <div className="absolute bottom-8 right-6 lg:bottom-12 lg:right-12 anim-reveal-up delay-5 flex flex-col items-center gap-2">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: C.grey, writingMode: 'vertical-lr' }}>Scroll</span>
          <div className="w-px h-12" style={{ background: `${C.dark}20` }}><div className="w-full" style={{ height: '40%', background: C.rosa, animation: 'float 2s ease-in-out infinite' }} /></div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 2 — MARQUEE + MESSAGE (dark) — giant scrolling text
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center justify-center noise" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.03} className="w-[900px] h-[900px] -top-60 -right-60" />
        <Deco style={{ top: '8%', left: '5%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '12%', right: '10%', color: C.azul }}>&#x25C8;</Deco>
        <Deco style={{ top: '80%', left: '80%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>002</Deco>
        <div className="absolute pointer-events-none" style={{ width: 300, height: 300, borderRadius: '50%', border: `1px solid ${C.white}08`, bottom: '-5%', left: '5%' }} />

        <div className="absolute inset-0 flex flex-col justify-center gap-4 pointer-events-none">
          <div className="overflow-hidden"><div className="marquee-track">
            {Array.from({ length: 6 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(60px, 14vw, 200px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.white}10`, WebkitTextStroke: `1px ${C.white}15` }}>COMPANIA QUE CUIDA — LUMI PARA SIEMPRE —</span>))}
          </div></div>
          <div className="overflow-hidden"><div className="marquee-track reverse">
            {Array.from({ length: 6 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(60px, 14vw, 200px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.white}08`, WebkitTextStroke: `1px ${C.white}10` }}>SEGURIDAD — CUIDADO — TECNOLOGIA —</span>))}
          </div></div>
        </div>

        <div className="relative z-10 anim-scale-in delay-2" data-hover onClick={() => setDetailModal(true)}>
          <img src={azulIcon} alt="Lumi" className="w-40 sm:w-56 lg:w-64 h-auto opacity-80" style={{ filter: 'grayscale(30%)' }} />
        </div>

        {/* Signature scribble */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none" viewBox="0 0 300 100" fill="none" style={{ width: 280, height: 90 }}>
          <path d="M10 80C30 20 60 10 90 40C120 70 100 90 130 50C160 10 180 30 200 60C220 90 250 40 280 30" stroke={C.rosa} strokeWidth="2.5" strokeLinecap="round" fill="none" strokeDasharray="500" strokeDashoffset="500" style={{ animation: 'dash-move 3s ease forwards' }} />
        </svg>
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 3 — SPLIT EDITORIAL: What is LUMI (light)
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center" style={{ background: C.light }}>
        <BlobBG color={C.grey} opacity={0.03} className="w-[600px] h-[600px] top-10 left-1/2 -translate-x-1/2" />
        <Deco style={{ top: '10%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>003</Deco>
        <div className="absolute w-px h-40 top-[10%] left-[50%]" style={{ background: `${C.dark}08` }} />

        {/* Left image bleeding from edge */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[35vw] max-w-[400px] anim-slide-left delay-1">
          <img src={pastelIcon} alt="" className="w-full h-auto opacity-50" />
        </div>
        {/* Right image bleeding from edge */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[30vw] max-w-[350px] anim-slide-right delay-1">
          <img src={azulIcon} alt="" className="w-full h-auto opacity-40" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20">
            <div className="anim-reveal-up delay-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.grey }}>Cuidado inteligente</p>
              <h2 className="leading-[0.85]" style={{ fontSize: 'clamp(40px, 8vw, 120px)', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>Protege</h2>
              <span className="inline-block -mt-4 lg:-mt-6 ml-2 italic" style={{ fontSize: 'clamp(24px, 4vw, 50px)', fontWeight: 400, color: C.rosa, transform: 'rotate(-3deg)', display: 'inline-block' }}>siempre</span>
              <p className="mt-6 text-sm max-w-xs leading-relaxed" style={{ color: C.grey }}>Deteccion de caidas, monitoreo 24/7, alertas de entorno y boton SOS. LUMI cuida a quienes mas amas con tecnologia de punta.</p>
              <button data-hover onClick={() => setDetailModal(true)} className="mt-6 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300" style={{ background: C.rosa, color: C.white }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>&rarr;</button>
            </div>
            <div className="anim-reveal-up delay-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: C.grey }}>Presencia real</p>
              <h2 className="leading-[0.85]" style={{ fontSize: 'clamp(40px, 8vw, 120px)', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>Acompana</h2>
              <span className="inline-block -mt-4 lg:-mt-6 ml-4 italic" style={{ fontSize: 'clamp(24px, 4vw, 50px)', fontWeight: 400, color: C.azul, transform: 'rotate(2deg)', display: 'inline-block' }}>de verdad</span>
              <p className="mt-6 text-sm max-w-xs leading-relaxed" style={{ color: C.grey }}>Conversaciones empaticas, musica, cuentos y juegos cognitivos. Un rostro LED que expresa emociones. Presencia afectiva real.</p>
              <button data-hover onClick={() => setDetailModal(true)} className="mt-6 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300" style={{ background: C.azul, color: C.white }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}>&rarr;</button>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 4 — IMPACT QUOTE (dark) — word in NEON GREEN
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center justify-center noise" style={{ background: C.dark }}>
        <BlobBG color={C.azul} opacity={0.03} className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Deco style={{ top: '12%', left: '8%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ top: '20%', right: '15%', color: C.neon }}>&#x25C6;</Deco>
        <Deco style={{ bottom: '15%', left: '20%', color: C.azul }}>&#x2295;</Deco>
        <Deco style={{ bottom: '25%', right: '8%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>004</Deco>
        <div className="absolute pointer-events-none" style={{ width: 180, height: 180, borderRadius: '50%', border: `1px solid ${C.rosa}15`, top: '15%', right: '10%' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-10" style={{ color: C.rosa }}>Nuestra mision</p>
          <div className="anim-clip-reveal delay-2">
            <h2 style={{ fontSize: 'clamp(32px, 7vw, 100px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', color: C.white }}>
              Cuidar a quienes <span style={{ color: C.rosa }}>amas</span> con <span className="italic" style={{ fontWeight: 400 }}>tecnologia</span> que se siente como <span style={{ color: C.neon }}>carino</span>
            </h2>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-12 lg:gap-20 anim-reveal-up delay-4">
            {[
              { n: '6', l: 'Sensores integrados' },
              { n: '<2s', l: 'Respuesta SOS' },
              { n: '24/7', l: 'Monitoreo continuo' },
              { n: '360', l: 'Grados proteccion' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <p className="text-2xl lg:text-4xl font-black" style={{ color: C.rosa }}>{s.n}</p>
                <p className="text-[10px] uppercase tracking-[0.15em] mt-2" style={{ color: C.grey }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 5 — QUE ES LUMI: deep editorial split (light)
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[700px] h-[700px] -top-40 -right-40" />
        <Particles count={8} color={`${C.rosa}18`} />
        <Deco style={{ top: '8%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>005</Deco>
        <Deco style={{ bottom: '12%', left: '8%' }}>&#x25C6;</Deco>
        {/* Giant vertical rotated text */}
        <div className="hidden lg:block absolute left-[-2vw] top-1/2 -translate-y-1/2 pointer-events-none select-none anim-slide-left delay-1">
          <span style={{ fontSize: '18vw', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.06em', textTransform: 'uppercase', color: `${C.dark}04`, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>LUMI</span>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
          <div className="lg:ml-[22vw] max-w-2xl">
            <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>El dispositivo</p>
            <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
              No es solo <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>tecnologia.</span> Es presencia.
            </h2>
            <p className="anim-reveal-up delay-2 mt-8 text-base lg:text-lg leading-relaxed" style={{ color: C.grey }}>
              LUMI es un dispositivo inteligente disenado para acompañar, cuidar y asistir a personas en su dia a dia. Se presenta como un pequeno bot fisico con forma amigable, capaz de comunicarse a traves de voz y expresiones visuales mediante una matriz de luces que simulan un rostro.
            </p>
            <p className="anim-reveal-up delay-3 mt-4 text-base leading-relaxed" style={{ color: C.grey }}>
              Funciona principalmente mediante comandos de voz. El usuario habla de forma natural, el dispositivo procesa esa informacion, la envia a un sistema inteligente en la nube y devuelve una respuesta en forma de voz. Ademas integra sensores de movimiento, temperatura, humo y un boton de emergencia SOS.
            </p>
            <div className="anim-reveal-up delay-4 mt-8 flex flex-wrap gap-3">
              {['Voz Natural', 'Sensores Ambientales', 'Rostro LED', 'Boton SOS', 'IA en la Nube'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: C.dark, border: `1px solid ${C.dark}12` }}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Full-bleed dark strip */}
          <div className="anim-clip-lr delay-5 mt-16 lg:mt-24 -mx-6 lg:-mx-12 relative overflow-hidden" style={{ height: 'clamp(140px, 18vw, 260px)' }}>
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: C.dark }}>
              <img src={pastelLogo} alt="" className="w-36 lg:w-52 h-auto opacity-15" style={{ animation: 'float-slow 8s ease-in-out infinite' }} />
              <span className="absolute text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: `${C.white}15`, bottom: 20, right: 24 }}>Disenado en Latinoamerica</span>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 6 — COMO FUNCIONA: 3 steps (dark)
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative noise" style={{ background: C.dark }}>
        <div className="scene relative py-20 lg:py-28 overflow-hidden">
          <BlobBG color={C.rosa} opacity={0.03} className="w-[700px] h-[700px] -top-40 -left-40" />
          <Deco style={{ top: '10%', right: '8%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>006</Deco>
          <div className="absolute pointer-events-none" style={{ width: 350, height: 350, borderRadius: '50%', border: `1px solid ${C.white}06`, right: '-5%', top: '20%', animation: 'spin-slow 20s linear infinite' }} />
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Proceso</p>
            <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(40px, 8vw, 130px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: C.white }}>
              Como <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>funciona</span>
            </h2>
          </div>
        </div>

        {[
          { num: '01', title: 'HABLA', sub: 'con LUMI', desc: 'Solo di lo que necesitas. LUMI entiende lenguaje natural. No necesitas aprender comandos. Habla como si hablaras con alguien que te conoce.', img: rosaIcon, accent: C.rosa },
          { num: '02', title: 'LUMI', sub: 'procesa', desc: 'Tu voz viaja a la nube, se analiza con inteligencia artificial y LUMI genera una respuesta personalizada en milisegundos. Rapido, preciso, confiable.', img: azulIcon, accent: C.azul },
          { num: '03', title: 'RECIBE', sub: 'respuesta', desc: 'LUMI responde con voz clara y calida. Su rostro LED cambia de expresion segun el contexto: escuchando, hablando, en alerta, tranquilo.', img: pastelIcon, accent: C.neon },
        ].map((step, i) => (
          <div key={step.num} className="scene relative min-h-[85vh] flex items-center overflow-hidden" style={{ background: i % 2 === 0 ? C.dark : C.darkAlt }}>
            <Particles count={4} color={`${step.accent}18`} />
            <Deco style={{ top: '10%', left: '5%', color: step.accent }}>&#x2726;</Deco>
            <Deco style={{ bottom: '10%', right: '5%' }}>&#x25C6;</Deco>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="anim-slide-left delay-0"><span style={{ fontSize: 'clamp(80px, 15vw, 220px)', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.05em', color: step.accent, opacity: 0.12 }}>{step.num}</span></div>
                  <div className="anim-reveal-up delay-1 -mt-8 lg:-mt-16">
                    <h3 style={{ fontSize: 'clamp(36px, 6vw, 90px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: C.white }}>{step.title} <span style={{ color: step.accent }}>{step.sub}</span></h3>
                  </div>
                  <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-lg" style={{ color: C.grey }}>{step.desc}</p>
                </div>
                <div className={`lg:col-span-5 anim-scale-in delay-3 flex ${i % 2 === 1 ? 'lg:order-1 justify-start' : 'justify-end'}`}>
                  <div className="relative">
                    <img src={step.img} alt="" className="w-36 lg:w-52 h-auto opacity-70" style={{ animation: `float ${5 + i}s ease-in-out infinite` }} />
                    <div className="absolute inset-0 -m-16 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${step.accent}10 0%, transparent 65%)` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 7 — CAPACIDADES: Card carousel (light)
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-24 lg:py-36" style={{ background: C.light }}>
        <BlobBG color={C.grey} opacity={0.04} className="w-[600px] h-[600px] -top-20 -right-20" />
        <Particles count={6} color={`${C.rosa}18`} />
        <Deco style={{ top: '10%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>007</Deco>
        <Deco style={{ bottom: '15%', left: '10%' }}>&#x25C6;</Deco>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 20vw, 300px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.dark}03` }}>CAPACIDADES</span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="anim-reveal-up delay-0 mb-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Funcionalidades</p>
            <h2 style={{ fontSize: 'clamp(36px, 6vw, 90px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
              Todo lo que LUMI <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>puede hacer</span>
            </h2>
          </div>
          <div className="relative anim-reveal-up delay-2">
            <div ref={carouselRef} className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {capabilities.map(f => (
                <div key={f.title} className="snap-start shrink-0 w-[300px] lg:w-[340px]" style={{ transform: `rotate(${f.rotate})` }}>
                  <div className="rounded-2xl p-7 h-full transition-transform duration-300 hover:scale-[1.03]" style={{ background: C.dark, border: `1px solid ${C.white}08` }}>
                    <div className="h-1.5 w-14 rounded-full mb-5" style={{ background: f.accent }} />
                    <p className="text-sm font-bold uppercase tracking-[0.06em] mb-3" style={{ color: C.white }}>{f.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: C.grey }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => scrollCarousel('left')} className="w-10 h-10 rounded-full border flex items-center justify-center text-sm font-bold transition-all hover:scale-110" style={{ borderColor: `${C.dark}15`, color: C.dark }}>&larr;</button>
              <button onClick={() => scrollCarousel('right')} className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all hover:scale-110" style={{ background: C.rosa, color: C.white }}>&rarr;</button>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 8 — SEGURIDAD: full-width rosa impact
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-24 lg:py-36" style={{ background: C.rosa }}>
        <Particles count={8} color={`${C.white}18`} />
        <Deco style={{ top: '10%', left: '8%', color: `${C.white}25` }}>&#x2726;</Deco>
        <Deco style={{ bottom: '10%', right: '8%', color: `${C.white}15` }}>&#x25C8;</Deco>
        <Deco style={{ top: '8%', right: '5%', fontSize: 10, color: `${C.white}35` }}>008</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: `${C.white}60` }}>Seguridad real</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
                Proteccion en cada <span className="italic" style={{ fontWeight: 400, textDecoration: 'underline', textDecorationColor: `${C.white}30`, textUnderlineOffset: '8px' }}>momento</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-md" style={{ color: `${C.white}80` }}>LUMI detecta cambios en el entorno: movimiento, temperatura, humo. Su boton SOS envia alertas con ubicacion GPS en segundos. No es solo compania — es un guardian.</p>
              <div className="anim-reveal-up delay-3 mt-8 h-1 w-16 rounded-full" style={{ background: C.neon }} />
            </div>
            <div className="lg:col-span-6 anim-scale-in delay-2">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Temperatura', desc: 'Detecta cambios bruscos' },
                  { label: 'Humo', desc: 'Alerta de incendio instantanea' },
                  { label: 'Movimiento', desc: 'Deteccion de presencia y caidas' },
                  { label: 'Boton SOS', desc: 'Emergencia con GPS en 1 toque' },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl p-5 transition-all duration-300 hover:scale-[1.03]" style={{ background: `${C.white}15`, backdropFilter: 'blur(8px)' }}>
                    <p className="text-xs font-bold uppercase tracking-[0.08em]" style={{ color: C.white }}>{s.label}</p>
                    <p className="text-[10px] mt-1" style={{ color: `${C.white}60` }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider flip darkToLight={false} />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 9 — PARA QUIEN: 3 cinematic panels (dark)
          ═══════════════════════════════════════════════════════════ */}
      <section className="relative noise" style={{ background: C.dark }}>
        <div className="scene relative py-20 lg:py-28 overflow-hidden">
          <BlobBG color={C.azul} opacity={0.03} className="w-[700px] h-[700px] -top-40 -left-40" />
          <Deco style={{ top: '10%', right: '8%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>009</Deco>
          <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
            <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Audiencia</p>
            <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 7vw, 100px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
              Disenado para <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>todos</span>
            </h2>
          </div>
        </div>
        {[
          { num: '01', title: 'ADULTOS MAYORES', desc: 'Independencia con respaldo. Monitoreo continuo, compania afectiva y respuesta ante emergencias. Tranquilidad para ellos y para toda la familia.', img: rosaIcon, accent: C.rosa },
          { num: '02', title: 'NINOS', desc: 'Aprendizaje interactivo, rutinas saludables y supervision inteligente. LUMI acompana a los mas pequenos con diversion segura y educativa.', img: azulIcon, accent: C.azul },
          { num: '03', title: 'PERSONAS CON DISCAPACIDAD', desc: 'Asistencia por voz, alertas de seguridad y comunicacion simplificada. Tecnologia que se adapta a cada necesidad, no al reves.', img: pastelIcon, accent: C.neon },
        ].map((uc, i) => (
          <div key={uc.num} className="scene relative min-h-[80vh] flex items-center overflow-hidden" style={{ background: i % 2 === 0 ? C.dark : C.darkAlt }}>
            <Particles count={4} color={`${uc.accent}18`} />
            <Deco style={{ top: '10%', left: '5%', color: uc.accent }}>&#x2726;</Deco>
            <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="anim-slide-left delay-0"><span style={{ fontSize: 'clamp(80px, 15vw, 220px)', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.05em', color: uc.accent, opacity: 0.12 }}>{uc.num}</span></div>
                  <div className="anim-reveal-up delay-1 -mt-8 lg:-mt-16"><h3 style={{ fontSize: 'clamp(28px, 5vw, 70px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: C.white }}>{uc.title}</h3></div>
                  <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-lg" style={{ color: C.grey }}>{uc.desc}</p>
                </div>
                <div className={`lg:col-span-5 anim-scale-in delay-3 flex ${i % 2 === 1 ? 'lg:order-1 justify-start' : 'justify-end'}`}>
                  <div className="relative"><img src={uc.img} alt="" className="w-36 lg:w-52 h-auto opacity-70" style={{ animation: `float ${5 + i}s ease-in-out infinite` }} /><div className="absolute inset-0 -m-16 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${uc.accent}10 0%, transparent 65%)` }} /></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 10 — MARQUEE STATEMENT (light)
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative min-h-[50vh] overflow-hidden flex items-center justify-center" style={{ background: C.light }}>
        <div className="absolute inset-0 flex flex-col justify-center gap-3 pointer-events-none">
          <div className="overflow-hidden"><div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(40px, 10vw, 150px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.dark}06` }}>TECNOLOGIA CON ALMA — CUIDADO INTELIGENTE —</span>))}
          </div></div>
          <div className="overflow-hidden"><div className="marquee-track reverse">
            {Array.from({ length: 8 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(40px, 10vw, 150px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.rosa}06` }}>LUMI — COMPANIA QUE CUIDA —</span>))}
          </div></div>
        </div>
        <div className="relative z-10 anim-scale-in delay-1"><img src={rosaIcon} alt="" className="w-32 sm:w-44 lg:w-52 h-auto opacity-80" style={{ animation: 'float 5s ease-in-out infinite' }} /></div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 11 — TESTIMONIOS PREVIEW (dark)
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-24 lg:py-36 noise" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.03} className="w-[600px] h-[600px] -top-20 -right-20" />
        <Deco style={{ top: '8%', left: '5%', fontSize: 10, color: C.grey }}>011</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="anim-reveal-up delay-0 mb-16">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Testimonios</p>
            <h2 style={{ fontSize: 'clamp(36px, 7vw, 100px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
              Familias <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>reales</span>
            </h2>
          </div>
          <div className="space-y-12 lg:space-y-16">
            {[
              { q: 'Desde que LUMI llego, mi mama se siente acompanada incluso cuando no puedo visitarla. Las alertas de caida me dan una tranquilidad increible.', n: 'Maria Gonzalez', r: 'Hija y cuidadora' },
              { q: 'Mis hijos adoran a LUMI. Les cuenta cuentos, les recuerda sus rutinas, y yo puedo supervisar todo desde el trabajo. Es como tener un guardian en casa.', n: 'Carlos Ramirez', r: 'Padre de familia' },
              { q: 'Como geriatra, recomiendo LUMI a todas las familias. La deteccion de caidas y el monitoreo de signos vitales son de primer nivel.', n: 'Dra. Laura Mendoza', r: 'Geriatra' },
            ].map((t, i) => (
              <div key={t.n} className={`anim-reveal-up delay-${Math.min(i + 1, 6)} border-l-2 pl-8 lg:pl-12 py-4 max-w-3xl ${i === 1 ? 'lg:ml-auto' : ''}`} style={{ borderColor: `${C.white}08` }}>
                <p className="text-lg lg:text-2xl italic leading-relaxed mb-6" style={{ color: `${C.white}80`, fontWeight: 400 }}>{`"${t.q}"`}</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black" style={{ background: `${C.rosa}15`, color: C.rosa }}>{t.n.charAt(0)}</div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: C.white }}>{t.n}</p>
                    <p className="text-[10px] uppercase tracking-[0.15em]" style={{ color: C.grey }}>{t.r}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="anim-reveal-up delay-4 mt-12">
            <Link to="/testimonios" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.1em] transition-colors duration-300" style={{ color: C.rosa }}>Ver todos los testimonios &rarr;</Link>
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════════════
          SCENE 12 — CTA / FOOTER (dark)
          ═══════════════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex flex-col justify-center noise" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"><img src={blancoLogo} alt="" className="w-[500px] h-auto opacity-[0.02]" /></div>
        <div className="absolute pointer-events-none" style={{ width: 400, height: 400, borderRadius: '50%', border: `1px solid ${C.rosa}10`, top: '10%', right: '-5%', animation: 'spin-slow 40s linear infinite' }} />
        <Deco style={{ top: '5%', left: '5%', fontSize: 10, color: C.grey }}>012</Deco>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center py-24">
          <div className="anim-scale-in delay-0 mx-auto mb-8" style={{ width: 8, height: 8, borderRadius: '50%', background: C.neon, boxShadow: `0 0 20px ${C.neon}60` }} />
          <div className="anim-clip-reveal delay-1">
            <h2 style={{ fontSize: 'clamp(36px, 8vw, 120px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
              Lleva a LUMI <span className="italic" style={{ fontWeight: 400 }}>a</span> <span style={{ color: C.rosa }}>casa.</span>
            </h2>
          </div>
          <p className="anim-reveal-up delay-3 mt-8 text-base lg:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: C.grey }}>Tranquilidad para tu familia. Compania inteligente para quienes mas amas. Tecnologia, cuidado y diseno emocional.</p>
          <div className="anim-reveal-up delay-4 mt-12">
            <Link to="/contact" data-hover className="inline-flex items-center gap-3 px-12 py-5 rounded-full text-lg font-black uppercase tracking-[0.05em] transition-all duration-300" style={{ background: C.rosa, color: C.white, boxShadow: `0 0 40px ${C.rosa}40` }} onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = `0 0 60px ${C.rosa}60`; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = `0 0 40px ${C.rosa}40`; }}>
              Conocer LUMI &rarr;
            </Link>
          </div>
          <div className="anim-reveal-up delay-5 mt-12 flex flex-wrap justify-center gap-8">
            {['Sin compromiso', 'Soporte 24/7', 'Envio incluido'].map(b => (
              <span key={b} className="flex items-center gap-2 text-xs uppercase tracking-[0.1em]" style={{ color: C.grey }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: C.neon, display: 'inline-block' }} />{b}
              </span>
            ))}
          </div>
          <div className="anim-reveal-up delay-6 mt-16">
            <a href="mailto:hola@lumi.tech" data-hover className="text-2xl lg:text-4xl font-light transition-colors duration-300" style={{ color: `${C.white}25` }} onMouseEnter={e => { e.currentTarget.style.color = C.rosa; }} onMouseLeave={e => { e.currentTarget.style.color = `${C.white}25`; }}>hola@lumi.tech</a>
          </div>
        </div>
      </section>
    </>
  );
}
