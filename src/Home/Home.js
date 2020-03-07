import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

class Home extends PureComponent {

  render() {
    return (
      <div className="home">
        <ul className="menu">
            <li key='ReactLeaflet'><Link to="/carte">Carte</Link></li>
        </ul>
      </div>
    );
  }
}

export default Home;
