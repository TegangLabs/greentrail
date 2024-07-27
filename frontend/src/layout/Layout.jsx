import React from "react";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const Layout = ({ children }) => {
  const location = useLocation();

  const path = location.pathname;
  return (
    <>
      <Navbar active={path} />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
