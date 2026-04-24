import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { FadeIn } from './motion';

const ease = [0.23, 1, 0.32, 1] as const;

const testimonials = [
  {
    quote: 'Desde que Lumi llegó a casa, mi mamá se siente acompañada incluso cuando no puedo visitarla. Las alertas me dan una tranquilidad increíble.',
    name: 'María González',
    role: 'Hija y cuidadora',
  },
  {
    quote: 'Mis hijos adoran a Lumi. Les recuerda lavarse los dientes, les cuenta cuentos y yo puedo supervisar todo desde el trabajo.',
    name: 'Carlos Ramírez',
    role: 'Padre de familia',
  },
  {
    quote: 'Como geriatra, recomiendo Lumi a todas las familias. La detección de caídas y el monitoreo de signos vitales son de primer nivel.',
    name: 'Dra. Laura Mendoza',
    role: 'Geriatra',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <section className="editorial-section bg-negro relative overflow-hidden" ref={ref}>
      {/* Subtle rosa glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rosa/3 blur-[200px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <FadeIn className="mb-20 lg:mb-28">
          <p className="text-rosa text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
            Testimonios
          </p>
          <h2 className="text-4xl lg:text-7xl font-display font-bold text-white leading-[1.05] max-w-3xl">
            Familias que confían en{' '}
            <span className="italic text-gradient-rosa">Lumi</span>
          </h2>
        </FadeIn>

        {/* Editorial testimonial layout — staggered, not grid */}
        <div className="space-y-12 lg:space-y-0 lg:grid lg:grid-cols-12 lg:gap-8">
          {testimonials.map((t, i) => {
            // Stagger columns: first starts at col 1, second at 2, third at 1
            const colStart = i === 1 ? 'lg:col-start-5' : i === 2 ? 'lg:col-start-3' : 'lg:col-start-1';
            return (
              <motion.div
                key={t.name}
                className={`lg:col-span-8 ${colStart}`}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease }}
              >
                <div className="group relative border-l-2 border-white/5 pl-8 lg:pl-12 py-6 hover:border-rosa/30 transition-colors duration-500">
                  <Quote size={28} className="text-rosa/15 mb-4" />

                  <p className="text-lg lg:text-2xl font-display text-white/80 leading-relaxed italic">
                    "{t.quote}"
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    {/* Initial avatar */}
                    <div className="w-12 h-12 rounded-full bg-rosa/10 flex items-center justify-center">
                      <span className="text-rosa font-display font-bold text-lg">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-sans font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-gris-500 font-sans mt-0.5">{t.role}</p>
                    </div>
                    <div className="ml-auto flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={12} className="fill-rosa text-rosa" />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
