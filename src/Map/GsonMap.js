import React from 'react'
import { Map as LeafletMap, GeoJSON, Marker, Popup } from 'react-leaflet';
import worldGeoJSON from 'geojson-world-map'
import { markers, mapConfig } from './helpers'

class GeoJsonMap extends React.Component {
  render() {
     const LeafletMarkers = markers.map(marker => (
       <Marker position={marker.latlng} key={`marker_${marker.name}`}>
           <Popup>
               <span>{marker.name}</span>
           </Popup>
       </Marker>
      ))

     return (
     <div className="map">
        <LeafletMap
            center={mapConfig.center}
            zoom={mapConfig.zoom}
            maxZoom={15}
            attributionControl={true}
            zoomControl={true}
            doubleClickZoom={true}
            scrollWheelZoom={true}
            dragging={true}
            animate={true}
            easeLinearity={0.35}
        >
         <GeoJSON
           data={worldGeoJSON}
           style={() => ({
             color: '#4a83ec',
             weight: 0.5,
             fillColor: "#1a1d62",
             fillOpacity: 1,
           })}
         />
         <Marker position={[48.8534100, 2.3488000]}>
             <Popup>
                 Popup for any custom information.
             </Popup>
         </Marker>
             // {LeafletMarkers}
           </LeafletMap>
     </div>

    );
  }
}

export default GeoJsonMap