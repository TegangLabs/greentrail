import React from "react";
import jumbotron_image from "../../assets/img/jumbotron.svg";

const Jumbotron = () => {
  return (
    <>
      <section className="jumbotron w-11/12 mx-auto md:my-28 my-20">
        <div className="jumbotron-contents md:w-11/12 mx-auto grid grid-cols-12 items-center">
          <div className="left-content col-span-12 order-2 md:order-2 md:col-span-6 md:w-10/12 text-primary">
            <h1 className="text-center md:text-left text-2xl md:text-3xl font-bold mb-3">
              Empowering Communities, <br /> Preserving Nature for All
            </h1>
            <p className="text-base md:text-xl font-normal text-center md:text-left">
              Every piece of waste has the potential to harm our environment if
              not managed properly. Proper disposal and recycling are crucial to
              maintaining a healthy ecosystem. Take action now to prevent
              pollution and ensure a sustainable future.
            </p>
          </div>{" "}
          <div className="right-content col-span-12 order-1 md:order-2 md:col-span-6 items-center mx-auto mb-14 md:mb-0">
            <div className="image w-64 md:w-96">
              <img src={jumbotron_image} alt="image jumbotron" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Jumbotron;
