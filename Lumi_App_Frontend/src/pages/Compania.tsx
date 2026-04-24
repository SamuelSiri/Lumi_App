import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Smile,
  MessageCircle,
  Music,
  Gamepad2,
  BookOpen,
  Heart,
  Sun,
  Moon,
  Coffee,
  Phone,
  Camera,
  CloudSun,
} from 'lucide-react';
import LumiCharacter from '../components/LumiCharacter';
import {
  FadeIn,
  Parallax,
  AnimatedCounter,
  ease,
  SectionDivider,
  staggerContainer,
  staggerItem,
} from '../components/landing/motion';

/* ─── Data ─── */

const companionFeatures = [
  {
    icon: MessageCircle,
    title: 'Conversaciones naturales',
    desc: 'Diálogos empáticos y contextuales. Lumi recuerda lo que hablaron ayer y pregunta cómo siguió la situación.',
    color: 'rosa' as const,
  },
  {
    icon: Music,
    title: 'Música personalizada',
    desc: 'Reproduce las canciones favoritas de cada persona. Sugiere música según el estado de ánimo detectado.',
    color: 'azul' as const,
  },
  {
    icon: Gamepad2,
    title: 'Juegos cognitivos',
    desc: 'Actividades diseñadas por neuropsicólogos para mantener la mente activa y estimulada.',
    color: 'rosa' as const,
  },
  {
    icon: BookOpen,
    title: 'Historias y cuentos',
    desc: 'Narra historias personalizadas, lee noticias del día y comparte datos curiosos.',
    color: 'azul' as const,
  },
  {
    icon: Sun,
    title: 'Rutinas del día',
    desc: 'Buenos días con revisión de clima, recordatorios amigables y motivación personalizada.',
    color: 'rosa' as const,
  },
  {
    icon: Moon,
    title: 'Compañía nocturna',
    desc: 'Monitoreo silencioso, luz tenue de compañía y respuesta inmediata si detecta incomodidad.',
    color: 'azul' as const,
  },
];

const dayMoments = [
  {
    time: '7:30 AM',
    icon: CloudSun,
    title: 'Buenos días, María',
    narrative:
      'Lumi detecta que María se despertó y la saluda con cariño. Le cuenta el clima, le recuerda tomar su medicación y pone su bolero favorito mientras prepara el desayuno.',
    color: 'rosa' as const,
  },
  {
    time: '10:00 AM',
    icon: Coffee,
    title: 'Hora del café y la charla',
    narrative:
      'Mientras María toma su café, Lumi le lee las noticias del día. Juntos comentan lo que pasó y María le cuenta una anécdota de cuando era joven. Lumi la recuerda para la próxima vez.',
    color: 'azul' as const,
  },
  {
    time: '1:00 PM',
    icon: Phone,
    title: 'Videollamada con la familia',
    narrative:
      'Su nieta llama desde otra ciudad. Lumi facilita la conexión, ajusta el volumen y, cuando cuelgan, le pregunta a María cómo se siente. "Contenta", dice ella sonriendo.',
    color: 'rosa' as const,
  },
  {
    time: '4:00 PM',
    icon: Gamepad2,
    title: 'Juegos y risas',
    narrative:
      'Es hora de ejercitar la mente. Lumi propone un juego de trivia sobre películas clásicas. María acierta casi todas y se ríe cuando Lumi "pierde" a propósito.',
    color: 'azul' as const,
  },
  {
    time: '7:30 PM',
    icon: Camera,
    title: 'Recuerdos del álbum',
    narrative:
      'Antes de cenar, María le pide a Lumi que muestre fotos de la familia. Juntos repasan los momentos felices y Lumi graba un mensaje de voz para enviar a los nietos.',
    color: 'rosa' as const,
  },
  {
    time: '9:30 PM',
    icon: Moon,
    title: 'Buenas noches, María',
    narrative:
      'Lumi baja la luz, pone sonidos suaves de naturaleza y le desea buenas noches. Durante la noche, permanece atento en silencio, listo para cualquier necesidad.',
    color: 'azul' as const,
  },
];

/* ─── Floating Bubbles ─── */

