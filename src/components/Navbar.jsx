import React from "react";
import { Link } from "react-router-dom";

import logo from "./../img/logo.png"

const Navbar = () => {
  return (
    <header>
      <div className="nazev">
        <Link className="home" to="/">
          <div className="radky">
            <h1 className="vysocina">Vysočina</h1>
            <h2 className="turnus">3. turnus</h2>
          </div>
        </Link>
      </div>
      <nav>
        <ul className="menu">
          <li><Link className="link" id="odsazeni" to="/informace">Informace</Link></li>
          <li><Link className="link" to="/aktuality">Aktuality</Link></li>
          <li><Link className="link" to="/galerie">Galerie</Link></li>
          <li><Link className="link" to="/kontakt">Kontakt</Link></li>
        </ul>
      </nav>
      <div className="logo">
        <Link className="nadpis" to="/">
          <img src={logo} alt="Vysočina logo" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
