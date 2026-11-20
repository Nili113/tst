import React, { useEffect, useRef } from 'react';
import type * as Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { WARD5, MUNICIPALITY } from '../data/wardBoundary';

/** Map of Birtamod Ward No. 5: the ward filled in, the rest of the municipality as a faint outline. */
export const WardMap: React.FC<{ label: string }> = ({ label }) => {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const box = el.current;
    if (!box) return;
    let cleanup = () => {};
    let cancelled = false;
    // Load the map library only when the map is about to scroll into view.
    const io = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const L = (await import('leaflet')).default;
        if (!cancelled) cleanup = draw(L, box);
      },
      { rootMargin: '600px' }
    );
    io.observe(box);
    return () => {
      cancelled = true;
      io.disconnect();
      cleanup();
    };
  }, [label]);

  const draw = (L: typeof Leaflet, box: HTMLDivElement) => {
    const map = L.map(box, {
      scrollWheelZoom: false, // the page keeps scrolling smoothly over the map
      zoomControl: false,
      attributionControl: true,
    });
    L.control.zoom({ position: 'topright' }).addTo(map);
    // Esri light-grey canvas: key-free, quiet, lets the maroon ward stand out
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 16,
      attribution: 'Tiles © Esri · Boundary © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', { maxZoom: 16 }).addTo(map);

    L.polygon(MUNICIPALITY, { color: '#6e1b2b', weight: 1.5, opacity: 0.45, dashArray: '4 6', fill: false, interactive: false }).addTo(map);
    const ward = L.polygon(WARD5, { color: '#9b2335', weight: 2.5, fillColor: '#9b2335', fillOpacity: 0.18 }).addTo(map);
    ward.bindTooltip(label, { permanent: true, direction: 'center', className: 'ward-label' });

    // Only fit once the box has a real size; fitting at 0px zooms out to half of Nepal.
    const fit = () => {
      if (box && box.clientWidth > 0) map.fitBounds(ward.getBounds(), { padding: [32, 32] });
    };
    map.setView([26.6438, 87.9975], 14);
    fit();
    const ro = new ResizeObserver(() => {
      map.invalidateSize();
      fit();
    });
    ro.observe(box);
    return () => {
      ro.disconnect();
      map.remove();
    };
  };

  return <div ref={el} className="ward-map absolute inset-0" role="img" aria-label={label} />;
};
