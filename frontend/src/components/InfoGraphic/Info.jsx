import React from "react";
import info_waste from "../../assets/img/info-waste.png";

const Info = () => {
  return (
    <>
      {" "}
      <section className="waste-indonesia w-11/12 mx-auto md:my-28 my-20">
        <div className="header grid grid-cols-12">
          <div className="col-span-12 md:col-span-5">
            <h1 className="text-center md:text-left md:text-3xl text-xl text-primary font-bold">
              How is the current state of waste management in Indonesia?
            </h1>
          </div>
          <div className="col-span-12 md:col-span-7 grid grid-cols-12 mt-4 md:mt-0">
            <div className="left-data w-6/8 mx-auto col-span-6 md:col-span-4">
              <h3 className="text-secondary font-bold md:text-2xl">
                86k (ton)
              </h3>
              <p className="text-primary text-xs md:text-base ">
                Daily Waste Generation
              </p>
            </div>
            <div className="right-data w-6/8 mx-auto col-span-6 md:col-span-4">
              <h3 className="text-secondary font-bold md:text-2xl">
                31,433k (ton)
              </h3>
              <p className="text-primary text-xs md:text-base ">
                Yearly Waste Generation
              </p>
            </div>
          </div>
        </div>

        <div className="image-info w-full mt-3 md:mt-0">
          <img src={info_waste} alt="gambar infografis" />
        </div>
      </section>
    </>
  );
};

export default Info;
