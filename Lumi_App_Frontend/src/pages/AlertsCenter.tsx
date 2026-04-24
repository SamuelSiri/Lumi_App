import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  Bell,
  Heart,
  Battery,
  MapPin,
  Settings,
  AlertTriangle,
  Pill,
  Check,
  ChevronDown,
  ChevronUp,
  Radio,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { alertas } from '../data/mockData';
import type { Alerta } from '../types';

type FiltroGravedad = 'todas' | 'critica' | 'alta' | 'media' | 'baja' | 'info';

const filtros: { valor: FiltroGravedad; etiqueta: string }[] = [
  { valor: 'todas', etiqueta: 'Todas' },
  { valor: 'critica', etiqueta: 'Cr\u00edticas' },
  { valor: 'alta', etiqueta: 'Altas' },
  { valor: 'media', etiqueta: 'Medias' },
  { valor: 'baja', etiqueta: 'Bajas' },
  { valor: 'info', etiqueta: 'Info' },
];

const borderGravedad: Record<string, string> = {
  critica: 'border-l-rosa',
  alta: 'border-l-rosa',
  media: 'border-l-alerta',
  baja: 'border-l-azul',
  info: 'border-l-gris-300',
};

const colorIconoGravedad: Record<string, string> = {
  critica: 'bg-rosa-light text-rosa',
  alta: 'bg-rosa-light text-rosa',
  media: 'bg-amber-50 text-alerta',
  baja: 'bg-azul-light text-azul',
  info: 'bg-gris-100 text-gris-500',
};

const iconosTipo: Record<string, React.ElementType> = {
  caida: AlertTriangle,
  salud: Heart,
  bateria: Battery,
  zona: MapPin,
  medicacion: Pill,
  sistema: Settings,
};

function tiempoRelativo(timestamp: string): string {
  const ahora = new Date();
  const fecha = new Date(timestamp);
  const diffMs = ahora.getTime() - fecha.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  const diffHoras = Math.floor(diffMin / 60);
  const diffDias = Math.floor(diffHoras / 24);

  if (diffMin < 1) return 'Ahora mismo';
  if (diffMin < 60) return `Hace ${diffMin} min`;
  if (diffHoras < 24) return `Hace ${diffHoras}h`;
  if (diffDias === 1) return 'Hace 1 d\u00eda';
  return `Hace ${diffDias} d\u00edas`;
}

const registrosEstado = [
  { hora: '14:25', mensaje: 'Todos los sensores operando con normalidad' },
  { hora: '14:20', mensaje: 'Verificaci\u00f3n autom\u00e1tica de conexi\u00f3n completada' },
  { hora: '14:15', mensaje: 'Signos vitales dentro de par\u00e1metros normales' },
  { hora: '14:10', mensaje: 'Detecci\u00f3n de movimiento calibrada correctamente' },
];

