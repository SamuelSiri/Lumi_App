import { useState } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import {
  Volume2,
  Moon,
  Wifi,
  Bluetooth,
  Smartphone,
  Shield,
  Brain,
  Play,
  Search,
} from 'lucide-react';
import { configuracionDispositivo } from '../data/mockData';
import type { ConfiguracionDispositivo } from '../types';

type PersonalidadVoz = ConfiguracionDispositivo['personalidadVoz'];

interface OpcionPersonalidad {
  valor: PersonalidadVoz;
  etiqueta: string;
  descripcion: string;
}

const opcionesPersonalidad: OpcionPersonalidad[] = [
  {
    valor: 'dulce',
    etiqueta: 'Dulce',
    descripcion: 'Tono c\u00e1lido y amable',
  },
  {
    valor: 'profesional',
    etiqueta: 'Profesional',
    descripcion: 'Tono formal y claro',
  },
  {
    valor: 'energetica',
    etiqueta: 'Energ\u00e9tica',
    descripcion: 'Tono animado y alegre',
  },
];

/* Sub-componentes */

function Toggle({
  activo,
  onChange,
  variante = 'rosa',
}: {
  activo: boolean;
  onChange: (v: boolean) => void;
  variante?: 'rosa' | 'blanco';
}) {
  const esBlanco = variante === 'blanco';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={activo}
      onClick={() => onChange(!activo)}
      className={clsx(
        'relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-300',
        esBlanco
          ? activo
            ? 'bg-white/30'
            : 'bg-white/15'
          : activo
            ? 'bg-rosa'
            : 'bg-gris-300'
      )}
    >
      <span
        className={clsx(
          'pointer-events-none inline-block h-5 w-5 translate-y-1 rounded-full shadow-sm transition-all duration-300',
          activo ? 'translate-x-6' : 'translate-x-1',
          esBlanco ? 'bg-white' : 'bg-white'
        )}
      />
    </button>
  );
}

function Slider({
  valor,
  onChange,
  min = 0,
  max = 100,
}: {
  valor: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="range"
        min={min}
        max={max}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer appearance-none rounded-full bg-gris-200 accent-rosa"
      />
      <span className="min-w-[2.5rem] text-right text-sm font-bold text-gris-700">
        {valor}%
      </span>
    </div>
  );
}

/* P\u00e1gina principal */

