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
  const popup = useRef(new mapboxgl.Popup({ backgroundColor: '#2D1A47' }));

  const [artists, setArtists] = useState("");
  const [upzSelected, setUpzSelected] = useState("");
  const [filtered, setFiltered] = useState(null);
  let [clicks, setClicks] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('https://admin.ciberespacioartistico.com/index.php/wp-json/wp/v2/portafolio?per_page=100');
        const data = await res.json();
        setArtists(data);
      } catch (error) {
        console.log('Error al obtener los datos de la API:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/juanfel254/clijutcu700v001p71axde6d0',
      center: [lng, lat],
      zoom: zoom,
      interactive: false
    });

    if (window.innerWidth < 640) {
      map.current.setZoom(11.6);
    } else if (window.innerWidth > 641 && window.innerWidth <= 1200) {
      map.current.setZoom(12.5);
    }

    let hoveredPolygonId = null;
    let clickeUPZ = null;

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

    map.current.on('mouseenter', 'UPZs-fills', () => {
      map.current.getCanvas().style.cursor = 'pointer';
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

        if (clickeUPZ !== e.features[0].properties.nom_upz) {
          popup.current.setLngLat(e.lngLat).setHTML(
            `<h2 className="secondary-title popup-title">${e.features[0].properties.nom_upz}</h2>`
          );

          if (!popup.current.isOpen()) {
            popup.current.addTo(map.current);
          }
        } else {
          popup.current.remove();
        }
      }
    });

    map.current.on('click', 'UPZs-fills', (e) => {
      if (e.features.length > 0) {
        const feature = e.features[0];
        const coordinates = e.lngLat;
        new mapboxgl.Popup({ backgroundColor: '#2D1A47' })
          .setLngLat(coordinates)
          .setHTML(`<h2 className="secondary-title popup-title">${feature.properties.nom_upz}</h2>`)
          .addTo(map.current);
        setClicks(true);
        clickeUPZ = feature.properties.nom_upz;
        setUpzSelected(clickeUPZ);
      }
    });

    map.current.on('mouseleave', 'UPZs-fills', () => {
      map.current.getCanvas().style.cursor = '';
      if (hoveredPolygonId !== null) {
        map.current.setFeatureState(
          { source: 'UPZs', id: hoveredPolygonId },
          { hover: false }
        );
      }
      hoveredPolygonId = null;
      popup.current.remove();
    });
  }, [lng, lat, zoom]);

  function capitaliceWords(phrase) {
    if (phrase === 'AMERICAS') {
      return 'Américas';
    }
    return phrase.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }

  useEffect(() => {
    if (artists) {
      let filteredArtists = artists;
      if (upzSelected !== '') {
        filteredArtists = artists.filter((artist) =>
          upzSelected !== '' ? artist.ACF.upz.includes(capitaliceWords(upzSelected)) : true
        );
      }
      setFiltered(filteredArtists);
    }
  }, [artists, upzSelected]);

  return (
    <div>
      <p className={styles.message}>Toca el mapa o haz click para conocer más detalles</p>
      <div className={styles.artists_map_container}>
        <div ref={mapContainer} className={styles.map_container} />
        <div className={`${styles.artists_container}`}>
          {clicks ? filtered ? <ArtistsCardsA artistas={filtered} /> : null : null}
        </div>
      </div>
    </div>
  );
}
