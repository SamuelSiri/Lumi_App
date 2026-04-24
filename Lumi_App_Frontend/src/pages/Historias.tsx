import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Star, Heart, Quote, Users } from 'lucide-react';
import {
  FadeIn,
  Parallax,
  AnimatedCounter,
  ease,
  SectionDivider,
  staggerContainer,
  staggerItem,
} from '../components/landing/motion';
import LumiCharacter from '../components/LumiCharacter';

const testimonials = [
  {
    quote: 'Desde que Lumi llegó a casa, mi mamá se siente acompañada incluso cuando no puedo visitarla. Las alertas me dan una tranquilidad increíble.',
    name: 'María González',
    role: 'Hija y cuidadora',
    rating: 5,
  },
  {
    quote: 'Mis hijos adoran a Lumi. Les recuerda lavarse los dientes, les cuenta cuentos y yo puedo supervisar todo desde el trabajo. Es fantástico.',
    name: 'Carlos Ramírez',
    role: 'Padre de familia',
    rating: 5,
  },
  {
    quote: 'Como geriatra, recomiendo Lumi a todas las familias. La detección de caídas y el monitoreo de signos vitales son de primer nivel.',
    name: 'Dra. Laura Mendoza',
    role: 'Geriatra',
    rating: 5,
  },
  {
    quote: 'Mi abuela vive sola y siempre me preocupaba. Con Lumi, sé que está segura y acompañada. Es como tener un ángel guardián tecnológico.',
    name: 'Ana Sofía Torres',
    role: 'Nieta',
    rating: 5,
  },
  {
    quote: 'La facilidad de uso es impresionante. Mi padre de 82 años aprendió a interactuar con Lumi en menos de un día. Está encantado.',
    name: 'Roberto Herrera',
    role: 'Hijo',
    rating: 5,
  },
  {
    quote: 'En la residencia donde trabajo, instalamos 3 Lumis. La calidad de vida de nuestros residentes mejoró notablemente en el primer mes.',
    name: 'Lic. Patricia Vargas',
    role: 'Directora de residencia geriátrica',
    rating: 5,
  },
];

const impactStats = [
  { value: 10000, suffix: '+', label: 'Familias activas' },
  { value: 98, suffix: '%', label: 'Satisfacción' },
  { value: 87, suffix: '%', label: 'Menos soledad reportada' },
  { value: 45, suffix: 's', label: 'Tiempo promedio de respuesta' },
];

export default function Historias() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: false, margin: '-80px' });

  return (
    <main className="pt-24">
      {/* Hero */}
      <section ref={heroRef} className="relative py-20 lg:py-32 bg-white overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <FadeIn direction="left" distance={40}>
                  <span className="inline-block text-rosa text-sm font-semibold tracking-wider uppercase bg-rosa-light px-4 py-1.5 rounded-full">
                    Historias
                  </span>
                </FadeIn>
                <FadeIn direction="left" distance={40} delay={0.1}>
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-negro leading-tight mt-6">
                    Familias que <span className="text-rosa">confían</span> en Lumi
                  </h1>
                </FadeIn>
                <FadeIn direction="left" distance={40} delay={0.2}>
                  <p className="text-gris-500 text-lg lg:text-xl leading-relaxed max-w-lg mt-6">
                    Cada historia es un testimonio real del impacto que Lumi tiene
                    en la vida de las familias mexicanas.
                  </p>
                </FadeIn>
              </div>
              <FadeIn direction="right" distance={40} delay={0.3} className="flex justify-center">
                <Parallax speed={0.15}>
                  <div className="relative">
                    <div className="absolute -inset-8 bg-rosa-light/40 rounded-full blur-3xl" />
                    <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gris-100 text-center">
                      <Heart size={48} className="text-rosa mx-auto mb-3" />
                      <p className="text-4xl font-extrabold text-negro">
                        <AnimatedCounter value={10000} suffix="+" />
                      </p>
                      <p className="text-sm text-gris-400 mt-1">familias felices</p>
                    </div>
                  </div>
                </Parallax>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </section>

      <SectionDivider color="rosa" />

      {/* Impact stats */}
      <section className="py-16 bg-rosa">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <p className="text-3xl lg:text-5xl font-extrabold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/70 mt-2">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="rosa" />

      {/* Testimonials grid */}
      <section className="py-20 lg:py-32 bg-gris-50/50" ref={gridRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-azul text-sm font-semibold tracking-wider uppercase">Testimonios</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro mt-3">
              Lo que dicen <span className="text-azul">nuestras familias</span>
            </h2>
          </FadeIn>

          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={staggerItem}
                whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(0,0,0,0.08)' }}
                className="bg-white rounded-2xl p-7 shadow-sm border border-gris-100 flex flex-col cursor-default"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} className="fill-rosa text-rosa" />
                  ))}
                </div>

                {/* Quote icon */}
                <Quote size={24} className="text-rosa/20 mb-3" />

                {/* Quote text */}
                <p className="text-sm text-gris-600 leading-relaxed flex-1">
                  {t.quote}
                </p>

                {/* Author */}
                <div className="mt-6 pt-4 border-t border-gris-100 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rosa-light flex items-center justify-center">
                    <Users size={16} className="text-rosa" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-negro">{t.name}</p>
                    <p className="text-xs text-gris-400">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* Bottom CTA */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block"
            >
              <Heart size={48} className="text-rosa mx-auto mb-6" />
            </motion.div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro">
              Tu historia con Lumi <span className="text-rosa">empieza hoy</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-gris-400 text-lg max-w-lg mx-auto">
              Únete a miles de familias que ya descubrieron la tranquilidad de
              tener a Lumi como parte de su hogar.
            </p>
          </FadeIn>
          <FadeIn delay={0.3} className="flex justify-center mt-8">
            <Parallax speed={0.08}>
              <LumiCharacter size="md" />
            </Parallax>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
