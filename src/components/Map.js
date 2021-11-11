import React from 'react'
import GeoJsonMap from './Map/GsonMap'
import TimeLine from './TimeLine/TimeLine'
import Layout from "./Layout";

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {disabled: false}
  }


  render() {
    const {disabled} = this.state

    return (
      <Layout>
        <div className='map-container'>
          <div className='map-container-timeline'>
            <TimeLine
              //dates={dates}
              disabled={disabled}
              maxCursorDefaultTimestamp={917980800}
              maxTimestamp={1217980800}
              minCursorDefaultTimestamp={601257600}
              minTimestamp={601257600}
              onChangeDelay={250}
            />
          </div>
          <div className='map-container-map'>
            <GeoJsonMap />
          </div>
        </div>
      </Layout>
    )
  }
}

export default Map