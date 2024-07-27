import React from "react";
import info_waste from "../../assets/img/info-waste.png";

const Info = () => {
  return (
    <>
      {" "}
      <section className="waste-indonesia w-11/12 mx-auto md:my-28 my-20">
        <div className="header grid grid-cols-12">
          <div className="col-span-5">
            <h1 className="md:text-3xl text-xl text-primary font-bold">
              How is the current state of waste management in Indonesia?
            </h1>
          </div>
          <div className="col-span-7 grid grid-cols-12">
            <div className="left-data col-span-4">
              <h3 className="text-secondary font-bold md:text-2xl">
                86k (ton)
              </h3>
              <p className="text-primary md:text-base text-sm">
                Daily Waste Generation
              </p>
            </div>
            <div className="right-data col-span-4">
              <h3 className="text-secondary font-bold md:text-2xl">
                31,433k (ton)
              </h3>
              <p className="text-primary md:text-base text-sm">
                Yearly Waste Generation
              </p>
            </div>
          </div>
        </div>

        <div className="image-info w-full">
          <img src={info_waste} alt="gambar infografis" />
        </div>
      </section>
    </>
  );
};

export default Info;
