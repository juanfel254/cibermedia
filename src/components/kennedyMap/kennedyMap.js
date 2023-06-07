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
        interactive: false
      });
    
    let hoveredPolygonId = null;

    map.current.on('load', ()=> {
      map.current.addSource("UPZs", {
//        type: 'geojson',
//        data: 'mapbox://tileset-source/juanfel254/poblacion-upz-bogota-226tbc-data'
        
        type: "vector",
        url: "mapbox://juanfel254.2kz2c2tp"
      });
      map.current.addLayer({
        "id": "UPZs-fills",
        "type": "fill",
        "source": "UPZs", 
        "source-layer": "poblacion-upz-bogota-226tbc",
        "layout": {},
        "paint": {
          "fill-color": "#FEEA27",
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.8,
            0.1
            ]
        }
      });
    });

// When the user moves their mouse over the state-fill layer, we'll update the
// feature state for the feature under the mouse.
    map.current.on('mousemove', 'UPZs-fills', (e) => {
      if (e.features.length > 0) {
        if (hoveredPolygonId !== null) {
          map.current.setFeatureState({ 
            source: 'UPZs', 
            sourceLayer: "poblacion-upz-bogota-226tbc",
            id: hoveredPolygonId },
          { hover: false });
        }
        hoveredPolygonId = e.features[0].id;
        map.current.setFeatureState({ 
          source: 'UPZs',
          sourceLayer: "poblacion-upz-bogota-226tbc",
          id: hoveredPolygonId 
        },
          { hover: true });
        }
      });
    
    map.current.on('mouseleave', 'UPZs-fills', () => {
      if (hoveredPolygonId !== null) {
        map.current.setFeatureState({ 
          source: 'UPZs', 
          sourceLayer: "poblacion-upz-bogota-226tbc",
          id: hoveredPolygonId 
        },
        { hover: false }
        );
      }
      hoveredPolygonId = null;
      });

    map.current.dragPan.disable();
    //map.current.addControl(new mapboxgl.NavigationControl());
    });


  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    if (window.innerWidth < 600){ // change default zoom for mobile screen
      map.current.setZoom(11.6)
      map.current.setMinZoom(11.6);
      map.current.setMaxZoom(12.60);
      console.log("Siuu")
    }  
  }, []);
  

  useEffect(()=> {
    map.current.on('move', () => { // get map details
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