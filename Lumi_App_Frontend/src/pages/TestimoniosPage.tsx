import {
  C,
  BlobBG,
  Deco,
  MarqueeStrip,
  WaveDivider,
  Particles,
  PageHero,
  CTASection,
  useSceneObserver,
} from '../components/landing/cinematic';

/* ─── Testimonial Data ─── */

const featured = {
  quote:
    'Desde que LUMI llegó a casa de mi mamá, siento que puedo respirar tranquila. Sé que está acompañada, que si algo pasa me van a avisar al instante. No tiene precio esa paz mental.',
  name: 'Carolina Mejía',
  role: 'Hija y cuidadora',
  company: 'Santo Domingo',
};

const testimonials = [
  {
    quote:
      'Mi abuela vive sola y siempre me preocupaba dejarla. Ahora LUMI le recuerda sus medicamentos, le pone su música favorita y si se cae, me llega la alerta en segundos. Es como tener a alguien de confianza ahí con ella.',
    name: 'María González',
    role: 'Nieta',
    company: 'Santiago',
  },
  {
    quote:
      'Mis hijos le hablan a LUMI como si fuera parte de la familia. Les cuenta cuentos antes de dormir, les recuerda lavarse los dientes y yo puedo ver todo desde la app mientras estoy en el trabajo.',
    name: 'Carlos Ramírez',
    role: 'Padre de familia',
    company: 'Ciudad de México',
  },
  {
    quote:
      'Como geriatra, he visto cómo la soledad afecta a mis pacientes. LUMI no reemplaza el contacto humano, pero llena esos espacios donde la familia no puede estar. La detección de caídas es de primer nivel.',
    name: 'Dra. Laura Mendoza',
    role: 'Geriatra',
    company: 'Bogotá',
  },
  {
    quote:
      'Mi papá tiene principios de Alzheimer. LUMI le recuerda las cosas con paciencia infinita, sin frustrarse, sin cansarse. Le habla bonito. A veces siento que LUMI tiene más paciencia que yo, y eso me hace sentir que está en buenas manos.',
    name: 'Sofía Herrera',
    role: 'Hija y cuidadora',
    company: 'Medellín',
  },
  {
    quote:
      'Trabajo turnos de noche y mi mamá se queda sola. LUMI detectó humo en la cocina a las 2am y me mandó la alerta. Llegué a tiempo. No quiero pensar qué hubiera pasado sin ella.',
    name: 'Roberto Acosta',
    role: 'Hijo',
    company: 'Buenos Aires',
  },
  {
    quote:
      'Tengo un hijo con autismo y LUMI se ha convertido en su compañera favorita. Le habla con calma, le pone sonidos que lo tranquilizan y nunca lo juzga. Ha sido un cambio enorme para nuestra familia.',
    name: 'Ana Lucía Torres',
    role: 'Madre',
    company: 'Lima',
  },
  {
    quote:
      'Lo que más me sorprendió es lo fácil que fue. La encendimos, la conectamos al WiFi y en 10 minutos mi abuela ya estaba hablando con ella. No hubo que explicarle nada — solo hablar.',
    name: 'Diego Morales',
    role: 'Nieto',
    company: 'Quito',
  },
  {
    quote:
      'Dirijo un hogar de ancianos con 40 residentes. Implementamos LUMI en cada habitación y las emergencias detectadas a tiempo se triplicaron. El botón SOS les da una autonomía que antes no tenían.',
    name: 'Patricia Vásquez',
    role: 'Directora',
    company: 'Casa de Vida, Panamá',
  },
];

/* ─── Component ─── */

