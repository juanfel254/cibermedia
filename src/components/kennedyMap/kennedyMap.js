import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import ArtistsCardsA from "@/components/profileCards/artistsCardsA";
import styles from '@/styles/kennedyMap/kennedyMap.module.css';

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmZlbDI1NCIsImEiOiJjbGlkYnpsdHYwMWUxM21tbzJydGt4NXZ1In0.WkzTOoZyMsPBNymYAJzCdw';

export default function KennedyMap() {
  const lngKennedy = -74.1531818;
  const latKennedy = 4.6299322;
  const initialZoom = 12.7;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(lngKennedy);
  const [lat, setLat] = useState(latKennedy);
  const [zoom, setZoom] = useState(initialZoom);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/juanfel254/clijutcu700v001p71axde6d0',
      center: [lng, lat],
      zoom: zoom,
      interactive: false
    });

    if (window.innerWidth < 600){ // change default zoom for mobile screen
      map.current.setZoom(11.6)
    }  

    map.current.on('style.load', () => {
      // Establecer la rotación inicial del mapa
      map.current.setBearing(0);

      // Establecer la inclinación vertical del mapa
      map.current.setPitch(0);

      // Iniciar la rotación continua del mapa
      rotateMap();
    });

    let hoveredPolygonId = null;

    map.current.on('load', () => {
      map.current.addSource('UPZs', {
        type: 'geojson',
        data: '/upzs-kennedy.geojson',
        generateId: true
      });

      map.current.addLayer({
        id: 'UPZs-fills',
        type: 'fill',
        source: 'UPZs',
        layout: {},
        paint: {
          'fill-color': '#FEEA27',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.8,
            0.1
          ]
        }
      });

      map.current.addLayer({
        id: 'UPZs-outlines',
        type: 'line',
        source: 'UPZs',
        layout: {},
        paint: {
          'line-color': '#FEEA27',
          'line-blur': 20,
          'line-width': 5
        }
      });
    });

    map.current.on('mousemove', 'UPZs-fills', (e) => {
      if (e.features.length > 0) {
        if (hoveredPolygonId !== null) {
          map.current.setFeatureState(
            { source: 'UPZs', id: hoveredPolygonId },
            { hover: false }
          );
        }
        hoveredPolygonId = e.features[0].id;
        map.current.setFeatureState(
          { source: 'UPZs', id: hoveredPolygonId },
          { hover: true }
        );
      }
    });

    map.current.on('click', 'UPZs-fills', (e) => {
      if (e.features.length > 0) {
        const feature = e.features[0];
        const coordinates = e.lngLat;
        console.log(feature);
        new mapboxgl.Popup({ backgroundColor: '#2D1A47' })
          .setLngLat(coordinates)
          .setHTML(`<h2 className="secondary-title popup-title">${feature.properties.nom_upz}</h2>`)
          .addTo(map.current);
      }
    });

    map.current.on('mouseleave', 'UPZs-fills', () => {
      if (hoveredPolygonId !== null) {
        map.current.setFeatureState(
          { source: 'UPZs', id: hoveredPolygonId },
          { hover: false }
        );
      }
      hoveredPolygonId = null;
    });
  }, [lng, lat, zoom]);

  function rotateMap() {
    const rotationSpeed = 5; // Velocidad de rotación en grados por frame

    function animate() {
      requestAnimationFrame(animate);
      map.current.easeTo({ bearing: map.current.getBearing() + rotationSpeed });
    }

    animate();
  }

  return (
    <div>
      <div ref={mapContainer} className={styles.map_container} />
    </div>
  );
}
