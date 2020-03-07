import React from 'react'
import { Link } from 'react-router-dom'
import { FaGlobeEurope } from 'react-icons/fa'

const Header = () =>  {
    return (
      <header className="header">
        <Link to="/carte" className="header__claim">
          <FaGlobeEurope />
          <span className="header__title">Making Maps With Reacts</span>
        </Link>
        <h1>MEMOIRE(S) EN TRANSIT</h1>
      </header>
    )
}

export default Header
