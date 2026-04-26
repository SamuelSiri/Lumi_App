import { useEffect, useRef } from 'react';
import L from 'leaflet';

type Zone = { id: string; lat?: number; lng?: number; radio: number; activa: boolean; nombre: string };

interface LeafletMapProps {
  center: [number, number];
  zoom?: number;
  pinColor?: string;
  zones?: Zone[];
  className?: string;
}

export default function LeafletMap({
  center,
  zoom = 16,
  pinColor = '#FD4282',
  zones = [],
  className = '',
}: LeafletMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap',
      maxZoom: 19,
    }).addTo(map);

    // Pulse dot pin
    const pinHtml = `
      <div style="position:relative;width:24px;height:24px;">
        <span style="position:absolute;inset:0;border-radius:50%;background:${pinColor};opacity:.35;animation:pulse-ring 2s ease-out infinite;"></span>
        <span style="position:absolute;inset:6px;border-radius:50%;background:${pinColor};border:3px solid white;box-shadow:0 0 12px ${pinColor},0 4px 10px rgba(0,0,0,.3);"></span>
      </div>`;
    const icon = L.divIcon({
      html: pinHtml,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
    L.marker(center, { icon }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update center if it changes
  useEffect(() => {
    if (mapRef.current) mapRef.current.setView(center, zoom);
  }, [center, zoom]);

  // Render zone circles
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const layer = L.layerGroup().addTo(map);
    zones.forEach((z) => {
      const lat = z.lat ?? center[0];
      const lng = z.lng ?? center[1];
      L.circle([lat, lng], {
        radius: z.radio,
        color: z.activa ? pinColor : '#8a8a8a',
        weight: 2,
        opacity: z.activa ? 0.8 : 0.4,
        fillColor: z.activa ? pinColor : '#8a8a8a',
        fillOpacity: z.activa ? 0.12 : 0.05,
        dashArray: '6 4',
      }).addTo(layer);
    });
    return () => {
      layer.remove();
    };
  }, [zones, center, pinColor]);

  return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />;
}
