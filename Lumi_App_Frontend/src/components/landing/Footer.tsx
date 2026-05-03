import { Link } from 'react-router-dom';
import blancoLogo from '../../assets/images/logo_completo_blanco-removebg-preview.png';

const C = { rosa: '#FD4282', dark: '#0a0a12', white: '#ffffff', grey: '#8a8a8a', neon: '#39FF14' };

const columns = [
  { title: 'Plataforma', links: [
    { label: 'Conoce Lumi', href: '/about' },
    { label: 'Cómo Funciona', href: '/how' },
    { label: 'Documentación', href: '/docs' },
  ]},
  { title: 'Empresa', links: [
    { label: 'Apoyar', href: '/apoyar' },
    { label: 'Pre-orden', href: '/preorden' },
    { label: 'Contacto', href: '/contact' },
  ]},
  { title: 'Legal', links: [
    { label: 'Términos y Condiciones', href: '/terms' },
    { label: 'Privacidad', href: '/privacidad' },
  ]},
  { title: 'Contacto', links: [
    { label: 'holalumi.info@gmail.com', href: 'mailto:holalumi.info@gmail.com' },
    { label: '+1 849 828 2023', href: 'tel:+18498282023' },
  ]},
];

export default function Footer() {
  return (
    <footer style={{ background: C.dark, borderTop: `1px solid ${C.white}05` }}>
      {/* Marquee */}
      <div className="overflow-hidden py-3" style={{ borderBottom: `1px solid ${C.white}05` }}>
        <div className="marquee-track" style={{ animationDuration: '40s' }}>
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className="whitespace-nowrap mx-4 text-[10px] uppercase tracking-[0.15em]" style={{ color: `${C.white}08` }}>
              LUMI ✦ INTELIGENCIA ARTIFICIAL ✦ SOLUCIONES ✦ PLATAFORMA ✦ API ✦
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link to="/"><img src={blancoLogo} alt="Lumi" className="h-10 w-auto opacity-80" /></Link>
            <p className="mt-6 text-sm leading-relaxed max-w-xs" style={{ color: C.grey }}>
              Inteligencia artificial que trabaja contigo. Diseñada en Latinoamérica.
            </p>
            <div className="mt-6 h-px w-12" style={{ background: `${C.neon}30` }} />
          </div>

          {/* Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: `${C.white}40` }}>{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link to={link.href} className="text-sm transition-colors duration-200" style={{ color: C.grey }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = C.white; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = C.grey; }}
                        >{link.label}</Link>
                      ) : (
                        <a href={link.href} className="text-sm transition-colors duration-200" style={{ color: C.grey }}
                          onMouseEnter={(e) => { e.currentTarget.style.color = C.white; }}
                          onMouseLeave={(e) => { e.currentTarget.style.color = C.grey; }}
                        >{link.label}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: `1px solid ${C.white}05` }}>
          <p className="text-sm" style={{ color: `${C.white}20` }}>
            Hecho con <span style={{ color: C.rosa }}>♥</span> en Latinoamérica
          </p>
          <p className="text-xs" style={{ color: `${C.white}15` }}>
            © {new Date().getFullYear()} Lumi Technologies. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
