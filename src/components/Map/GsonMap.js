import React from 'react'
import {Map as LeafletMap, GeoJSON, Marker, Popup, TileLayer} from 'react-leaflet'
import {markers, mapConfig} from './helpers'
import worldGeoJSON from "../../data/worldGeoJson"

const geoJSONFeatureFlipping = false

class GeoJsonMap extends React.Component {
    render() {
        const LeafletMarkers = markers.map(marker => {
          return (
            <Marker
              key={`marker_${marker.name}`}
              position={marker.latlng}
            >
              <Popup>
                <span>
                  {marker.name}
                </span>
              </Popup>
            </Marker>
          )
        })

        return (
          <div
            className="map"
          >
            <link
              href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css"
              rel="stylesheet"
              type="text/css"
            />
            <LeafletMap
              animate
              attributionControl
              center={mapConfig.center}
              doubleClickZoom
              dragging
              easeLinearity={0.35}
              maxZoom={15}
              scrollWheelZoom
              zoom={mapConfig.zoom}
              zoomControl
            >
              { geoJSONFeatureFlipping &&
              <GeoJSON
                data={worldGeoJSON}
                style={() => ({
                  color: '#4a83ec',
                  weight: 0.5,
                  fillColor: "#1a1d62",
                  fillOpacity: 0.5,
                })}
              />}
                :
              {
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
              
            }
              { LeafletMarkers }
            </LeafletMap>
          </div>

        )
    }
}

export default GeoJsonMap