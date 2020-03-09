import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { FaGlobeEurope } from 'react-icons/fa'

function Header() {
    return (
      <header className="header">
        <BrowserRouter>
          <Link
            className="header__claim"
            to="/carte"
          >
            <FaGlobeEurope />
            <span className="header__title">
                Making Maps With Reacts
            </span>
          </Link>
          <h1>
              MEMOIRE(S) EN TRANSIT
          </h1>
        </BrowserRouter>
      </header>
    )
}

export default Header
