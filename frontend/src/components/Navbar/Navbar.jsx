import { React, useState } from "react";
import "./style.scss";

const Navbar = ({}) => {
  const [linkActive, setLinkActive] = useState("");

  return (
    <nav className="navbar-section md:mt-4 md:w-11/12 mx-auto bg-primary md:rounded-2xl">
      <div className="md:px-8 md:py-4 md:flex md:justify-between">
        {" "}
        Ini Navbar
      </div>
    </nav>
  );
};

export default Navbar;
