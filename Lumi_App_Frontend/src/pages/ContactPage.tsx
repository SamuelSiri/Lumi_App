import { useState, useCallback } from 'react';
import { MessageCircle } from 'lucide-react';
import {
  C,
  BlobBG,
  Deco,
  MarqueeStrip,
  Particles,
  PageHero,
  useSceneObserver,
} from '../components/landing/cinematic';

const WA_PHONE = '18498282023';
const WA_MESSAGE = 'Hola LUMI 👋 Quiero hablar con ustedes.';
const WA_URL = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(WA_MESSAGE)}`;

export default function ContactPage() {
  useSceneObserver();

  const [contactSent, setContactSent] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setContactSent(true);
      setTimeout(() => setContactSent(false), 3000);
    },
    [],
  );

  const inputStyle: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${C.dark}26`,
    color: C.dark,
    width: '100%',
    padding: '14px 0',
    fontSize: 16,
    outline: 'none',
    transition: 'border-color 0.3s',
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = C.rosa;
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = `${C.dark}26`;
  };

  return (
    <main className="overflow-hidden" style={{ background: C.light }}>
      {/* ─── 1. Hero ─── */}
      <PageHero
        label="Contacto"
        title="Hablemos"
        accentWord="Hablemos"
        accent={C.rosa}
        theme="dark"
      />

      {/* ─── 2. Marquee ─── */}
      <MarqueeStrip />

      {/* ─── 3. Contact form — light section ─── */}
      <section
        className="scene relative overflow-hidden"
        style={{ background: C.light }}
      >
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28 lg:py-40">
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            {/* Left — massive rotated text */}
            <div className="col-span-4 hidden lg:flex items-center justify-center">
              <span
                className="anim-reveal-up delay-1 select-none whitespace-nowrap"
                style={{
                  fontSize: '10vw',
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: '-0.06em',
                  textTransform: 'uppercase',
                  color: C.rosa,
                  writingMode: 'vertical-lr',
                  transform: 'rotate(180deg)',
                  opacity: 0.08,
                }}
              >
                HABLEMOS
              </span>
            </div>

            {/* Right — form content */}
            <div className="col-span-12 lg:col-span-8 max-w-2xl">
              <p
                className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.3em] mb-5"
                style={{ color: C.rosa }}
              >
                ¿Listo para empezar?
              </p>

              <a
                href="mailto:holalumi.info@gmail.com"
                className="anim-reveal-up delay-1 block text-2xl lg:text-4xl font-light mb-14 transition-colors duration-300"
                style={{ color: `${C.dark}80`, textDecoration: 'none' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = C.rosa; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = `${C.dark}80`; }}
              >
                holalumi.info@gmail.com
              </a>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="anim-reveal-up delay-2">
                  <input
                    type="text"
                    placeholder="Nombre"
                    required
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    className="placeholder:text-[#0a0a1233]"
                  />
                </div>

                <div className="anim-reveal-up delay-3">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    style={inputStyle}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    className="placeholder:text-[#0a0a1233]"
                  />
                </div>

                <div className="anim-reveal-up delay-4">
                  <textarea
                    placeholder="Mensaje"
                    required
                    rows={4}
                    style={{
                      ...inputStyle,
                      resize: 'vertical',
                    }}
                    onFocus={focusHandler}
                    onBlur={blurHandler}
                    className="placeholder:text-[#0a0a1233]"
                  />
                </div>

                <div className="anim-reveal-up delay-5 pt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center px-10 py-4 rounded-full text-base font-bold uppercase tracking-[0.08em] transition-all duration-300"
                    style={{
                      background: contactSent ? C.neon : C.rosa,
                      color: contactSent ? C.dark : C.white,
                      boxShadow: contactSent
                        ? `0 0 40px ${C.neon}40`
                        : `0 0 40px ${C.rosa}40`,
                      minWidth: 200,
                    }}
                    onMouseEnter={(e) => {
                      if (!contactSent) e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    {contactSent ? '✓ ENVIADO' : 'Enviar mensaje'}
                  </button>

                  <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: C.grey }}>o</span>

                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold uppercase tracking-[0.08em] transition-all duration-300 hover:scale-[1.05]"
                    style={{
                      background: 'transparent',
                      color: C.dark,
                      border: `1.5px solid ${C.dark}`,
                    }}
                  >
                    <MessageCircle size={18} style={{ color: '#25D366' }} />
                    WhatsApp
                  </a>
                </div>
              </form>

              {/* Quick contacts — IG + phone */}
              <div className="anim-reveal-up delay-6 mt-16 flex flex-wrap gap-x-10 gap-y-4">
                <a
                  href="https://instagram.com/heylumi.co"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
                  style={{ color: C.grey }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.rosa; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.grey; }}
                >
                  @heylumi.co
                </a>
                <a
                  href="tel:+18498282023"
                  className="text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-200"
                  style={{ color: C.grey }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = C.rosa; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = C.grey; }}
                >
                  +1 849 828 2023
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Direct email — dark section ─── */}
      <section
        className="scene relative overflow-hidden"
        style={{ background: C.dark }}
      >
        <BlobBG color={C.rosa} opacity={0.04} className="w-[800px] h-[800px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <Particles count={6} color={`${C.rosa}18`} />
        <Deco style={{ top: '12%', right: '8%' }}>✦</Deco>
        <Deco style={{ bottom: '14%', left: '6%' }}>◆</Deco>
        <Deco style={{ top: '50%', right: '20%' }}>◈</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-28 lg:py-40 text-center">
          <p
            className="anim-reveal-up delay-0 text-sm lg:text-base leading-relaxed mb-6"
            style={{ color: C.grey }}
          >
            También puedes escribirnos directamente a
          </p>
          <a
            href="mailto:holalumi.info@gmail.com"
            className="anim-reveal-up delay-1 inline-block transition-colors duration-300"
            style={{
              fontSize: 'clamp(28px, 5vw, 72px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '-0.04em',
              color: C.white,
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = C.rosa; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = C.white; }}
          >
            holalumi.info@gmail.com
          </a>
        </div>
      </section>
    </main>
  );
}
