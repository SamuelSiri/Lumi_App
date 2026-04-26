import { motion } from 'framer-motion';
import {
  Volume2, Moon, Wifi, Bluetooth, Smartphone, Shield, Brain,
  Play, Search, Battery, Cpu, RefreshCw, Trash2, Activity, Zap,
} from 'lucide-react';
import { configuracionDispositivo, dispositivoLumi } from '../data/mockData';
import type { ConfiguracionDispositivo } from '../types';
import { useLocalStorage, clearLumiStorage } from '../hooks/useLocalStorage';

type PersonalidadVoz = ConfiguracionDispositivo['personalidadVoz'];

const rosa = '#FD4282';
const azul = '#3F50B3';
const dark = '#0a0a12';
const grey = '#8a8a8a';

const ctn = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } } };

const opcionesPersonalidad: { valor: PersonalidadVoz; etiqueta: string; descripcion: string; accent: string }[] = [
  { valor: 'dulce', etiqueta: 'Dulce', descripcion: 'Tono cálido y amable', accent: rosa },
  { valor: 'profesional', etiqueta: 'Profesional', descripcion: 'Tono formal y claro', accent: azul },
  { valor: 'energetica', etiqueta: 'Energética', descripcion: 'Tono animado y alegre', accent: '#22C55E' },
];

function Toggle({ active, onChange, accent = rosa }: { active: boolean; onChange: (v: boolean) => void; accent?: string }) {
  return (
    <button onClick={() => onChange(!active)}
      className="relative h-7 w-12 shrink-0 rounded-full transition-all duration-300"
      style={{ background: active ? accent : `${dark}10`, boxShadow: active ? `0 0 16px ${accent}50` : 'none' }}>
      <span className="block w-5 h-5 rounded-full bg-white shadow mt-1 transition-all"
        style={{ marginLeft: active ? 26 : 4 }} />
    </button>
  );
}

function Slider({ value, onChange, accent = rosa, min = 0, max = 100 }: {
  value: number; onChange: (v: number) => void; accent?: string; min?: number; max?: number;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>Nivel</span>
        <span className="text-2xl font-black tracking-tight" style={{ color: dark }}>{value}<span className="text-xs ml-1" style={{ color: grey }}>%</span></span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: `${dark}1A` }}>
        <div className="absolute inset-y-0 left-0 rounded-full transition-all"
          style={{ width: `${pct}%`, background: accent, boxShadow: `0 0 10px ${accent}60` }} />
      </div>
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-2 cursor-pointer" style={{ accentColor: accent }} />
    </div>
  );
}

function BatteryDonut({ pct, color }: { pct: number; color: string }) {
  const r = 36, c = 2 * Math.PI * r;
  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg width={88} height={88} className="rotate-[-90deg]">
        <circle cx={44} cy={44} r={r} fill="none" stroke={`${dark}1A`} strokeWidth={6} />
        <circle cx={44} cy={44} r={r} fill="none" stroke={color} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={c - (c * pct / 100)}
          style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 4px ${color}80)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-black tracking-tight" style={{ color }}>{pct}%</span>
      </div>
    </div>
  );
}

function SectionLabel({ num, title, accent = rosa }: { num: string; title: string; accent?: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: accent }}>{num}</span>
      <span className="h-px flex-1 max-w-[40px]" style={{ background: `${dark}33` }} />
      <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: dark }}>{title}</span>
    </div>
  );
}

