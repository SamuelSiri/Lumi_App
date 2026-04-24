import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Shield, AlertTriangle, Lock, Eye, Activity, Wifi, Bell, Zap } from 'lucide-react';
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

/* ─── Data ─── */

const safetyFeatures = [
  { icon: Shield, title: 'Detección de caídas', desc: 'Sensores de acelerómetro y giroscopio detectan caídas instantáneamente. Se envía alerta con ubicación exacta a todos los familiares configurados.' },
  { icon: AlertTriangle, title: 'Alertas de emergencia', desc: 'Ante una anomalía en signos vitales o comportamiento inusual, Lumi activa el protocolo de emergencia automáticamente.' },
  { icon: Lock, title: 'Privacidad garantizada', desc: 'Cifrado AES-256 de extremo a extremo. Las imágenes nunca se almacenan. Todo el procesamiento ocurre en el dispositivo.' },
  { icon: Eye, title: 'Monitoreo ambiental', desc: 'Detección de humo, temperaturas extremas y condiciones peligrosas en el hogar. Alertas preventivas antes del incidente.' },
  { icon: Activity, title: 'Anomalías de salud', desc: 'Algoritmos de IA detectan patrones anormales en signos vitales con horas de anticipación a eventos críticos.' },
  { icon: Wifi, title: 'Conexión redundante', desc: 'WiFi 6 + Bluetooth 5.3 + modo offline. Lumi nunca pierde conectividad, garantizando monitoreo ininterrumpido.' },
];

const emergencySteps = [
  { step: '01', title: 'Detección', desc: 'Los sensores detectan una anomalía en tiempo real — una caída, un cambio brusco en signos vitales o condiciones ambientales peligrosas.', icon: Eye },
  { step: '02', title: 'Verificación', desc: 'La IA confirma el tipo de incidente en milisegundos, descartando falsos positivos y clasificando la severidad del evento.', icon: Zap },
  { step: '03', title: 'Comunicación', desc: 'Lumi habla directamente con la persona afectada para evaluar su estado y ofrecer instrucciones claras mientras llega ayuda.', icon: Bell },
  { step: '04', title: 'Alerta', desc: 'Notificación inmediata a familiares con ubicación exacta, tipo de incidente y estado de la persona. Todo en menos de 2 segundos.', icon: AlertTriangle },
];

/* ─── Page ─── */

