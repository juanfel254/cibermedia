import React, { useRef, useEffect, useState } from 'react'; 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "@/styles/kennedyMap/kennedyMap.module.css"

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmZlbDI1NCIsImEiOiJjbGlkYnpsdHYwMWUxM21tbzJydGt4NXZ1In0.WkzTOoZyMsPBNymYAJzCdw';

export default function KennedyMap() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-74.1531818);
  const [lat, setLat] = useState(4.6299322);
  const [zoom, setZoom] = useState(12.25);
  const bounds = [
    [-74.04728, 40.68392], // [west, south]
    [-73.91058, 40.87764]  // [east, north]
    ];
    
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        //style: 'mapbox://styles/juanfel254/clijtxv4900ug01pddglfckk8',
        style: 'mapbox://styles/juanfel254/clijutcu700v001p71axde6d0',
        center: [lng, lat],
        zoom: zoom
      });
    
    map.current.setMinZoom(zoom);
    map.current.setMaxZoom(13);
    //map.current.addControl(new mapboxgl.NavigationControl());
    });


  useEffect(() => {
    if (!map.current) return; // wait for map to initialize

/*       map.current.on('zoom', () => {
        map.current.setZoom(zoom);
      })
 */
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
  });
  

  return (
    <div>
      <div className={styles.sidebar}>
        Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={styles.map_container} />
    </div>
  );
}