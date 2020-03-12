import React from 'react'
import {Link} from "react-router-dom"
import { FaGlobeEurope } from 'react-icons/fa'

function Menu() {
  return (
    <div>
      <Link
        className="header_link"
        to="/"
      >
        <FaGlobeEurope />
        <span className="header_title_link">
          {'Making Maps With Reacts'}
        </span>
      </Link>
      <Link
        className="header_link"
        to="/timeline"
      >
        <span
          className="header_title_link"
        >
          {'TimeLine'}
        </span>
      </Link> 
    </div>
  )
}

export default Menu
