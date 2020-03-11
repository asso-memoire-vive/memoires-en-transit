import React from 'react'
import {Map as LeafletMap, GeoJSON, Marker, Popup, TileLayer} from 'react-leaflet'
import {mapConfig, stamenTonerTiles, stamenTonerAttr} from './helpers'
import worldGeoJSON from "../../data/worldGeoJson"
import L from 'leaflet'
import axios from 'axios'
import {API_URL} from "../../config"
import TimeLine from "../TimeLine/TimeLine";

const geoJSONFeatureFlipping = false

const pointerIcon = new L.Icon({
  iconUrl: 'suitcaseIcon.svg',
  iconRetinaUrl: 'suitcaseIcon.svg',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: 'marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

const dates = [
  {
    start: 601257600,
    end: 957139200
  },
  {
    start: 957139200,
    end: 1217980800
  },
  {
    start: 601257600,
    end: 957139200
  },
  {
    start: 1217980800,
    end: 1219980800
  }

]

const logChange = (data) => {
  console.log("Min timestamp: " + data.minCursorTimestamp);
  console.log("Max timestamp: " + data.maxCursorTimestamp);
  console.log("Min year: " + data.minCursorDate);
  console.log("Max year: " + data.maxCursorDate);
}


class GeoJsonMap extends React.Component {

  constructor(props) {
    super(props)
    this.state = { markers: [] }
  }

  componentDidMount() {
    axios.get(API_URL)
      .then(response => {
        const markers = response.data
        this.setState({ markers })
      })
  }

  render() {
        const { markers } = this.state
        const LeafletMarkers = markers.map(marker => {
          return (
            <Marker
              icon={pointerIcon}
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
                  attribution={stamenTonerAttr}
                  url={stamenTonerTiles}
                />
              
            }
              { LeafletMarkers }
            </LeafletMap>
            <TimeLine
              dates={dates}
              onChange={this.logChange}
            />
          </div>
        )
    }
}

export default GeoJsonMap