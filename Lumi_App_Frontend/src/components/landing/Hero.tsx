import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import rosaVividoIcon from '../../assets/images/rosa_vivido_icon.png';

const ease = [0.23, 1, 0.32, 1] as const;

function AbstractLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Diagonal editorial lines */}
      <motion.line
        x1="0" y1="900" x2="1440" y2="200"
        stroke="#FD4282" strokeWidth="1"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />
      <motion.line
        x1="200" y1="900" x2="1440" y2="0"
        stroke="#3F50B3" strokeWidth="0.8"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
      />
      <motion.line
        x1="0" y1="600" x2="800" y2="0"
        stroke="#FD4282" strokeWidth="0.5"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.6, ease: 'easeInOut' }}
      />
      {/* Neon accent circle — very subtle */}
      <motion.circle
        cx="1200" cy="150" r="120"
        stroke="#39FF14" strokeWidth="0.5"
        fill="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.4 }}
        transition={{ duration: 1.5, delay: 1.2 }}
      />
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const imgOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-end overflow-hidden bg-negro noise-overlay"
    >
      <AbstractLines />

      {/* Large Lumi icon — positioned top-right, overlapping, editorial */}
      <motion.div
        className="absolute top-[10vh] right-[-5vw] lg:right-[5vw] w-[50vw] lg:w-[35vw] max-w-[600px] z-0 pointer-events-none select-none"
        style={{ scale: imgScale, opacity: imgOpacity, y: bgY }}
      >
        <motion.img
          src={rosaVividoIcon}
          alt=""
          className="w-full h-auto opacity-20 lg:opacity-25"
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 0.25, scale: 1, rotate: 0 }}
          transition={{ duration: 1.5, delay: 0.3, ease }}
        />
        {/* Glow behind */}
        <div className="absolute inset-0 blur-[100px] bg-rosa/10 rounded-full" />
      </motion.div>

      {/* Content — bottom-left aligned, asymmetric */}
      <motion.div
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 lg:px-12 pb-20 lg:pb-28 pt-40 lg:pt-0"
        style={{ y: textY }}
      >
        <div className="max-w-4xl">
          {/* Small label */}
          <motion.p
            className="text-rosa text-xs lg:text-sm font-sans font-semibold tracking-[0.3em] uppercase mb-6 lg:mb-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            Cuidado inteligente
          </motion.p>

          {/* Massive headline */}
          <motion.h1
            className="text-[clamp(3rem,8vw,8rem)] font-display font-bold leading-[0.95] tracking-[-0.03em] text-white"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease }}
          >
            Cuida a quienes
            <br />
            <span className="text-gradient-rosa italic">amas.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            className="mt-8 lg:mt-10 text-lg lg:text-xl text-gris-400 max-w-lg leading-relaxed font-sans"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
          >
            Tecnología con alma. Seguridad, compañía y tranquilidad
            para toda tu familia.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            className="mt-10 lg:mt-14 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/tecnologia"
                className="inline-flex items-center gap-3 px-10 py-5 bg-rosa text-white font-sans font-bold text-base tracking-wide rounded-full hover:bg-rosa-hover transition-colors duration-300 glow-rosa"
              >
                Explorar Lumi
                <motion.span
                  className="inline-block"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>

            <Link
              to="/historias"
              className="inline-flex items-center gap-2 px-8 py-5 text-white/70 font-sans font-medium text-base border border-white/10 rounded-full hover:border-rosa/40 hover:text-white transition-all duration-300"
            >
              Ver historias
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator — bottom-right */}
        <motion.div
          className="hidden lg:flex absolute bottom-28 right-12 flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <span className="text-[10px] text-gris-500 font-sans tracking-[0.2em] uppercase [writing-mode:vertical-lr]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} className="text-gris-500" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-negro to-transparent pointer-events-none z-10" />
    </section>
  );
}
