import { useEffect, useRef, useState } from 'react';
import { Heart, Check, Sparkles, Calendar, Truck, Gift, Star, ArrowDown, ArrowUpRight } from 'lucide-react';
import { C, BlobBG, Deco, MarqueeStrip, WaveDivider, Particles, useSceneObserver } from '../components/landing/cinematic';

import lumiPng from '../assets/images/lumipng.png';

const heroTexts = ['RESERVA', 'PREVENTA', 'EXCLUSIVA', 'PIONEROS'];

export default function Preorden() {
  useSceneObserver();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sent'>('idle');
  const [heroTextIdx, setHeroTextIdx] = useState(0);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);

  /* hero text cycling */
  useEffect(() => {
    const iv = setInterval(() => setHeroTextIdx(p => (p + 1) % heroTexts.length), 2200);
    return () => clearInterval(iv);
  }, []);

  /* parallax + scroll */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (heroImgRef.current) heroImgRef.current.style.transform = `translateY(${y * 0.35}px)`;
          if (heroTextRef.current) heroTextRef.current.style.transform = `translateY(${y * -0.25}px) scale(${1 + y * 0.0001})`;
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

  const handlePreorder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !name.trim()) return;
    setEmailStatus('sent');
    setTimeout(() => { setEmailStatus('idle'); setEmail(''); setName(''); }, 5000);
  };

  return (
    <main className="overflow-hidden" style={{ background: C.light }}>

      {/* ═══ 1. HERO — cinematic full-screen ═══ */}
      <section className="scene is-visible relative min-h-screen overflow-hidden flex items-center justify-center" style={{ background: C.light }}>
        <BlobBG color={C.grey} opacity={0.06} className="w-[700px] h-[700px] -top-40 -left-40" />
        <BlobBG color={C.rosa} opacity={0.04} className="w-[500px] h-[500px] -bottom-20 -right-20" />
        <Particles count={12} color={`${C.rosa}30`} />
        <Deco style={{ top: '15%', left: '8%' }}>&#x2726;</Deco>
        <Deco style={{ top: '25%', right: '12%' }}>&#x2B21;</Deco>
        <Deco style={{ bottom: '20%', left: '15%' }}>&#x25C8;</Deco>
        <Deco style={{ bottom: '30%', right: '8%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>001</Deco>
        {/* Diagonal hairlines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[200%] h-px rotate-[25deg] top-[30%] -left-1/2" style={{ background: `${C.grey}15` }} />
          <div className="absolute w-[200%] h-px rotate-[-15deg] top-[60%] -left-1/2" style={{ background: `${C.grey}10` }} />
        </div>
        {/* Spinning ring */}
        <div className="absolute pointer-events-none" style={{ width: 200, height: 200, borderRadius: '50%', border: `1px solid ${C.grey}15`, top: '10%', right: '20%', animation: 'spin-slow 30s linear infinite' }} />

        {/* Cycling bleeding text — massive */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <h1 ref={heroTextRef} className="anim-scale-in delay-1 whitespace-nowrap select-none transition-all duration-700" style={{ fontSize: 'clamp(70px, 18vw, 280px)', lineHeight: 0.85, letterSpacing: '-0.05em', fontWeight: 900, textTransform: 'uppercase', color: C.dark }} key={heroTextIdx}>
            {heroTexts[heroTextIdx]}
          </h1>
        </div>

        {/* Center Lumi — floating with parallax */}
        <div ref={heroImgRef} className="relative z-10 flex flex-col items-center anim-scale-in delay-2">
          <img src={lumiPng} alt="LUMI" className="w-72 sm:w-96 lg:w-[32rem] h-auto drop-shadow-2xl" style={{ animation: 'float 5s ease-in-out infinite' }} />
          <div className="absolute inset-0 -m-8 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.rosa}18 0%, transparent 70%)` }} />
          {/* Edición preventa floating tag */}
          <div className="absolute -top-2 right-0 lg:right-8 rounded-full px-4 py-2 shadow-xl flex items-center gap-2" style={{ background: C.dark, color: C.white, animation: 'float 4s ease-in-out infinite reverse' }}>
            <Sparkles size={14} style={{ color: C.neon }} />
            <span className="text-[10px] font-bold uppercase tracking-[0.15em]">Edición Preventa</span>
          </div>
        </div>

        {/* Bottom-left card */}
        <div className="absolute bottom-8 left-6 lg:bottom-12 lg:left-12 anim-reveal-up delay-4" style={{ maxWidth: 240 }}>
          <div className="rounded-xl p-4 border" style={{ borderColor: `${C.dark}10`, background: `${C.light}cc`, backdropFilter: 'blur(8px)' }}>
            <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: C.grey }}>Edición Limitada</p>
            <div className="flex items-center gap-2 my-2">
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: `${C.dark}10` }}>
                <div className="h-full rounded-full" style={{ width: '32%', background: C.rosa }} />
              </div>
              <span className="text-[10px] font-bold" style={{ color: C.dark }}>32%</span>
            </div>
            <p className="text-sm font-bold" style={{ color: C.dark }}>Primeras 100 reservas</p>
            <p className="text-[10px] mt-0.5" style={{ color: C.grey }}>Beneficios exclusivos para los pioneros</p>
          </div>
        </div>

        {/* Bottom-right card → form CTA */}
        <a href="#reserva" className="absolute bottom-8 right-6 lg:bottom-12 lg:right-12 anim-reveal-up delay-5 flex flex-col items-center gap-2 group">
          <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: C.grey, writingMode: 'vertical-lr' }}>Reserva</span>
          <div className="w-px h-12" style={{ background: `${C.dark}20` }}>
            <div className="w-full" style={{ height: '40%', background: C.rosa, animation: 'float 2s ease-in-out infinite' }} />
          </div>
          <ArrowDown size={14} style={{ color: C.grey }} className="transition-transform duration-300 group-hover:translate-y-1" />
        </a>

        {/* Top-right info */}
        <div className="hidden lg:block absolute top-32 right-12 anim-reveal-up delay-3 text-right">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: C.rosa }}>Pre-orden</p>
          <p className="text-[9px] mt-1 tracking-[0.15em]" style={{ color: C.grey }}>SIN PAGO INICIAL</p>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══ 2. RESERVA — form intimate (dark) ═══ */}
      <section id="reserva" className="scene relative overflow-hidden flex items-center" style={{ background: C.dark, minHeight: '90vh' }}>
        <BlobBG color={C.rosa} opacity={0.05} className="w-[800px] h-[800px] -top-40 -right-40" />
        <Particles count={8} color={`${C.rosa}25`} />
        <Deco style={{ top: '10%', left: '6%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '15%', right: '10%' }}>&#x25C6;</Deco>
        <Deco style={{ top: '20%', right: '6%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>002</Deco>

        {/* Bleeding background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.white}05` }}>RESERVA</span>
        </div>

        {/* Side rotated label */}
        <div className="hidden lg:block absolute left-[-1vw] top-1/2 -translate-y-1/2 pointer-events-none select-none anim-slide-left delay-1">
          <span style={{ fontSize: '14vw', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.06em', textTransform: 'uppercase', color: `${C.rosa}06`, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>TUYA</span>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left — manifesto */}
            <div className="lg:col-span-7 lg:col-start-2">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: C.rosa }}>Sé de los primeros</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(40px, 8vw, 130px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: C.white }}>
                Reserva la <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>tuya.</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-8 text-base lg:text-xl leading-relaxed max-w-xl" style={{ color: C.grey }}>
                Antes de que LUMI esté en todas las casas, queremos que esté en la tuya. Sin pago inicial — solo dinos quién eres y te avisamos cuando abra la preventa oficial.
              </p>

              {/* Form */}
              <form onSubmit={handlePreorder} className="anim-reveal-up delay-4 mt-12 max-w-lg space-y-3">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full px-6 py-5 rounded-2xl text-sm outline-none transition-all duration-300 focus:scale-[1.01]"
                  style={{ background: `${C.white}08`, border: `1px solid ${C.white}15`, color: C.white }}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full px-6 py-5 rounded-2xl text-sm outline-none transition-all duration-300 focus:scale-[1.01]"
                  style={{ background: `${C.white}08`, border: `1px solid ${C.white}15`, color: C.white }}
                />
                <button
                  type="submit"
                  disabled={emailStatus === 'sent'}
                  className="group w-full px-7 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  style={{ background: C.rosa, color: C.white, boxShadow: `0 0 50px ${C.rosa}50` }}
                >
                  {emailStatus === 'sent' ? (
                    <><Check size={18} /> Tu LUMI está reservada</>
                  ) : (
                    <>
                      Reservar mi LUMI
                      <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </>
                  )}
                </button>
                <p className="text-[10px] mt-3 ml-2" style={{ color: C.grey }}>Sin spam, prometido. Te avisamos en cuanto abra la preventa oficial.</p>
              </form>
            </div>

            {/* Right — small Lumi peek */}
            <div className="hidden lg:flex lg:col-span-3 justify-center">
              <div className="relative">
                <div className="absolute inset-0 -m-12 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.rosa}30 0%, transparent 65%)` }} />
                <img src={lumiPng} alt="" className="relative w-full max-w-[260px] h-auto drop-shadow-2xl" data-parallax="0.08" style={{ animation: 'float 7s ease-in-out infinite' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══ 3. BENEFICIOS — editorial cards (light) ═══ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[700px] h-[700px] -top-40 -right-40" />
        <Particles count={6} color={`${C.rosa}18`} />
        <Deco style={{ top: '8%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>003</Deco>
        <Deco style={{ bottom: '15%', left: '8%' }}>&#x25C6;</Deco>

        {/* Bleeding background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 17vw, 260px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.dark}04` }}>BENEFICIOS</span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16 lg:mb-20">
            <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: C.rosa }}>Lo que incluye la preventa</p>
            <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 7vw, 100px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
              Solo para los <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>pioneros.</span>
            </h2>
          </div>

          {/* Benefits grid — bigger, more editorial */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {[
              { Icon: Star, label: 'Precio especial', desc: 'Ahorro exclusivo solo para quienes reservan antes del lanzamiento.', accent: C.rosa },
              { Icon: Truck, label: 'Envío prioritario', desc: 'Tu LUMI llega antes que el resto. Garantizado al lanzamiento.', accent: C.azul },
              { Icon: Gift, label: 'Bienvenida personalizada', desc: 'Atención dedicada y guía para configurar la primera vez.', accent: C.neon },
              { Icon: Sparkles, label: 'Acceso temprano', desc: 'Funciones nuevas y mejoras antes que nadie, siempre.', accent: C.rosa },
            ].map((b, i) => (
              <div key={b.label} className={`group anim-reveal-up delay-${Math.min(i + 2, 7)} relative rounded-3xl p-7 lg:p-8 transition-all duration-500 hover:-translate-y-2 overflow-hidden`} style={{ background: C.white, border: `1px solid ${C.dark}08`, boxShadow: `0 4px 20px ${C.dark}06` }}>
                <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle, ${b.accent}25 0%, transparent 70%)` }} />
                <span className="absolute top-5 right-5 text-[10px] font-bold tracking-[0.2em]" style={{ color: `${C.dark}25` }}>0{i + 1}</span>
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110 group-hover:rotate-[-4deg]" style={{ background: `${b.accent}12`, color: b.accent }}>
                  <b.Icon size={28} strokeWidth={2} />
                </div>
                <p className="text-lg font-black uppercase tracking-[0.04em] mb-3" style={{ color: C.dark }}>{b.label}</p>
                <p className="text-[13px] leading-relaxed" style={{ color: C.grey }}>{b.desc}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500" style={{ background: b.accent }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══ 4. TIMELINE — full editorial steps (dark, alternating) ═══ */}
      <section className="scene relative overflow-hidden py-20 lg:py-28" style={{ background: C.dark }}>
        <BlobBG color={C.azul} opacity={0.04} className="w-[700px] h-[700px] -top-40 -left-40" />
        <Deco style={{ top: '10%', right: '8%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>004</Deco>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: C.rosa }}>Qué pasa después</p>
          <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(40px, 8vw, 130px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: C.white }}>
            Tu camino con <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>LUMI</span>
          </h2>
        </div>
      </section>

      {[
        { num: '01', Icon: Heart, label: 'Reservas hoy', desc: 'Dejas tu nombre y correo. Quedas en la lista de los primeros — sin pagar nada todavía. Sin compromiso, sin presión.', accent: C.rosa },
        { num: '02', Icon: Calendar, label: 'Te avisamos', desc: 'Cuando abra la preventa oficial, eres de los primeros en enterarse. Te enviamos un mensaje personal — no un email automático.', accent: C.azul },
        { num: '03', Icon: Truck, label: 'Llega a tu casa', desc: 'Envío prioritario al lanzamiento. Recibes a LUMI con bienvenida personalizada y guía para los primeros días juntos.', accent: C.neon },
      ].map((s, i) => (
        <section key={s.num} className="scene relative py-16 lg:py-24 overflow-hidden flex items-center" style={{ background: i % 2 === 0 ? C.dark : C.darkAlt }}>
          <Particles count={4} color={`${s.accent}18`} />
          <Deco style={{ top: '10%', left: '5%', color: s.accent }}>&#x2726;</Deco>
          <Deco style={{ bottom: '10%', right: '5%' }}>&#x25C6;</Deco>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className={`lg:col-span-8 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="anim-slide-left delay-0">
                  <span style={{ fontSize: 'clamp(80px, 14vw, 200px)', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.05em', color: s.accent, opacity: 0.14 }}>{s.num}</span>
                </div>
                <div className="anim-reveal-up delay-1 -mt-8 lg:-mt-16">
                  <h3 style={{ fontSize: 'clamp(32px, 5.5vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', color: C.white }}>{s.label}</h3>
                </div>
                <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: C.grey }}>{s.desc}</p>
              </div>
              <div className={`lg:col-span-4 anim-scale-in delay-3 flex ${i % 2 === 1 ? 'lg:order-1 justify-start' : 'justify-end'}`}>
                <div className="relative" data-parallax={`${0.05 + i * 0.02}`}>
                  <div className="absolute inset-0 -m-12 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${s.accent}20 0%, transparent 65%)` }} />
                  <div className="relative w-32 h-32 lg:w-44 lg:h-44 rounded-3xl flex items-center justify-center" style={{ background: `${s.accent}08`, border: `1px solid ${s.accent}25` }}>
                    <s.Icon size={64} strokeWidth={1.4} style={{ color: s.accent }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      <WaveDivider darkToLight />

      {/* ═══ 5. CIERRE EMOCIONAL ═══ */}
      <section className="scene relative min-h-[55vh] overflow-hidden flex items-center justify-center py-24" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.05} className="w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Particles count={8} color={`${C.rosa}18`} />
        <Deco style={{ top: '10%', left: '8%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '15%', right: '10%', color: C.azul }}>&#x25C6;</Deco>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <span className="block anim-scale-in delay-0 select-none" style={{ fontSize: 'clamp(100px, 16vw, 220px)', color: `${C.rosa}40`, fontWeight: 900, lineHeight: 0.6, fontFamily: 'serif' }}>&ldquo;</span>
          <h2 className="anim-clip-reveal delay-2 -mt-2" style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', color: C.dark, textTransform: 'uppercase' }}>
            Sé de los <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>primeros</span> en darle a tu familia esta <span className="italic" style={{ fontWeight: 400, color: C.azul }}>compañía</span>.
          </h2>

          <div className="anim-reveal-up delay-4 mt-12">
            <a href="#reserva" className="group inline-flex items-center gap-3 px-12 py-5 rounded-full text-sm font-black uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.05]" style={{ background: C.rosa, color: C.white, boxShadow: `0 0 50px ${C.rosa}50` }}>
              Reservar mi LUMI
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
