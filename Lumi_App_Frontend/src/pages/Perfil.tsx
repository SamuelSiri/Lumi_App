import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Bell, Shield, LogOut, Edit3, Check, Camera, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';

const rosa = '#FD4282';
const azul = '#3F50B3';
const dark = '#0a0a12';
const grey = '#8a8a8a';

type ProfileData = {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  rol: string;
  notificaciones: boolean;
  privacidadDatos: boolean;
  iniciales: string;
};

const DEFAULT_PROFILE: ProfileData = {
  nombre: 'Demo Emprendimiento',
  email: 'holalumi.info@gmail.com',
  telefono: '+1 849 828 2023',
  ciudad: 'Santo Domingo',
  rol: 'Administrador',
  notificaciones: true,
  privacidadDatos: true,
  iniciales: 'DE',
};

const ctn = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function Perfil() {
  const navigate = useNavigate();
  const [profile, setProfile] = useLocalStorage<ProfileData>('app:profile', DEFAULT_PROFILE);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<ProfileData>(profile);

  const startEdit = () => { setDraft(profile); setEditing(true); };
  const saveEdit = () => {
    const next = { ...draft, iniciales: draft.nombre.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase() };
    setProfile(next);
    setEditing(false);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Bleeding bg word */}
      <div className="absolute inset-x-0 top-0 pointer-events-none flex items-start justify-center overflow-hidden" style={{ height: '50vh' }}>
        <span className="whitespace-nowrap select-none" style={{
          fontSize: 'clamp(140px, 24vw, 420px)', fontWeight: 900, lineHeight: 0.85,
          letterSpacing: '-0.05em', color: `${dark}05`, textTransform: 'uppercase', marginTop: '-20px',
        }}>
          Perfil
        </span>
      </div>

      <span className="absolute pointer-events-none select-none top-[14%] right-[6%] text-2xl" style={{ color: `${rosa}30` }}>✦</span>
      <span className="absolute pointer-events-none select-none top-[8%] left-[5%] text-xl" style={{ color: `${azul}25` }}>◆</span>

      <motion.div variants={ctn} initial="hidden" animate="show" className="relative z-10 w-full pb-12 space-y-5">

        {/* HEADER */}
        <motion.div variants={item} className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-3" style={{ color: rosa }}>
              ✦ Tu cuenta
            </p>
            <h1 className="font-black uppercase tracking-tight" style={{
              fontSize: 'clamp(40px, 7vw, 80px)', lineHeight: 0.9, letterSpacing: '-0.04em', color: dark,
            }}>
              Hola,
              <span className="italic font-light" style={{ color: rosa }}> {profile.nombre.split(' ')[0]}</span>
              <br />Tu perfil
            </h1>
          </div>

          {!editing ? (
            <button onClick={startEdit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.04]"
              style={{ background: dark, color: 'white', boxShadow: `0 6px 20px ${dark}30` }}>
              <Edit3 size={14} /> Editar
            </button>
          ) : (
            <button onClick={saveEdit}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.04]"
              style={{ background: rosa, color: 'white', boxShadow: `0 6px 20px ${rosa}40` }}>
              <Check size={14} /> Guardar
            </button>
          )}
        </motion.div>

        {/* TOP CARD — Avatar + identity */}
        <motion.div variants={item} className="rounded-2xl border-2 p-6 lg:p-8 relative overflow-hidden flex flex-col lg:flex-row items-center lg:items-start gap-6"
          style={{ background: dark, borderColor: `${dark}33` }}>
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none" style={{ background: `${rosa}25`, filter: 'blur(80px)' }} />

          {/* Avatar */}
          <div className="relative z-10 shrink-0">
            <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full flex items-center justify-center text-white text-3xl lg:text-4xl font-black tracking-wider"
              style={{ background: rosa, boxShadow: `0 12px 40px ${rosa}50` }}>
              {profile.iniciales}
            </div>
            <button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110"
              style={{ background: 'white', color: dark, boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }} title="Cambiar foto">
              <Camera size={14} />
            </button>
          </div>

          {/* Identity */}
          <div className="relative z-10 text-center lg:text-left flex-1">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-2" style={{ color: '#22C55E' }}>● Cuenta activa</p>
            {editing ? (
              <input value={draft.nombre} onChange={e => setDraft({ ...draft, nombre: e.target.value })}
                className="w-full bg-transparent font-black uppercase tracking-tight text-white outline-none border-b-2 pb-1"
                style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.04em', borderColor: `${rosa}80` }} />
            ) : (
              <h2 className="font-black uppercase tracking-tight text-white" style={{ fontSize: 'clamp(28px, 4vw, 44px)', letterSpacing: '-0.04em' }}>
                {profile.nombre}
              </h2>
            )}
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {profile.rol} · Miembro desde 2025
            </p>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-3 mt-6 pt-5" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {[
                { label: 'Días con LUMI', value: '14' },
                { label: 'Familiares', value: '3' },
                { label: 'Recordatorios', value: '8' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl lg:text-3xl font-black tracking-tight text-white">{s.value}</p>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* INFO GRID */}
        <div className="grid grid-cols-12 gap-4">

          {/* Contacto */}
          <motion.div variants={item} className="col-span-12 lg:col-span-7 rounded-2xl border-2 p-6" style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: rosa }}>✦ Información</p>
            <h3 className="font-black uppercase tracking-tight text-2xl mt-1 mb-5" style={{ color: dark }}>
              Datos de contacto
            </h3>

            <div className="space-y-4">
              {[
                { Icon: Mail, label: 'Email', key: 'email' as const, type: 'email' },
                { Icon: Phone, label: 'Teléfono', key: 'telefono' as const, type: 'tel' },
                { Icon: MapPin, label: 'Ciudad', key: 'ciudad' as const, type: 'text' },
                { Icon: User, label: 'Rol', key: 'rol' as const, type: 'text' },
              ].map(f => (
                <div key={f.key} className="flex items-center gap-4 pb-4" style={{ borderBottom: `1px solid ${dark}10` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${rosa}10` }}>
                    <f.Icon size={16} style={{ color: rosa }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-black uppercase tracking-[0.25em]" style={{ color: grey }}>{f.label}</p>
                    {editing ? (
                      <input type={f.type} value={draft[f.key]} onChange={e => setDraft({ ...draft, [f.key]: e.target.value })}
                        className="w-full bg-transparent text-sm font-bold outline-none border-b py-0.5 mt-0.5"
                        style={{ color: dark, borderColor: `${dark}20` }} />
                    ) : (
                      <p className="text-sm font-bold mt-0.5 truncate" style={{ color: dark }}>{profile[f.key]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Preferences */}
          <motion.div variants={item} className="col-span-12 lg:col-span-5 rounded-2xl border-2 p-6" style={{ background: 'white', borderColor: `${dark}33` }}>
            <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: azul }}>◆ Preferencias</p>
            <h3 className="font-black uppercase tracking-tight text-2xl mt-1 mb-5" style={{ color: dark }}>
              Tu LUMI a tu manera
            </h3>

            {[
              { Icon: Bell, label: 'Notificaciones', desc: 'Alertas en tu dispositivo', key: 'notificaciones' as const },
              { Icon: Shield, label: 'Privacidad reforzada', desc: 'Datos cifrados extra', key: 'privacidadDatos' as const },
            ].map(p => {
              const value = editing ? draft[p.key] : profile[p.key];
              const toggle = () => editing && setDraft({ ...draft, [p.key]: !draft[p.key] });
              return (
                <div key={p.key} className="flex items-start gap-4 py-4" style={{ borderBottom: `1px solid ${dark}10` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: `${azul}10` }}>
                    <p.Icon size={16} style={{ color: azul }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold" style={{ color: dark }}>{p.label}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: grey }}>{p.desc}</p>
                  </div>
                  <button onClick={toggle} disabled={!editing}
                    className="relative w-11 h-6 rounded-full transition-all duration-300 shrink-0"
                    style={{
                      background: value ? rosa : `${dark}15`,
                      cursor: editing ? 'pointer' : 'not-allowed',
                      opacity: editing ? 1 : 0.7,
                    }}>
                    <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300"
                      style={{ transform: value ? 'translateX(20px)' : 'translateX(0)' }} />
                  </button>
                </div>
              );
            })}

            <div className="flex items-center gap-3 mt-6 p-4 rounded-xl" style={{ background: `${rosa}08` }}>
              <Heart size={18} fill={rosa} style={{ color: rosa }} />
              <p className="text-[11px] leading-snug" style={{ color: dark }}>
                Tus datos son tuyos. <strong>LUMI nunca los vende ni comparte.</strong>
              </p>
            </div>
          </motion.div>
        </div>

        {/* DANGER ZONE */}
        <motion.div variants={item} className="rounded-2xl border-2 p-6" style={{ background: 'white', borderColor: `${dark}33` }}>
          <p className="text-[10px] font-black uppercase tracking-[0.25em]" style={{ color: '#EF4444' }}>● Zona segura</p>
          <h3 className="font-black uppercase tracking-tight text-xl mt-1 mb-4" style={{ color: dark }}>
            Sesión
          </h3>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/login')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300 hover:scale-[1.03]"
              style={{ background: 'transparent', color: '#EF4444', border: `1.5px solid #EF4444` }}>
              <LogOut size={14} /> Cerrar sesión
            </button>
            <button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-[0.15em] transition-all duration-300"
              style={{ background: 'transparent', color: grey, border: `1.5px solid ${dark}20` }}>
              Solicitar mis datos
            </button>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}
