import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check } from 'lucide-react';
import { FadeIn } from './motion';
import iconoNegro from '../../assets/images/icono_lumi_negro.png';
import iconoAzul from '../../assets/images/icono_lumi_azul.png';

const ease = [0.23, 1, 0.32, 1] as const;

const childBenefits = [
  'Aprendizaje interactivo adaptado a su edad',
  'Alertas para padres en tiempo real',
  'Rutinas saludables con recordatorios',
  'Entretenimiento sano y seguro',
];

const elderBenefits = [
  'Mayor independencia con asistencia 24h',
  'Gestión de medicación automatizada',
  'Compañía que reduce la soledad',
  'Respuesta ante emergencias inmediata',
];

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <section className="relative overflow-hidden" ref={ref}>
      {/* Top — Rosa block: Child care */}
      <div className="bg-rosa editorial-section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <FadeIn direction="left">
                <p className="text-white/50 text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                  Para los pequeños
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.1}>
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-white leading-[1.05]">
                  Cuidado{' '}
                  <span className="italic underline decoration-white/30 underline-offset-8">infantil</span>
                </h2>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <p className="mt-6 text-lg text-white/70 leading-relaxed font-sans max-w-md">
                  Lumi acompaña a los más pequeños con diversión segura
                  y educativa.
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.3}>
                <ul className="mt-10 space-y-4">
                  {childBenefits.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-sm lg:text-base text-white/90 font-sans">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </FadeIn>
            </div>

            <FadeIn direction="right" delay={0.2} className="lg:col-span-6">
              <div className="flex justify-center lg:justify-end">
                <motion.img
                  src={iconoNegro}
                  alt="Lumi"
                  className="w-48 lg:w-64 h-auto opacity-15"
                  animate={isInView ? { y: [0, -12, 0], rotate: [0, 3, 0] } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Bottom — Azul block: Elder care */}
      <div className="bg-azul editorial-section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <FadeIn direction="left" delay={0.1} className="lg:col-span-6 order-2 lg:order-1">
              <div className="flex justify-center lg:justify-start">
                <motion.img
                  src={iconoAzul}
                  alt="Lumi"
                  className="w-48 lg:w-64 h-auto opacity-20 brightness-200"
                  animate={isInView ? { y: [0, -10, 0], rotate: [0, -3, 0] } : {}}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </FadeIn>

            <div className="lg:col-span-6 order-1 lg:order-2">
              <FadeIn direction="right">
                <p className="text-white/50 text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                  Para adultos mayores
                </p>
              </FadeIn>
              <FadeIn direction="right" delay={0.1}>
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-white leading-[1.05]">
                  Independencia con{' '}
                  <span className="italic underline decoration-white/30 underline-offset-8">respaldo</span>
                </h2>
              </FadeIn>
              <FadeIn direction="right" delay={0.2}>
                <p className="mt-6 text-lg text-white/70 leading-relaxed font-sans max-w-md">
                  Monitoreo continuo y compañía afectiva para una vida más
                  segura e independiente.
                </p>
              </FadeIn>
              <FadeIn direction="right" delay={0.3}>
                <ul className="mt-10 space-y-4">
                  {elderBenefits.map((item, i) => (
                    <motion.li
                      key={i}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease }}
                    >
                      <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-white" />
                      </div>
                      <span className="text-sm lg:text-base text-white/90 font-sans">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
