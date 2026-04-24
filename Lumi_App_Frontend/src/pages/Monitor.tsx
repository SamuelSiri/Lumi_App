import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Activity, Heart, Thermometer, Wind, BarChart3, Clock, Smartphone, Bell, Footprints } from 'lucide-react';
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

const vitals = [
  { icon: Heart, label: 'Frecuencia cardíaca', value: 72, suffix: ' bpm', status: 'Normal', color: 'rosa' as const },
  { icon: Thermometer, label: 'Temperatura', value: 365, suffix: '.°C', prefix: '', status: 'Normal', color: 'azul' as const },
  { icon: Wind, label: 'Oxigenación', value: 98, suffix: '%', status: 'Óptimo', color: 'rosa' as const },
  { icon: Footprints, label: 'Actividad', value: 1243, suffix: ' pasos', status: 'Activo', color: 'azul' as const },
];

const monitorFeatures = [
  { icon: BarChart3, title: 'Reportes detallados', desc: 'Historial completo de signos vitales con gráficas interactivas, tendencias y análisis de patrones.', color: 'rosa' as const },
  { icon: Clock, title: 'Monitoreo continuo', desc: 'Sensores activos las 24 horas. Sin pausas, sin interrupciones. Cada segundo cuenta.', color: 'azul' as const },
  { icon: Smartphone, title: 'Acceso remoto', desc: 'Consulta los datos desde cualquier dispositivo. App móvil nativa para iOS y Android.', color: 'rosa' as const },
  { icon: Bell, title: 'Alertas inteligentes', desc: 'Notificaciones contextuales. Solo recibes alertas cuando realmente importa, sin falsas alarmas.', color: 'azul' as const },
];

// Deterministic bar heights for the chart mockup
const barHeights = Array.from({ length: 48 }, (_, i) => 40 + Math.sin(i * 0.3) * 20 + ((i * 7 + 13) % 15));

