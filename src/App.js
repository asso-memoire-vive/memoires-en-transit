import React from 'react'
import './App.css'
import Header from "./components/Header/Header.jsx"
import ReactLeafletMap from "./components/Map/ReactLeaflet"

class App extends React.Component {
    render() {
        return (
          <div className='app'>
            <div>
              <Header />
            </div>
            <ReactLeafletMap />
          </div>
        )
    }
}

export default App


