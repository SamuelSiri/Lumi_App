import { C, BlobBG, Deco, PageHero, useSceneObserver } from '../components/landing/cinematic';

const sections = [
  {
    title: '1. Uso de la Plataforma',
    body: 'Al acceder y utilizar la plataforma Lumi, usted acepta cumplir con estos Terminos y Condiciones en su totalidad. El servicio se proporciona "tal cual" y "segun disponibilidad", sin garantias de ningun tipo, ya sean expresas o implicitas. Lumi Technologies se reserva el derecho de modificar, suspender o descontinuar cualquier aspecto del servicio en cualquier momento, con o sin previo aviso, segun lo considere necesario para mejorar la experiencia del usuario o cumplir con requisitos legales.',
  },
  {
    title: '2. Privacidad y Datos',
    body: 'Usted es el unico propietario de todos los datos que ingresa en la plataforma. Lumi Technologies no vende, comparte ni transfiere sus datos personales a terceros bajo ninguna circunstancia. Nos comprometemos a cumplir con todas las regulaciones de proteccion de datos aplicables, incluyendo la Ley 172-13 de Proteccion de Datos de la Republica Dominicana y el Reglamento General de Proteccion de Datos (GDPR) cuando sea aplicable.',
  },
  {
    title: '3. Propiedad Intelectual',
    body: 'Todo el contenido, codigo fuente, tecnologia, algoritmos, disenos, marcas y materiales presentes en la plataforma son propiedad exclusiva de Lumi Technologies o sus licenciantes. Queda estrictamente prohibida la reproduccion, distribucion, modificacion o uso no autorizado de cualquier elemento de la plataforma sin consentimiento previo por escrito.',
  },
  {
    title: '4. Limitacion de Responsabilidad',
    body: 'Lumi Technologies no sera responsable por danos indirectos, incidentales, especiales, consecuentes o punitivos que resulten del uso o la imposibilidad de uso de la plataforma. En ningun caso la responsabilidad total de Lumi Technologies excedera el monto equivalente a doce (12) meses de las tarifas pagadas por el usuario durante el periodo inmediatamente anterior al evento que dio lugar a la reclamacion.',
  },
  {
    title: '5. Modificaciones',
    body: 'Lumi Technologies se reserva el derecho de modificar estos Terminos y Condiciones en cualquier momento. Para cambios significativos que afecten los derechos u obligaciones del usuario, proporcionaremos un aviso con al menos treinta (30) dias de anticipacion a traves de la plataforma o por correo electronico. El uso continuado del servicio despues de la entrada en vigor de las modificaciones constituye la aceptacion de los nuevos terminos.',
  },
  {
    title: '6. Jurisdiccion',
    body: 'Estos Terminos y Condiciones se rigen e interpretan de acuerdo con las leyes de la Republica Dominicana. Cualquier disputa, controversia o reclamacion derivada de o relacionada con estos terminos sera sometida a la jurisdiccion exclusiva de los tribunales competentes de Santo Domingo, Distrito Nacional, Republica Dominicana.',
  },
];

export default function TermsPage() {
  useSceneObserver();

  return (
    <main>
      {/* 1 -- Hero */}
      <PageHero label="Legal" title="Terminos y Condiciones" accentWord="Condiciones" theme="light" />

      {/* 2 -- Terms content (light, static) */}
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
