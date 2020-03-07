import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter} from "react-router-dom"
import {Route} from "react-router"
import Header from "./Header/Header"
import Home from "./Home/Home"
import GeoJsonMap from "./Map/GsonMap"

ReactDOM.render(
    <BrowserRouter>
        <div className="app">
            <Header />
            <Route exact path="/" component={Home} />
            <Route path="/carte" component={GeoJsonMap} />
        </div>
    </BrowserRouter>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
