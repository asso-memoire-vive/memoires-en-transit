import React from 'react'
import './App.css'
import Header from "./Menu/Menu"
import Menu from "./Header/Header"
import ReactLeafletMap from "./Map/ReactLeaflet"

class App extends React.Component {
    render() {
        return (
          <div className='app'>
            <div>
              <Header />
              <Menu />
            </div>
            <ReactLeafletMap />
          </div>
        )
    }
}

export default App