export default function AlertsCenter() {
  const [filtroActivo, setFiltroActivo] = useState<FiltroGravedad>('todas');
  const [alertasState, setAlertasState] = useState<Alerta[]>(alertas);
  const [expandida, setExpandida] = useState<string | null>(null);

  const alertasFiltradas =
    filtroActivo === 'todas'
      ? alertasState
      : alertasState.filter((a) => a.gravedad === filtroActivo);

  function contarPorGravedad(gravedad: FiltroGravedad): number {
    if (gravedad === 'todas') return alertasState.length;
    return alertasState.filter((a) => a.gravedad === gravedad).length;
  }

  function marcarComoLeida(id: string) {
    setAlertasState((prev) =>
      prev.map((a) => (a.id === id ? { ...a, leida: true } : a))
    );
  }

  function toggleExpandida(id: string) {
    setExpandida((prev) => (prev === id ? null : id));
  }

  const alertasHoy = alertasState.filter((a) => {
    const hoy = new Date().toISOString().split('T')[0];
    return a.timestamp.startsWith(hoy);
  }).length;

  const alertasCriticas = alertasState.filter(
    (a) => a.gravedad === 'critica'
  ).length;

  return (
    <div className="min-h-screen bg-gris-50 px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-3xl font-bold text-negro">
              Centro de alertas
            </h1>
            <div className="flex items-center gap-2 rounded-full bg-exito/10 px-3.5 py-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-exito opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-exito" />
              </span>
              <span className="text-xs font-semibold text-exito">
                Sistema activo
              </span>
            </div>
          </div>
          <p className="mt-2 text-sm text-gris-500">
            Revisa y gestiona todas las alertas del sistema Lumi.
          </p>
        </motion.div>

        {/* Layout: Alertas + Monitor */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Columna principal: filtros + alertas */}
          <div className="min-w-0 flex-1">
            {/* Filtros */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, ease: 'easeOut' as const }}
              className="mb-6 flex gap-2 overflow-x-auto pb-2"
            >
              {filtros.map((f) => {
                const count = contarPorGravedad(f.valor);
                const esActivo = filtroActivo === f.valor;
                return (
                  <button
                    key={f.valor}
                    onClick={() => setFiltroActivo(f.valor)}
                    className={clsx(
                      'flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200',
                      esActivo
                        ? 'bg-rosa text-white'
                        : 'bg-white text-gris-500 shadow-sm hover:bg-gris-100'
                    )}
                  >
                    {f.etiqueta}
                    <span
                      className={clsx(
                        'inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[11px] font-bold',
                        esActivo
                          ? 'bg-white/25 text-white'
                          : 'bg-gris-100 text-gris-500'
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            {/* Lista de alertas */}
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {alertasFiltradas.map((alerta, idx) => {
                  const Icono = iconosTipo[alerta.tipo] || Bell;
                  const estaExpandida = expandida === alerta.id;

                  return (
                    <motion.div
                      key={alerta.id}
                      layout
                      initial={{ opacity: 0, y: 20, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, x: -30 }}
                      transition={{ delay: idx * 0.04, ease: 'easeOut' as const }}
                      className={clsx(
                        'group overflow-hidden rounded-2xl border border-gris-100 bg-white shadow-sm',
                        'border-l-4',
                        borderGravedad[alerta.gravedad],
                        !alerta.leida && 'ring-1 ring-rosa/10'
                      )}
                    >
                      <button
                        onClick={() => toggleExpandida(alerta.id)}
                        className="flex w-full items-start gap-4 p-5 text-left"
                      >
                        {/* Icono del tipo */}
                        <div
                          className={clsx(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                            colorIconoGravedad[alerta.gravedad]
                          )}
                        >
                          <Icono className="h-5 w-5" />
                        </div>

                        {/* Contenido */}
                        <div className="min-w-0 flex-1">
                          <h3
                            className={clsx(
                              'font-semibold leading-snug',
                              alerta.leida ? 'text-gris-600' : 'text-negro'
                            )}
                          >
                            {alerta.titulo}
                          </h3>
                          {!estaExpandida && (
                            <p className="mt-1 line-clamp-1 text-sm text-gris-400">
                              {alerta.descripcion}
                            </p>
                          )}
                          <span className="mt-1.5 inline-block text-xs text-gris-400">
                            {tiempoRelativo(alerta.timestamp)}
                          </span>
                        </div>

                        {/* Indicador no leida + expandir */}
                        <div className="flex shrink-0 flex-col items-center gap-2 pt-1">
                          {!alerta.leida && (
                            <span className="h-2.5 w-2.5 rounded-full bg-rosa" />
                          )}
                          <div className="text-gris-300 transition-colors group-hover:text-gris-500">
                            {estaExpandida ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </div>
                        </div>
                      </button>

                      {/* Descripcion expandida */}
                      <AnimatePresence>
                        {estaExpandida && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' as const }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-gris-100 px-5 pb-5 pl-[4.75rem] pt-4">
                              <p className="text-sm leading-relaxed text-gris-600">
                                {alerta.descripcion}
                              </p>
                              {!alerta.leida && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    marcarComoLeida(alerta.id);
                                  }}
                                  className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-rosa/20 bg-rosa-light px-4 py-2 text-xs font-semibold text-rosa transition-colors hover:bg-rosa-muted"
                                >
                                  <Check className="h-3.5 w-3.5" />
                                  Marcar como le\u00edda
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {alertasFiltradas.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl border border-gris-100 bg-white p-12 text-center shadow-sm"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gris-100">
                    <Bell className="h-7 w-7 text-gris-300" />
                  </div>
                  <p className="font-semibold text-gris-500">
                    No hay alertas en esta categor\u00eda
                  </p>
                  <p className="mt-1 text-sm text-gris-400">
                    Todo parece estar en orden.
                  </p>
                </motion.div>
              )}
            </div>
          </div>

          {/* Monitor en vivo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: 'easeOut' as const }}
            className="w-full lg:w-80 lg:shrink-0"
          >
            <div className="sticky top-8 rounded-2xl bg-negro p-6">
              {/* Titulo */}
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gris-800">
                  <Radio className="h-4 w-4 text-exito" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">
                    Monitor en vivo
                  </h2>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-exito opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-exito" />
                    </span>
                    <span className="text-[11px] text-gris-400">
                      Monitoreando activamente
                    </span>
                  </div>
                </div>
              </div>

              {/* Mini estadisticas */}
              <div className="mb-6 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-gris-900 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-alerta" />
                    <span className="text-xs text-gris-400">
                      Alertas hoy
                    </span>
                  </div>
                  <span className="text-sm font-bold text-white">
                    {alertasHoy}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gris-900 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-rosa" />
                    <span className="text-xs text-gris-400">
                      Cr\u00edticas
                    </span>
                  </div>
                  <span className="text-sm font-bold text-exito">
                    {alertasCriticas}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-gris-900 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-azul" />
                    <span className="text-xs text-gris-400">
                      Sensores
                    </span>
                  </div>
                  <span className="text-xs font-bold text-exito">
                    OK
                  </span>
                </div>
              </div>

              {/* Registro de estado en vivo */}
              <div>
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-gris-500">
                  Registro del sistema
                </p>
                <div className="space-y-2">
                  {registrosEstado.map((reg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.4 + idx * 0.1,
                        ease: 'easeOut' as const,
                      }}
                      className="flex items-start gap-2.5 rounded-lg bg-gris-900 px-3 py-2"
                    >
                      <span className="mt-0.5 shrink-0 font-mono text-[11px] font-medium text-azul">
                        {reg.hora}
                      </span>
                      <span className="text-[11px] leading-relaxed text-gris-400">
                        {reg.mensaje}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