export default function Monitor() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const chartRef = useRef(null);
  const chartInView = useInView(chartRef, { once: false, margin: '-80px' });

  const vitalsRef = useRef(null);
  const vitalsInView = useInView(vitalsRef, { once: false, margin: '-80px' });

  const featuresRef = useRef(null);
  const featuresInView = useInView(featuresRef, { once: false, margin: '-80px' });

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
                    Monitor
                  </span>
                </FadeIn>
                <FadeIn direction="left" distance={40} delay={0.1}>
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-negro leading-tight mt-6">
                    Salud visible en <span className="text-rosa">tiempo real</span>
                  </h1>
                </FadeIn>
                <FadeIn direction="left" distance={40} delay={0.2}>
                  <p className="text-gris-500 text-lg lg:text-xl leading-relaxed max-w-lg mt-6">
                    Monitorea signos vitales, actividad física y bienestar emocional
                    desde cualquier lugar, en cualquier momento.
                  </p>
                </FadeIn>
              </div>
              <FadeIn direction="right" distance={40} delay={0.3} className="flex justify-center">
                <Parallax speed={0.15}>
                  <div className="relative">
                    <div className="absolute -inset-8 bg-azul-light/60 rounded-full blur-3xl" />
                    <div className="relative bg-white rounded-3xl p-8 shadow-lg border border-gris-100">
                      <Activity size={64} className="text-rosa mx-auto" />
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-exito animate-pulse" />
                        <span className="text-sm text-exito font-semibold">Monitoreando</span>
                      </div>
                    </div>
                  </div>
                </Parallax>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </section>

      <SectionDivider color="rosa" />

      {/* Live vitals cards */}
      <section className="py-16 bg-gris-50/50" ref={vitalsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-12">
            <span className="text-azul text-sm font-semibold tracking-wider uppercase">Signos vitales</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-negro mt-2">
              Datos en <span className="text-azul">vivo</span>
            </h2>
          </FadeIn>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate={vitalsInView ? 'visible' : 'hidden'}
          >
            {vitals.map((vital) => {
              const Icon = vital.icon;
              const isRosa = vital.color === 'rosa';
              return (
                <motion.div
                  key={vital.label}
                  variants={staggerItem}
                  whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-gris-100 cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${isRosa ? 'bg-rosa-light text-rosa' : 'bg-azul-light text-azul'}`}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <p className="text-xs text-gris-400 font-medium uppercase tracking-wide">{vital.label}</p>
                  <p className="text-3xl font-extrabold text-negro mt-1">
                    <AnimatedCounter
                      value={vital.value}
                      suffix={vital.suffix}
                      prefix={vital.prefix || ''}
                    />
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="w-2 h-2 rounded-full bg-exito" />
                    <span className="text-xs text-exito font-medium">{vital.status}</span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* Activity graph mockup */}
      <section className="py-20 lg:py-32 bg-white" ref={chartRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" distance={40}>
              <span className="text-rosa text-sm font-semibold tracking-wider uppercase">Gráficas</span>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-negro mt-3">
                Panel de <span className="text-rosa">monitoreo</span>
              </h2>
              <p className="text-gris-500 text-lg mt-4 leading-relaxed">
                Visualiza tendencias, detecta patrones y recibe análisis automáticos
                de los datos de salud de tu ser querido.
              </p>
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rosa" />
                  <span className="text-sm text-gris-600">Frecuencia cardíaca en tiempo real</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-azul" />
                  <span className="text-sm text-gris-600">Patrones de actividad diaria</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-exito" />
                  <span className="text-sm text-gris-600">Alertas predictivas con IA</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" distance={40} delay={0.2}>
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-gris-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-negro">Frecuencia cardíaca - Últimas 24h</h3>
                  <span className="inline-flex items-center gap-1.5 text-sm text-rosa font-semibold">
                    <span className="w-2 h-2 rounded-full bg-rosa animate-pulse" />
                    En vivo
                  </span>
                </div>
                <div className="h-48 flex items-end gap-0.5">
                  {barHeights.map((height, i) => (
                    <motion.div
                      key={i}
                      className="flex-1 bg-rosa/20 hover:bg-rosa/40 rounded-t transition-colors"
                      initial={{ height: 0 }}
                      animate={chartInView ? { height: `${height}%` } : { height: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.02, ease }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-3 text-xs text-gris-400">
                  <span>00:00</span>
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>23:59</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <SectionDivider color="rosa" />

      {/* Features 2-col grid */}
      <section className="py-20 lg:py-32 bg-gris-50/50" ref={featuresRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro">
              Monitoreo <span className="text-azul">inteligente</span>
            </h2>
            <p className="text-gris-500 text-lg max-w-2xl mx-auto mt-4">
              Tecnología avanzada que trabaja silenciosamente para proteger a tu familia.
            </p>
          </FadeIn>

          <motion.div
            className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={featuresInView ? 'visible' : 'hidden'}
          >
            {monitorFeatures.map((feat) => {
              const Icon = feat.icon;
              const isRosa = feat.color === 'rosa';
              return (
                <motion.div
                  key={feat.title}
                  variants={staggerItem}
                  whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-gris-100 cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${isRosa ? 'bg-rosa-light text-rosa' : 'bg-azul-light text-azul'}`}
                  >
                    <Icon size={24} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-negro mb-2">{feat.title}</h3>
                  <p className="text-sm text-gris-500 leading-relaxed">{feat.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* Bottom CTA with Lumi */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeIn>
            <Parallax speed={0.08} className="flex justify-center mb-8">
              <LumiCharacter size="lg" />
            </Parallax>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro">
              Tranquilidad en <span className="text-rosa">cada latido</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-4 text-gris-500 text-lg max-w-lg mx-auto">
              Lumi vigila lo que más importa para que tú puedas concentrarte en vivir.
            </p>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
