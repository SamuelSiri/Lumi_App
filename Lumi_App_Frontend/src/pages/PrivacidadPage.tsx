import { C, BlobBG, Deco, PageHero, useSceneObserver } from '../components/landing/cinematic';

const sections = [
  {
    title: '1. Quiénes somos',
    body: 'Lumi Technologies es responsable del tratamiento de los datos personales que recopilamos a través del uso de nuestro dispositivo, aplicación y plataforma. Nuestro compromiso es claro: cuidar tu información con la misma calidez con la que LUMI cuida a tu familia. Solo recopilamos lo necesario para que el servicio funcione bien y cumpla su propósito de acompañar.',
  },
  {
    title: '2. Qué información recopilamos',
    body: 'Recopilamos datos de cuenta (nombre, correo electrónico, teléfono), datos de uso del dispositivo (interacciones por voz, lecturas de sensores, eventos de alerta) y datos opcionales que decidas compartir (contactos de emergencia, recordatorios médicos, preferencias). No recopilamos imágenes ni grabaciones de audio sin tu consentimiento explícito y siempre eres dueño de tus datos.',
  },
  {
    title: '3. Para qué usamos tus datos',
    body: 'Tus datos se usan exclusivamente para: hacer funcionar el servicio, enviar alertas a tus contactos cuando hay emergencias, mejorar la experiencia de uso, y comunicarnos contigo sobre el dispositivo. No vendemos, alquilamos ni compartimos información personal con terceros para fines publicitarios. Punto.',
  },
  {
    title: '4. Cómo protegemos tu información',
    body: 'Aplicamos cifrado de extremo a extremo en todas las comunicaciones entre el dispositivo, la nube y la app. Usamos servidores con estándares de seguridad bancaria y limitamos el acceso a tu información solo al personal estrictamente necesario. Cumplimos con las regulaciones de protección de datos aplicables, incluyendo la Ley 172-13 de la República Dominicana y el GDPR donde corresponda.',
  },
  {
    title: '5. Tus derechos',
    body: 'En cualquier momento puedes acceder, rectificar, descargar o eliminar tus datos personales. También puedes oponerte al tratamiento o limitar su uso. Para ejercer cualquiera de estos derechos solo escríbenos a holalumi.info@gmail.com — respondemos rápido y sin formularios complicados.',
  },
  {
    title: '6. Cookies y tecnologías similares',
    body: 'Usamos cookies estrictamente necesarias para el funcionamiento del sitio y, con tu consentimiento, cookies analíticas para entender cómo se usa la plataforma y mejorarla. No usamos cookies de publicidad de terceros. Puedes ajustar tus preferencias desde la configuración de tu navegador en cualquier momento.',
  },
  {
    title: '7. Cambios en esta política',
    body: 'Si actualizamos esta política, te avisaremos a través de la app o por correo electrónico antes de que los cambios entren en vigor. Nunca cambiamos algo importante sin avisarte primero — porque la confianza se construye así.',
  },
  {
    title: '8. Contáctanos',
    body: 'Para cualquier pregunta, comentario o solicitud relacionada con tu privacidad, escríbenos a holalumi.info@gmail.com o llámanos al +1 849 828 2023. Una persona real te responde — no un sistema automático.',
  },
];

export default function PrivacidadPage() {
  useSceneObserver();

  return (
    <main>
      {/* 1 -- Hero */}
      <PageHero label="Legal" title="Politica de Privacidad" accentWord="Privacidad" theme="light" />

      {/* 2 -- Privacy content */}
      <section className="relative overflow-hidden py-28 lg:py-40" style={{ background: C.light }}>
        {/* Giant section symbol */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span
            className="select-none"
            style={{
              fontSize: '30vw',
              fontWeight: 900,
              lineHeight: 1,
              color: C.dark,
              opacity: 0.03,
            }}
          >
            &sect;
          </span>
        </div>

        <BlobBG color={C.rosa} opacity={0.02} className="w-[500px] h-[500px] -top-20 -right-20" />
        <Deco style={{ top: '8%', right: '6%', color: C.dark }}>&#x2726;</Deco>
        <Deco style={{ bottom: '12%', left: '5%', color: C.dark }}>&#x25C6;</Deco>

        {/* Content container */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-14">
            {sections.map((s, i) => (
              <div key={i}>
                <strong
                  className="block text-sm font-bold uppercase tracking-[0.08em] mb-3"
                  style={{ color: C.dark }}
                >
                  {s.title}
                </strong>
                <p
                  className="text-[15px] leading-[1.8]"
                  style={{ color: C.grey }}
                >
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
