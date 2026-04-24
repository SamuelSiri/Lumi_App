import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import {
  ChevronDown, ChevronUp, Plus, Check, Clock, Play,
  AlertTriangle, Heart, Battery, Navigation,
  Shield, Info, Zap, Mic, MapPin, Camera,
  User, RotateCw, Pill, ClipboardList,
} from 'lucide-react';
import { rutinas, recordatorios, alertas } from '../data/mockData';

type TabKey = 'rutinas' | 'medicacion' | 'camara' | 'historial' | 'voz' | 'zonas';

interface PillTab {
  key: TabKey;
  label: string;
  Icon: React.ElementType;
}

const pillTabs: PillTab[] = [
  { key: 'rutinas', label: 'Rutinas', Icon: RotateCw },
  { key: 'medicacion', label: 'Medicacion', Icon: Pill },
  { key: 'camara', label: 'Camara', Icon: Camera },
  { key: 'historial', label: 'Historial', Icon: ClipboardList },
  { key: 'voz', label: 'Voz', Icon: Mic },
  { key: 'zonas', label: 'Zonas', Icon: MapPin },
];

/* ------------------------------------------------
   TAB: RUTINAS
   ------------------------------------------------ */
function TabRutinas() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activas, setActivas] = useState<Record<string, boolean>>(
    Object.fromEntries(rutinas.map((r) => [r.id, r.activa])),
  );
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>(
    Object.fromEntries(
      rutinas.flatMap((r) => r.pasos.map((p) => [p.id, p.completado])),
    ),
  );

  const toggleStep = (stepId: string) => {
    setCheckedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  return (
    <div className="space-y-5">
      {rutinas.map((rutina, rIdx) => {
        const completados = rutina.pasos.filter((p) => checkedSteps[p.id]).length;
        const total = rutina.pasos.length;
        const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;
        const expanded = expandedId === rutina.id;

        return (
          <motion.div
            key={rutina.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: rIdx * 0.08, ease: 'easeOut' as const }}
            className="bg-white rounded-2xl shadow-sm border border-gris-100 overflow-hidden"
          >
            <div className="p-5 flex items-start gap-4">
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-sans text-lg font-semibold text-gris-800 truncate">
                    {rutina.nombre}
                  </h3>
                  {/* Toggle */}
                  <button
                    onClick={() => setActivas((prev) => ({ ...prev, [rutina.id]: !prev[rutina.id] }))}
                    className={clsx(
                      'relative inline-flex h-7 w-13 shrink-0 rounded-full transition-colors duration-300',
                      activas[rutina.id] ? 'bg-rosa' : 'bg-gris-200',
                    )}
                    aria-label={activas[rutina.id] ? 'Desactivar rutina' : 'Activar rutina'}
                  >
                    <motion.span
                      layout
                      className="inline-block h-5 w-5 rounded-full bg-white shadow-sm mt-1"
                      style={{ marginLeft: activas[rutina.id] ? 28 : 4 }}
                    />
                  </button>
                </div>
                <p className="text-sm text-gris-500 mt-0.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />
                  {rutina.horario} &middot; {rutina.descripcion}
                </p>

                {/* Progress bar */}
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gris-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-rosa rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${porcentaje}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' as const }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-gris-500">{porcentaje}%</span>
                </div>

                {/* Expand button */}
                <button
                  onClick={() => setExpandedId(expanded ? null : rutina.id)}
                  className="mt-2 flex items-center gap-1 text-sm text-azul font-semibold hover:text-azul-hover transition-colors"
                >
                  {expanded ? 'Ocultar pasos' : 'Ver pasos'}
                  {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' as const }}
                  className="border-t border-gris-100 overflow-hidden"
                >
                  <ul className="p-5 space-y-3">
                    {rutina.pasos.map((paso) => (
                      <li key={paso.id} className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStep(paso.id)}
                          className={clsx(
                            'w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all duration-200',
                            checkedSteps[paso.id]
                              ? 'bg-rosa border-rosa text-white'
                              : 'border-gris-300 hover:border-rosa',
                          )}
                        >
                          {checkedSteps[paso.id] && <Check className="w-3.5 h-3.5" />}
                        </button>
                        <span
                          className={clsx(
                            'text-sm font-medium',
                            checkedSteps[paso.id] ? 'text-gris-300 line-through' : 'text-gris-700',
                          )}
                        >
                          {paso.accion}
                        </span>
                        {paso.duracion && (
                          <span className="ml-auto text-xs text-gris-400 bg-gris-100 px-2 py-0.5 rounded-full">
                            {paso.duracion} min
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* New routine button */}
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="w-full py-4 rounded-2xl bg-rosa text-white font-sans font-bold text-base flex items-center justify-center gap-2 hover:bg-rosa-hover transition-colors"
      >
        <Plus className="w-5 h-5" />
        Nueva rutina
      </motion.button>
    </div>
  );
}

/* ------------------------------------------------
   TAB: MEDICACION
   ------------------------------------------------ */
function TabMedicacion() {
  const medicaciones = recordatorios.filter((r) => r.tipo === 'medicacion');
  const tomados = medicaciones.filter((m) => m.completado).length;
  const total = medicaciones.length;

  function getStatus(med: (typeof medicaciones)[0]) {
    return med.completado ? 'tomado' : 'pendiente';
  }

  return (
    <div className="space-y-6">
      {/* Summary card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-sm border border-gris-100 p-6 flex items-center gap-6"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="font-sans text-3xl font-bold text-gris-800">{tomados}</span>
          <span className="text-sm text-gris-400 font-medium">de {total}</span>
        </div>
        <div>
          <h3 className="font-sans text-xl font-bold text-gris-800">
            Medicacion de hoy
          </h3>
          <p className="text-sm text-gris-500 mt-1">
            {total - tomados === 0
              ? 'Todos los medicamentos han sido tomados'
              : `Faltan ${total - tomados} medicamento${total - tomados > 1 ? 's' : ''} por tomar`}
          </p>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-gris-200 rounded-full" />

        <div className="space-y-6">
          {medicaciones.map((med, idx) => {
            const status = getStatus(med);

            return (
              <motion.div
                key={med.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, ease: 'easeOut' as const }}
                className="relative flex items-start gap-4"
              >
                {/* Timeline node */}
                <div className={clsx(
                  'absolute -left-6 w-4 h-4 rounded-full border-[3px] border-white z-10',
                  med.completado ? 'bg-exito' : 'bg-rosa',
                )} />

                {/* Time */}
                <div className="w-14 shrink-0 pt-0.5">
                  <span className="font-sans text-lg font-bold text-gris-800 leading-none">
                    {med.hora}
                  </span>
                </div>

                {/* Card */}
                <div className="flex-1 bg-white rounded-2xl shadow-sm p-4 border border-gris-100">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-sans font-bold text-gris-800">{med.titulo}</h4>
                    <span className={clsx(
                      'text-xs font-bold px-3 py-1 rounded-full',
                      status === 'tomado'
                        ? 'bg-exito/10 text-exito'
                        : 'bg-rosa-light text-rosa',
                    )}>
                      {status === 'tomado' ? 'Tomado' : 'Pendiente'}
                    </span>
                  </div>
                  {med.descripcion && (
                    <p className="text-sm text-gris-400">{med.descripcion}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------
   TAB: CAMARA
   ------------------------------------------------ */
function TabCamara() {
  const camaras = [
    { nombre: 'Sala', activa: true },
    { nombre: 'Cocina', activa: true },
    { nombre: 'Habitacion', activa: true },
    { nombre: 'Jardin', activa: false },
  ];

  return (
    <div className="space-y-6">
      {/* Main live view */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-negro rounded-2xl aspect-video flex items-center justify-center overflow-hidden"
      >
        {/* Play button */}
        <div className="relative flex flex-col items-center gap-4 z-10">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="w-20 h-20 rounded-full bg-white flex items-center justify-center"
          >
            <Play className="w-10 h-10 text-negro ml-1" />
          </motion.button>
          <span className="text-white/60 font-sans text-lg">Camara en vivo</span>
        </div>

        {/* EN VIVO badge */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-rosa rounded-full px-3 py-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-exito animate-pulse" />
          <span className="text-white text-xs font-bold tracking-wider">EN VIVO</span>
        </div>

        {/* Room label */}
        <div className="absolute bottom-4 right-4 bg-gris-800 rounded-xl px-3 py-1.5 z-10">
          <span className="text-white/80 text-sm font-medium">Sala principal</span>
        </div>
      </motion.div>

      {/* Camera thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {camaras.map((cam, idx) => (
          <motion.button
            key={cam.nombre}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, ease: 'easeOut' as const }}
            whileHover={{ scale: 1.03 }}
            className="bg-negro rounded-xl p-3 text-left group"
          >
            <div className="bg-gris-900 rounded-lg aspect-square flex items-center justify-center mb-2 relative">
              <Camera className="w-6 h-6 text-gris-500" />
              {cam.activa && (
                <div className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-exito" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                {cam.nombre}
              </span>
              <span className={clsx(
                'text-[10px] font-bold px-2 py-0.5 rounded-full',
                cam.activa ? 'bg-exito/20 text-exito' : 'bg-gris-600 text-gris-400',
              )}>
                {cam.activa ? 'Activa' : 'Off'}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Privacy note */}
      <div className="flex items-center justify-center gap-2 bg-gris-50 rounded-2xl py-3 px-4 border border-gris-100">
        <Shield className="w-4 h-4 text-azul shrink-0" />
        <p className="text-sm text-gris-500">
          Las imagenes se procesan localmente para proteger la privacidad
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------
   TAB: HISTORIAL
   ------------------------------------------------ */
function TabHistorial() {
  const iconoPorTipo: Record<string, React.ReactNode> = {
    salud: <Heart className="w-4 h-4" />,
    medicacion: <AlertTriangle className="w-4 h-4" />,
    bateria: <Battery className="w-4 h-4" />,
    zona: <Navigation className="w-4 h-4" />,
    caida: <AlertTriangle className="w-4 h-4" />,
    sistema: <Zap className="w-4 h-4" />,
  };

  const accentPorGravedad: Record<string, string> = {
    critica: 'border-l-peligro',
    alta: 'border-l-rosa',
    media: 'border-l-azul',
    baja: 'border-l-alerta',
    info: 'border-l-gris-300',
  };

  const iconBgPorGravedad: Record<string, string> = {
    critica: 'bg-peligro/10 text-peligro',
    alta: 'bg-rosa-light text-rosa',
    media: 'bg-azul-light text-azul',
    baja: 'bg-alerta/10 text-alerta',
    info: 'bg-gris-100 text-gris-500',
  };

  // Group by date
  const hoy = new Date('2026-03-23');
  const ayer = new Date('2026-03-22');

  function etiquetaFecha(ts: string): string {
    const d = new Date(ts);
    if (d.toDateString() === hoy.toDateString()) return 'Hoy';
    if (d.toDateString() === ayer.toDateString()) return 'Ayer';
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  const grupos: Record<string, typeof alertas> = {};
  alertas.forEach((a) => {
    const label = etiquetaFecha(a.timestamp);
    if (!grupos[label]) grupos[label] = [];
    grupos[label].push(a);
  });

  return (
    <div className="space-y-8">
      {Object.entries(grupos).map(([fecha, items]) => (
        <div key={fecha} className="space-y-3">
          <h3 className="font-sans text-2xl font-bold text-gris-800">{fecha}</h3>

          {items.map((alerta, idx) => {
            const hora = new Date(alerta.timestamp).toLocaleTimeString('es-MX', {
              hour: '2-digit',
              minute: '2-digit',
            });

            return (
              <motion.div
                key={alerta.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, ease: 'easeOut' as const }}
                className={clsx(
                  'bg-white rounded-2xl border-l-4 p-4 flex gap-4 shadow-sm border border-gris-100',
                  accentPorGravedad[alerta.gravedad],
                )}
              >
                <div className={clsx(
                  'w-10 h-10 rounded-xl flex items-center justify-center shrink-0',
                  iconBgPorGravedad[alerta.gravedad],
                )}>
                  {iconoPorTipo[alerta.tipo] ?? <Info className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gris-400 font-sans font-semibold">{hora}</span>
                  </div>
                  <h4 className="font-sans font-bold text-gris-800 text-sm">{alerta.titulo}</h4>
                  <p className="text-sm text-gris-500 mt-0.5 leading-relaxed">{alerta.descripcion}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------
   TAB: VOZ
   ------------------------------------------------ */
function TabVoz() {
  const conversaciones = [
    {
      usuario: 'Como te sientes hoy, Lumi?',
      lumi: 'Me siento muy bien. Hoy detecte que abuelita Rosa durmio 7 horas completas. Excelente descanso.',
    },
    {
      usuario: 'Recuerdame su medicina de las 12',
      lumi: 'Claro, ya tengo configurado el recordatorio de Losartan 50mg para las 12:00. Te notificare cuando sea la hora.',
    },
    {
      usuario: 'Cuentale algo bonito a abuelita',
      lumi: 'Las mariposas monarca viajan miles de kilometros y siempre encuentran el camino a casa. Igual que el carino de tu familia.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Big mic button */}
      <div className="flex flex-col items-center py-10 gap-5">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          className="w-20 h-20 rounded-full bg-rosa hover:bg-rosa-hover flex items-center justify-center text-white transition-colors"
        >
          <Mic className="w-10 h-10" />
        </motion.button>
        <div className="text-center">
          <h3 className="font-sans text-2xl font-bold text-gris-800">Habla con Lumi</h3>
          <p className="text-sm text-gris-400 mt-1">Manten presionado para hablar</p>
        </div>
      </div>

      {/* Chat history */}
      <div className="space-y-5">
        <h4 className="font-sans text-sm font-bold text-gris-400 uppercase tracking-wider">
          Conversaciones recientes
        </h4>

        {conversaciones.map((conv, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.12, ease: 'easeOut' as const }}
            className="space-y-3"
          >
            {/* User bubble - right */}
            <div className="flex justify-end">
              <div className="flex items-end gap-2 max-w-[85%]">
                <div className="bg-gris-100 rounded-2xl px-4 py-3">
                  <p className="text-sm text-gris-700">{conv.usuario}</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-gris-200 flex items-center justify-center shrink-0">
                  <User className="w-3.5 h-3.5 text-gris-500" />
                </div>
              </div>
            </div>

            {/* Lumi bubble - left */}
            <div className="flex justify-start">
              <div className="flex items-end gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-azul flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-bold">L</span>
                </div>
                <div className="bg-azul-light rounded-2xl px-4 py-3">
                  <p className="text-sm text-gris-700">{conv.lumi}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------
   TAB: ZONAS
   ------------------------------------------------ */
function TabZonas() {
  const [zonas, setZonas] = useState([
    { id: 'z1', nombre: 'Hogar', radio: 50, activa: true },
    { id: 'z2', nombre: 'Parque cercano', radio: 200, activa: true },
    { id: 'z3', nombre: 'Casa de Carlos', radio: 75, activa: false },
  ]);

  const toggleZona = (id: string) => {
    setZonas((prev) =>
      prev.map((z) => (z.id === id ? { ...z, activa: !z.activa } : z)),
    );
  };

  return (
    <div className="space-y-6">
      {/* Mock map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-gris-100 rounded-2xl aspect-[16/10] overflow-hidden flex items-center justify-center"
      >
        {/* Concentric zone circles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' as const }}
            className="w-56 h-56 rounded-full border-2 border-dashed border-azul/20 flex items-center justify-center"
          >
            <div className="w-36 h-36 rounded-full border-2 border-dashed border-rosa/30 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full border-2 border-dashed border-rosa/50 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' as const }}
                  className="w-4 h-4 rounded-full bg-rosa"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 bg-white rounded-xl px-3 py-1.5 shadow-sm z-10">
          <span className="text-xs font-sans font-bold text-gris-700 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rosa" />
            Ubicacion actual
          </span>
        </div>
        <div className="absolute bottom-4 right-4 bg-white rounded-xl px-3 py-1.5 shadow-sm z-10">
          <span className="text-xs font-medium text-gris-500">Zonas: {zonas.filter((z) => z.activa).length} activas</span>
        </div>
      </motion.div>

      {/* Zone list */}
      <div className="space-y-3">
        {zonas.map((zona, idx) => (
          <motion.div
            key={zona.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08, ease: 'easeOut' as const }}
            className="bg-white rounded-2xl shadow-sm border border-gris-100 p-4 flex items-center gap-4"
          >
            <div className={clsx(
              'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
              zona.activa ? 'bg-rosa-light text-rosa' : 'bg-gris-100 text-gris-400',
            )}>
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-sans font-bold text-gris-800">{zona.nombre}</h4>
              <p className="text-sm text-gris-400">Radio: {zona.radio}m</p>
            </div>
            {/* Toggle */}
            <button
              onClick={() => toggleZona(zona.id)}
              className={clsx(
                'relative inline-flex h-7 w-13 shrink-0 rounded-full transition-colors duration-300',
                zona.activa ? 'bg-rosa' : 'bg-gris-200',
              )}
            >
              <motion.span
                layout
                className="inline-block h-5 w-5 rounded-full bg-white shadow-sm mt-1"
                style={{ marginLeft: zona.activa ? 28 : 4 }}
              />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Add zone button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-gris-200 text-azul font-sans font-bold flex items-center justify-center gap-2 hover:bg-azul-light transition-colors"
      >
        <Plus className="w-5 h-5" />
        Agregar zona
      </motion.button>
    </div>
  );
}

/* ================================================
   MAIN: CarePanel
   ================================================ */
export default function CarePanel() {
  const [activeTab, setActiveTab] = useState<TabKey>('rutinas');

  const contenido: Record<TabKey, React.ReactNode> = {
    rutinas: <TabRutinas />,
    medicacion: <TabMedicacion />,
    camara: <TabCamara />,
    historial: <TabHistorial />,
    voz: <TabVoz />,
    zonas: <TabZonas />,
  };

  return (
    <div className="min-h-screen bg-gris-50">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-sans text-2xl font-bold text-gris-800">
            Centro de cuidado
          </h1>
          <p className="text-gris-400 mt-1 text-base">
            Todo lo que Lumi hace por tu ser querido
          </p>
        </motion.div>

        {/* Pill Navigation */}
        <div className="overflow-x-auto -mx-4 px-4 mb-8">
          <div className="flex gap-2 min-w-max pb-1">
            {pillTabs.map((tab) => {
              const TabIcon = tab.Icon;
              return (
                <motion.button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={clsx(
                    'flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 whitespace-nowrap font-sans',
                    activeTab === tab.key
                      ? 'bg-rosa text-white'
                      : 'bg-white text-gris-500 border border-gris-200 hover:text-rosa',
                  )}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
          >
            {contenido[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
