import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Menu from "./Menu"

function Header() {
  return (
    <header className="header">
      <BrowserRouter>
        <h1>
          {'MEMOIRE(S) EN TRANSIT'}
        </h1>
        <Menu />
      </BrowserRouter>
    </header>
  )
}

export default Header