export default function Seguridad() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 150]);
  const heroOpacity = useTransform(heroScroll, [0, 0.7], [1, 0]);

  const pipelineRef = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipelineRef, { once: false, margin: '-100px' });

  return (
    <main className="pt-28 pb-12 overflow-x-hidden">
      {/* ════════ Hero ════════ */}
      <section ref={heroRef} className="relative py-24 lg:py-36 bg-white overflow-hidden">
        {/* Decorative background blobs */}
        <Parallax speed={0.15} className="absolute -top-32 -right-32 w-[500px] h-[500px] pointer-events-none">
          <div className="w-full h-full rounded-full bg-rosa/5 blur-3xl" />
        </Parallax>
        <Parallax speed={-0.1} className="absolute -bottom-24 -left-24 w-[400px] h-[400px] pointer-events-none">
          <div className="w-full h-full rounded-full bg-azul/5 blur-3xl" />
        </Parallax>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Copy */}
            <div>
              <FadeIn direction="left" distance={40}>
                <span className="inline-block text-rosa text-sm font-semibold tracking-wider uppercase bg-rosa-light px-3 py-1 rounded-full">
                  Seguridad
                </span>
              </FadeIn>
              <FadeIn direction="left" distance={40} delay={0.1}>
                <h1 className="text-5xl lg:text-7xl font-extrabold text-negro leading-tight mt-6">
                  Protección que nunca{' '}
                  <span className="text-rosa">descansa</span>
                </h1>
              </FadeIn>
              <FadeIn direction="left" distance={40} delay={0.2}>
                <p className="text-gris-500 text-lg lg:text-xl leading-relaxed max-w-xl mt-6">
                  Cada sensor, cada algoritmo, cada alerta fue diseñada para un único propósito:
                  mantener a tus seres queridos seguros las 24 horas del día.
                </p>
              </FadeIn>
              <FadeIn direction="left" distance={40} delay={0.3}>
                <div className="flex items-center gap-3 mt-8">
                  <div className="flex items-center gap-2 text-sm text-gris-500">
                    <Shield size={16} className="text-rosa" />
                    <span>Cifrado militar</span>
                  </div>
                  <span className="text-gris-200">|</span>
                  <div className="flex items-center gap-2 text-sm text-gris-500">
                    <Activity size={16} className="text-rosa" />
                    <span>Monitoreo 24/7</span>
                  </div>
                  <span className="text-gris-200">|</span>
                  <div className="flex items-center gap-2 text-sm text-gris-500">
                    <Zap size={16} className="text-rosa" />
                    <span>Respuesta &lt;2s</span>
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Character illustration */}
            <FadeIn direction="right" distance={60} delay={0.2} className="flex justify-center">
              <Parallax speed={0.08}>
                <div className="relative">
                  {/* Shield glow behind character */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-56 h-56 rounded-full bg-rosa/10"
                      animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.25, 0.5] }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                  <div className="relative z-10">
                    <LumiCharacter size="xl" />
                  </div>
                  {/* Floating shield icon */}
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-xl bg-rosa text-white flex items-center justify-center shadow-lg shadow-rosa/25"
                    animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Shield size={20} />
                  </motion.div>
                </div>
              </Parallax>
            </FadeIn>
          </div>
        </motion.div>
      </section>

      <SectionDivider color="rosa" />

      {/* ════════ Stats ════════ */}
      <section className="py-16 lg:py-20 bg-negro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Números que <span className="text-rosa">respaldan</span> la confianza
            </h2>
          </FadeIn>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {/* Animated numeric stats */}
            <motion.div variants={staggerItem}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4, boxShadow: '0 12px 32px rgba(253,66,130,0.15)' }}
                transition={{ duration: 0.3, ease }}
                className="bg-gris-900 rounded-2xl p-6 lg:p-8 border border-gris-800 text-center"
              >
                <p className="text-4xl lg:text-5xl font-extrabold text-rosa">
                  &lt;<AnimatedCounter value={2} suffix="s" className="text-rosa" />
                </p>
                <p className="text-xs lg:text-sm text-gris-400 mt-2">Tiempo de detección de caída</p>
              </motion.div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4, boxShadow: '0 12px 32px rgba(253,66,130,0.15)' }}
                transition={{ duration: 0.3, ease }}
                className="bg-gris-900 rounded-2xl p-6 lg:p-8 border border-gris-800 text-center"
              >
                <p className="text-4xl lg:text-5xl font-extrabold text-rosa">
                  <AnimatedCounter value={99} suffix=".7%" className="text-rosa" />
                </p>
                <p className="text-xs lg:text-sm text-gris-400 mt-2">Precisión en alertas</p>
              </motion.div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4, boxShadow: '0 12px 32px rgba(63,80,179,0.15)' }}
                transition={{ duration: 0.3, ease }}
                className="bg-gris-900 rounded-2xl p-6 lg:p-8 border border-gris-800 text-center"
              >
                <p className="text-4xl lg:text-5xl font-extrabold text-azul">24/7</p>
                <p className="text-xs lg:text-sm text-gris-400 mt-2">Monitoreo continuo</p>
              </motion.div>
            </motion.div>

            <motion.div variants={staggerItem}>
              <motion.div
                whileHover={{ scale: 1.04, y: -4, boxShadow: '0 12px 32px rgba(63,80,179,0.15)' }}
                transition={{ duration: 0.3, ease }}
                className="bg-gris-900 rounded-2xl p-6 lg:p-8 border border-gris-800 text-center"
              >
                <p className="text-4xl lg:text-5xl font-extrabold text-azul">
                  AES-<AnimatedCounter value={256} className="text-azul" />
                </p>
                <p className="text-xs lg:text-sm text-gris-400 mt-2">Nivel de cifrado</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* ════════ Emergency Protocol — Visual Narrative ════════ */}
      <section className="py-20 lg:py-32 bg-gris-50/50 relative overflow-hidden">
        <Parallax speed={0.12} className="absolute top-20 right-0 w-[350px] h-[350px] pointer-events-none">
          <div className="w-full h-full rounded-full bg-rosa/5 blur-3xl" />
        </Parallax>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-20">
              <span className="text-rosa text-sm font-semibold tracking-wider uppercase">Respuesta inmediata</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-negro mt-3">
                Protocolo de <span className="text-rosa">emergencia</span>
              </h2>
              <p className="text-gris-500 text-lg max-w-2xl mx-auto mt-4">
                Desde la detección hasta la alerta familiar, todo ocurre en menos de 2 segundos.
                Así protege Lumi a quienes más quieres.
              </p>
            </div>
          </FadeIn>

          {/* Pipeline visualization */}
          <div ref={pipelineRef} className="relative">
            {/* Animated vertical connector line */}
            <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-px lg:-translate-x-px">
              <motion.div
                className="w-full bg-gradient-to-b from-rosa via-rosa/60 to-azul"
                initial={{ height: '0%' }}
                animate={pipelineInView ? { height: '100%' } : { height: '0%' }}
                transition={{ duration: 1.5, ease }}
              />
            </div>

            <div className="space-y-12 lg:space-y-16">
              {emergencySteps.map((item, i) => {
                const Icon = item.icon;
                const isEven = i % 2 === 0;

                return (
                  <FadeIn
                    key={item.step}
                    direction={isEven ? 'left' : 'right'}
                    distance={50}
                    delay={i * 0.15}
                  >
                    <div className={`relative flex items-start gap-6 lg:gap-0 ${
                      isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}>
                      {/* Timeline node */}
                      <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 z-10">
                        <motion.div
                          className="w-10 h-10 rounded-full bg-rosa text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-rosa/25"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.step}
                        </motion.div>
                      </div>

                      {/* Card */}
                      <div className={`ml-16 lg:ml-0 lg:w-[45%] ${isEven ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'}`}>
                        <motion.div
                          whileHover={{ y: -6, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                          transition={{ duration: 0.3, ease }}
                          className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm border border-gris-100"
                        >
                          <div className="flex items-center gap-4 mb-3">
                            <motion.div
                              className="w-12 h-12 rounded-xl bg-rosa-light text-rosa flex items-center justify-center shrink-0"
                              whileHover={{ rotate: 12 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Icon size={22} />
                            </motion.div>
                            <div>
                              <span className="text-xs font-bold text-rosa uppercase tracking-wide">Paso {item.step}</span>
                              <h4 className="text-xl font-bold text-negro">{item.title}</h4>
                            </div>
                          </div>
                          <p className="text-sm text-gris-500 leading-relaxed">{item.desc}</p>
                        </motion.div>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider color="rosa" />

      {/* ════════ Features — Staggered Grid ════════ */}
      <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
        <Parallax speed={-0.08} className="absolute -bottom-40 -left-40 w-[500px] h-[500px] pointer-events-none">
          <div className="w-full h-full rounded-full bg-azul/5 blur-3xl" />
        </Parallax>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <span className="text-azul text-sm font-semibold tracking-wider uppercase">Tecnología multicapa</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-negro mt-3">
                Capas de <span className="text-rosa">protección</span>
              </h2>
              <p className="text-gris-500 text-lg max-w-2xl mx-auto mt-4">
                Seis sistemas independientes que trabajan en conjunto para crear un escudo
                completo alrededor de tus seres queridos.
              </p>
            </div>
          </FadeIn>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-60px' }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {safetyFeatures.map((feat) => {
              const Icon = feat.icon;
              return (
                <motion.div key={feat.title} variants={staggerItem}>
                  <motion.div
                    whileHover={{
                      y: -6,
                      scale: 1.02,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    }}
                    transition={{ duration: 0.3, ease }}
                    className="bg-white rounded-2xl p-7 shadow-sm border border-gris-100 hover:border-rosa/20 transition-colors duration-300 h-full"
                  >
                    <motion.div
                      className="w-14 h-14 rounded-2xl bg-rosa-light text-rosa flex items-center justify-center mb-5"
                      whileHover={{ rotate: 12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon size={24} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-negro mb-2">{feat.title}</h3>
                    <p className="text-sm text-gris-500 leading-relaxed">{feat.desc}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* ════════ Closing narrative ════════ */}
      <section className="py-20 lg:py-28 bg-negro relative overflow-hidden">
        <Parallax speed={0.1} className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none">
          <div className="w-full h-full rounded-full bg-rosa/5 blur-3xl" />
        </Parallax>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <LumiCharacter size="md" className="mx-auto mb-8" />
          </FadeIn>
          <FadeIn direction="up" delay={0.1}>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
              La tranquilidad no tiene precio.{' '}
              <span className="text-rosa">Lumi la hace posible.</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up" delay={0.2}>
            <p className="text-gris-400 text-lg mt-6 max-w-xl mx-auto leading-relaxed">
              Cada segundo cuenta. Con sensores de grado médico, IA predictiva y cifrado de nivel militar,
              Lumi está diseñado para que puedas estar tranquilo sabiendo que tus seres queridos nunca están solos.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