const bubbles = [
  { text: '¿Quieres escuchar música?', position: 'top-0 right-4 lg:right-8', bg: 'bg-white text-gris-600', rounded: 'rounded-2xl rounded-br-sm', delay: 0 },
  { text: 'Te cuento algo bonito', position: 'bottom-16 left-0 lg:left-4', bg: 'bg-rosa text-white', rounded: 'rounded-2xl rounded-bl-sm', delay: 2 },
  { text: '¿Cómo dormiste anoche?', position: 'top-20 left-0 lg:-left-4', bg: 'bg-azul text-white', rounded: 'rounded-2xl rounded-tl-sm', delay: 4 },
];

/* ─── Component ─── */

export default function Compania() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false });

  return (
    <main className="pt-28 pb-12 overflow-x-hidden">
      {/* ═══ HERO ═══ */}
      <section className="py-16 lg:py-28 bg-rosa-light/30 relative" ref={heroRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <div className="space-y-6">
              <FadeIn direction="up">
                <span className="text-rosa text-sm font-semibold tracking-wider uppercase">
                  Compañía
                </span>
              </FadeIn>

              <FadeIn direction="up" delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-negro leading-tight">
                  Un amigo que siempre{' '}
                  <span className="text-rosa">está</span>
                </h1>
              </FadeIn>

              <FadeIn direction="up" delay={0.2}>
                <p className="text-gris-500 text-lg lg:text-xl leading-relaxed max-w-lg">
                  Lumi no reemplaza a la familia. Llena los espacios entre cada visita con
                  presencia afectiva, conversación y actividades que alegran el día.
                </p>
              </FadeIn>

              <FadeIn direction="up" delay={0.3}>
                <p className="text-gris-400 text-base leading-relaxed max-w-lg">
                  Imagina que tu ser querido nunca más tenga que comer solo, ni pasar
                  una tarde sin alguien con quien hablar. Eso es Lumi.
                </p>
              </FadeIn>
            </div>

            {/* Lumi + bubbles */}
            <FadeIn direction="right" delay={0.3}>
              <Parallax speed={0.08} className="flex justify-center">
                <div className="relative">
                  <LumiCharacter size="xl" />

                  {bubbles.map((b, i) => (
                    <motion.div
                      key={i}
                      className={`absolute ${b.position} ${b.bg} shadow-md text-sm px-4 py-2 ${b.rounded} whitespace-nowrap`}
                      animate={
                        isHeroInView
                          ? { opacity: [0, 1, 1, 0], y: [12, 0, 0, -12] }
                          : {}
                      }
                      transition={{
                        duration: 4,
                        delay: b.delay,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease,
                      }}
                    >
                      {b.text}
                    </motion.div>
                  ))}
                </div>
              </Parallax>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider color="rosa" />

      {/* ═══ STATS ═══ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-negro text-center mb-12">
              Impacto <span className="text-rosa">real</span> en la vida diaria
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Heart, value: 87, suffix: '%', label: 'Reducción de soledad', color: 'rosa' },
              { icon: Smile, value: 94, suffix: '%', label: 'Satisfacción familiar', color: 'azul' },
              { icon: MessageCircle, value: 50, suffix: '+', label: 'Conversaciones diarias', color: 'rosa' },
            ].map((stat, i) => {
              const Icon = stat.icon;
              const isRosa = stat.color === 'rosa';
              return (
                <FadeIn key={stat.label} direction="up" delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.03, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                    transition={{ duration: 0.3, ease }}
                    className="text-center p-8 rounded-2xl bg-gris-50/60 border border-gris-100"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                        isRosa ? 'bg-rosa-light text-rosa' : 'bg-azul-light text-azul'
                      }`}
                    >
                      <Icon size={22} />
                    </div>
                    <AnimatedCounter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-4xl font-extrabold text-negro"
                    />
                    <p className="text-sm text-gris-400 mt-2">{stat.label}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* ═══ FEATURES (staggered grid) ═══ */}
      <section className="py-20 lg:py-32 bg-gris-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro text-center mb-4">
              Momentos de <span className="text-rosa">conexión</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <p className="text-gris-400 text-center text-lg max-w-2xl mx-auto mb-16">
              Cada interacción está diseñada para generar bienestar emocional y
              mantener la mente activa.
            </p>
          </FadeIn>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-80px' }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {companionFeatures.map((feat) => {
              const Icon = feat.icon;
              const isRosa = feat.color === 'rosa';
              return (
                <motion.div
                  key={feat.title}
                  variants={staggerItem}
                  whileHover={{
                    y: -6,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.08)',
                  }}
                  className="bg-white rounded-2xl p-7 shadow-sm border border-gris-100 cursor-default group"
                >
                  <motion.div
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${
                      isRosa
                        ? 'bg-rosa-light text-rosa'
                        : 'bg-azul-light text-azul'
                    }`}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-negro mb-2">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-gris-500 leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <SectionDivider color="rosa" />

      {/* ═══ A DAY IN THE LIFE ═══ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <span className="text-azul text-sm font-semibold tracking-wider uppercase block text-center mb-3">
              Un día con Lumi
            </span>
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro text-center mb-4">
              La historia de <span className="text-azul">María</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.15}>
            <p className="text-gris-400 text-center text-lg max-w-2xl mx-auto mb-20">
              María tiene 78 años y vive sola. Su familia trabaja durante el día.
              Así es como Lumi transforma cada momento de su jornada.
            </p>
          </FadeIn>

          <div className="space-y-20 lg:space-y-28">
            {dayMoments.map((moment, i) => {
              const Icon = moment.icon;
              const isEven = i % 2 === 0;
              const isRosa = moment.color === 'rosa';
              const direction = isEven ? 'left' : 'right';

              return (
                <div
                  key={moment.time}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  {/* Text column */}
                  <FadeIn
                    direction={direction}
                    delay={0.1}
                    className={isEven ? 'lg:order-1' : 'lg:order-2'}
                  >
                    <div className="space-y-4">
                      <span
                        className={`inline-block text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full ${
                          isRosa
                            ? 'bg-rosa-light text-rosa'
                            : 'bg-azul-light text-azul'
                        }`}
                      >
                        {moment.time}
                      </span>
                      <h3 className="text-2xl lg:text-3xl font-extrabold text-negro">
                        {moment.title}
                      </h3>
                      <p className="text-gris-500 text-base lg:text-lg leading-relaxed">
                        {moment.narrative}
                      </p>
                    </div>
                  </FadeIn>

                  {/* Illustration column */}
                  <FadeIn
                    direction={isEven ? 'right' : 'left'}
                    delay={0.2}
                    className={isEven ? 'lg:order-2' : 'lg:order-1'}
                  >
                    <Parallax speed={0.06}>
                      <motion.div
                        whileHover={{
                          scale: 1.03,
                          boxShadow: '0 20px 50px rgba(0,0,0,0.08)',
                        }}
                        transition={{ duration: 0.4, ease }}
                        className={`relative flex items-center justify-center rounded-3xl p-10 lg:p-14 ${
                          isRosa ? 'bg-rosa-light/40' : 'bg-azul-light/40'
                        }`}
                      >
                        <LumiCharacter size="lg" />
                        <motion.div
                          className={`absolute -top-3 -right-3 w-12 h-12 rounded-2xl flex items-center justify-center shadow-md ${
                            isRosa
                              ? 'bg-rosa text-white'
                              : 'bg-azul text-white'
                          }`}
                          animate={{ rotate: [0, 8, -8, 0] }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <Icon size={20} />
                        </motion.div>
                      </motion.div>
                    </Parallax>
                  </FadeIn>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* ═══ CTA ═══ */}
      <section className="py-20 lg:py-28 bg-gris-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-extrabold text-negro">
                Nadie debería sentirse{' '}
                <span className="text-rosa">solo</span>
              </h2>
              <p className="text-gris-500 text-lg leading-relaxed">
                Lumi convierte cada día en una oportunidad de conexión, alegría y
                tranquilidad. Para ellos y para toda la familia.
              </p>
              <motion.a
                href="/contacto"
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: '0 12px 40px rgba(253,66,130,0.3)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.3, ease }}
                className="inline-block bg-rosa text-white font-bold px-10 py-4 rounded-full text-lg shadow-lg shadow-rosa/20"
              >
                Conocer a Lumi
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
