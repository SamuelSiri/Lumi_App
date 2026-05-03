import { useEffect } from 'react';
import { AtSign, Heart, MessageCircle, ArrowUpRight } from 'lucide-react';
import { C, BlobBG, Deco, MarqueeStrip, WaveDivider, Particles, PageHero, useSceneObserver } from '../components/landing/cinematic';

import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';
import lumiPng from '../assets/images/lumipng.png';

const IG_HANDLE = 'heylumi.co';
const IG_URL = `https://instagram.com/${IG_HANDLE}`;
const WA_PHONE = '18498282023';
const WA_MESSAGE = 'Hola LUMI 👋 Me interesa ser aliado de LUMI. Hablemos.';
const WA_URL = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function Apoyar() {
  useSceneObserver();

  /* parallax */
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
      <PageHero label="Apóyanos" title="Acompáñanos en este viaje" accentWord="viaje" theme="light" />

      <MarqueeStrip />

      {/* ═══ 2. COMPARTIR — editorial @heylumi (light) ═══ */}
      <section className="scene relative overflow-hidden flex items-center" style={{ background: C.light, minHeight: '90vh' }}>
        <BlobBG color={C.rosa} opacity={0.05} className="w-[800px] h-[800px] -top-40 -right-40" />
        <Particles count={8} color={`${C.rosa}18`} />
        <Deco style={{ top: '8%', left: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>001</Deco>
        <Deco style={{ bottom: '15%', right: '8%' }}>&#x2726;</Deco>
        <Deco style={{ top: '20%', right: '10%', color: C.rosa }}>&#x25C8;</Deco>

        {/* Bleeding background — gigantic @handle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none anim-clip-lr delay-1" style={{ fontSize: 'clamp(80px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'lowercase', color: `${C.dark}05` }}>@{IG_HANDLE}</span>
        </div>

        {/* Side rotated label */}
        <div className="hidden lg:block absolute left-[-1vw] top-1/2 -translate-y-1/2 pointer-events-none select-none anim-slide-left delay-1">
          <span style={{ fontSize: '14vw', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.06em', textTransform: 'uppercase', color: `${C.rosa}05`, writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>SÍGUENOS</span>
        </div>

        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left — text block */}
            <div className="lg:col-span-7 lg:col-start-2">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: C.rosa }}>Comparte la calma</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(36px, 7vw, 100px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
                Etiquétanos cuando lo <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>cuentes.</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-8 text-base lg:text-lg leading-relaxed max-w-xl" style={{ color: C.grey }}>
                Cada historia que compartes abre una puerta. Cada recomendación llega a una familia que duerme con un susto. Cuando hablas de LUMI, también nos acompañas — y eso vale más que cualquier campaña.
              </p>

              {/* Motivating phrases — minimal, editorial */}
              <div className="anim-reveal-up delay-3 mt-12 space-y-4">
                {[
                  { hash: '01', text: 'Cuéntale a una mamá que vive con la duda.' },
                  { hash: '02', text: 'Etiqueta al hijo que extraña a sus padres lejos.' },
                  { hash: '03', text: 'Comparte la calma con quien la necesita.' },
                ].map((m, i) => (
                  <div key={m.hash} className={`anim-reveal-up delay-${Math.min(i + 4, 7)} flex items-baseline gap-5 max-w-xl`}>
                    <span className="text-xs font-black tracking-[0.2em] shrink-0" style={{ color: `${C.rosa}80` }}>{m.hash}</span>
                    <p className="text-base lg:text-lg leading-snug" style={{ color: C.dark, fontWeight: 500 }}>{m.text}</p>
                  </div>
                ))}
              </div>

              {/* CTA → AtSign */}
              <div className="anim-reveal-up delay-5 mt-14 flex flex-wrap items-center gap-6">
                <a
                  href={IG_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-sm font-bold uppercase tracking-[0.1em] transition-all duration-300 hover:scale-[1.04]"
                  style={{ background: C.dark, color: C.white, boxShadow: `0 0 40px ${C.dark}25` }}
                >
                  <AtSign size={18} />
                  <span>Síguenos en @{IG_HANDLE}</span>
                  <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <p className="text-[11px] font-bold tracking-[0.2em]" style={{ color: C.grey }}>Y úsanos en tus stories</p>
              </div>
            </div>

            {/* Right — Lumi character peeking */}
            <div className="hidden lg:flex lg:col-span-3 justify-center">
              <div className="relative">
                <div className="absolute inset-0 -m-12 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.rosa}25 0%, transparent 65%)` }} />
                <img src={lumiPng} alt="" className="relative w-full max-w-[280px] h-auto drop-shadow-2xl" data-parallax="0.08" style={{ animation: 'float 6s ease-in-out infinite' }} />
                {/* Heart float */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full flex items-center justify-center" style={{ background: C.white, boxShadow: `0 8px 30px ${C.rosa}40`, animation: 'float 4s ease-in-out infinite reverse' }}>
                  <Heart size={20} fill={C.rosa} style={{ color: C.rosa }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ 3. MARQUEE STATEMENT (dark) ═══ */}
      <section className="scene relative min-h-[35vh] overflow-hidden flex items-center justify-center" style={{ background: C.dark }}>
        <div className="absolute inset-0 flex flex-col justify-center gap-2 pointer-events-none">
          <div className="overflow-hidden"><div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(40px, 9vw, 130px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.white}08`, WebkitTextStroke: `1px ${C.white}15` }}>ETIQUÉTANOS — CUÉNTALO — COMPARTE LA CALMA —</span>))}
          </div></div>
          <div className="overflow-hidden"><div className="marquee-track reverse">
            {Array.from({ length: 8 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(40px, 9vw, 130px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.rosa}10`, WebkitTextStroke: `1px ${C.rosa}15` }}>@{IG_HANDLE} — @{IG_HANDLE} — @{IG_HANDLE} —</span>))}
          </div></div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══ 4. ALIADOS — header + cards editoriales (light) ═══ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.azul} opacity={0.05} className="w-[900px] h-[900px] -top-40 -left-40" />
        <BlobBG color={C.rosa} opacity={0.04} className="w-[600px] h-[600px] -bottom-40 -right-40" />
        <Particles count={8} color={`${C.azul}18`} />
        <Deco style={{ top: '10%', right: '6%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>002</Deco>
        <Deco style={{ bottom: '15%', left: '8%', color: C.azul }}>&#x25C6;</Deco>
        <Deco style={{ top: '40%', right: '15%', color: C.rosa }}>&#x2726;</Deco>

        {/* Bleeding background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.dark}04` }}>JUNTOS</span>
        </div>

        {/* Side rotated label */}
        <div className="hidden lg:block absolute right-[-1vw] top-1/2 -translate-y-1/2 pointer-events-none select-none anim-slide-right delay-1">
          <span style={{ fontSize: '14vw', fontWeight: 900, lineHeight: 0.8, letterSpacing: '-0.06em', textTransform: 'uppercase', color: `${C.rosa}05`, writingMode: 'vertical-lr' }}>ALIADOS</span>
        </div>

        {/* Diagonal hairlines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute w-[200%] h-px rotate-[-12deg] top-[35%] -left-1/2" style={{ background: `${C.dark}08` }} />
          <div className="absolute w-[200%] h-px rotate-[8deg] top-[70%] -left-1/2" style={{ background: `${C.dark}05` }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header con mensaje unificado */}
          <div className="max-w-4xl mb-20 lg:mb-28">
            <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: C.rosa }}>Aliados</p>
            <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(40px, 8vw, 130px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: C.dark }}>
              Hagamos esto <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>juntos.</span>
            </h2>
            <p className="anim-reveal-up delay-2 mt-8 text-base lg:text-xl leading-relaxed max-w-2xl" style={{ color: C.grey }}>
              Si tu organización ya cuida a alguien — un equipo, una comunidad, un barrio — puede multiplicar ese cuidado con LUMI.
            </p>
          </div>

          {/* Manifesto — un solo bloque editorial */}
          <div className="anim-reveal-up delay-3 max-w-4xl">
            <p style={{ fontSize: 'clamp(20px, 2.6vw, 36px)', lineHeight: 1.35, letterSpacing: '-0.02em', color: C.dark, fontWeight: 500 }}>
              Si eres una <span className="italic" style={{ color: C.rosa, fontWeight: 600 }}>empresa</span> que cuida a su equipo,
              una <span className="italic" style={{ color: C.azul, fontWeight: 600 }}>fundación</span> que llega a donde nadie llega,
              o un <span className="italic" style={{ color: C.neon, fontWeight: 600 }}>distribuidor</span> que conoce a su comunidad —
              <span style={{ color: C.dark, fontWeight: 700 }}> hablemos</span>. Multiplicar el cuidado es más fácil cuando lo hacemos en equipo.
            </p>
          </div>
        </div>
      </section>

      {/* ═══ 5. CTA HABLEMOS (light) ═══ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40 flex items-center justify-center" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.05} className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Particles count={8} color={`${C.rosa}18`} />
        <Deco style={{ top: '10%', left: '8%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '15%', right: '10%', color: C.azul }}>&#x25C8;</Deco>

        {/* Bleeding bg text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.dark}04` }}>HABLEMOS</span>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: C.rosa }}>Empieza una conversación</p>
          <h2 className="anim-clip-reveal delay-1" style={{ fontSize: 'clamp(36px, 7vw, 96px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
            Cuéntanos quién <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>eres.</span>
          </h2>
          <p className="anim-reveal-up delay-3 mt-8 text-base lg:text-lg leading-relaxed max-w-xl mx-auto" style={{ color: C.grey }}>
            Cada alianza empieza con una conversación honesta. No tenemos un formulario largo — solo escríbenos quién eres, qué haces, y por qué crees que podemos hacerlo juntos.
          </p>

          <div className="anim-reveal-up delay-4 mt-12">
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-12 py-5 rounded-full text-base font-black uppercase tracking-[0.08em] transition-all duration-300 hover:scale-[1.05]"
              style={{ background: C.rosa, color: C.white, boxShadow: `0 0 50px ${C.rosa}50` }}
            >
              <MessageCircle size={18} />
              <span>Hablemos por WhatsApp</span>
              <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          <p className="anim-reveal-up delay-5 mt-8 text-[11px] font-bold tracking-[0.25em]" style={{ color: C.grey }}>O escríbenos a holalumi.info@gmail.com</p>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══ 7. CIERRE EMOCIONAL ═══ */}
      <section className="scene relative min-h-[55vh] overflow-hidden flex items-center justify-center py-24" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Deco style={{ top: '10%', left: '8%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '15%', right: '10%', color: C.neon }}>&#x25C6;</Deco>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <img src={rosaIcon} alt="" className="w-[400px] h-auto opacity-[0.04]" data-parallax="0.05" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <span className="block anim-scale-in delay-0 select-none" style={{ fontSize: 'clamp(100px, 16vw, 220px)', color: `${C.rosa}40`, fontWeight: 900, lineHeight: 0.6, fontFamily: 'serif' }}>&ldquo;</span>
          <h2 className="anim-clip-reveal delay-2 -mt-2" style={{ fontSize: 'clamp(28px, 4.5vw, 64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', color: C.white, textTransform: 'uppercase' }}>
            Cada vida que <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>acompañamos</span> empieza con alguien que <span className="italic" style={{ fontWeight: 400, color: C.neon }}>creyó</span>.
          </h2>
          <p className="anim-reveal-up delay-4 mt-10 text-sm lg:text-base" style={{ color: C.grey }}>
            Gracias por estar acá. Por leer. Por compartir. Por creer en algo que recién empieza.
          </p>
        </div>
      </section>
    </main>
  );
}
