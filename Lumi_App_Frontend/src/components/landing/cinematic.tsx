import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

/* ─── Palette ─── */
export const C = {
  rosa: '#FD4282',
  azul: '#3F50B3',
  neon: '#39FF14',
  dark: '#0a0a12',
  darkAlt: '#0e0e1a',
  light: '#f5f0eb',
  lightAlt: '#ede8e3',
  white: '#ffffff',
  grey: '#8a8a8a',
};

/* ─── Scroll to top on route change ─── */
export function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

/* ─── Setup IntersectionObserver for .scene elements ─── */
export function useSceneObserver(deps: unknown[] = []) {
  useEffect(() => {
    // Small delay to ensure DOM is painted after state changes
    const timer = setTimeout(() => {
      const scenes = document.querySelectorAll('.scene');
      if (scenes.length === 0) return;
      const observer = new IntersectionObserver(
        (entries) => { entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }); },
        { threshold: 0.1 }
      );
      scenes.forEach((s) => observer.observe(s));
      return () => observer.disconnect();
    }, 50);
    return () => clearTimeout(timer);
  }, deps);
}

/* ─── Blob SVG background ─── */
export function BlobBG({ color = C.rosa, opacity = 0.04, className = '' }: { color?: string; opacity?: number; className?: string }) {
  return (
    <svg className={`absolute pointer-events-none ${className}`} viewBox="0 0 800 800" fill="none" style={{ opacity }}>
      <path d="M400 100C520 100 650 180 680 300C710 420 640 520 560 600C480 680 350 700 250 650C150 600 80 500 80 380C80 260 180 100 400 100Z" stroke={color} strokeWidth="1.5" fill="none" />
      <path d="M350 200C430 180 550 230 580 320C610 410 550 490 470 540C390 590 290 580 230 520C170 460 170 350 220 280C270 210 320 210 350 200Z" stroke={color} strokeWidth="1" fill="none" />
    </svg>
  );
}

/* ─── Decorative symbol ─── */
export function Deco({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  return <span className="absolute pointer-events-none select-none" style={{ fontSize: 14, opacity: 0.08, color: C.white, ...style }}>{children}</span>;
}

/* ─── Marquee strip (section transition) ─── */
export function MarqueeStrip() {
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 40, background: C.dark }}>
      <div className="marquee-track fast" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="whitespace-nowrap mx-4" style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', color: C.rosa, textTransform: 'uppercase' }}>
            LUMI ✦ LUMI ✦ LUMI ✦
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── SVG wave divider ─── */
export function WaveDivider({ flip = false, darkToLight = true }: { flip?: boolean; darkToLight?: boolean }) {
  const from = darkToLight ? C.dark : C.light;
  const to = darkToLight ? C.light : C.dark;
  return (
    <div className="relative w-full overflow-hidden" style={{ height: 80, background: to, transform: flip ? 'scaleY(-1)' : 'none' }}>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute bottom-0 w-full h-full">
        <path d="M0,0 C360,80 1080,0 1440,60 L1440,0 L0,0 Z" fill={from} />
      </svg>
    </div>
  );
}

/* ─── Floating particles ─── */
export function Particles({ count = 10, color = C.rosa }: { count?: number; color?: string }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const size = 6 + Math.random() * 10;
        const left = Math.random() * 100;
        const duration = 8 + Math.random() * 12;
        const delay = Math.random() * 10;
        const symbols = ['✦', '◆', '◈', '⊕', '✦', '◆'];
        return (
          <span key={i} className="absolute pointer-events-none select-none" style={{
            left: `${left}%`, bottom: -20, fontSize: size, color, opacity: 0,
            animation: `particle-drift ${duration}s linear ${delay}s infinite`,
          }}>{symbols[i % symbols.length]}</span>
        );
      })}
    </>
  );
}

/* ─── Page hero (reusable for all pages) ─── */
export function PageHero({ label, title, accentWord, accent = C.rosa, theme = 'light' }: {
  label: string; title: string; accentWord: string; accent?: string; theme?: 'light' | 'dark';
}) {
  const bg = theme === 'dark' ? C.dark : C.light;
  const textColor = theme === 'dark' ? C.white : C.dark;
  return (
    <section className="scene is-visible relative min-h-[70vh] overflow-hidden flex items-end" style={{ background: bg }}>
      <BlobBG color={accent} opacity={0.04} className="w-[700px] h-[700px] -top-40 -right-40" />
      <Particles count={6} color={`${accent}20`} />
      <Deco style={{ top: '15%', right: '10%', color: textColor }}>✦</Deco>
      <Deco style={{ bottom: '20%', left: '8%', color: textColor }}>◆</Deco>
      {/* Massive bleeding text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="whitespace-nowrap select-none" style={{
          fontSize: 'clamp(80px, 18vw, 280px)', fontWeight: 900, lineHeight: 0.85,
          letterSpacing: '-0.05em', textTransform: 'uppercase', color: theme === 'dark' ? `${C.white}05` : `${C.dark}05`,
        }}>{title.toUpperCase()}</span>
      </div>
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-16 lg:pb-24 pt-40">
        <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5" style={{ color: accent }}>{label}</p>
        <h1 className="anim-reveal-up delay-1" style={{
          fontSize: 'clamp(40px, 8vw, 120px)', fontWeight: 900, lineHeight: 0.9,
          letterSpacing: '-0.04em', textTransform: 'uppercase', color: textColor,
        }}>
          {title.split(accentWord)[0]}
          <span className="italic" style={{ fontWeight: 400, color: accent }}>{accentWord}</span>
          {title.split(accentWord)[1] || ''}
        </h1>
      </div>
    </section>
  );
}

/* ─── CTA section (reusable) ─── */
export function CTASection({ headline, sub, linkTo = '/contact', linkLabel = 'Comenzar ahora' }: {
  headline: string; sub: string; linkTo?: string; linkLabel?: string;
}) {
  return (
    <section className="scene is-visible relative py-28 lg:py-40 overflow-hidden" style={{ background: C.dark }}>
      <BlobBG color={C.rosa} opacity={0.03} className="w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div className="anim-scale-in delay-0 mx-auto mb-8" style={{ width: 8, height: 8, borderRadius: '50%', background: C.neon, boxShadow: `0 0 20px ${C.neon}60` }} />
        <h2 className="anim-clip-reveal delay-1" style={{
          fontSize: 'clamp(28px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9,
          letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white,
        }}>{headline}</h2>
        <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg max-w-md mx-auto leading-relaxed" style={{ color: C.grey }}>{sub}</p>
        <div className="anim-reveal-up delay-3 mt-10">
          <Link to={linkTo} className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-bold uppercase tracking-[0.08em] transition-all duration-300"
            style={{ background: C.rosa, color: C.white, boxShadow: `0 0 40px ${C.rosa}40` }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          >{linkLabel} &rarr;</Link>
        </div>
      </div>
    </section>
  );
}
