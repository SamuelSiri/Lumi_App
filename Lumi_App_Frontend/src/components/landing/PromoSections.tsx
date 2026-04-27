import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Heart, Users, Brain, Shield, Clock, Bell, Smile,
  MessageCircle, Cpu, Home, Wifi, Activity, Zap,
  Eye, Lock, CheckCircle,
} from 'lucide-react';
import { FadeIn, AnimatedCounter, ease } from './motion';
import rosaPastelLogo from '../../assets/images/rosa_pastel_logo_completo.png';
import logoCompletoAzul from '../../assets/images/logo_completo_azul.png';
import rosaPastelIcon from '../../assets/images/rosapastelicon.png';
import iconoBlanco from '../../assets/images/icono_blanco.png';

/* ═══════════════════════════════════════════════════════════
   1. EMOTIONAL TRUST — Full-width light section, split layout
   ═══════════════════════════════════════════════════════════ */
export function EmotionalTrust() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <section className="editorial-section bg-light relative overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-center">
          {/* Left — Large image, overlapping edges */}
          <FadeIn direction="left" distance={80} className="lg:col-span-6">
            <div className="relative lg:-ml-12">
              <div className="relative bg-rosa/5 rounded-3xl p-12 lg:p-20 overflow-hidden">
                <motion.img
                  src={rosaPastelIcon}
                  alt="Lumi"
                  className="w-full max-w-[320px] mx-auto h-auto"
                  animate={isInView ? { y: [0, -10, 0] } : {}}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Abstract accent circles */}
                <div className="absolute top-8 right-8 w-24 h-24 rounded-full border border-rosa/10" />
                <div className="absolute bottom-8 left-8 w-16 h-16 rounded-full bg-rosa/5" />
              </div>

              {/* Overlapping badge */}
              <motion.div
                className="absolute -bottom-6 right-8 lg:right-12 bg-negro text-white rounded-2xl px-6 py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.6, ease }}
              >
                <p className="text-xs text-gris-400 font-sans uppercase tracking-widest">Conexión</p>
                <p className="text-2xl font-display font-bold mt-1">24/7</p>
              </motion.div>
            </div>
          </FadeIn>

          {/* Right — Text */}
          <div className="lg:col-span-6 lg:pl-20">
            <FadeIn direction="right" delay={0.1}>
              <p className="text-rosa text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                Confianza emocional
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-negro leading-[1.05]">
                Tu familia conectada por el{' '}
                <span className="italic text-rosa">cariño</span>
              </h2>
            </FadeIn>
            <FadeIn direction="right" delay={0.3}>
              <p className="mt-6 text-lg text-gris-600 leading-relaxed font-sans max-w-lg">
                Lumi no es solo tecnología. Es un puente emocional entre
                generaciones. Cada interacción fortalece el vínculo y brinda
                paz mental a todos.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.4}>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Empatía real', 'Conexión constante', 'Sin esfuerzo'].map((tag) => (
                  <motion.span
                    key={tag}
                    className="inline-flex items-center gap-2 text-sm font-sans font-medium text-rosa bg-rosa/8 px-5 py-2.5 rounded-full"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Heart size={12} />
                    {tag}
                  </motion.span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. AI INTELLIGENCE — Dark section, stats-heavy, asymmetric
   ═══════════════════════════════════════════════════════════ */
