import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Shield, Brain, Smile, Bell, Smartphone } from 'lucide-react';
import { FadeIn, AnimatedCounter } from './motion';
import iconoAzul from '../../assets/images/icono_lumi_azul.png';

const ease = [0.23, 1, 0.32, 1] as const;

const capabilities = [
  { icon: Heart, label: 'Monitoreo de salud', accent: 'rosa' as const },
  { icon: Shield, label: 'Detección de caídas', accent: 'rosa' as const },
  { icon: Brain, label: 'IA adaptativa', accent: 'azul' as const },
  { icon: Smile, label: 'Compañía emocional', accent: 'azul' as const },
  { icon: Bell, label: 'Recordatorios', accent: 'rosa' as const },
  { icon: Smartphone, label: 'Control remoto', accent: 'azul' as const },
];

export default function Features() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: '-100px' });

  return (
    <section ref={sectionRef} className="editorial-section bg-negro relative overflow-hidden">
      {/* Subtle top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rosa/20 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        {/* Asymmetric two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Left column — large image with overlapping text */}
          <div className="lg:col-span-5 relative">
            <FadeIn direction="left" distance={80}>
              <div className="relative">
                {/* Lumi icon — large editorial placement */}
                <motion.img
                  src={iconoAzul}
                  alt="Lumi"
                  className="w-full max-w-[400px] h-auto opacity-90"
                  animate={isInView ? { y: [0, -12, 0] } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Glow behind */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-azul/8 blur-[100px] rounded-full" />

                {/* Floating stat badge */}
                <motion.div
                  className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-12 bg-gris-900 border border-white/5 rounded-2xl px-5 py-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6, duration: 0.6, ease }}
                >
                  <p className="text-[10px] text-gris-500 uppercase tracking-widest font-sans">Familias activas</p>
                  <p className="text-3xl font-display font-bold text-white mt-1">
                    <AnimatedCounter value={2400} suffix="+" />
                  </p>
                </motion.div>
              </div>
            </FadeIn>
          </div>

          {/* Right column — text + capabilities list */}
          <div className="lg:col-span-7 lg:pl-12">
            <FadeIn direction="right" delay={0.1}>
              <p className="text-rosa text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                Funcionalidades
              </p>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <h2 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.05]">
                Lo que Lumi hace{' '}
                <span className="italic text-gradient-rosa">por ti</span>
              </h2>
            </FadeIn>

            <FadeIn direction="right" delay={0.3}>
              <p className="mt-6 text-lg text-gris-400 max-w-xl leading-relaxed font-sans">
                Cada función fue diseñada pensando en el bienestar real
                de las personas que más quieres. Tecnología que se siente
                como cariño.
              </p>
            </FadeIn>

            {/* Capabilities — horizontal list, not cards */}
            <FadeIn direction="right" delay={0.4}>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-8">
                {capabilities.map((cap, i) => {
                  const Icon = cap.icon;
                  const isRosa = cap.accent === 'rosa';
                  return (
                    <motion.div
                      key={cap.label}
                      className="group flex items-start gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease }}
                    >
                      <motion.div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isRosa ? 'bg-rosa/10' : 'bg-azul/10'
                        }`}
                        whileHover={{ scale: 1.15, rotate: 5 }}
                      >
                        <Icon
                          size={18}
                          className={isRosa ? 'text-rosa' : 'text-azul'}
                        />
                      </motion.div>
                      <div>
                        <p className="text-sm font-sans font-semibold text-white group-hover:text-rosa transition-colors duration-300">
                          {cap.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>

            {/* Thin neon accent line */}
            <motion.div
              className="mt-12 h-px w-20 bg-neon/30"
              initial={{ width: 0 }}
              animate={isInView ? { width: 80 } : { width: 0 }}
              transition={{ delay: 1, duration: 0.8, ease }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
