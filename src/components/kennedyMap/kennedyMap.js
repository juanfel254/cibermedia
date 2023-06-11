import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from '@/styles/kennedyMap/kennedyMap.module.css';

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmZlbDI1NCIsImEiOiJjbGlkYnpsdHYwMWUxM21tbzJydGt4NXZ1In0.WkzTOoZyMsPBNymYAJzCdw';

export default function KennedyMap() {
  const lngKennedy = -74.1531818;
  const latKennedy = 4.6299322;
  const initialZoom = 12.28;

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

    if (window.innerWidth < 600) {
      // change default zoom for mobile screen
      map.current.setZoom(11.6);
    }

    let hoveredPolygonId = null;
    let clickedPolygonId = null;

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
          'fill-color': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            '#FEEA27',
            ['boolean', ['feature-state', 'click'], false],
            '#FEEA27',
            '#000000'
          ],
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'click'], false],
            0.8,
            [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              0.2,
              0.1
            ]
          ]
        }
      });
    });

    map.current.on('mousemove', 'UPZs-fills', (e) => {
      if (e.features.length > 0) {
        if (hoveredPolygonId !== null && !clickedPolygonId) {
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
        const clickedFeatureId = e.features[0].id;
        const coordinates = e.lngLat;

        if (clickedPolygonId !== clickedFeatureId) {
          if (clickedPolygonId !== null) {
            map.current.setFeatureState(
              { source: 'UPZs', id: clickedPolygonId },
              { click: false }
            );
          }
          clickedPolygonId = clickedFeatureId;
          map.current.setFeatureState(
            { source: 'UPZs', id: clickedPolygonId },
            { click: true }
          );
        } else {
          map.current.setFeatureState(
            { source: 'UPZs', id: clickedPolygonId },
            { click: false }
          );
          clickedPolygonId = null;
        }

        new mapboxgl.Popup({ backgroundColor: '#2D1A47' })
          .setLngLat(coordinates)
          .setHTML(`<h2 className="secondary-title">${e.features[0].properties.nom_upz}</h2>`)
          .addTo(map.current);
      }
    });

    map.current.on('mouseleave', 'UPZs-fills', () => {
      if (hoveredPolygonId !== null && !clickedPolygonId) {
        map.current.setFeatureState(
          { source: 'UPZs', id: hoveredPolygonId },
          { hover: false }
        );
      }
      hoveredPolygonId = null;
    });
  }, [lng, lat, zoom]);

  return (
    <div>
      <div className={styles.sidebar}>
        Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={styles.map_container} />
    </div>
  );
}
