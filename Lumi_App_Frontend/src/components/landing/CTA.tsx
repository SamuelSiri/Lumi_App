import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import rosaVividoLogo from '../../assets/images/rosa_vivido_logo_completo.png';

const ease = [0.23, 1, 0.32, 1] as const;

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: '-80px' });

  return (
    <section
      className="relative py-40 lg:py-56 overflow-hidden"
      ref={ref}
      style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0010 50%, #0a0a0a 100%)' }}
    >
      {/* Rosa glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rosa/8 blur-[200px] rounded-full pointer-events-none" />

      {/* Background logo watermark */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{ opacity: 0.04 }}
      >
        <img src={rosaVividoLogo} alt="" className="w-[500px] h-auto" />
      </motion.div>

      {/* Abstract lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" viewBox="0 0 1440 600" fill="none">
        <line x1="0" y1="300" x2="1440" y2="100" stroke="#FD4282" strokeWidth="1" />
        <line x1="0" y1="400" x2="1440" y2="500" stroke="#3F50B3" strokeWidth="0.5" />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* Neon dot accent */}
          <motion.div
            className="w-2 h-2 bg-neon rounded-full mx-auto mb-10"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          />

          <motion.h2
            className="text-5xl sm:text-6xl lg:text-8xl font-display font-bold text-white leading-[0.95]"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease }}
          >
            Empieza a cuidar de forma{' '}
            <span className="italic text-gradient-rosa">inteligente.</span>
          </motion.h2>

          <motion.p
            className="mt-8 text-lg lg:text-xl text-gris-400 max-w-lg mx-auto leading-relaxed font-sans"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease }}
          >
            Únete a miles de familias que ya confían en Lumi para
            proteger y acompañar a quienes más quieren.
          </motion.p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.6, ease }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="inline-block"
            >
              <Link
                to="/contacto"
                className="inline-flex items-center gap-3 px-14 py-6 bg-rosa text-white text-xl font-sans font-bold tracking-wide rounded-full hover:bg-rosa-hover transition-colors duration-300 glow-rosa"
              >
                Conocer Lumi
                <motion.span
                  animate={{ x: [0, 6, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowRight size={22} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            {['Sin compromiso', 'Soporte 24/7', 'Envío incluido'].map((badge) => (
              <span
                key={badge}
                className="flex items-center gap-2 text-sm text-gris-500 font-sans"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon" />
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
