import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useInView } from 'framer-motion';
import { Heart, Shield, Brain, Smile, Bell, Activity } from 'lucide-react';
import { FadeIn } from './motion';
import rosaVividoLogo from '../../assets/images/rosa_vivido_logo_completo.png';

const ease = [0.23, 1, 0.32, 1] as const;

const steps = [
  {
    icon: Heart,
    num: '01',
    title: 'Monitorea',
    highlight: 'su salud',
    text: 'Signos vitales en tiempo real. Frecuencia cardíaca, temperatura y oxigenación siempre bajo control.',
    color: 'rosa' as const,
  },
  {
    icon: Shield,
    num: '02',
    title: 'Protege ante',
    highlight: 'emergencias',
    text: 'Caídas, inactividad prolongada o anomalías activan alertas inmediatas a toda la familia.',
    color: 'azul' as const,
  },
  {
    icon: Brain,
    num: '03',
    title: 'Aprende y',
    highlight: 'se adapta',
    text: 'La IA de Lumi aprende rutinas y preferencias para ofrecer atención cada vez más personalizada.',
    color: 'rosa' as const,
  },
  {
    icon: Smile,
    num: '04',
    title: 'Brinda compañía',
    highlight: 'real',
    text: 'Conversaciones empáticas, música, juegos cognitivos. Presente cuando la familia no puede estar.',
    color: 'azul' as const,
  },
  {
    icon: Bell,
    num: '05',
    title: 'Recuerda lo',
    highlight: 'importante',
    text: 'Medicamentos, citas, comidas. Gestiona la rutina diaria con cariño y paciencia infinita.',
    color: 'rosa' as const,
  },
  {
    icon: Activity,
    num: '06',
    title: 'Reporta a',
    highlight: 'la familia',
    text: 'Reportes claros del bienestar diario. Transparencia total, tranquilidad garantizada.',
    color: 'azul' as const,
  },
];

function StepBlock({
  step,
  index,
  isActive,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-30% 0px -30% 0px' });
  const Icon = step.icon;
  const isRosa = step.color === 'rosa';

  return (
    <motion.div
      ref={ref}
      className="min-h-[50vh] flex items-center py-12"
      animate={{ opacity: isInView ? 1 : 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
        transition={{ duration: 0.7, ease }}
        className="w-full"
      >
        {/* Step number — large editorial */}
        <motion.span
          className={`font-display text-7xl lg:text-8xl font-bold leading-none ${
            isActive
              ? isRosa ? 'text-rosa/20' : 'text-azul/20'
              : 'text-white/5'
          } transition-colors duration-500`}
        >
          {step.num}
        </motion.span>

        <div className="mt-4 flex items-start gap-5">
          <motion.div
            animate={{
              scale: isActive ? 1.1 : 1,
              boxShadow: isActive
                ? isRosa
                  ? '0 0 30px rgba(253,66,130,0.2)'
                  : '0 0 30px rgba(63,80,179,0.2)'
                : '0 0 0 transparent',
            }}
            transition={{ duration: 0.4 }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
              isActive
                ? isRosa ? 'bg-rosa text-white' : 'bg-azul text-white'
                : 'bg-white/5 text-gris-500'
            }`}
          >
            <Icon size={20} />
          </motion.div>

          <div>
            <h3 className="text-2xl lg:text-4xl font-display font-bold text-white leading-tight">
              {step.title}{' '}
              <span className={isRosa ? 'text-rosa' : 'text-azul'}>
                {step.highlight}
              </span>
            </h3>
            <motion.p
              className="mt-3 text-gris-400 text-base lg:text-lg leading-relaxed max-w-md font-sans"
              animate={{ opacity: isActive ? 1 : 0.4 }}
              transition={{ duration: 0.3 }}
            >
              {step.text}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ScrollFeature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(
      Math.floor(latest * steps.length),
      steps.length - 1
    );
    setActiveStep(Math.max(0, idx));
  });

  const progressHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 8]);

  return (
    <section ref={containerRef} id="como-funciona" className="relative bg-dark-alt">
      {/* Section header */}
      <div className="pt-32 lg:pt-48 pb-8 lg:pb-16">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <FadeIn>
            <p className="text-azul text-xs font-sans font-semibold tracking-[0.3em] uppercase mb-5">
              Cómo funciona
            </p>
            <h2 className="text-4xl lg:text-7xl font-display font-bold text-white">
              Un día con <span className="italic text-gradient-azul">Lumi</span>
            </h2>
          </FadeIn>
        </div>
      </div>

      {/* Sticky scroll layout */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left — Sticky logo + progress */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-[15vh] h-[70vh] flex flex-col items-center justify-center">
              {/* Progress bar */}
              <div className="absolute left-8 top-[5%] bottom-[5%] w-px bg-white/5">
                <motion.div
                  className="w-full bg-rosa rounded-full origin-top"
                  style={{ height: progressHeight }}
                />
              </div>

              {/* Step dots */}
              {steps.map((step, i) => {
                const isRosa = step.color === 'rosa';
                return (
                  <motion.div
                    key={i}
                    className="absolute left-8 -translate-x-1/2"
                    style={{ top: `${5 + (i / (steps.length - 1)) * 90}%` }}
                  >
                    <motion.div
                      className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                        i <= activeStep
                          ? isRosa ? 'bg-rosa' : 'bg-azul'
                          : 'bg-white/10'
                      }`}
                      animate={{ scale: i === activeStep ? 1.8 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                );
              })}

              {/* Logo image — editorial large */}
              <motion.div
                className="ml-16 relative"
                style={{ y: logoY, rotate: logoRotate }}
              >
                <img
                  src={rosaVividoLogo}
                  alt="Lumi"
                  className="w-48 lg:w-56 h-auto opacity-70"
                />
                <div className="absolute inset-0 blur-[60px] bg-rosa/5 rounded-full" />
              </motion.div>

              {/* Active step label */}
              <motion.div
                className="ml-16 mt-6 text-center"
                key={activeStep}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-[10px] font-sans font-bold text-rosa tracking-widest uppercase">
                  Paso {activeStep + 1} / {steps.length}
                </span>
              </motion.div>
            </div>
          </div>

          {/* Right — Scrolling steps */}
          <div className="lg:col-span-8 pb-32 lg:pb-48">
            {steps.map((step, i) => (
              <StepBlock
                key={step.num}
                step={step}
                index={i}
                isActive={i === activeStep}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
