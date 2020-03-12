import React from 'react'
import {Link} from "react-router-dom"

function Menu() {
  return (
    <div className="menu">
      <Link
        className="menu_link"
        to="/carte"
      >
        {'Carte'}
      </Link>
      <Link
        className="menu_link"
        to="/timeline"
      >
        {'Frise'}
      </Link>
      <Link
        className="menu_link"
        to="/apropos"
      >
        {'A propos'}
      </Link>
    </div>
  )
}

export default Menu
