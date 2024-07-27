import React from "react";
import Layout from "../layout/Layout";
import Jumbotron from "../components/Jumbotron/Jumbotron";

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
        </section>
      </Layout>
    </>
  );
};

export default Index;
