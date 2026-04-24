import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Brain, Cpu, Eye, Zap, Activity, Wifi, Shield, MessageCircle, Lock, Heart } from 'lucide-react';
import LumiCharacter from '../components/LumiCharacter';
import { FadeIn, Parallax, AnimatedCounter, ease, SectionDivider, staggerContainer, staggerItem } from '../components/landing/motion';

const techStack = [
  { icon: Brain, title: 'Inteligencia Artificial Adaptativa', desc: 'Motor cognitivo que aprende patrones únicos de comportamiento para anticipar necesidades y detectar anomalías antes de que sean críticas.', color: 'rosa' },
  { icon: Cpu, title: 'Neural Engine 3.0', desc: 'Procesador dedicado que ejecuta modelos de aprendizaje profundo directamente en el dispositivo, garantizando privacidad total.', color: 'azul' },
  { icon: Eye, title: 'Visión por Computadora', desc: 'Análisis de contexto espacial en tiempo real: detección de caídas, reconocimiento de actividad y monitoreo ambiental sin almacenar imágenes.', color: 'rosa' },
  { icon: Zap, title: 'Respuesta en Milisegundos', desc: 'Arquitectura de procesamiento optimizada para responder en menos de 50ms. Cada segundo cuenta.', color: 'azul' },
  { icon: MessageCircle, title: 'Procesamiento Natural del Lenguaje', desc: 'Conversaciones empáticas y contextuales. Lumi entiende no solo lo que dices, sino cómo te sientes.', color: 'rosa' },
  { icon: Activity, title: 'Sensores Biométricos', desc: 'Seis sensores integrados monitoreando frecuencia cardíaca, temperatura, oxigenación, movimiento, proximidad y ambiente.', color: 'azul' },
];

const processPipeline = [
  { step: '01', title: 'Captura', desc: 'Los 6 sensores recogen datos biométricos y ambientales continuamente', icon: Activity, color: 'rosa' },
  { step: '02', title: 'Procesamiento', desc: 'Neural Engine analiza patrones con modelos de IA en el dispositivo', icon: Cpu, color: 'azul' },
  { step: '03', title: 'Comprensión', desc: 'El motor cognitivo interpreta contexto, intención y estado emocional', icon: Brain, color: 'rosa' },
  { step: '04', title: 'Acción', desc: 'Lumi responde con alertas, conversación o acciones preventivas', icon: Zap, color: 'azul' },
];

