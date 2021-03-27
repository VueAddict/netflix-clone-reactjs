import React, { useEffect, useState } from "react";

import netflix_logo from '../assets/netflix_logo.jpg' 
import avatar_logo from '../assets/avatar_logo.jpg' 




function Navbar() {
  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => window.removeEventListener("scroll");
  }, []);

  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src={netflix_logo}
        alt="Netflix Logo"
      />
      <img
        className="nav_avatar"
        src={avatar_logo}
        alt="Netflix Logo"
      />
    </div>
  );
}

export default Navbar;
