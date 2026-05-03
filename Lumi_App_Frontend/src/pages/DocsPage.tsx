import { useEffect } from 'react';
import { Book, Zap, Settings, MessageCircle, Shield, Wifi, HelpCircle, FileText, Monitor, Users } from 'lucide-react';
import { C, BlobBG, Deco, MarqueeStrip, WaveDivider, Particles, PageHero, CTASection, useSceneObserver } from '../components/landing/cinematic';

import rosaIcon from '../assets/images/rosa_vivido_icon-removebg-preview.png';
import azulIcon from '../assets/images/icono_lumi_azul-removebg-preview.png';
import pastelIcon from '../assets/images/rosapastelicon-removebg-preview.png';

export default function DocsPage() {
  useSceneObserver();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
            const speed = parseFloat(el.dataset.parallax || '0.1');
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            el.style.transform = `translateY(${center * speed}px)`;
          });
          ticking = false;
        }); ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main>

      {/* ═══ HERO ═══ */}
      <PageHero label="Recursos" title="Documentación" accentWord="Documentación" theme="dark" />

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════
          INTRO — Todo lo que necesitas saber (light)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.rosa} opacity={0.04} className="w-[700px] h-[700px] -top-40 -right-40" />
        <Particles count={6} color={`${C.rosa}15`} />
        <Deco style={{ top: '10%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>001</Deco>
        <Deco style={{ bottom: '12%', left: '8%', color: C.dark }}>&#x25C6;</Deco>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 22vw, 350px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.dark}03` }}>DOCS</span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <div className="lg:col-span-5 anim-scale-in delay-1 flex justify-center">
              <div className="relative">
                <img src={rosaIcon} alt="LUMI" className="w-40 lg:w-56 h-auto" data-parallax="0.08" style={{ animation: 'float 6s ease-in-out infinite' }} />
                <div className="absolute inset-0 -m-12 rounded-full pointer-events-none" style={{ background: `radial-gradient(circle, ${C.rosa}12 0%, transparent 60%)` }} />
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Guía Completa</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
                Todo lo que necesitas <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>saber</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base lg:text-lg leading-relaxed max-w-lg" style={{ color: C.grey }}>
                Desde la primera configuración hasta las funciones más avanzadas. Aquí encontrarás guías paso a paso, especificaciones técnicas, preguntas frecuentes y todo lo que necesitas para sacarle el máximo provecho a LUMI.
              </p>
              <p className="anim-reveal-up delay-3 mt-4 text-base leading-relaxed max-w-lg" style={{ color: C.grey }}>
                No importa si eres el usuario principal o un familiar que quiere entender cómo funciona — esta documentación está pensada para todos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════
          GUÍAS PRINCIPALES — tilted cards (dark)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.dark }}>
        <BlobBG color={C.azul} opacity={0.04} className="w-[800px] h-[800px] -bottom-40 -right-40" />
        <Particles count={6} color={`${C.azul}15`} />
        <Deco style={{ top: '8%', left: '5%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '10%', right: '8%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>002</Deco>
        <div className="absolute pointer-events-none" style={{ width: 300, height: 300, borderRadius: '50%', border: `1px solid ${C.white}05`, right: '-3%', top: '15%', animation: 'spin-slow 25s linear infinite' }} />

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Guías Principales</p>
          <h2 className="anim-reveal-up delay-1 mb-16 lg:mb-20" style={{ fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
            Empieza <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>aquí</span>
          </h2>

          {/* Tilted cards — 2-col grid, slight rotations for editorial feel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { Icon: Zap, title: 'Inicio Rápido', desc: 'Enciende LUMI, conéctala a tu red WiFi y configura los contactos de emergencia. En menos de 10 minutos estará lista para acompañarte. Incluye guía visual paso a paso con ilustraciones.', rotate: '-1.5deg', accent: C.rosa },
              { Icon: MessageCircle, title: 'Comandos de Voz', desc: 'Lista completa de todo lo que puedes pedirle a LUMI: recordatorios, música, cuentos, estado del clima, llamadas a familiares, preguntas generales y más. LUMI entiende lenguaje natural, pero aquí encontrarás ejemplos útiles para cada situación.', rotate: '1deg', accent: C.azul },
              { Icon: Shield, title: 'Seguridad y Sensores', desc: 'Cómo funcionan los sensores de movimiento, temperatura y humo. Cómo configurar el botón SOS, agregar contactos de emergencia y personalizar las alertas. Protocolo completo de respuesta ante incidentes.', rotate: '0.5deg', accent: C.neon },
              { Icon: Settings, title: 'Configuración Avanzada', desc: 'Ajusta el volumen de voz, brillo de la matriz LED, sensibilidad de los sensores, horarios de recordatorios, zona horaria y preferencias de idioma. Todo desde la app móvil o por comandos de voz directos.', rotate: '-1deg', accent: C.rosa },
              { Icon: Users, title: 'Guía para Familiares', desc: 'Cómo instalar la app de LUMI, vincular tu cuenta, recibir notificaciones, revisar reportes diarios de actividad y bienestar, y comunicarte con tu ser querido a través de LUMI. Roles y permisos explicados.', rotate: '1.5deg', accent: C.azul },
              { Icon: Monitor, title: 'Panel de Monitoreo', desc: 'Guía completa del dashboard familiar: cómo leer los signos vitales, interpretar alertas, revisar historial de actividad, configurar reportes automáticos y gestionar múltiples dispositivos LUMI en un mismo hogar.', rotate: '-0.5deg', accent: C.rosa },
            ].map((doc, i) => (
              <div key={doc.title} className={`anim-reveal-up delay-${Math.min(i + 1, 7)}`} style={{ transform: `rotate(${doc.rotate})` }}>
                <div className="flex rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]" style={{ background: C.darkAlt, border: `1px solid ${C.white}06` }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = `${doc.accent}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.white}06`; }}
                >
                  <div className="w-1.5 shrink-0" style={{ background: doc.accent }} />
                  <div className="p-6 lg:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${doc.accent}12` }}>
                        <doc.Icon size={18} style={{ color: doc.accent }} />
                      </div>
                      <p className="text-sm font-bold uppercase tracking-[0.06em]" style={{ color: C.white }}>{doc.title}</p>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: C.grey }}>{doc.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Docs marquee */}
      <div className="relative w-full overflow-hidden" style={{ height: 40, background: C.dark }}>
        <div className="marquee-track fast" style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap mx-4" style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', color: C.rosa, textTransform: 'uppercase' }}>
              DOCUMENTACIÓN — GUÍAS — CONFIGURACIÓN — SENSORES — COMANDOS — FAMILIAS —
            </span>
          ))}
        </div>
      </div>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════
          ESPECIFICACIONES TÉCNICAS (light)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.grey} opacity={0.04} className="w-[700px] h-[700px] -top-20 -left-20" />
        <Deco style={{ top: '10%', right: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>003</Deco>
        <Deco style={{ bottom: '15%', left: '10%', color: C.dark }}>&#x25C8;</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-5">
              <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.azul }}>Especificaciones</p>
              <h2 className="anim-reveal-up delay-1" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
                Lo que hay <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>dentro</span>
              </h2>
              <p className="anim-reveal-up delay-2 mt-6 text-base leading-relaxed" style={{ color: C.grey }}>
                LUMI combina hardware especializado con inteligencia artificial en la nube. Cada componente fue seleccionado para ofrecer máxima confiabilidad, bajo consumo energético y una experiencia fluida.
              </p>
              <div className="anim-scale-in delay-3 mt-10 flex justify-center lg:justify-start">
                <img src={azulIcon} alt="" className="w-28 lg:w-36 h-auto opacity-50" data-parallax="0.1" style={{ animation: 'float 7s ease-in-out infinite' }} />
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-5">
                {[
                  { label: 'Procesador', value: 'ARM Cortex-M7 + NPU dedicado', desc: 'Procesamiento de voz local para respuesta inmediata. La NPU maneja detección de palabras clave sin conexión a internet.' },
                  { label: 'Conectividad', value: 'WiFi 5 + Bluetooth 5.3', desc: 'Conexión estable a la red del hogar. Bluetooth para emparejamiento con la app móvil y actualizaciones de firmware.' },
                  { label: 'Sensores', value: '6 sensores integrados', desc: 'Micrófono array de 4 elementos, sensor PIR de movimiento, termómetro ambiental, detector de humo, acelerómetro y sensor de luz.' },
                  { label: 'Audio', value: 'Altavoz 3W + Micrófono Array', desc: 'Altavoz de alta fidelidad para voz clara. Array de 4 micrófonos con cancelación de ruido para captar voz a distancia.' },
                  { label: 'Display', value: 'Matriz LED 8x8 RGB', desc: 'Más de 20 expresiones faciales animadas. Brillo adaptativo según la luz ambiental. Configurable por el usuario.' },
                  { label: 'Alimentación', value: 'USB-C 5V / Batería de respaldo', desc: 'Funcionamiento principal por cable. Batería de respaldo de 4 horas para emergencias y cortes de energía.' },
                  { label: 'Seguridad', value: 'Cifrado AES-256 + TLS 1.3', desc: 'Toda la comunicación entre LUMI y la nube está cifrada de extremo a extremo. Los datos de voz no se almacenan.' },
                  { label: 'Dimensiones', value: '12 x 10 x 10 cm / 320g', desc: 'Compacta y ligera. Diseñada para integrarse naturalmente en cualquier espacio del hogar sin ser intrusiva.' },
                ].map((spec, i) => (
                  <div key={spec.label} className={`anim-slide-right delay-${Math.min(i + 1, 7)} flex items-start gap-5 pb-5 border-b`} style={{ borderColor: `${C.dark}08` }}>
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] w-24 shrink-0 pt-1" style={{ color: C.grey }}>{spec.label}</p>
                    <div>
                      <p className="text-sm font-bold" style={{ color: C.dark }}>{spec.value}</p>
                      <p className="text-xs mt-1 leading-relaxed" style={{ color: C.grey }}>{spec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════
          PREGUNTAS FRECUENTES (dark)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.03} className="w-[800px] h-[800px] -top-40 -right-40" />
        <Particles count={6} color={`${C.rosa}15`} />
        <Deco style={{ top: '8%', left: '5%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '12%', right: '8%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>004</Deco>

        {/* Bleeding bg text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span className="whitespace-nowrap select-none" style={{ fontSize: 'clamp(80px, 16vw, 260px)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.05em', textTransform: 'uppercase', color: `${C.white}03` }}>FAQ</span>
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.rosa }}>Preguntas Frecuentes</p>
          <h2 className="anim-reveal-up delay-1 mb-16 lg:mb-20" style={{ fontSize: 'clamp(32px, 6vw, 80px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.white }}>
            Lo que todos <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>preguntan</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { q: '¿LUMI necesita internet para funcionar?', a: 'LUMI necesita conexión WiFi para procesar comandos de voz y enviar alertas. Sin embargo, las funciones básicas de seguridad (detección de humo, botón SOS) funcionan incluso sin internet gracias a la batería de respaldo y el procesamiento local.' },
              { q: '¿Es difícil configurar LUMI?', a: 'No. La configuración inicial toma menos de 10 minutos. Solo necesitas encenderla, conectarla a tu WiFi desde la app y registrar los contactos de emergencia. LUMI te guía con voz durante todo el proceso.' },
              { q: '¿LUMI graba las conversaciones?', a: 'No. LUMI procesa la voz en tiempo real pero no almacena grabaciones. El audio se convierte en texto, se envía cifrado a la nube para generar la respuesta, y se descarta inmediatamente. Tu privacidad es absoluta.' },
              { q: '¿Cuántos familiares pueden conectarse?', a: 'No hay límite. Cada miembro de la familia puede descargar la app, crear su cuenta y vincularse al dispositivo. Puedes asignar roles diferentes: administrador, cuidador o familiar, cada uno con permisos específicos.' },
              { q: '¿Qué pasa si se va la luz?', a: 'LUMI tiene batería de respaldo que dura hasta 4 horas. Durante un corte de energía, las funciones de seguridad siguen activas. Si la batería se agota, LUMI envía una última alerta a todos los contactos antes de apagarse.' },
              { q: '¿LUMI puede llamar al 911?', a: 'LUMI no realiza llamadas telefónicas directas, pero al presionar el botón SOS envía una alerta con ubicación GPS a todos los contactos de emergencia registrados, incluyendo la opción de agregar servicios de emergencia locales.' },
              { q: '¿Se actualiza automáticamente?', a: 'Sí. LUMI recibe actualizaciones de firmware por WiFi de forma automática durante las horas de reposo. Las actualizaciones mejoran el reconocimiento de voz, agregan funciones nuevas y fortalecen la seguridad.' },
              { q: '¿Funciona con otros idiomas?', a: 'Actualmente LUMI está optimizada para español latinoamericano. El soporte para inglés y portugués está en desarrollo y se activará mediante actualización automática cuando esté disponible.' },
            ].map((faq, i) => (
              <div key={i} className={`anim-reveal-up delay-${Math.min(i + 1, 7)} border-l-2 pl-6 py-4`} style={{ borderColor: `${C.white}08` }}>
                <div className="flex items-start gap-3 mb-3">
                  <HelpCircle size={16} className="shrink-0 mt-0.5" style={{ color: C.rosa }} />
                  <p className="text-sm font-bold" style={{ color: C.white }}>{faq.q}</p>
                </div>
                <p className="text-xs leading-relaxed ml-7" style={{ color: C.grey }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══════════════════════════════════════════════════
          GUÍAS ADICIONALES (light)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        <BlobBG color={C.azul} opacity={0.03} className="w-[600px] h-[600px] -bottom-20 -right-20" />
        <Deco style={{ top: '10%', left: '5%', fontSize: 10, letterSpacing: '0.15em', color: C.grey }}>005</Deco>
        <Deco style={{ bottom: '12%', right: '10%', color: C.dark }}>&#x25C6;</Deco>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="anim-reveal-up delay-0 text-[10px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: C.azul }}>Más Recursos</p>
          <h2 className="anim-reveal-up delay-1 mb-16" style={{ fontSize: 'clamp(28px, 5vw, 64px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: C.dark }}>
            Guías <span className="italic" style={{ fontWeight: 400, color: C.rosa }}>adicionales</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { Icon: Book, title: 'Guía de Cuidado', desc: 'Cómo mantener LUMI limpia, dónde ubicarla en el hogar para mejor cobertura de sensores, y consejos para maximizar la duración de la batería de respaldo.', accent: C.rosa },
              { Icon: FileText, title: 'Política de Privacidad', desc: 'Documento completo sobre cómo LUMI maneja tus datos. Qué se procesa, qué se almacena (nada de audio), y cómo puedes solicitar la eliminación de tu información en cualquier momento.', accent: C.azul },
              { Icon: Wifi, title: 'Solución de Problemas', desc: 'LUMI no responde, no se conecta al WiFi, el LED parpadea en rojo, el sensor de humo se activó sin razón — aquí encontrarás solución para los problemas más comunes.', accent: C.neon },
              { Icon: Settings, title: 'Personalización', desc: 'Cambia el nombre de LUMI, elige entre diferentes voces, ajusta la velocidad del habla, configura frases de despertar personalizadas y personaliza las rutinas diarias.', accent: C.rosa },
              { Icon: Users, title: 'Para Cuidadores Profesionales', desc: 'Guía especializada para enfermeras, cuidadores y personal de salud que utilizan LUMI como herramienta de apoyo en el cuidado de pacientes o adultos mayores.', accent: C.azul },
              { Icon: Monitor, title: 'Integración con Apps de Salud', desc: 'Cómo conectar los datos de LUMI con aplicaciones de salud, exportar reportes para médicos y compartir el historial de bienestar con profesionales de la salud.', accent: C.rosa },
            ].map((guide, i) => (
              <div key={guide.title} className={`anim-reveal-up delay-${Math.min(i + 1, 7)} rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02]`} style={{ borderColor: `${C.dark}06`, background: `${C.white}80` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${guide.accent}25`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = `${C.dark}06`; }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `${guide.accent}10` }}>
                  <guide.Icon size={18} style={{ color: guide.accent }} />
                </div>
                <p className="text-sm font-bold uppercase tracking-[0.05em] mb-2" style={{ color: C.dark }}>{guide.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: C.grey }}>{guide.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══════════════════════════════════════════════════
          IMPACT QUOTE (dark)
          ═══════════════════════════════════════════════════ */}
      <section className="scene relative min-h-[50vh] overflow-hidden flex items-center justify-center" style={{ background: C.dark }}>
        <BlobBG color={C.rosa} opacity={0.03} className="w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 600 200" fill="none" style={{ width: '80%', maxWidth: 700, height: 'auto', opacity: 0.04 }}>
          <path d="M20 160C80 40 150 20 220 80C290 140 260 180 330 100C400 20 440 60 500 120C560 180 580 80 580 80" stroke={C.rosa} strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
        <Deco style={{ top: '15%', left: '10%', color: C.rosa }}>&#x2726;</Deco>
        <Deco style={{ bottom: '15%', right: '10%', color: C.neon }}>&#x25C6;</Deco>

        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="anim-clip-reveal delay-1">
            <h2 style={{ fontSize: 'clamp(24px, 5vw, 72px)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.03em', textTransform: 'uppercase', color: C.white }}>
              Documentación <span className="italic" style={{ fontWeight: 400 }}>clara</span> porque la <span style={{ color: C.rosa }}>tecnología</span> debe ser para <span style={{ color: C.neon }}>todos</span>
            </h2>
          </div>
        </div>
      </section>

      <WaveDivider darkToLight />

      {/* ═══ MARQUEE ═══ */}
      <section className="scene relative min-h-[35vh] overflow-hidden flex items-center justify-center" style={{ background: C.light }}>
        <div className="absolute inset-0 flex flex-col justify-center gap-3 pointer-events-none">
          <div className="overflow-hidden"><div className="marquee-track">
            {Array.from({ length: 8 }).map((_, i) => (<span key={i} className="whitespace-nowrap mx-4 select-none" style={{ fontSize: 'clamp(40px, 10vw, 140px)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.04em', textTransform: 'uppercase', color: `${C.dark}04` }}>GUÍAS — SENSORES — CONFIGURACIÓN — FAMILIAS —</span>))}
          </div></div>
        </div>
        <div className="relative z-10 anim-scale-in delay-1">
          <img src={pastelIcon} alt="" className="w-24 sm:w-36 lg:w-44 h-auto opacity-50" data-parallax="0.12" />
        </div>
      </section>

      <MarqueeStrip />

      {/* ═══ CTA ═══ */}
      <CTASection headline="¿Tienes dudas?" sub="Escríbenos y te ayudamos con lo que necesites. Soporte humano, siempre." linkTo="/contact" linkLabel="Contáctanos" />
    </main>
  );
}
