import React from "react";
import Layout from "../layout/Layout";

const Index = () => {
  const tabs = [
    { name: "Home", value: "/" },
    { name: "About", value: "#about" },
    { name: "Campaign", value: "/about" },
  ];

  return (
    <>
      <Layout>
        <h1>Halo</h1>
      </Layout>
    </>
  );
};

export default Index;
