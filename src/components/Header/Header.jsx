import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import { FaGlobeEurope } from 'react-icons/fa'

function Header() {
    return (
      <header className="header">
        <BrowserRouter>
          <Link
            className="header_link"
            to="/"
          >
            <FaGlobeEurope />
            <span className="header_title_link">
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