export default function DeviceSettings() {
  const [config, setConfig] = useState<ConfiguracionDispositivo>(
    () => structuredClone(configuracionDispositivo)
  );

  function actualizar(ruta: string, valor: unknown) {
    setConfig((prev) => {
      const nuevo = structuredClone(prev);
      const partes = ruta.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let obj: any = nuevo;
      for (let i = 0; i < partes.length - 1; i++) {
        obj = obj[partes[i]];
      }
      obj[partes[partes.length - 1]] = valor;
      return nuevo;
    });
  }

  const estadoDisp = config.conectividad.wifi ? 'Conectado' : 'Sin conexi\u00f3n';

  return (
    <div className="min-h-screen bg-gris-50 px-4 py-8 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Encabezado */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' as const }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-3xl font-bold text-negro">
              Configuraci\u00f3n de Lumi
            </h1>
            <div
              className={clsx(
                'flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold',
                config.conectividad.wifi
                  ? 'bg-exito/10 text-exito'
                  : 'bg-gris-200 text-gris-500'
              )}
            >
              <span
                className={clsx(
                  'h-2 w-2 rounded-full',
                  config.conectividad.wifi ? 'bg-exito' : 'bg-gris-400'
                )}
              />
              {estadoDisp}
            </div>
          </div>
          <p className="mt-2 text-sm text-gris-500">
            Personaliza el comportamiento de Lumi seg\u00fan las necesidades del usuario.
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Card 1 -- Sensores */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, ease: 'easeOut' as const }}
            className="rounded-2xl border border-gris-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rosa-light">
                <Shield className="h-5 w-5 text-rosa" />
              </div>
              <h2 className="text-lg font-bold text-negro">
                Sensibilidad de sensores
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gris-700">
                  Detecci\u00f3n de ca\u00eddas
                </label>
                <Slider
                  valor={config.sensibilidadCaida}
                  onChange={(v) => actualizar('sensibilidadCaida', v)}
                />
                <p className="mt-1.5 text-xs text-gris-400">
                  Un valor m\u00e1s alto aumenta la sensibilidad, lo que puede generar m\u00e1s alertas preventivas.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gris-700">
                  Sensibilidad de movimiento
                </label>
                <Slider
                  valor={config.sensibilidadMovimiento}
                  onChange={(v) => actualizar('sensibilidadMovimiento', v)}
                />
                <p className="mt-1.5 text-xs text-gris-400">
                  Ajusta qu\u00e9 tan sutil debe ser el movimiento para que Lumi lo registre.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 -- Personalidad de voz */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ease: 'easeOut' as const }}
            className="rounded-2xl border border-gris-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azul-light">
                <Volume2 className="h-5 w-5 text-azul" />
              </div>
              <h2 className="text-lg font-bold text-negro">
                Personalidad de voz
              </h2>
            </div>

            {/* Tarjetas de personalidad */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {opcionesPersonalidad.map((op) => {
                const seleccionada = config.personalidadVoz === op.valor;
                return (
                  <button
                    key={op.valor}
                    onClick={() => actualizar('personalidadVoz', op.valor)}
                    className={clsx(
                      'flex flex-col items-center gap-2 rounded-2xl border-2 p-5 text-center transition-colors duration-200',
                      seleccionada
                        ? 'border-rosa bg-rosa-light'
                        : 'border-gris-200 bg-white hover:border-gris-300'
                    )}
                  >
                    <span
                      className={clsx(
                        'text-sm font-bold',
                        seleccionada ? 'text-rosa' : 'text-negro'
                      )}
                    >
                      {op.etiqueta}
                    </span>
                    <span className="text-xs text-gris-500">
                      {op.descripcion}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Volumen */}
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-gris-700">
                Volumen de voz
              </label>
              <Slider
                valor={config.volumenVoz}
                onChange={(v) => actualizar('volumenVoz', v)}
              />
            </div>

            <button className="inline-flex items-center gap-2 rounded-xl bg-rosa px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-rosa-hover">
              <Play className="h-4 w-4" />
              Escuchar ejemplo
            </button>
          </motion.div>

          {/* Card 3 -- Modo descanso (DARK) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, ease: 'easeOut' as const }}
            className="rounded-2xl bg-negro p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gris-800">
                <Moon className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-white">
                Modo descanso
              </h2>
            </div>

            {/* Toggle */}
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-medium text-gris-300">
                Activar modo descanso
              </span>
              <Toggle
                activo={config.modoDescanso.activo}
                onChange={(v) => actualizar('modoDescanso.activo', v)}
                variante="blanco"
              />
            </div>

            {/* Horarios */}
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gris-500">
                  Desde
                </label>
                <input
                  type="time"
                  value={config.modoDescanso.horaInicio}
                  onChange={(e) =>
                    actualizar('modoDescanso.horaInicio', e.target.value)
                  }
                  className="w-full rounded-xl border border-gris-700 bg-gris-900 px-4 py-2.5 text-sm text-white focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/20"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-gris-500">
                  Hasta
                </label>
                <input
                  type="time"
                  value={config.modoDescanso.horaFin}
                  onChange={(e) =>
                    actualizar('modoDescanso.horaFin', e.target.value)
                  }
                  className="w-full rounded-xl border border-gris-700 bg-gris-900 px-4 py-2.5 text-sm text-white focus:border-azul focus:outline-none focus:ring-2 focus:ring-azul/20"
                />
              </div>
            </div>

            <p className="text-xs leading-relaxed text-gris-500">
              En modo descanso, Lumi cuida en silencio. Solo activar\u00e1 alertas cr\u00edticas.
            </p>
          </motion.div>

          {/* Card 4 -- Autonomia */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ease: 'easeOut' as const }}
            className="rounded-2xl border border-gris-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azul-light">
                <Brain className="h-5 w-5 text-azul" />
              </div>
              <h2 className="text-lg font-bold text-negro">
                Autonom\u00eda e inteligencia
              </h2>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <span className="text-sm font-medium text-gris-700">
                    Navegaci\u00f3n aut\u00f3noma
                  </span>
                  <p className="mt-0.5 text-xs text-gris-400">
                    Permite a Lumi desplazarse libremente por el hogar.
                  </p>
                </div>
                <Toggle
                  activo={config.autonomia.navegacionAutonoma}
                  onChange={(v) =>
                    actualizar('autonomia.navegacionAutonoma', v)
                  }
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div className="flex-1">
                  <span className="text-sm font-medium text-gris-700">
                    Respuesta autom\u00e1tica
                  </span>
                  <p className="mt-0.5 text-xs text-gris-400">
                    Lumi responde sin necesidad de activaci\u00f3n manual.
                  </p>
                </div>
                <Toggle
                  activo={config.autonomia.respuestaAutomatica}
                  onChange={(v) =>
                    actualizar('autonomia.respuestaAutomatica', v)
                  }
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gris-700">
                  Nivel de independencia
                </label>
                <Slider
                  valor={config.autonomia.nivelIndependencia}
                  onChange={(v) =>
                    actualizar('autonomia.nivelIndependencia', v)
                  }
                />
                <p className="mt-1.5 text-xs text-gris-400">
                  Determina cu\u00e1nta iniciativa propia tiene Lumi para interactuar con el usuario.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 5 -- Conectividad */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, ease: 'easeOut' as const }}
            className="rounded-2xl border border-gris-100 bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-azul-light">
                <Wifi className="h-5 w-5 text-azul" />
              </div>
              <h2 className="text-lg font-bold text-negro">
                Conectividad
              </h2>
            </div>

            <div className="space-y-4">
              {/* Wi-Fi */}
              <div className="flex items-center justify-between rounded-xl bg-gris-50 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Wifi className="h-5 w-5 text-azul" />
                  <div>
                    <span className="text-sm font-medium text-gris-700">
                      Wi-Fi
                    </span>
                    {config.conectividad.wifi && (
                      <p className="mt-0.5 text-[10px] font-semibold text-exito">
                        Conectado
                      </p>
                    )}
                  </div>
                </div>
                <Toggle
                  activo={config.conectividad.wifi}
                  onChange={(v) => actualizar('conectividad.wifi', v)}
                />
              </div>

              {/* Bluetooth */}
              <div className="flex items-center justify-between rounded-xl bg-gris-50 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Bluetooth className="h-5 w-5 text-azul" />
                  <div>
                    <span className="text-sm font-medium text-gris-700">
                      Bluetooth
                    </span>
                    {config.conectividad.bluetooth && (
                      <p className="mt-0.5 text-[10px] font-semibold text-exito">
                        Conectado
                      </p>
                    )}
                  </div>
                </div>
                <Toggle
                  activo={config.conectividad.bluetooth}
                  onChange={(v) => actualizar('conectividad.bluetooth', v)}
                />
              </div>

              {/* Datos moviles */}
              <div className="flex items-center justify-between rounded-xl bg-gris-50 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-gris-400" />
                  <div>
                    <span className="text-sm font-medium text-gris-700">
                      Datos m\u00f3viles
                    </span>
                    {!config.conectividad.datosMoviles && (
                      <p className="mt-0.5 text-[10px] text-gris-400">
                        Desactivado
                      </p>
                    )}
                  </div>
                </div>
                <Toggle
                  activo={config.conectividad.datosMoviles}
                  onChange={(v) => actualizar('conectividad.datosMoviles', v)}
                />
              </div>
            </div>

            <button className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-azul px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-azul-hover">
              <Search className="h-4 w-4" />
              Diagnosticar conexi\u00f3n
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
