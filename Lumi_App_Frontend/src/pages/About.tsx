import { useEffect } from 'react';
import { Heart, Shield, Eye, Radio, Cpu, Lightbulb, Users, Home } from 'lucide-react';
import { C, BlobBG, Deco, MarqueeStrip, WaveDivider, Particles, PageHero, CTASection, useSceneObserver } from '../components/landing/cinematic';

import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';
import azulIcon from '../assets/images/icono_lumi_azul-removebg-preview.png';
import pastelIcon from '../assets/images/rosapastelicon-removebg-preview.png';
import pastelLogo from '../assets/images/rosa_pastel_logo_completo-removebg-preview.png';

export default function About() {
  useSceneObserver();

  /* Scroll-driven parallax */
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
    <main className="overflow-hidden" style={{ background: C.light }}>

      {/* ═══ 1. HERO ═══ */}
      <PageHero label="Sobre Nosotros" title="Conoce LUMI" accentWord="LUMI" theme="light" />

      <MarqueeStrip />

      {/* ═══ 2. QUÉ ES LUMI — editorial split (dark) ═══ */}
      <section className="scene relative overflow-hidden noise" style={{ background: C.dark }}>
        <BlobBG color={C.azul} opacity={0.05} className="w-[900px] h-[900px] -top-60 -left-60" />
        <Particles count={8} color={`${C.rosa}18`} />
        <Deco style={{ top: '12%', right: '6%' }}>&#x2726;</Deco>
        <Deco style={{ bottom: '15%', left: '4%' }}>&#x25C6;</Deco>
        <Deco style={{ top: '50%', right: '18%' }}>&#x25C8;</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28 lg:py-40 flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Left — massive rotated text */}
          <div className="lg:w-1/3 flex items-center justify-center">
            <span className="anim-slide-left delay-1 select-none whitespace-nowrap" style={{ fontSize: '15vw', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.06em', textTransform: 'uppercase', color: `${C.white}08`, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>LUMI</span>
          </div>
          {/* Right — text */}
          <div className="lg:w-2/3 max-w-2xl">
            <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-6" style={{ color: C.rosa }}>El Dispositivo</p>
            <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
              No es solo <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>tecnología.</span> Es <span style={{ color: C.neon }}>presencia.</span>
            </h2>
            <p className="anim-reveal-up delay-2 mt-8 text-base lg:text-lg leading-relaxed" style={{ color: C.grey }}>
              LUMI es un dispositivo inteligente diseñado para <strong style={{ color: C.white }}>acompañar, cuidar y asistir</strong> a personas en su día a día — especialmente niños, adultos mayores y personas con alguna condición o discapacidad. No es solo un aparato tecnológico, es una presencia constante que busca brindar tranquilidad tanto al usuario como a sus familiares.
            </p>
            <p className="anim-reveal-up delay-3 mt-5 text-base leading-relaxed" style={{ color: C.grey }}>
              Se presenta como un pequeño bot físico, con una forma amigable y atractiva, capaz de comunicarse a través de <strong style={{ color: C.white }}>voz</strong> y <strong style={{ color: C.rosa }}>expresiones visuales</strong> mediante una matriz de luces que simulan un rostro.
            </p>
            <div className="anim-reveal-up delay-4 mt-8 flex flex-wrap gap-3">
              {['Bot Físico', 'Voz Natural', 'Rostro LED', 'Sensores', 'Botón SOS', 'IA en la Nube'].map(tag => (
                <span key={tag} className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.1em]" style={{ color: C.white, border: `1px solid ${C.white}15`, background: `${C.white}05` }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══ 3. EXPRESIONES — visual showcase (light) ═══ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[700px] h-[700px] -top-40 -right-40" />
        <Particles count={6} color={`${C.rosa}15`} />
        <Deco style={{ top: '8%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>003</Deco>
        <Deco style={{ bottom: '12%', left: '8%', color: C.dark }}>&#x25C6;</Deco>

        {/* Bleeding bg text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.dark}03` }}>EXPRESIONES</span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left — mascot with glow */}
            <div className="lg:col-span-5 flex justify-center anim-scale-in delay-1">
              <div className="relative">
                <img src={rosaIcon} alt="LUMI" className="w-48 lg:w-72 h-auto" data-parallax="0.08" style={{ animation: 'float 6s ease-in-out infinite' }} />
                <div className="absolute inset-0 -m-16 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.rosa}12 0%, transparent 60%)` }} />
                {/* Neon ring */}
                <div className="absolute pointer-events-none" style={{ width: 100, height: 100, borderRadius: '50%', border: `2px solid ${C.neon}20`, top: '-10%', right: '-10%', animation: 'spin-slow 12s linear infinite' }} />
              </div>
            </div>
            {/* Right — content */}
            <div className="lg:col-span-7">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Diseño Emocional</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
                Un rostro que <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>siente</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base leading-relaxed max-w-lg" style={{ color: C.grey }}>
                Las expresiones de LUMI cambian según su estado: escuchando, hablando, en alerta, en reposo, entre otros. Esto permite una interacción más humana y fácil de entender, especialmente para niños y adultos mayores.
              </p>
              {/* Expression states */}
              <div className="anim-reveal-up delay-3 mt-10 grid grid-cols-2 gap-4">
                {[
                  { label: 'Escuchando', desc: 'Ojos abiertos, brillo suave', color: C.azul },
                  { label: 'Hablando', desc: 'Boca animada, pulso rítmico', color: C.rosa },
                  { label: 'En Alerta', desc: 'Parpadeo rojo, tono urgente', color: '#EF4444' },
                  { label: 'En Reposo', desc: 'Brillo tenue, respiración suave', color: C.neon },
                ].map((expr, i) => (
                  <div key={expr.label} className={`anim-reveal-up delay-${Math.min(i + 4, 7)} rounded-xl p-4 border transition-all duration-300 hover:scale-[1.03]`} style={{ borderColor: `${C.dark}08`, background: `${C.white}80` }}>
                    <div className="w-3 h-3 rounded-full mb-3" style={{ background: expr.color }} />
                    <p className="text-xs font-bold uppercase tracking-[0.08em]" style={{ color: C.dark }}>{expr.label}</p>
                    <p className="text-[10px] mt-1" style={{ color: C.grey }}>{expr.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider darkToLight={false} />

      {/* ═══ 4. SENSORES Y SEGURIDAD — specs (light) ═══ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.grey} opacity={0.04} className="w-[700px] h-[700px] -top-20 -left-20" />
        <Deco style={{ top: '10%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>005</Deco>
        <Deco style={{ bottom: '15%', left: '10%', color: C.dark }}>&#x25C8;</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left — heading + desc */}
            <div className="lg:col-span-5">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.azul }}>Seguridad Integrada</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
                Más allá de la <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>compañía</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base leading-relaxed" style={{ color: C.grey }}>
                LUMI integra funciones de seguridad importantes. Puede detectar cambios en el entorno como movimiento, temperatura o presencia de humo, y reaccionar ante situaciones de riesgo. También incluye un botón de emergencia SOS que permite enviar alertas rápidas con la ubicación del usuario.
              </p>
              {/* Floating mascot */}
              <div className="anim-scale-in delay-3 mt-10 flex justify-center lg:justify-start">
                <img src={azulIcon} alt="" className="w-32 lg:w-40 h-auto opacity-60" data-parallax="0.1" style={{ animation: 'float 7s ease-in-out infinite' }} />
              </div>
            </div>
            {/* Right — sensor specs */}
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {[
                  { Icon: Radio, label: 'Detección de Movimiento', desc: 'Sensores PIR que detectan presencia, caídas y actividad en el entorno. Alerta inmediata a familiares.', accent: C.rosa },
                  { Icon: Eye, label: 'Sensor de Temperatura', desc: 'Monitoreo continuo de temperatura ambiental. Detecta cambios bruscos que pueden indicar peligro.', accent: C.azul },
                  { Icon: Shield, label: 'Detector de Humo', desc: 'Alerta instantánea ante presencia de humo o gases. Activación automática de protocolo de emergencia.', accent: '#EF4444' },
                  { Icon: Cpu, label: 'Procesador Neural', desc: 'Motor de inteligencia artificial que procesa voz, contexto ambiental y datos de sensores en tiempo real.', accent: C.neon },
                  { Icon: Lightbulb, label: 'Matriz LED Expresiva', desc: 'Rostro animado que comunica estados emocionales. Más de 20 expresiones diferentes adaptadas al contexto.', accent: C.rosa },
                ].map((spec, i) => (
                  <div key={spec.label} className={`anim-slide-right delay-${Math.min(i + 1, 7)} flex items-start gap-5 pb-6 border-b`} style={{ borderColor: `${C.dark}08` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300" style={{ background: `${spec.accent}10` }}>
                      <spec.Icon size={18} style={{ color: spec.accent }} />
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.05em] mb-1" style={{ color: C.dark }}>{spec.label}</p>
                      <p className="text-xs leading-relaxed" style={{ color: C.grey }}>{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══ 6. PARA QUIÉN — split panels (dark) ═══ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40 noise" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[800px] h-[800px] -top-40 -right-40" />
        <Particles count={6} color={`${C.rosa}15`} />
        <Deco style={{ top: '8%', left: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>006</Deco>
        <Deco style={{ bottom: '10%', right: '8%', color: C.azul }}>&#x2726;</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Audiencia</p>
          <h2 className="anim-reveal-up delay-1 mb-16 lg:mb-24" style={{ fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
            Diseñado para quienes más <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>lo necesitan</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { Icon: Users, title: 'Adultos Mayores', desc: 'Independencia con respaldo. Monitoreo de salud, recordatorios de medicamentos, compañía emocional y respuesta instantánea ante emergencias. LUMI les devuelve autonomía sin sacrificar seguridad.', img: rosaIcon, accent: C.rosa },
              { Icon: Heart, title: 'Niños', desc: 'Aprendizaje interactivo, rutinas saludables, cuentos y supervisión inteligente. LUMI acompaña a los más pequeños con diversión segura mientras los padres monitorean todo desde su teléfono.', img: azulIcon, accent: C.azul },
              { Icon: Home, title: 'Personas con Discapacidad', desc: 'Asistencia por voz simplificada, alertas de seguridad y comunicación adaptada. Tecnología que se ajusta a cada necesidad particular, no al revés. Inclusión real a través del diseño.', img: pastelIcon, accent: C.neon },
            ].map((item, i) => (
              <div key={item.title} className={`anim-reveal-up delay-${Math.min(i + 2, 7)} relative rounded-2xl p-8 lg:p-10 overflow-hidden transition-all duration-300 hover:scale-[1.02]`} style={{ background: C.darkAlt, border: `1px solid ${C.white}06` }}>
                {/* Accent bar top */}
                <div className="absolute top-0 left-0 right-0 h-1" style={{ background: item.accent }} />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.accent}15` }}>
                    <item.Icon size={18} style={{ color: item.accent }} />
                  </div>
                  <h3 className="text-base font-bold uppercase tracking-[0.05em]" style={{ color: C.white }}>{item.title}</h3>
                </div>
                <p className="text-sm leading-relaxed mb-8" style={{ color: C.grey }}>{item.desc}</p>
                <div className="flex justify-center">
                  <img src={item.img} alt="" className="w-20 lg:w-24 h-auto opacity-40" data-parallax={`${0.04 + i * 0.02}`} style={{ animation: `float ${5 + i}s ease-in-out infinite` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══ 7. MISIÓN — impact quote (light) ═══ */}
      <section className="scene relative min-h-[70vh] overflow-hidden flex items-center justify-center" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.03} className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        {/* Scribble behind */}
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 600 200" fill="none" style={{ width: '80%', maxWidth: 700, height: 'auto', opacity: 0.04 }}>
          <path d="M20 160C80 40 150 20 220 80C290 140 260 180 330 100C400 20 440 60 500 120C560 180 580 80 580 80" stroke={C.rosa} strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
        <Deco style={{ top: '12%', left: '8%', color: C.dark }}>&#x2726;</Deco>
        <Deco style={{ bottom: '15%', right: '10%', color: C.dark }}>&#x25C6;</Deco>

        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-12 text-center">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-10" style={{ color: C.rosa }}>Nuestra Misión</p>
          <div className="anim-clip-reveal delay-2">
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 76px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', color: C.dark }}>
              Una combinación entre <span style={{ color: C.rosa }}>tecnología</span>, <span className="italic" style={{ fontWeight: 400 }}>cuidado</span> y diseño <span style={{ color: C.neon }}>emocional</span>
            </h2>
          </div>
          <p className="anim-reveal-up delay-3 mt-8 text-base lg:text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: C.grey }}>
            El objetivo principal de LUMI no es solo ser inteligente, sino ser útil y confiable. Busca resolver un problema real: la necesidad de supervisión, compañía y asistencia en personas que muchas veces están solas o requieren atención constante.
          </p>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══ 8. ORIGEN — hecho en Latinoamérica (dark) ═══ */}
      <section className="scene relative overflow-hidden noise" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.03} className="w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Deco style={{ top: '10%', left: '6%' }}>&#x2726;</Deco>
        <Deco style={{ bottom: '12%', right: '10%' }}>&#x25C8;</Deco>
        <Particles count={5} color={`${C.neon}12`} />

        <div className="relative z-10 w-full py-20 lg:py-32">
          <div className="relative w-full flex items-center justify-center" style={{ minHeight: 300 }}>
            <img src={pastelLogo} alt="" className="w-full max-w-[800px] px-8" style={{ opacity: 0.06 }} data-parallax="0.05" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: C.neon }}>Nuestro Origen</p>
              <h2 className="anim-clip-lr delay-1" style={{ fontSize: 'clamp(28px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
                Hecho en<br /><span className="italic" style={{ fontWeight: 400, color: C.rosa }}>Latinoamérica</span>
              </h2>
              <p className="anim-reveal-up delay-3 mt-6 text-sm lg:text-base max-w-lg leading-relaxed" style={{ color: C.grey }}>
                Desde el corazón del continente, construyendo tecnología con propósito, identidad y pasión. LUMI nace de la necesidad real de miles de familias que buscan una forma accesible y cercana de cuidar a quienes más aman.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══ 9. MARQUEE STATEMENT (light) ═══ */}
      <section className="scene relative min-h-[40vh] overflow-hidden flex items-center justify-center" style={{ background: C.light }}>
        <div className="absolute inset-0 flex flex-col justify-center gap-3 pointer-events-none">
          <div className="overflow-hidden"><div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(40px, 10vw, 140px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.dark}05` }}>COMPAÑÍA QUE CUIDA — TECNOLOGÍA CON ALMA —</span>))}
          </div></div>
          <div className="overflow-hidden"><div className="marquee-track reverse">
            {Array.from({ length: 8 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(40px, 10vw, 140px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.rosa}05` }}>LUMI — PRESENCIA INTELIGENTE —</span>))}
          </div></div>
        </div>
        <div className="relative z-10 anim-scale-in delay-1"><img src={pastelIcon} alt="" className="w-28 sm:w-40 lg:w-48 h-auto opacity-70" data-parallax="0.12" /></div>
      </section>

      <MarqueeStrip />

      {/* ═══ 10. CTA ═══ */}
      <CTASection headline="Conoce a LUMI." sub="Tranquilidad para tu familia. Compañía inteligente para quienes más amas." linkTo="/contact" linkLabel="Contáctanos" />
    </main>
  );
}