export default function DeviceSettings() {
  const [config, setConfig] = useLocalStorage<ConfiguracionDispositivo>('config:dispositivo', configuracionDispositivo);

  const update = <K extends keyof ConfiguracionDispositivo>(key: K, value: ConfiguracionDispositivo[K]) =>
    setConfig({ ...config, [key]: value });

  type ObjectKeys = 'modoDescanso' | 'autonomia' | 'conectividad';
  const updateNested = <K1 extends ObjectKeys, K2 extends keyof ConfiguracionDispositivo[K1]>(
    k1: K1, k2: K2, value: ConfiguracionDispositivo[K1][K2],
  ) => setConfig({ ...config, [k1]: { ...config[k1], [k2]: value } });

  const resetAll = () => {
    if (typeof window !== 'undefined' && window.confirm('¿Borrar toda la configuración guardada y datos de demo?')) {
      clearLumiStorage();
      window.location.reload();
    }
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="absolute inset-x-0 top-0 pointer-events-none flex items-start justify-center overflow-hidden" style={{ height: '50vh' }}>
        <span className="whitespace-nowrap select-none" style={{
          fontSize: 'clamp(140px, 24vw, 420px)', fontWeight: 900, lineHeight: 0.85,
          letterSpacing: '-0.05em', color: `${dark}05`, textTransform: 'uppercase', marginTop: '-20px',
        }}>
          Ajustes
        </span>
      </div>

      <span className="absolute pointer-events-none select-none top-[12%] right-[6%] text-2xl" style={{ color: `${rosa}30` }}>✦</span>
      <span className="absolute pointer-events-none select-none top-[8%] left-[5%] text-xl" style={{ color: `${azul}25` }}>◆</span>

      <motion.div variants={ctn} initial="hidden" animate="show" className="relative z-10 w-full pb-12 space-y-5">
        {/* HEADER */}
        <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: rosa }}>
              ✦ Dispositivo · {dispositivoLumi.id.toUpperCase()}
            </p>
            <h1 className="font-black uppercase tracking-tight" style={{
              fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: dark,
            }}>
              Ajustes
              <span className="italic font-light" style={{ color: rosa }}> de LUMI</span>
            </h1>
          </div>

          <button onClick={resetAll}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] shrink-0 self-start transition-all"
            style={{ background: '#EF444410', color: '#EF4444' }}>
            <Trash2 size={12} /> Restablecer demo
          </button>
        </motion.div>

        {/* TOP MOSAIC: hero status dark + battery donut + signal */}
        <div className="grid grid-cols-12 gap-4">
          <motion.div variants={item} className="col-span-12 lg:col-span-7 rounded-2xl border-2 p-6 relative overflow-hidden"
            style={{ background: dark, borderColor: `${dark}33` }}>
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: `${rosa}25`, filter: 'blur(80px)' }} />
            <div className="absolute -bottom-20 -left-10 w-56 h-56 rounded-full pointer-events-none" style={{ background: `${azul}25`, filter: 'blur(80px)' }} />

            <div className="relative">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#22C55E', boxShadow: `0 0 10px #22C55E`, animation: 'pulse-soft 2s ease-in-out infinite' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: '#22C55E' }}>● Online</span>
              </div>

              <h2 className="font-black uppercase tracking-tight text-white" style={{
                fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 0.9, letterSpacing: '-0.04em',
              }}>
                {dispositivoLumi.nombre}
              </h2>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Modelo LUMI-001 · Firmware v3.2.1
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                {[
                  { label: 'CPU', value: '32%', color: azul },
                  { label: 'RAM', value: '46%', color: rosa },
                  { label: 'Latencia', value: '24ms', color: '#22C55E' },
                  { label: 'Uptime', value: '14d', color: '#F59E0B' },
                ].map((m) => (
                  <div key={m.label}>
                    <p className="text-[8px] font-black uppercase tracking-[0.25em]" style={{ color: 'rgba(255,255,255,0.4)' }}>{m.label}</p>
                    <p className="text-xl font-black tracking-tight mt-0.5" style={{ color: m.color }}>{m.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={item} className="col-span-6 lg:col-span-3 rounded-2xl border-2 p-5 flex flex-col items-center justify-center text-center"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#22C55E' }}>● Batería</p>
            <div className="my-3">
              <BatteryDonut pct={dispositivoLumi.bateria} color="#22C55E" />
            </div>
            <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>+8h restantes</p>
          </motion.div>

          <motion.div variants={item} className="col-span-6 lg:col-span-2 rounded-2xl border-2 p-5 flex flex-col justify-between"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Señal</p>
            <div className="flex items-end gap-1 my-2">
              {[40, 60, 80, 95].map((h, i) => (
                <div key={i} className="flex-1 rounded-sm" style={{
                  height: `${h * 0.4}px`,
                  background: dispositivoLumi.senal >= [25, 50, 75, 100][i] ? azul : `${dark}15`,
                  boxShadow: dispositivoLumi.senal >= [25, 50, 75, 100][i] ? `0 0 6px ${azul}60` : 'none',
                }} />
              ))}
            </div>
            <p className="text-2xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{dispositivoLumi.senal}%</p>
            <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>WiFi fuerte</p>
          </motion.div>
        </div>

        {/* BIG MOSAIC ROW: Voice + Sensitivity */}
        <div className="grid grid-cols-12 gap-4">
          <motion.div variants={item} className="col-span-12 lg:col-span-7 rounded-2xl border-2 p-6"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <SectionLabel num="01" title="Voz y personalidad" accent={rosa} />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-6">
              {opcionesPersonalidad.map((o) => {
                const active = config.personalidadVoz === o.valor;
                return (
                  <button key={o.valor} onClick={() => update('personalidadVoz', o.valor)}
                    className="text-left rounded-xl p-4 transition-all duration-300"
                    style={{
                      background: active ? o.accent : `${dark}03`,
                      color: active ? 'white' : dark,
                      border: `2px solid ${active ? o.accent : `${dark}15`}`,
                      boxShadow: active ? `0 6px 20px ${o.accent}40` : 'none',
                    }}>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: active ? 'white' : grey }}>
                      {active ? '◉ Activa' : 'Tocar'}
                    </p>
                    <p className="text-base font-black uppercase tracking-tight mt-1">{o.etiqueta}</p>
                    <p className="text-xs mt-1" style={{ color: active ? 'rgba(255,255,255,0.8)' : grey }}>{o.descripcion}</p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 mb-4">
              <Volume2 size={16} style={{ color: rosa }} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>Volumen</span>
            </div>
            <Slider value={config.volumenVoz} onChange={(v) => update('volumenVoz', v)} accent={rosa} />

            <button className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.18em] transition-all"
              style={{ background: `${rosa}10`, color: rosa }}>
              <Play size={11} fill={rosa} /> Probar voz
            </button>
          </motion.div>

          <motion.div variants={item} className="col-span-12 lg:col-span-5 rounded-2xl border-2 p-6"
            style={{ background: 'white', borderColor: `${dark}33` }}>
            <SectionLabel num="02" title="Sensibilidad" accent={azul} />

            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${azul}15` }}>
                      <Shield size={14} style={{ color: azul }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>Caídas</span>
                  </div>
                </div>
                <Slider value={config.sensibilidadCaida} onChange={(v) => update('sensibilidadCaida', v)} accent={azul} />
              </div>

              <div className="pt-4 border-t" style={{ borderColor: `${dark}10` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${azul}15` }}>
                      <Search size={14} style={{ color: azul }} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>Movimiento</span>
                  </div>
                </div>
                <Slider value={config.sensibilidadMovimiento} onChange={(v) => update('sensibilidadMovimiento', v)} accent={azul} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* SLEEP MODE - dark wide */}
        <motion.div variants={item} className="rounded-2xl border-2 p-6 relative overflow-hidden"
          style={{ background: dark, borderColor: `${dark}33` }}>
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full pointer-events-none" style={{ background: `${azul}30`, filter: 'blur(80px)' }} />

          <div className="relative grid grid-cols-12 gap-6">
            <div className="col-span-12 md:col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.3em]" style={{ color: azul }}>◆ 03</span>
                <span className="h-px w-8" style={{ background: 'rgba(255,255,255,0.2)' }} />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-white">Modo descanso</span>
              </div>
              <h3 className="font-black uppercase tracking-tight text-white" style={{ fontSize: 36, lineHeight: 0.95, letterSpacing: '-0.04em' }}>
                Sleep
                <span className="italic font-light" style={{ color: azul }}> mode</span>
              </h3>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Reduce alertas durante la noche
              </p>
            </div>

            <div className="col-span-12 md:col-span-8 flex flex-col justify-center gap-4">
              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="flex items-center gap-3">
                  <Moon size={18} style={{ color: config.modoDescanso.activo ? azul : 'rgba(255,255,255,0.4)' }} />
                  <div>
                    <p className="text-sm font-black uppercase tracking-tight text-white">
                      {config.modoDescanso.activo ? 'Activado' : 'Desactivado'}
                    </p>
                    <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {config.modoDescanso.horaInicio} → {config.modoDescanso.horaFin}
                    </p>
                  </div>
                </div>
                <Toggle active={config.modoDescanso.activo} onChange={(v) => updateNested('modoDescanso', 'activo', v)} accent={azul} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Inicio</label>
                  <input type="time" value={config.modoDescanso.horaInicio}
                    onChange={(e) => updateNested('modoDescanso', 'horaInicio', e.target.value)}
                    disabled={!config.modoDescanso.activo}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none disabled:opacity-50 text-white"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.15)' }} />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase tracking-[0.2em] block mb-1.5" style={{ color: 'rgba(255,255,255,0.5)' }}>Fin</label>
                  <input type="time" value={config.modoDescanso.horaFin}
                    onChange={(e) => updateNested('modoDescanso', 'horaFin', e.target.value)}
                    disabled={!config.modoDescanso.activo}
                    className="w-full px-4 py-2.5 rounded-xl text-sm outline-none disabled:opacity-50 text-white"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1.5px solid rgba(255,255,255,0.15)' }} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AUTONOMY */}
        <div>
          <SectionLabel num="04" title="Autonomía e IA" accent={rosa} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { Icon: Brain, label: 'Navegación', desc: 'LUMI se mueve sola', value: config.autonomia.navegacionAutonoma, key: 'navegacionAutonoma' as const, color: rosa },
              { Icon: Cpu, label: 'Respuesta auto.', desc: 'Conversa sin comando', value: config.autonomia.respuestaAutomatica, key: 'respuestaAutomatica' as const, color: azul },
            ].map((c) => (
              <motion.div key={c.key} variants={item} className="rounded-2xl border-2 p-5"
                style={{ background: 'white', borderColor: `${dark}33` }}>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${c.color}15`, border: `2px solid ${c.color}30` }}>
                    <c.Icon size={16} style={{ color: c.color }} />
                  </div>
                  <Toggle active={c.value} onChange={(v) => updateNested('autonomia', c.key, v)} accent={c.color} />
                </div>
                <p className="font-black uppercase tracking-tight text-base" style={{ color: dark }}>{c.label}</p>
                <p className="text-[10px] mt-1" style={{ color: grey }}>{c.desc}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] mt-3" style={{ color: c.value ? '#22C55E' : grey }}>
                  {c.value ? '◉ Activado' : '○ Apagado'}
                </p>
              </motion.div>
            ))}

            <motion.div variants={item} className="rounded-2xl border-2 p-5 relative overflow-hidden"
              style={{ background: 'white', borderColor: `${dark}33` }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none" style={{ background: `${rosa}10`, filter: 'blur(40px)' }} />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw size={14} style={{ color: rosa }} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: dark }}>Independencia</span>
                </div>
                <Slider value={config.autonomia.nivelIndependencia}
                  onChange={(v) => updateNested('autonomia', 'nivelIndependencia', v)} accent={rosa} />
                <p className="text-[9px] font-bold mt-2" style={{ color: grey }}>
                  Mayor = más decisiones autónomas
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* CONNECTIVITY GRID */}
        <div>
          <SectionLabel num="05" title="Conectividad" accent={azul} />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { key: 'wifi' as const, label: 'WiFi', Icon: Wifi, desc: 'Red inalámbrica', meta: '92% señal' },
              { key: 'bluetooth' as const, label: 'Bluetooth', Icon: Bluetooth, desc: 'Dispositivos cercanos', meta: '2 conectados' },
              { key: 'datosMoviles' as const, label: 'Datos móviles', Icon: Smartphone, desc: 'Red celular 4G', meta: 'SIM activa' },
            ].map((c) => {
              const active = config.conectividad[c.key];
              return (
                <motion.div key={c.key} variants={item} className="rounded-2xl border-2 p-5 relative overflow-hidden"
                  style={{ background: active ? `${rosa}05` : 'white', borderColor: active ? `${rosa}40` : `${dark}33` }}>
                  {active && <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none" style={{ background: `${rosa}15`, filter: 'blur(40px)' }} />}
                  <div className="relative flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: active ? rosa : `${dark}05`, border: `2px solid ${active ? rosa : `${dark}15`}` }}>
                      <c.Icon size={15} style={{ color: active ? 'white' : grey }} />
                    </div>
                    <Toggle active={active} onChange={(v) => updateNested('conectividad', c.key, v)} accent={rosa} />
                  </div>
                  <p className="relative font-black uppercase tracking-tight text-base" style={{ color: dark }}>{c.label}</p>
                  <p className="relative text-[10px] mt-1" style={{ color: grey }}>{c.desc}</p>
                  <div className="relative mt-3 flex items-center justify-between">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: active ? '#22C55E' : grey }}>
                      {active ? '◉ Conectado' : '○ Apagado'}
                    </span>
                    {active && (
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: grey }}>{c.meta}</span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* SYSTEM METRICS */}
        <motion.div variants={item} className="rounded-2xl border-2 p-5"
          style={{ background: 'white', borderColor: `${dark}33` }}>
          <SectionLabel num="06" title="Diagnóstico del sistema" accent={azul} />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { Icon: Battery, label: 'Carga', value: `${dispositivoLumi.bateria}%`, color: '#22C55E' },
              { Icon: Cpu, label: 'CPU', value: '32%', color: azul },
              { Icon: Activity, label: 'Eventos', value: '128', color: rosa },
              { Icon: Zap, label: 'Latencia', value: '24ms', color: '#F59E0B' },
            ].map((m) => (
              <div key={m.label} className="rounded-xl p-3" style={{ background: `${dark}03`, border: `1px solid ${dark}10` }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: `${m.color}10` }}>
                  <m.Icon size={13} style={{ color: m.color }} />
                </div>
                <p className="text-2xl font-black tracking-tight" style={{ color: dark, letterSpacing: '-0.04em' }}>{m.value}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em]" style={{ color: grey }}>{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
