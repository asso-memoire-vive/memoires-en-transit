import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter} from "react-router-dom"
import {Route} from "react-router"
import TimeLine2 from "./components/TimeLine/TimeLine2"
import Apropos from "./components/Apropos"
import App from "./components/App"
import MapContainer from "./components/MapContainer";

ReactDOM.render(
  <BrowserRouter >
    <Route
      component={App}
      path="/"
    />
    {/* add the routes here */}
    <Route
      component={TimeLine2}
      path="/timeline"
    />
    <Route
      component={Apropos}
      path="/apropos"
    />
    <Route
      component={MapContainer}
      path="/carte"
    />
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
