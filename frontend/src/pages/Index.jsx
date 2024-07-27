import React from "react";
import Layout from "../layout/Layout";
import Jumbotron from "../components/Jumbotron/Jumbotron";
import TrackWaste from "../components/TrackWaste/TrackWaste";
import Info from "../components/InfoGraphic/Info";
import About from "../components/About/About";

const Index = () => {
  const tabs = [
    { name: "Home", value: "/" },
    { name: "About", value: "#about" },
    { name: "Campaign", value: "/about" },
  ];

  return (
    <>
      <Layout>
        <section className="homepage-contents">
          <Jumbotron />
          <TrackWaste />
          <Info />
          <About />
        </section>
      </Layout>
    </>
  );
};

export default Index;