export default function TestimoniosPage() {
  useSceneObserver();

  return (
    <main>
      {/* ── 1. Hero ── */}
      <PageHero
        label="Testimonios"
        title="Historias reales"
        accentWord="reales"
        theme="dark"
      />

      {/* ── 2. Marquee ── */}
      <MarqueeStrip />

      {/* ── 3. Featured Testimonial ── */}
      <section
        className="scene relative py-24 lg:py-36 overflow-hidden"
        style={{ background: C.light }}
      >
        <BlobBG
          color={C.rosa}
          opacity={0.03}
          className="w-[600px] h-[600px] -top-32 -left-32"
        />
        <Particles count={5} color={`${C.rosa}15`} />
        <Deco style={{ top: '12%', right: '6%' }}>&#x25C8;</Deco>
        <Deco style={{ bottom: '10%', left: '4%' }}>&#x2726;</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div
            className="anim-reveal-up delay-0"
            style={{
              borderLeft: `2px solid ${C.rosa}`,
              paddingLeft: '2rem',
              position: 'relative',
            }}
          >
            {/* Giant quote mark */}
            <span
              className="absolute -top-8 -left-4 select-none pointer-events-none"
              style={{
                fontSize: '8vw',
                fontWeight: 900,
                lineHeight: 1,
                color: C.rosa,
                opacity: 0.1,
              }}
            >
              &ldquo;
            </span>

            <p
              className="anim-reveal-up delay-1 text-2xl lg:text-4xl leading-snug lg:leading-snug max-w-4xl"
              style={{
                fontStyle: 'italic',
                fontWeight: 300,
                color: C.dark,
                letterSpacing: '-0.01em',
              }}
            >
              {featured.quote}
            </p>

            {/* Attribution */}
            <div className="anim-reveal-up delay-2 mt-10 flex items-center gap-4">
              <div
                className="flex items-center justify-center shrink-0"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: `${C.rosa}15`,
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: C.rosa,
                  }}
                >
                  {featured.name[0]}
                </span>
              </div>
              <div>
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: 16,
                    color: C.dark,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {featured.name}
                </p>
                <p style={{ fontSize: 13, color: C.grey }}>
                  {featured.role} — {featured.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Marquee ── */}
      <MarqueeStrip />

      {/* ── 5. Editorial Testimonials Grid (Dark) ── */}
      <section
        className="scene relative py-28 lg:py-40 overflow-hidden"
        style={{ background: C.dark }}
      >
        <BlobBG
          color={C.rosa}
          opacity={0.03}
          className="w-[800px] h-[800px] top-1/4 -right-48"
        />
        <BlobBG
          color={C.azul}
          opacity={0.02}
          className="w-[600px] h-[600px] bottom-0 -left-32"
        />
        <Particles count={8} color={`${C.rosa}18`} />
        <Deco style={{ top: '8%', left: '5%', color: C.white }}>&#x2726;</Deco>
        <Deco style={{ top: '50%', right: '3%', color: C.white }}>&#x25C6;</Deco>
        <Deco style={{ bottom: '12%', left: '12%', color: C.white }}>&#x25C8;</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 space-y-16 lg:space-y-24">
          {testimonials.map((t, i) => {
            const isEven = i % 2 === 1;
            const delayClass = `delay-${i % 4}`;
            return (
              <div
                key={i}
                className={`anim-reveal-up ${delayClass} max-w-3xl ${
                  isEven ? 'lg:ml-auto' : ''
                }`}
                style={{
                  borderLeft: `2px solid ${C.white}0D`,
                  paddingLeft: '1.5rem',
                }}
              >
                <p
                  className="text-lg lg:text-2xl leading-relaxed"
                  style={{
                    fontStyle: 'italic',
                    fontWeight: 300,
                    color: `${C.white}CC`,
                    letterSpacing: '-0.01em',
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: `${C.rosa}15`,
                    }}
                  >
                    <span style={{ fontSize: 15, fontWeight: 700, color: C.rosa }}>
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p
                      style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color: C.white,
                        letterSpacing: '0.02em',
                      }}
                    >
                      {t.name}
                    </p>
                    <p style={{ fontSize: 12, color: C.grey }}>
                      {t.role} — {t.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 6. Wave Divider ── */}
      <WaveDivider darkToLight />

      {/* ── 7. Families marquee ── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: 40, background: C.dark }}
      >
        <div
          className="marquee-track fast"
          style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {Array.from({ length: 6 }).map((_, rep) =>
            ['Familias', 'Abuelos', 'Niños', 'Cuidadores', 'Hogares', 'Padres', 'Madres', 'Profesionales de salud'].map((name, j) => (
              <span
                key={`${rep}-${j}`}
                className="whitespace-nowrap mx-4"
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: '0.15em',
                  color: C.rosa,
                  textTransform: 'uppercase',
                }}
              >
                {name} &#x2726;
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── 8. CTA ── */}
      <CTASection
        headline="Comienza tu historia."
        sub="Únete a las familias que ya confían en LUMI."
        linkTo="/contact"
        linkLabel="Contáctanos"
      />
    </main>
  );
}