export default function Tecnologia() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: false });
  const stackRef = useRef(null);
  const isStackInView = useInView(stackRef, { once: false, margin: '-80px' });
  const pipeRef = useRef(null);
  const isPipeInView = useInView(pipeRef, { once: false, margin: '-80px' });

  // Hero parallax
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <main className="pt-24">
      {/* Hero - cinematic with parallax */}
      <section ref={heroRef} className="relative py-20 lg:py-32 bg-white overflow-hidden min-h-[70vh] flex items-center">
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-azul opacity-[0.02] blur-3xl pointer-events-none" />

        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ y: heroY, opacity: heroOpacity }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <FadeIn>
                <span className="text-azul text-sm font-semibold tracking-wider uppercase">Tecnología</span>
              </FadeIn>
              <FadeIn delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-negro leading-[1.05]">
                  Ingeniería al servicio del <span className="text-azul">cuidado</span>
                </h1>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-gris-500 text-lg lg:text-xl leading-relaxed max-w-lg">
                  Cada componente de Lumi fue diseñado con un propósito: proteger y acompañar
                  a tus seres queridos con la tecnología más avanzada.
                </p>
              </FadeIn>
              <FadeIn delay={0.3}>
                <div className="flex gap-8 pt-4">
                  {[
                    { num: 50, suffix: 'ms', label: 'Respuesta' },
                    { num: 6, suffix: '', label: 'Sensores' },
                    { num: 72, suffix: 'h', label: 'Batería' },
                  ].map((s) => (
                    <div key={s.label}>
                      <p className="text-3xl lg:text-4xl font-extrabold text-azul">
                        <AnimatedCounter value={s.num} suffix={s.suffix} />
                      </p>
                      <p className="text-xs text-gris-400 mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>

            <FadeIn direction="right" distance={80} delay={0.2}>
              <div className="flex justify-center relative">
                <Parallax speed={-0.08}>
                  <div className="relative">
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <LumiCharacter size="xl" />
                    </motion.div>
                    {/* Floating tech badges */}
                    <motion.div
                      className="absolute -top-4 -right-12 bg-white rounded-xl shadow-lg px-3 py-2 border border-gris-100"
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-azul-light flex items-center justify-center">
                          <Cpu size={12} className="text-azul" />
                        </div>
                        <div>
                          <p className="text-[9px] text-gris-400">Engine</p>
                          <p className="text-[11px] font-bold text-negro">Neural 3.0</p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="absolute bottom-8 -left-16 bg-azul rounded-xl shadow-lg px-3 py-2"
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                    >
                      <div className="flex items-center gap-2">
                        <Shield size={14} className="text-white" />
                        <span className="text-[11px] font-bold text-white">AES-256</span>
                      </div>
                    </motion.div>
                  </div>
                </Parallax>
              </div>
            </FadeIn>
          </div>
        </motion.div>
      </section>

      {/* Processing pipeline - sticky scroll narrative */}
      <SectionDivider color="azul" />
      <section className="py-20 lg:py-32 bg-gris-50/50" ref={pipeRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <span className="text-azul text-sm font-semibold tracking-wider uppercase mb-4 block">Pipeline</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro">
              Del dato a la <span className="text-azul">acción</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {processPipeline.map((p, i) => {
              const Icon = p.icon;
              const isRosa = p.color === 'rosa';
              return (
                <FadeIn key={p.step} delay={i * 0.12}>
                  <motion.div
                    className="relative bg-white rounded-2xl p-6 shadow-sm border border-gris-100 text-center"
                    whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(0,0,0,0.08)' }}
                  >
                    {/* Connector arrow */}
                    {i < processPipeline.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 w-6 text-gris-300">
                        <motion.span
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="text-lg"
                        >→</motion.span>
                      </div>
                    )}
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isRosa ? 'bg-rosa-light text-rosa' : 'bg-azul-light text-azul'}`}>
                      <Icon size={24} />
                    </div>
                    <span className={`text-xs font-bold ${isRosa ? 'text-rosa' : 'text-azul'} opacity-50`}>Paso {p.step}</span>
                    <h3 className="text-lg font-bold text-negro mt-1 mb-2">{p.title}</h3>
                    <p className="text-sm text-gris-400 leading-relaxed">{p.desc}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack - staggered grid */}
      <SectionDivider color="rosa" />
      <section className="py-20 lg:py-32 bg-white" ref={stackRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro">Stack <span className="text-azul">tecnológico</span></h2>
          </FadeIn>
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate={isStackInView ? 'visible' : 'hidden'}
          >
            {techStack.map((tech) => {
              const Icon = tech.icon;
              const isRosa = tech.color === 'rosa';
              return (
                <motion.div key={tech.title} variants={staggerItem}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(0,0,0,0.08)' }}
                    className="bg-white rounded-2xl p-7 shadow-sm border border-gris-100 hover:border-azul/20 transition-colors"
                  >
                    <motion.div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isRosa ? 'bg-rosa-light text-rosa' : 'bg-azul-light text-azul'}`}
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-negro mb-2">{tech.title}</h3>
                    <p className="text-sm text-gris-500 leading-relaxed">{tech.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Architecture - dark section */}
      <section className="py-20 lg:py-32 bg-negro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="text-rosa text-sm font-semibold tracking-wider uppercase mb-4 block">Arquitectura</span>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-16">
              Diseñado para <span className="text-rosa">confiar</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Shield, title: 'Cifrado AES-256', desc: 'Datos protegidos de extremo a extremo' },
              { icon: Wifi, title: 'WiFi 6 + BLE 5.3', desc: 'Conectividad estable y de bajo consumo' },
              { icon: Lock, title: 'Edge Computing', desc: 'Procesamiento local para máxima privacidad' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <motion.div
                    className="bg-gris-900 rounded-2xl p-6 border border-gris-800 hover:border-rosa/30 transition-colors"
                    whileHover={{ y: -4, boxShadow: '0 16px 50px rgba(253,66,130,0.1)' }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-xl bg-rosa/10 flex items-center justify-center mb-4 mx-auto"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                    >
                      <Icon size={22} className="text-rosa" />
                    </motion.div>
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-gris-400">{item.desc}</p>
                  </motion.div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
