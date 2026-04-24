import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { Headphones, MessageCircle, Mail, Phone, MapPin, Clock, Send, ChevronDown } from 'lucide-react';
import {
  FadeIn,
  Parallax,
  ease,
  SectionDivider,
  staggerContainer,
  staggerItem,
} from '../components/landing/motion';
import LumiCharacter from '../components/LumiCharacter';

const contactMethods = [
  { icon: Mail, title: 'Email', value: 'hola@lumi.tech', desc: 'Respuesta en menos de 24h', color: 'rosa' as const },
  { icon: Phone, title: 'Teléfono', value: '+52 800 LUMI (5864)', desc: 'Lunes a viernes, 9am - 7pm', color: 'azul' as const },
  { icon: MessageCircle, title: 'Chat en vivo', value: 'Disponible en la app', desc: 'Respuesta inmediata', color: 'rosa' as const },
  { icon: MapPin, title: 'Oficina', value: 'Ciudad de México', desc: 'Visitas con cita previa', color: 'azul' as const },
];

const faq = [
  { q: '¿Cómo funciona Lumi?', a: 'Lumi es un compañero robótico con IA que monitorea salud, ofrece compañía emocional y mantiene a la familia conectada. Se configura en minutos y se conecta a tu red WiFi.' },
  { q: '¿Es difícil de usar para adultos mayores?', a: 'Lumi fue diseñado específicamente para ser intuitivo. No requiere pantallas ni botones complicados. Interactúa por voz y responde con calidez.' },
  { q: '¿Mis datos están seguros?', a: 'Sí. Utilizamos cifrado AES-256, procesamiento local en el dispositivo y nunca almacenamos imágenes. Tu privacidad es nuestra prioridad absoluta.' },
  { q: '¿Cuántos familiares pueden conectarse?', a: 'Hasta 10 miembros familiares pueden acceder al panel de Lumi, cada uno con roles y permisos personalizados.' },
];

