import { React, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.svg";

import "./style.scss";

const Navbar = ({}) => {
  const location = useLocation();

  const [linkActive, setLinkActive] = useState("");

  const pathname = location.pathname;

  console.log(pathname);

  const tabs = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "#about",
    },
  ];

  return (
    <nav className="hidden md:block navbar-section md:mt-4 md:w-11/12 mx-auto bg-primary md:rounded-2xl">
      <div className="px-8 py-4 flex justify-between text-center items-center">
        <div className="nav-links flex gap-x-5 font-roboto">
          {tabs.map((item, itemIdx) => {
            return (
              <>
                <Link
                  key={itemIdx}
                  to={`${item.link}`}
                  className={` ${
                    pathname === item.link
                      ? "font-bold text-secondary"
                      : " font-normal text-white hover:text-orange-200"
                  } `}
                >
                  {item.name}
                </Link>
              </>
            );
          })}
        </div>
        <div className="logo-gt nav-brand">
          <Link to="/">
            <img src={logo} alt="logo" className="w-24" />
          </Link>
        </div>{" "}
        <div className="nav-btn login">
          <Link
            to="/login"
            className="border border-white rounded-2xl text-white px-6 py-3 hover:bg-[#428573] hover:text-white"
          >
            Login volunteer
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
