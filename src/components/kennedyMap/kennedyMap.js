import React, { useRef, useEffect, useState } from 'react'; 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import styles from "@/styles/kennedyMap/kennedyMap.module.css"

mapboxgl.accessToken = 'pk.eyJ1IjoianVhbmZlbDI1NCIsImEiOiJjbGlkYnpsdHYwMWUxM21tbzJydGt4NXZ1In0.WkzTOoZyMsPBNymYAJzCdw';

export default function KennedyMap() {
  const lngKennedy = -74.1531818;
  const latKennedy = 4.6299322;
  const initialZoom = 12.25;
  const boundNum = 0.0355;

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(lngKennedy);
  const [lat, setLat] = useState(latKennedy);
  const [zoom, setZoom] = useState(initialZoom);
  const bounds = [
    [lngKennedy - boundNum, latKennedy - boundNum], // [west, south]
    [lngKennedy + boundNum, latKennedy + boundNum]  // [east, north]
    ];
  

  useEffect(() => {
    if (map.current) return; // initialize map only once    
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/juanfel254/clijutcu700v001p71axde6d0',
        center: [lng, lat],
        zoom: zoom,
        maxZoom: zoom + 0.75,
        minZoom: zoom,
        maxBounds: bounds,
      });
    //map.current.addControl(new mapboxgl.NavigationControl());
    });


  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    if (window.innerWidth < 600){ // change default zoom for mobile screen
      map.current.setZoom(11.6)
      map.current.setMinZoom(11.6);
      map.current.setMaxZoom(12.60);
    }
  }, []);
  

useEffect(()=> {
  map.current.on('move', () => { // get map details
    setLng(map.current.getCenter().lng.toFixed(4));
    setLat(map.current.getCenter().lat.toFixed(4));
    setZoom(map.current.getZoom().toFixed(2));
  }); 
})

  return (
    <div>
      <div className={styles.sidebar}>
        Longitud: {lng} | Latitud: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className={styles.map_container} />
    </div>
  );
}