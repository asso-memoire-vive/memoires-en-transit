import React from 'react'
import {Link} from "react-router-dom"
import {FaGlobeEurope} from 'react-icons/fa'

function Menu() {
  return (
    <div className="menu">
      <Link
        className="menu_link"
        to="/"
      >
        <FaGlobeEurope/>
        {'Making Maps With Reacts'}
      </Link>
      <Link
        className="menu_link"
        to="/timeline"
      >
        {'TimeLine'}
      </Link>
      <Link
        className="menu_link"
        to="/apropos"
      >
        {'Apropos'}
      </Link>
    </div>
  )
}

export default Menu
