import { motion } from 'framer-motion';
import clsx from 'clsx';

interface LumiCharacterProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animate?: boolean;
}

const dims = {
  sm: { w: 64, head: 40, eye: 6, body: 36, bodyH: 24 },
  md: { w: 96, head: 60, eye: 9, body: 52, bodyH: 34 },
  lg: { w: 140, head: 88, eye: 13, body: 76, bodyH: 48 },
  xl: { w: 200, head: 124, eye: 18, body: 108, bodyH: 64 },
};

export default function LumiCharacter({ size = 'lg', className, animate = true }: LumiCharacterProps) {
  const d = dims[size];
  const Wrap = animate ? motion.div : 'div';
  const floatProps = animate
    ? { animate: { y: [0, -6, 0] }, transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' as const } }
    : {};

  return (
    <Wrap {...floatProps} className={clsx('inline-flex flex-col items-center', className)}>
      <svg width={d.w} height={d.w * 1.1} viewBox={`0 0 ${d.w} ${d.w * 1.1}`} fill="none">
        {/* Antena izquierda */}
        <line
          x1={d.w / 2 - d.head * 0.22} y1={d.w * 0.18}
          x2={d.w / 2 - d.head * 0.22} y2={d.w * 0.08}
          stroke="#D4D4D4" strokeWidth={2} strokeLinecap="round"
        />
        <circle cx={d.w / 2 - d.head * 0.22} cy={d.w * 0.06} r={d.eye * 0.6} fill="#FD4282" />

        {/* Antena derecha */}
        <line
          x1={d.w / 2 + d.head * 0.22} y1={d.w * 0.18}
          x2={d.w / 2 + d.head * 0.22} y2={d.w * 0.08}
          stroke="#D4D4D4" strokeWidth={2} strokeLinecap="round"
        />
        <circle cx={d.w / 2 + d.head * 0.22} cy={d.w * 0.06} r={d.eye * 0.6} fill="#3F50B3" />

        {/* Cabeza */}
        <rect
          x={(d.w - d.head) / 2} y={d.w * 0.18}
          width={d.head} height={d.head * 0.72}
          rx={d.head * 0.28} fill="white" stroke="#EEEEEE" strokeWidth={1.5}
        />

        {/* Ojos */}
        <circle cx={d.w / 2 - d.head * 0.18} cy={d.w * 0.38} r={d.eye} fill="#262626" />
        <circle cx={d.w / 2 - d.head * 0.18 + d.eye * 0.3} cy={d.w * 0.38 - d.eye * 0.3} r={d.eye * 0.35} fill="white" />

        <circle cx={d.w / 2 + d.head * 0.18} cy={d.w * 0.38} r={d.eye} fill="#262626" />
        <circle cx={d.w / 2 + d.head * 0.18 + d.eye * 0.3} cy={d.w * 0.38 - d.eye * 0.3} r={d.eye * 0.35} fill="white" />

        {/* Mejillas */}
        <ellipse cx={d.w / 2 - d.head * 0.28} cy={d.w * 0.46} rx={d.eye * 0.9} ry={d.eye * 0.5} fill="#FDDBE8" />
        <ellipse cx={d.w / 2 + d.head * 0.28} cy={d.w * 0.46} rx={d.eye * 0.9} ry={d.eye * 0.5} fill="#FDDBE8" />

        {/* Boca sonrisa */}
        <path
          d={`M ${d.w / 2 - d.eye * 0.7} ${d.w * 0.48} Q ${d.w / 2} ${d.w * 0.54} ${d.w / 2 + d.eye * 0.7} ${d.w * 0.48}`}
          stroke="#404040" strokeWidth={1.5} fill="none" strokeLinecap="round"
        />

        {/* Cuerpo */}
        <rect
          x={(d.w - d.body) / 2} y={d.w * 0.58}
          width={d.body} height={d.bodyH}
          rx={d.body * 0.16} fill="white" stroke="#EEEEEE" strokeWidth={1.5}
        />

        {/* Corazón indicador */}
        <circle cx={d.w / 2} cy={d.w * 0.58 + d.bodyH / 2} r={d.eye * 0.55} fill="#FD4282">
          {animate && (
            <animate attributeName="r" values={`${d.eye * 0.55};${d.eye * 0.7};${d.eye * 0.55}`} dur="1.5s" repeatCount="indefinite" />
          )}
        </circle>
      </svg>
    </Wrap>
  );
}
