import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Users, Heart, Shield, Bell, Smartphone, UserCheck, MessageCircle, Activity } from 'lucide-react';
import LumiCharacter from '../components/LumiCharacter';
import {
  FadeIn,
  Parallax,
  AnimatedCounter,
  SectionDivider,
  staggerContainer,
  staggerItem,
} from '../components/landing/motion';

const familyFeatures = [
  { icon: Users, title: 'Panel familiar compartido', desc: 'Cada miembro de la familia puede acceder a la información de salud y bienestar desde su propio dispositivo.', color: 'rosa' as const },
  { icon: UserCheck, title: 'Roles y permisos', desc: 'Configura quién puede ver qué información y quién recibe alertas de emergencia.', color: 'azul' as const },
  { icon: Bell, title: 'Alertas personalizadas', desc: 'Cada familiar recibe las notificaciones que le corresponden según su rol de cuidado.', color: 'rosa' as const },
  { icon: Smartphone, title: 'App para todos', desc: 'Disponible en iOS y Android. Hasta 10 miembros familiares conectados simultáneamente.', color: 'azul' as const },
  { icon: MessageCircle, title: 'Comunicación directa', desc: 'Envía mensajes de voz, fotos y notas a tu ser querido a través de Lumi.', color: 'rosa' as const },
  { icon: Activity, title: 'Reportes diarios', desc: 'Resumen automático del bienestar diario: actividad, alimentación, descanso y estado emocional.', color: 'azul' as const },
];

const familyMembers = [
  { name: 'Hijo/a', role: 'Administrador', desc: 'Control total y alertas críticas', icon: Shield },
  { name: 'Nieto/a', role: 'Familiar', desc: 'Actualizaciones y comunicación', icon: Heart },
  { name: 'Cuidador', role: 'Profesional', desc: 'Reportes médicos detallados', icon: Activity },
  { name: 'Vecino/a', role: 'Contacto', desc: 'Alertas de emergencia cercana', icon: Bell },
];

const stats = [
  { value: 10, suffix: '+', label: 'Miembros por familia' },
  { value: 24, suffix: '/7', label: 'Monitoreo activo' },
  { value: 4, suffix: '', label: 'Roles configurables' },
  { value: 100, suffix: '%', label: 'Privacidad garantizada' },
];

export default function Familia() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const rolesRef = useRef(null);
  const rolesInView = useInView(rolesRef, { once: false, margin: '-80px' });

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
                    Familia
                  </span>
                </FadeIn>
                <FadeIn direction="left" distance={40} delay={0.1}>
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-negro leading-tight mt-6">
                    Toda tu familia <span className="text-rosa">conectada</span>
                  </h1>
                </FadeIn>
                <FadeIn direction="left" distance={40} delay={0.2}>
                  <p className="text-gris-500 text-lg lg:text-xl leading-relaxed max-w-lg mt-6">
                    Lumi es el centro de cuidado que une a tu familia. Cada miembro participa
                    activamente en el bienestar de quienes más importan.
                  </p>
                </FadeIn>
              </div>
              <FadeIn direction="right" distance={40} delay={0.3} className="flex justify-center">
                <Parallax speed={0.15}>
                  <div className="relative">
                    <div className="absolute -inset-8 bg-rosa-light/40 rounded-full blur-3xl" />
                    <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gris-100">
                      <LumiCharacter size="xl" />
                      <div className="absolute -top-3 -right-3 bg-rosa text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        En línea
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

      {/* Stats banner */}
      <section className="py-14 bg-azul">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 0.1} className="text-center">
                <p className="text-3xl lg:text-4xl font-extrabold text-white">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-white/70 mt-1">{stat.label}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* Family roles */}
      <section className="py-20 lg:py-28 bg-gris-50/50" ref={rolesRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-14">
            <span className="text-azul text-sm font-semibold tracking-wider uppercase">Roles</span>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro mt-3">
              Un rol para <span className="text-azul">cada persona</span>
            </h2>
            <p className="text-gris-500 text-lg max-w-2xl mx-auto mt-4">
              Configura permisos y notificaciones según la relación de cada miembro con tu ser querido.
            </p>
          </FadeIn>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate={rolesInView ? 'visible' : 'hidden'}
          >
            {familyMembers.map((member) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={member.name}
                  variants={staggerItem}
                  whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-7 shadow-xs border border-gris-100 text-center cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className="w-14 h-14 rounded-2xl bg-rosa-light mx-auto mb-4 flex items-center justify-center"
                  >
                    <Icon size={22} className="text-rosa" />
                  </motion.div>
                  <p className="font-bold text-negro text-lg">{member.name}</p>
                  <p className="text-xs text-rosa font-semibold mt-1 uppercase tracking-wide">{member.role}</p>
                  <p className="text-sm text-gris-400 mt-3">{member.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <SectionDivider color="rosa" />

      {/* Features grid */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-negro">
              Diseñado para <span className="text-rosa">cada rol</span>
            </h2>
            <p className="text-gris-500 text-lg max-w-2xl mx-auto mt-4">
              Herramientas pensadas para que cada familiar participe activamente en el cuidado.
            </p>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {familyFeatures.map((feat, i) => {
              const Icon = feat.icon;
              const isRosa = feat.color === 'rosa';
              const direction = i % 2 === 0 ? 'left' : 'right';
              return (
                <FadeIn key={feat.title} delay={i * 0.08} direction={direction} distance={30}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(0,0,0,0.08)' }}
                    className="bg-white rounded-2xl p-7 shadow-sm border border-gris-100 h-full transition-shadow"
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
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* Central illustration */}
      <section className="py-20 lg:py-32 bg-rosa-light/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <FadeIn direction="left" distance={40}>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-negro">
                Lumi en el <span className="text-rosa">centro</span>
              </h2>
              <p className="mt-6 text-gris-500 text-lg leading-relaxed">
                Un solo Lumi conecta a toda la familia. Cada interacción, cada alerta,
                cada momento de compañía fortalece el vínculo entre generaciones.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm text-gris-600">
                  <div className="w-2 h-2 rounded-full bg-rosa" />
                  Comunicación bidireccional
                </div>
                <div className="flex items-center gap-2 text-sm text-gris-600">
                  <div className="w-2 h-2 rounded-full bg-azul" />
                  Alertas en tiempo real
                </div>
                <div className="flex items-center gap-2 text-sm text-gris-600">
                  <div className="w-2 h-2 rounded-full bg-rosa" />
                  Reportes compartidos
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="right" distance={40} delay={0.2} className="flex justify-center">
              <Parallax speed={0.12}>
                <LumiCharacter size="xl" />
              </Parallax>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
