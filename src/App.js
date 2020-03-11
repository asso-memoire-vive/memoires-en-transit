import React from 'react'
import './App.css'
import Header from "./components/Header/Header.jsx"

class App extends React.Component {
    render() {
        return (
          <div className='app'>
            <div>
              <Header />
            </div>
          </div>
        )
    }
}

export default App


