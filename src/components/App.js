import React, { Component } from 'react'
import Header from "./Header"
import Menu from "./Menu"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Menu />
      </div>
    )
  }
}

export default App