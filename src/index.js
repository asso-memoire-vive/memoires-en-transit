import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter, Switch} from "react-router-dom"
import Header from "./components/Header"
import {Route} from "react-router"
import GeoJsonMap from "./components/Map/GsonMap"
import TimeLine2 from "./components/TimeLine/TimeLine2"
import Apropos from "./components/Apropos"
import Menu from "./components/Menu";

const routes = [
  {
    component: GeoJsonMap,
    path: '/',
    title: "Mémoire(s) en transit"
  },
  {
    component: TimeLine2,
    path: '/timeline',
    title: "Ligne(s) temporelle(s) et mémorielle(s)"
  },
  {
    component: Apropos,
    path: '/apropos',
    title: "A props"
  }
]

ReactDOM.render(
  <BrowserRouter>
    <div className="app-container">
      <Header />
      <Menu />
      <Switch>
        {routes.map(route => {
          return (
            <Route
              component={route.component}
              key={`key_${route.path}`}
              path={route.path}
              title={route.title}
            />
          )
        })}
      </Switch>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
