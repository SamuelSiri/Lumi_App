import { useEffect } from 'react';
import { Mic, Cloud, MessageSquare, Radio, Bell, Shield } from 'lucide-react';
import { C, BlobBG, Deco, MarqueeStrip, WaveDivider, Particles, PageHero, CTASection, useSceneObserver } from '../components/landing/cinematic';

import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';
import azulIcon from '../assets/images/icono_lumi_azul-removebg-preview.png';
import pastelIcon from '../assets/images/rosapastelicon-removebg-preview.png';

export default function HowItWorks() {
  useSceneObserver();

  /* Scroll parallax */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
            const speed = parseFloat(el.dataset.parallax || '0.1');
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            el.style.transform = `translateY(${center * speed}px)`;
          });
          ticking = false;
        }); ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <PageHero label="Proceso" title="Cómo Funciona" accentWord="Funciona" theme="dark" />

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════
          INTRO — Así de simple (light)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[700px] h-[700px] -top-40 -right-40" />
        <Particles count={6} color={`${C.rosa}15`} />
        <Deco style={{ top: '10%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>001</Deco>
        <Deco style={{ bottom: '12%', left: '8%', color: C.dark }}>&#x25C6;</Deco>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.dark}03` }}>SIMPLE</span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 anim-scale-in delay-1 flex justify-center">
              <div className="relative">
                <img src={rosaIcon} alt="LUMI" className="w-48 lg:w-64 h-auto" data-parallax="0.08" style={{ animation: 'float 6s ease-in-out infinite' }} />
                <div className="absolute inset-0 -m-12 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.rosa}12 0%, transparent 60%)` }} />
                <div className="absolute pointer-events-none" style={{ width: 80, height: 80, borderRadius: '50%', border: `2px solid ${C.neon}20`, top: '-15%', right: '-15%', animation: 'spin-slow 12s linear infinite' }} />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>La Experiencia</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
                Tan natural como <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>conversar</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-lg" style={{ color: C.grey }}>
                No necesitas aprender comandos ni configurar nada complicado. LUMI funciona con lo más natural que tienes: <strong style={{ color: C.dark }}>tu voz</strong>. Le hablas como le hablarías a alguien de confianza, y ella responde con claridad, calidez y contexto.
              </p>
              <p className="anim-reveal-up delay-3 mt-4 text-base leading-relaxed max-w-lg" style={{ color: C.grey }}>
                Y mientras tú no le hablas, ella sigue ahí — <strong style={{ color: C.dark }}>monitoreando siempre</strong>. Pendiente del entorno, atenta a lo que pase. Tú solo vives. LUMI se encarga del resto.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════
          PASO 01 — HABLA (dark)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[900px] h-[900px] -top-60 -left-60" />
        <Particles count={8} color={`${C.rosa}18`} />
        <Deco style={{ top: '12%', right: '6%' }}>&#x2726;</Deco>
        <Deco style={{ bottom: '18%', left: '4%' }}>&#x25C6;</Deco>
        <Deco style={{ top: '50%', right: '14%' }}>&#x25C8;</Deco>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-0">
          <div className="relative">
            <span className="anim-slide-left delay-0 absolute -top-20 -left-4 select-none pointer-events-none" style={{ fontSize: '15vw', fontWeight: 900, lineHeight: 1, color: C.rosa, opacity: 0.15, letterSpacing: '-0.04em' }}>01</span>
            <div className="relative z-10 pt-16 lg:pt-24">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: C.rosa }}>Paso 01</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
                HABLA <span style={{ color: C.rosa }}>con LUMI</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-md" style={{ color: C.grey }}>
                Solo di lo que necesitas. Puedes pedirle que te recuerde tomar tu medicamento, preguntarle la hora, contarle cómo te sientes o pedirle que llame a un familiar. LUMI entiende el lenguaje natural — habla como si hablaras con alguien que te conoce.
              </p>
              <div className="anim-reveal-up delay-3 mt-8 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${C.rosa}15` }}>
                  <Mic size={18} style={{ color: C.rosa }} />
                </div>
                <p className="text-sm" style={{ color: `${C.white}50` }}>Micrófonos de alta fidelidad capturan tu voz con precisión</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end anim-scale-in delay-2">
            <img src={rosaIcon} alt="LUMI escuchando" style={{ width: 'clamp(180px, 22vw, 340px)', filter: `drop-shadow(0 0 60px ${C.rosa}30)`, animation: 'float 6s ease-in-out infinite' }} data-parallax="0.06" />
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════
          PASO 02 — PROCESA (light)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center" style={{ background: C.light }}>
        <BlobBG color={C.azul} opacity={0.05} className="w-[800px] h-[800px] -bottom-40 -right-40" />
        <Particles count={6} color={`${C.azul}15`} />
        <Deco style={{ top: '10%', left: '8%', color: C.dark }}>&#x25C6;</Deco>
        <Deco style={{ bottom: '14%', right: '6%', color: C.dark }}>&#x2726;</Deco>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-0">
          {/* Image left — flipped */}
          <div className="flex items-center justify-center lg:justify-start order-2 lg:order-1 anim-scale-in delay-2">
            <img src={azulIcon} alt="LUMI procesando" style={{ width: 'clamp(180px, 22vw, 340px)', filter: `drop-shadow(0 0 60px ${C.azul}30)`, animation: 'float 6s ease-in-out 1s infinite' }} data-parallax="-0.06" />
          </div>
          {/* Text right */}
          <div className="relative order-1 lg:order-2">
            <span className="anim-slide-right delay-0 absolute -top-20 -right-4 select-none pointer-events-none" style={{ fontSize: '15vw', fontWeight: 900, lineHeight: 1, color: C.azul, opacity: 0.12, letterSpacing: '-0.04em' }}>02</span>
            <div className="relative z-10 pt-16 lg:pt-24">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: C.azul }}>Paso 02</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
                LUMI <span style={{ color: C.azul }}>procesa</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-md" style={{ color: C.grey }}>
                Tu voz se convierte en texto, viaja de forma cifrada a un sistema inteligente en la nube y se analiza en milisegundos. El sistema de LUMI interpreta lo que dijiste, entiende el contexto y genera la mejor respuesta posible — todo esto sin que tú notes el proceso.
              </p>
              <div className="anim-reveal-up delay-3 mt-8 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${C.azul}12` }}>
                  <Cloud size={18} style={{ color: C.azul }} />
                </div>
                <p className="text-sm" style={{ color: C.grey }}>Procesamiento seguro en la nube con cifrado de extremo a extremo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider flip darkToLight={false} />

      {/* ═══════════════════════════════════════════════════
          PASO 03 — RESPONDE (dark)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center" style={{ background: C.dark }}>
        <BlobBG color={C.neon} opacity={0.03} className="w-[850px] h-[850px] -top-40 -right-60" />
        <Particles count={8} color={`${C.neon}15`} />
        <Deco style={{ top: '14%', left: '10%' }}>&#x25C8;</Deco>
        <Deco style={{ bottom: '12%', right: '8%' }}>&#x2726;</Deco>
        <Deco style={{ top: '60%', left: '5%' }}>&#x2295;</Deco>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-0">
          <div className="relative">
            <span className="anim-slide-left delay-0 absolute -top-20 -left-4 select-none pointer-events-none" style={{ fontSize: '15vw', fontWeight: 900, lineHeight: 1, color: C.neon, opacity: 0.12, letterSpacing: '-0.04em' }}>03</span>
            <div className="relative z-10 pt-16 lg:pt-24">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: C.neon }}>Paso 03</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
                LUMI <span style={{ color: C.neon }}>responde</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-md" style={{ color: C.grey }}>
                LUMI te habla con una voz clara y cálida. Mientras lo hace, su rostro LED cambia de expresión para que sepas que te está escuchando, pensando o respondiendo.
              </p>
              <div className="anim-reveal-up delay-3 mt-8 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${C.neon}12` }}>
                  <MessageSquare size={18} style={{ color: C.neon }} />
                </div>
                <p className="text-sm" style={{ color: `${C.white}50` }}>Voz sintetizada de alta calidad con expresiones LED en tiempo real</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end anim-scale-in delay-2">
            <img src={pastelIcon} alt="LUMI respondiendo" style={{ width: 'clamp(180px, 22vw, 340px)', filter: `drop-shadow(0 0 60px ${C.neon}20)`, animation: 'float 6s ease-in-out 2s infinite' }} data-parallax="0.07" />
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════
          PASO 04 — PROTEGE (light)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[800px] h-[800px] -top-40 -left-40" />
        <Particles count={5} color={`${C.rosa}12`} />
        <Deco style={{ top: '10%', right: '8%', color: C.dark }}>&#x25C6;</Deco>
        <Deco style={{ bottom: '15%', left: '5%', color: C.dark }}>&#x25C8;</Deco>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-0">
          <div className="flex items-center justify-center lg:justify-start order-2 lg:order-1 anim-scale-in delay-2">
            <div className="relative">
              <img src={rosaIcon} alt="LUMI protegiendo" className="w-40 lg:w-56 h-auto" data-parallax="-0.05" style={{ animation: 'float 7s ease-in-out infinite' }} />
              <div className="absolute inset-0 -m-12 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.rosa}10 0%, transparent 60%)` }} />
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <span className="anim-slide-right delay-0 absolute -top-20 -right-4 select-none pointer-events-none" style={{ fontSize: '15vw', fontWeight: 900, lineHeight: 1, color: C.rosa, opacity: 0.1, letterSpacing: '-0.04em' }}>04</span>
            <div className="relative z-10 pt-16 lg:pt-24">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: C.rosa }}>Paso 04</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
                LUMI <span style={{ color: C.rosa }}>protege</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-md" style={{ color: C.grey }}>
                Mientras LUMI acompaña, también vigila. Sus sensores monitorean el entorno constantemente — temperatura, movimiento, humo. Si algo no está bien, activa alertas automáticas. Y si la persona necesita ayuda urgente, el botón SOS envía su ubicación a todos los contactos de emergencia en segundos.
              </p>
              <div className="anim-reveal-up delay-3 mt-8 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${C.rosa}12` }}>
                  <Shield size={18} style={{ color: C.rosa }} />
                </div>
                <p className="text-sm" style={{ color: C.grey }}>Monitoreo ambiental continuo con respuesta automática ante riesgos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider flip darkToLight={false} />

      {/* ═══════════════════════════════════════════════════
          PASO 05 — INFORMA (dark)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative min-h-screen overflow-hidden flex items-center" style={{ background: C.dark }}>
        <BlobBG color={C.azul} opacity={0.04} className="w-[800px] h-[800px] -bottom-40 -right-40" />
        <Particles count={6} color={`${C.azul}15`} />
        <Deco style={{ top: '10%', left: '6%', color: C.azul }}>&#x2726;</Deco>
        <Deco style={{ bottom: '12%', right: '8%' }}>&#x25C8;</Deco>
        <div className="absolute pointer-events-none" style={{ width: 250, height: 250, borderRadius: '50%', border: `1px solid ${C.white}05`, left: '-3%', top: '30%', animation: 'spin-slow 30s linear infinite' }} />

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-24 lg:py-0">
          <div className="relative">
            <span className="anim-slide-left delay-0 absolute -top-20 -left-4 select-none pointer-events-none" style={{ fontSize: '15vw', fontWeight: 900, lineHeight: 1, color: C.azul, opacity: 0.12, letterSpacing: '-0.04em' }}>05</span>
            <div className="relative z-10 pt-16 lg:pt-24">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-4" style={{ color: C.azul }}>Paso 05</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
                LUMI <span style={{ color: C.azul }}>informa</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-md" style={{ color: C.grey }}>
                La familia recibe reportes claros del bienestar diario. Desde una app pueden ver el estado de salud, revisar actividad, ajustar recordatorios y comunicarse con su ser querido. Transparencia total — todos conectados, todos tranquilos.
              </p>
              <div className="anim-reveal-up delay-3 mt-8 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: `${C.azul}15` }}>
                  <Bell size={18} style={{ color: C.azul }} />
                </div>
                <p className="text-sm" style={{ color: `${C.white}50` }}>Notificaciones personalizadas para cada miembro de la familia</p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end anim-scale-in delay-2">
            <img src={azulIcon} alt="LUMI informando" style={{ width: 'clamp(180px, 22vw, 340px)', filter: `drop-shadow(0 0 60px ${C.azul}30)`, animation: 'float 6s ease-in-out infinite' }} data-parallax="0.08" />
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════
          RESUMEN VISUAL — El ciclo completo (light)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.grey} opacity={0.03} className="w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Deco style={{ top: '8%', left: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>006</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4 text-center" style={{ color: C.rosa }}>El Ciclo Completo</p>
          <h2 className="anim-reveal-up delay-1 text-center mb-16 lg:mb-24" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
            Cinco pasos. <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>Un ciclo.</span> Siempre activo.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { Icon: Mic, label: 'Habla', desc: 'El usuario se expresa con voz natural', accent: C.rosa },
              { Icon: Cloud, label: 'Procesa', desc: 'IA en la nube analiza y comprende', accent: C.azul },
              { Icon: MessageSquare, label: 'Responde', desc: 'Voz cálida y expresiones LED', accent: C.neon },
              { Icon: Radio, label: 'Protege', desc: 'Sensores monitoreando 24/7', accent: C.rosa },
              { Icon: Bell, label: 'Informa', desc: 'La familia siempre conectada', accent: C.azul },
            ].map((step, i) => (
              <div key={step.label} className={`anim-reveal-up delay-${Math.min(i + 1, 7)} text-center`}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110" style={{ background: `${step.accent}10` }}>
                  <step.Icon size={22} style={{ color: step.accent }} />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.08em] mb-1" style={{ color: C.dark }}>{step.label}</p>
                <p className="text-[10px] leading-snug" style={{ color: C.grey }}>{step.desc}</p>
                {i < 4 && <div className="hidden lg:block mx-auto mt-4 w-8 h-px" style={{ background: `${C.dark}15` }} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════
          IMPACT QUOTE (dark)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative min-h-[60vh] overflow-hidden flex items-center justify-center" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.03} className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        {/* Scribble */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 600 200" fill="none" style={{ width: '80%', maxWidth: 700, height: 'auto', opacity: 0.04 }}>
          <path d="M20 160C80 40 150 20 220 80C290 140 260 180 330 100C400 20 440 60 500 120C560 180 580 80 580 80" stroke={C.rosa} strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
        <Deco style={{ top: '15%', left: '10%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '15%', right: '10%', color: C.neon }}>&#x25C6;</Deco>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="anim-clip-reveal delay-1">
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', color: C.white }}>
              Tú hablas. LUMI <span className="italic" style={{ fontWeight: 400 }}>escucha</span>, <span style={{ color: C.rosa }}>entiende</span>, responde y <span style={{ color: C.neon }}>protege.</span>
            </h2>
          </div>
          <p className="anim-reveal-up delay-3 mt-8 text-base lg:text-lg max-w-lg mx-auto leading-relaxed" style={{ color: C.grey }}>
            Así de simple. Así de poderoso. Tecnología que desaparece para que solo quede lo que importa: cuidar a quienes amas.
          </p>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══ MARQUEE ═══ */}
      <section className="scene relative min-h-[40vh] overflow-hidden flex items-center justify-center" style={{ background: C.light }}>
        <div className="absolute inset-0 flex flex-col justify-center gap-3 pointer-events-none">
          <div className="overflow-hidden"><div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(40px, 10vw, 140px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.dark}05` }}>HABLA — PROCESA — RESPONDE — PROTEGE — INFORMA —</span>))}
          </div></div>
        </div>
        <div className="relative z-10 anim-scale-in delay-1">
          <img src={pastelIcon} alt="" className="w-28 sm:w-40 lg:w-48 h-auto opacity-60" data-parallax="0.12" />
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══ CTA ═══ */}
      <CTASection headline="Descubre a LUMI." sub="Compañía inteligente, seguridad real, tranquilidad para toda tu familia." linkTo="/contact" linkLabel="Contáctanos" />
    </main>
  );
}