export function AIIntelligence() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const stats = [
    { num: 50, suffix: 'ms', label: 'Respuesta' },
    { num: 99, suffix: '.7%', label: 'Precisión' },
    { num: 6, suffix: '+', label: 'Sensores' },
    { num: 24, suffix: '/7', label: 'Activo' },
  ];

  return (
    <section className="editorial-section bg-negro relative overflow-hidden" ref={ref}>
      {/* Subtle blue glow */}
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-azul/5 blur-[150px] rounded-full -translate-y-1/2 pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — Text + stats grid */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <FadeIn direction="left">
              <p className="text-azul text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                Inteligencia artificial
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.1}>
              <h2 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.05]">
                Un cerebro diseñado para{' '}
                <span className="italic text-gradient-azul">cuidar</span>
              </h2>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <p className="mt-6 text-lg text-gris-400 leading-relaxed font-sans max-w-xl">
                El motor cognitivo de Lumi procesa múltiples señales simultáneamente:
                voz, imagen, sensores biométricos y contexto ambiental.
              </p>
            </FadeIn>

            {/* Stats — large, minimal */}
            <FadeIn direction="left" delay={0.3}>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl lg:text-4xl font-display font-bold text-azul">
                      <AnimatedCounter value={stat.num} suffix={stat.suffix} />
                    </p>
                    <p className="text-xs text-gris-500 font-sans uppercase tracking-wider mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — Abstract neural visualization */}
          <FadeIn direction="right" delay={0.2} className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative flex justify-center">
              <div className="relative">
                <motion.img
                  src={logoCompletoAzul}
                  alt="Lumi AI"
                  className="w-64 lg:w-80 h-auto opacity-80"
                  animate={isInView ? { rotate: [0, 2, -2, 0] } : {}}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Orbiting dots */}
                {[Brain, Eye, Cpu, Activity, MessageCircle, Zap].map((Icon, i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  const radius = 160;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  return (
                    <motion.div
                      key={i}
                      className="absolute top-1/2 left-1/2"
                      style={{ x: x - 16, y: y - 16 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.5 + i * 0.1, duration: 0.4, ease }}
                    >
                      <motion.div
                        className="w-8 h-8 bg-azul/10 rounded-lg flex items-center justify-center"
                        animate={isInView ? { y: [0, -5, 0] } : {}}
                        transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
                      >
                        <Icon size={14} className="text-azul" />
                      </motion.div>
                    </motion.div>
                  );
                })}
                <div className="absolute inset-0 blur-[80px] bg-azul/5 rounded-full pointer-events-none" />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. SAFETY ECOSYSTEM — Full-width rosa section, bold
   ═══════════════════════════════════════════════════════════ */
