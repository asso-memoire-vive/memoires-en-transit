import { render } from "react-dom";
import App from "./components/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.scss'
import MapContainer from "./components/MapContainer";
import Apropos from "./components/Apropos";
import Frise from "./components/TimeLine/Frise";

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/carte" element={<MapContainer />} />
      <Route path="/apropos" element={<Apropos />} />
      <Route path="/timeline" element={<Frise />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