export default function Contacto() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const methodsRef = useRef(null);
  const methodsInView = useInView(methodsRef, { once: false, margin: '-80px' });

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
                    Soporte
                  </span>
                </FadeIn>
                <FadeIn direction="left" distance={40} delay={0.1}>
                  <h1 className="text-5xl lg:text-7xl font-extrabold text-negro leading-tight mt-6">
                    ¿Cómo podemos <span className="text-rosa">ayudarte</span>?
                  </h1>
                </FadeIn>
                <FadeIn direction="left" distance={40} delay={0.2}>
                  <p className="text-gris-500 text-lg lg:text-xl leading-relaxed max-w-lg mt-6">
                    Nuestro equipo está listo para resolver cualquier duda.
                    Porque cuidar a tu familia merece la mejor atención.
                  </p>
                </FadeIn>
              </div>
              <FadeIn direction="right" distance={40} delay={0.3} className="flex justify-center">
                <Parallax speed={0.15}>
                  <div className="relative">
                    <div className="absolute -inset-8 bg-azul-light/60 rounded-full blur-3xl" />
                    <div className="relative bg-white rounded-3xl p-10 shadow-lg border border-gris-100 text-center">
                      <Headphones size={48} className="text-azul mx-auto mb-3" />
                      <p className="text-lg font-bold text-negro">Estamos aquí</p>
                      <p className="text-sm text-gris-400 mt-1">Respuesta promedio: 15 min</p>
                    </div>
                  </div>
                </Parallax>
              </FadeIn>
            </div>
          </div>
        </motion.div>
      </section>

      <SectionDivider color="rosa" />

      {/* Contact methods */}
      <section className="py-16 bg-gris-50/50" ref={methodsRef}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-5"
            variants={staggerContainer}
            initial="hidden"
            animate={methodsInView ? 'visible' : 'hidden'}
          >
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const isRosa = method.color === 'rosa';
              return (
                <motion.div
                  key={method.title}
                  variants={staggerItem}
                  whileHover={{ y: -6, boxShadow: '0 16px 50px rgba(0,0,0,0.08)' }}
                  className="bg-white rounded-2xl p-6 shadow-xs border border-gris-100 text-center cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${isRosa ? 'bg-rosa-light text-rosa' : 'bg-azul-light text-azul'}`}
                  >
                    <Icon size={20} />
                  </motion.div>
                  <p className="font-bold text-negro text-sm">{method.title}</p>
                  <p className={`text-sm font-medium mt-1 ${isRosa ? 'text-rosa' : 'text-azul'}`}>{method.value}</p>
                  <p className="text-xs text-gris-400 mt-1">{method.desc}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <SectionDivider color="azul" />

      {/* Contact form + FAQ */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Form */}
            <FadeIn direction="left" distance={40}>
              <div>
                <span className="text-rosa text-sm font-semibold tracking-wider uppercase">Escríbenos</span>
                <h2 className="text-3xl font-extrabold text-negro mt-2 mb-8">Envíanos un mensaje</h2>
                <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gris-600 mb-1.5">Nombre</label>
                      <input
                        type="text"
                        placeholder="Tu nombre"
                        className="w-full rounded-xl border border-gris-200 px-4 py-3 text-sm text-negro placeholder:text-gris-300 focus:outline-none focus:ring-2 focus:ring-rosa/20 focus:border-rosa transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gris-600 mb-1.5">Apellido</label>
                      <input
                        type="text"
                        placeholder="Tu apellido"
                        className="w-full rounded-xl border border-gris-200 px-4 py-3 text-sm text-negro placeholder:text-gris-300 focus:outline-none focus:ring-2 focus:ring-rosa/20 focus:border-rosa transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gris-600 mb-1.5">Correo electrónico</label>
                    <input
                      type="email"
                      placeholder="tu@correo.com"
                      className="w-full rounded-xl border border-gris-200 px-4 py-3 text-sm text-negro placeholder:text-gris-300 focus:outline-none focus:ring-2 focus:ring-rosa/20 focus:border-rosa transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gris-600 mb-1.5">Asunto</label>
                    <select className="w-full rounded-xl border border-gris-200 px-4 py-3 text-sm text-gris-600 focus:outline-none focus:ring-2 focus:ring-rosa/20 focus:border-rosa transition-all bg-white">
                      <option>Información general</option>
                      <option>Soporte técnico</option>
                      <option>Ventas</option>
                      <option>Alianzas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gris-600 mb-1.5">Mensaje</label>
                    <textarea
                      rows={4}
                      placeholder="¿En qué podemos ayudarte?"
                      className="w-full rounded-xl border border-gris-200 px-4 py-3 text-sm text-negro placeholder:text-gris-300 focus:outline-none focus:ring-2 focus:ring-rosa/20 focus:border-rosa transition-all resize-none"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-rosa text-white text-sm font-bold rounded-full hover:bg-rosa-hover transition-colors shadow-sm"
                  >
                    <Send size={16} />
                    Enviar mensaje
                  </motion.button>
                </form>
              </div>
            </FadeIn>

            {/* FAQ */}
            <FadeIn direction="right" distance={40} delay={0.2}>
              <div>
                <span className="text-azul text-sm font-semibold tracking-wider uppercase">FAQ</span>
                <h2 className="text-3xl font-extrabold text-negro mt-2 mb-8">Preguntas frecuentes</h2>
                <div className="space-y-3">
                  {faq.map((item, i) => (
                    <div key={i} className="bg-gris-50 rounded-2xl overflow-hidden border border-gris-100">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left"
                      >
                        <span className="text-sm font-semibold text-negro pr-4">{item.q}</span>
                        <motion.div
                          animate={{ rotate: openFaq === i ? 180 : 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="shrink-0"
                        >
                          <ChevronDown size={18} className="text-rosa" />
                        </motion.div>
                      </button>
                      <AnimatePresence initial={false}>
                        {openFaq === i && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className="overflow-hidden"
                          >
                            <p className="px-6 pb-4 text-sm text-gris-500 leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                {/* Support hours */}
                <FadeIn delay={0.3}>
                  <div className="mt-8 bg-rosa-light rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <motion.div whileHover={{ rotate: 10, scale: 1.1 }}>
                        <Clock size={20} className="text-rosa" />
                      </motion.div>
                      <span className="font-bold text-negro">Horario de atención</span>
                    </div>
                    <div className="space-y-1.5 text-sm text-gris-600">
                      <p>Lunes a Viernes: 9:00 AM - 7:00 PM</p>
                      <p>Sábados: 10:00 AM - 2:00 PM</p>
                      <p>Emergencias: 24/7 vía app</p>
                    </div>
                  </div>
                </FadeIn>

                {/* Lumi character */}
                <div className="mt-8 flex justify-center">
                  <Parallax speed={0.08}>
                    <LumiCharacter size="sm" />
                  </Parallax>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}