export function SafetyEcosystem() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const protections = [
    { icon: Shield, label: 'Detección de caídas', desc: 'Alertas en <2 segundos' },
    { icon: Activity, label: 'Signos vitales 24/7', desc: 'Monitoreo continuo' },
    { icon: Eye, label: 'Visión contextual', desc: 'Reconocimiento espacial' },
    { icon: Lock, label: 'Cifrado AES-256', desc: 'Privacidad total' },
    { icon: Wifi, label: 'Siempre conectado', desc: 'WiFi 6 + BLE 5.3' },
    { icon: Zap, label: 'Respuesta instantánea', desc: '<50ms de latencia' },
  ];

  return (
    <section className="relative overflow-hidden" ref={ref}>
      {/* Full-width rosa background */}
      <div className="bg-rosa editorial-section">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left — Big headline on color */}
            <div className="lg:col-span-5">
              <FadeIn direction="left">
                <p className="text-white/60 text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                  Ecosistema de seguridad
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.1}>
                <h2 className="text-4xl lg:text-6xl xl:text-7xl font-display font-bold text-white leading-[1.05]">
                  Protección en{' '}
                  <span className="italic underline decoration-white/30 underline-offset-8">360°</span>
                </h2>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <p className="mt-6 text-lg text-white/70 leading-relaxed font-sans max-w-md">
                  Cada sensor trabaja en armonía para crear un escudo
                  de seguridad inteligente alrededor de tu ser querido.
                </p>
              </FadeIn>
              {/* Neon accent */}
              <motion.div
                className="mt-8 h-1 w-12 bg-neon rounded-full"
                initial={{ width: 0 }}
                animate={isInView ? { width: 48 } : { width: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
            </div>

            {/* Right — Protection list, clean */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {protections.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-5"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease }}
                      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.15)' }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
                        <Icon size={18} className="text-white" />
                      </div>
                      <div>
                        <p className="text-sm font-sans font-semibold text-white">{item.label}</p>
                        <p className="text-xs text-white/50 font-sans mt-0.5">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. REMOTE MONITORING — Dark section, large phone mockup
   ═══════════════════════════════════════════════════════════ */
export function RemoteMonitoring() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const features = [
    'Vista en tiempo real de signos vitales',
    'Historial de actividad diaria',
    'Comunicación bidireccional',
    'Alertas personalizadas',
  ];

  return (
    <section className="editorial-section bg-negro relative overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — Text */}
          <div className="lg:col-span-6">
            <FadeIn direction="left">
              <p className="text-rosa text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                Monitoreo remoto
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.1}>
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-white leading-[1.05]">
                Siempre presente,{' '}
                <span className="italic text-gradient-rosa">estés donde estés</span>
              </h2>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <p className="mt-6 text-lg text-gris-400 leading-relaxed font-sans max-w-lg">
                Desde tu teléfono puedes ver el estado de salud, ajustar
                recordatorios, recibir alertas y hablar con tu ser querido.
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.3}>
              <div className="mt-10 space-y-4">
                {features.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    whileHover={{ x: 4 }}
                  >
                    <CheckCircle size={16} className="text-rosa shrink-0" />
                    <span className="text-sm text-gris-300 font-sans">{item}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Right — Phone mockup with floating elements */}
          <FadeIn direction="right" delay={0.2} className="lg:col-span-6">
            <div className="flex justify-center lg:justify-end">
              <motion.div
                className="relative"
                animate={isInView ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Phone frame */}
                <div className="w-[280px] h-[560px] bg-gris-900 rounded-[2.5rem] border border-white/10 p-3 shadow-2xl relative overflow-hidden">
                  {/* Status bar */}
                  <div className="px-5 pt-2 pb-1 flex justify-between items-center">
                    <span className="text-[10px] font-sans text-gris-400">9:41</span>
                    <div className="w-20 h-5 bg-white/5 rounded-full" />
                    <div className="flex gap-1.5">
                      <Wifi size={10} className="text-gris-500" />
                      <Activity size={10} className="text-gris-500" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pt-4">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-rosa rounded-full flex items-center justify-center">
                        <Heart size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-sans font-bold text-white">Abuelita Rosa</p>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                          <span className="text-[9px] text-gris-500 font-sans">En línea</span>
                        </div>
                      </div>
                    </div>

                    {/* Vitals */}
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {[
                        { label: 'Pulso', value: '72', unit: 'bpm', color: 'rosa' },
                        { label: 'Temp', value: '36.5', unit: '°C', color: 'azul' },
                        { label: 'O₂', value: '98', unit: '%', color: 'rosa' },
                        { label: 'Pasos', value: '1,243', unit: '', color: 'azul' },
                      ].map((card) => (
                        <div key={card.label} className="bg-white/5 rounded-xl p-3">
                          <p className="text-[9px] text-gris-500 font-sans">{card.label}</p>
                          <p className="text-lg font-display font-bold text-white leading-tight">
                            {card.value}
                            <span className="text-[9px] font-sans font-normal text-gris-500 ml-0.5">
                              {card.unit}
                            </span>
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Activity chart */}
                    <div className="bg-white/5 rounded-xl p-3 mb-3">
                      <p className="text-[9px] font-sans font-semibold text-gris-500 mb-2">Actividad hoy</p>
                      <div className="flex items-end gap-1 h-10">
                        {[4, 6, 3, 7, 5, 8, 6, 4, 7, 5, 3, 6].map((h, i) => (
                          <motion.div
                            key={i}
                            className="flex-1 bg-rosa/30 rounded-sm"
                            animate={isInView ? { height: [0, h * 4] } : { height: 0 }}
                            transition={{ duration: 0.6, delay: i * 0.05 }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="bg-neon/5 rounded-xl p-3 flex items-center gap-2">
                      <CheckCircle size={14} className="text-neon" />
                      <div>
                        <p className="text-[10px] font-sans font-semibold text-white">Todo en orden</p>
                        <p className="text-[8px] text-gris-500 font-sans">Última revisión: 2 min</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating notification */}
                <motion.div
                  className="absolute -top-4 -right-8 bg-gris-900 border border-white/10 rounded-xl shadow-xl p-3"
                  animate={isInView ? { y: [0, -6, 0], opacity: [0.8, 1, 0.8] } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-rosa/15 flex items-center justify-center">
                      <Heart size={10} className="text-rosa" />
                    </div>
                    <span className="text-[9px] font-sans font-medium text-white whitespace-nowrap">
                      Pulso estable ✓
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. DAILY ROUTINE — Light editorial section with timeline
   ═══════════════════════════════════════════════════════════ */
export function DailyRoutine() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const timeline = [
    { time: '7:00', label: 'Buenos días', icon: Heart, color: 'rosa' as const },
    { time: '8:30', label: 'Medicamento', icon: Bell, color: 'azul' as const },
    { time: '10:00', label: 'Ejercicio', icon: Activity, color: 'rosa' as const },
    { time: '13:00', label: 'Almuerzo', icon: Clock, color: 'azul' as const },
    { time: '15:00', label: 'Compañía', icon: Smile, color: 'rosa' as const },
    { time: '18:00', label: 'Familia', icon: Users, color: 'azul' as const },
    { time: '21:00', label: 'Buenas noches', icon: Home, color: 'rosa' as const },
  ];

  return (
    <section className="editorial-section bg-light relative overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left — Headline */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[20vh]">
              <FadeIn direction="left">
                <p className="text-rosa text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                  Rutina diaria
                </p>
              </FadeIn>
              <FadeIn direction="left" delay={0.1}>
                <h2 className="text-4xl lg:text-6xl font-display font-bold text-negro leading-[1.05]">
                  Cada momento{' '}
                  <span className="italic text-rosa">cuenta</span>
                </h2>
              </FadeIn>
              <FadeIn direction="left" delay={0.2}>
                <p className="mt-6 text-lg text-gris-600 leading-relaxed font-sans max-w-md">
                  Lumi acompaña cada parte del día con atención personalizada
                  y cariño genuino.
                </p>
              </FadeIn>
              {/* Large image */}
              <FadeIn direction="left" delay={0.3}>
                <motion.img
                  src={rosaPastelLogo}
                  alt="Lumi"
                  className="mt-12 w-48 h-auto opacity-60"
                  animate={isInView ? { y: [0, -8, 0] } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </FadeIn>
            </div>
          </div>

          {/* Right — Timeline */}
          <div className="lg:col-span-7">
            <div className="relative pl-8 lg:pl-12">
              {/* Vertical line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-negro/10">
                <motion.div
                  className="w-full bg-rosa origin-top"
                  initial={{ height: '0%' }}
                  animate={isInView ? { height: '100%' } : { height: '0%' }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              </div>

              <div className="space-y-10">
                {timeline.map((item, i) => {
                  const Icon = item.icon;
                  const isRosa = item.color === 'rosa';
                  return (
                    <motion.div
                      key={item.time}
                      className="relative flex items-center gap-6"
                      initial={{ opacity: 0, x: 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease }}
                    >
                      {/* Dot on line */}
                      <motion.div
                        className={`absolute -left-8 lg:-left-12 w-3 h-3 rounded-full ${
                          isRosa ? 'bg-rosa' : 'bg-azul'
                        }`}
                        style={{ transform: 'translateX(-50%)' }}
                        animate={isInView ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ delay: 0.5 + i * 0.15, duration: 1.5, repeat: Infinity }}
                      />

                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        isRosa ? 'bg-rosa/8' : 'bg-azul/8'
                      }`}>
                        <Icon size={18} className={isRosa ? 'text-rosa' : 'text-azul'} />
                      </div>

                      <div>
                        <span className={`text-xs font-sans font-bold ${
                          isRosa ? 'text-rosa' : 'text-azul'
                        }`}>
                          {item.time}
                        </span>
                        <p className="text-lg font-display font-bold text-negro mt-0.5">
                          {item.label}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. COMPANIONSHIP — Dark editorial, overlapping elements
   ═══════════════════════════════════════════════════════════ */
export function Companionship() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <section className="editorial-section bg-negro relative overflow-hidden" ref={ref}>
      {/* Rosa glow */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rosa/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — Conversation mockup */}
          <FadeIn direction="left" distance={80} className="lg:col-span-6">
            <div className="relative bg-gris-900 rounded-3xl p-8 lg:p-12 border border-white/5 overflow-hidden">
              {/* Chat bubbles */}
              <div className="space-y-4">
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <div className="bg-rosa text-white text-sm font-sans px-5 py-3 rounded-2xl rounded-br-md max-w-[240px]">
                    ¿Cómo te sientes hoy, abuelita?
                  </div>
                </motion.div>

                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  <div className="bg-white/5 text-gris-300 text-sm font-sans px-5 py-3 rounded-2xl rounded-bl-md max-w-[260px]">
                    Muy bien, Lumi me puso mi música favorita esta mañana 🎵
                  </div>
                </motion.div>

                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.9, duration: 0.5 }}
                >
                  <div className="bg-rosa text-white text-sm font-sans px-5 py-3 rounded-2xl rounded-br-md max-w-[200px]">
                    ¡Qué alegría! Te quiero mucho.
                  </div>
                </motion.div>
              </div>

              {/* Music notes floating */}
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute text-rosa/30 text-2xl font-display"
                  style={{ right: 20 + i * 30, bottom: 20 + i * 15 }}
                  animate={isInView ? { y: [0, -40], opacity: [0.4, 0] } : {}}
                  transition={{ duration: 3, delay: i * 0.8, repeat: Infinity }}
                >
                  ♪
                </motion.span>
              ))}
            </div>
          </FadeIn>

          {/* Right — Text */}
          <div className="lg:col-span-6 lg:pl-8">
            <FadeIn direction="right">
              <p className="text-rosa text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                Compañía real
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.1}>
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-white leading-[1.05]">
                Momentos que llenan el{' '}
                <span className="italic text-gradient-rosa">corazón</span>
              </h2>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <p className="mt-6 text-lg text-gris-400 leading-relaxed font-sans max-w-lg">
                Lumi conversa, cuenta historias, pone música favorita y juega
                juegos que estimulan la mente. No reemplaza a la familia —
                llena los espacios entre cada visita.
              </p>
            </FadeIn>
            <FadeIn direction="right" delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-3">
                {['Conversaciones naturales', 'Música y cuentos', 'Juegos cognitivos'].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-sans font-medium text-gris-400 bg-white/5 px-4 py-2 rounded-full border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. TECH CREDIBILITY — Specs showcase, dark with azul accent
   ═══════════════════════════════════════════════════════════ */
export function TechCredibility() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const specs = [
    { icon: Cpu, label: 'Procesador', value: 'Neural Engine 3.0' },
    { icon: Shield, label: 'Seguridad', value: 'Cifrado AES-256' },
    { icon: Wifi, label: 'Conectividad', value: 'WiFi 6 + BLE 5.3' },
    { icon: Activity, label: 'Sensores', value: '6 integrados' },
    { icon: Zap, label: 'Batería', value: '72h autonomía' },
    { icon: Brain, label: 'IA', value: 'LumiOS 2.0' },
  ];

  return (
    <section className="editorial-section bg-dark-alt relative overflow-hidden" ref={ref}>
      {/* Subtle blue glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-azul/3 blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <FadeIn className="mb-16 lg:mb-24">
          <p className="text-azul text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
            Especificaciones
          </p>
          <h2 className="text-4xl lg:text-7xl font-display font-bold text-white leading-[1.05] max-w-3xl">
            Tecnología que inspira{' '}
            <span className="italic text-gradient-azul">confianza</span>
          </h2>
        </FadeIn>

        {/* Specs — horizontal, not cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {specs.map((spec, i) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={spec.label}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease }}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-azul/10 flex items-center justify-center mb-4 group-hover:bg-azul/20 transition-colors duration-300"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Icon size={20} className="text-azul" />
                </motion.div>
                <p className="text-[10px] text-gris-500 font-sans uppercase tracking-widest mb-1">
                  {spec.label}
                </p>
                <p className="text-base font-display font-bold text-white leading-tight">
                  {spec.value}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. LIFESTYLE INTEGRATION — Light, editorial image section
   ═══════════════════════════════════════════════════════════ */
export function LifestyleIntegration() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  const rooms = [
    { label: 'Sala', icon: Home },
    { label: 'Cocina', icon: Activity },
    { label: 'Recámara', icon: Heart },
    { label: 'Estudio', icon: Brain },
  ];

  return (
    <section className="editorial-section bg-light relative overflow-hidden" ref={ref}>
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left — Text */}
          <div className="lg:col-span-5">
            <FadeIn direction="left">
              <p className="text-azul text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
                Integración total
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.1}>
              <h2 className="text-4xl lg:text-6xl font-display font-bold text-negro leading-[1.05]">
                Se adapta a tu{' '}
                <span className="italic text-azul">hogar</span>
              </h2>
            </FadeIn>
            <FadeIn direction="left" delay={0.2}>
              <p className="mt-6 text-lg text-gris-600 leading-relaxed font-sans max-w-md">
                Lumi se integra de forma natural en cada espacio de tu casa.
                Discreto pero siempre presente.
              </p>
            </FadeIn>
            <FadeIn direction="left" delay={0.3}>
              <div className="mt-10 space-y-4">
                {rooms.map((room, i) => {
                  const Icon = room.icon;
                  return (
                    <motion.div
                      key={room.label}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                    >
                      <div className="w-10 h-10 rounded-xl bg-azul/8 flex items-center justify-center">
                        <Icon size={16} className="text-azul" />
                      </div>
                      <span className="text-sm font-sans font-medium text-negro">{room.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </FadeIn>
          </div>

          {/* Right — Large image composition */}
          <FadeIn direction="right" delay={0.2} className="lg:col-span-7">
            <div className="relative">
              <div className="relative bg-azul/5 rounded-3xl p-12 lg:p-16 overflow-hidden">
                <motion.img
                  src={iconoBlanco}
                  alt="Lumi en casa"
                  className="w-full max-w-[360px] mx-auto h-auto invert opacity-10"
                  animate={isInView ? { y: [0, -8, 0] } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Abstract shapes */}
                <div className="absolute top-12 right-12 w-32 h-32 rounded-full border border-azul/10" />
                <div className="absolute bottom-12 left-12 w-20 h-20 rounded-full bg-azul/5" />
              </div>

              {/* Overlapping element */}
              <motion.div
                className="absolute -bottom-6 left-8 bg-negro text-white rounded-2xl px-6 py-4"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6, ease }}
              >
                <p className="text-xs text-gris-500 font-sans uppercase tracking-widest">Habitaciones</p>
                <p className="text-2xl font-display font-bold mt-1">
                  <AnimatedCounter value={4} suffix=" zonas" />
                </p>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
