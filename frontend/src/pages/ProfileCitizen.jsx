import { Form, Formik } from "formik";
import React, { useState } from "react";
import CustomInput from "../components/Form/CustomInput";
import Swal from "sweetalert2";
import Layout from "../layout/Layout";

import waste_1 from "../assets/img/waste_samples/waste_1.png";
import waste_2 from "../assets/img/waste_samples/waste_2.png";
import waste_3 from "../assets/img/waste_samples/waste_3.png";
import waste_4 from "../assets/img/waste_samples/waste_4.png";
import CustomSelect from "../components/Form/CustomSelect";
import WasteCard from "../components/Card/WasteCard";
import { waste_citizen_samples } from "../datas";

const ProfileCitizen = () => {
  const [phone, setPhone] = useState("");

  const [fileImg, setFileImg] = useState("");

  const handlePhoneSearch = (event) => {
    event.preventDefault();
    setPhone(event.target.value);
    // console.log(event.target.value);
  };

  const handlePhoneSubmit = (event) => {
    event.preventDefault();
    // Lakukan sesuatu dengan nilai input, misalnya kirim ke API
    console.log("Phone number submitted:", phone);
  };

  const changeHandlerImg = (event) => {
    setFileImg(event.target.files[0]);
  };

  const onSubmitHandler = async (values, actions) => {
    // getLogin(values);
    console.log(values);
    Swal.fire({
      title: "Success",
      text: "Yeay akun masuk !",
      icon: "success",
      confirmButtonText: "OK",
      timer: 1500,
      timerProgressBar: true,
    });
  };

  return (
    <>
      <Layout>
        <section className="list-sampah w-11/12 mx-auto md:my-28 my-20">
          <div className="header text-center w-11/12 md:w-7/12 mx-auto mb-5 md:mb-7">
            <h1 className="text-lg md:text-2xl font-bold text-primary md:mb-2 mb-1">
              Halo, Welcome Hanif{" "}
            </h1>
            <p className="text-primary font-light text-sm md:text-base">
              Thank you for contributing to our efforts to protect the
              environment by utilizing household waste to prevent accumulation.
              May the good deeds you have done be rewarded.
            </p>
          </div>

          <div className="list-waste">
            <div className="header md:mb-4 mb-2">
              <h1 className="text-base md:text-xl text-center font-bold text-primary mb-2">
                The good deeds you have done
              </h1>
              <div className="search-waste text-center my-3 md:my-4 w-11/12 md:w-5/12 mx-auto">
                <form onSubmit={handlePhoneSubmit}>
                  <input
                    placeholder="0892...."
                    className="bg-transparent placeholder:text-coklat text-coklat border-b-2 border-b-primary md:py-3 w-6/12 px-2"
                    type="number"
                    name="phone"
                    id="input-phone-number"
                    value={phone}
                    onChange={handlePhoneSearch}
                  />
                  <button className="bg-primary text-white px-2 md:px-4 py-1 md:py-2 text-sm rounded-md ml-2 md:ml-4">
                    Submit
                  </button>
                </form>
                <p className="text-xs md:text-sm w-10/12 md:w-8/12 mx-auto text-coklat italic">
                  *Track the status of your waste using your phone number or
                  waste id.
                </p>
              </div>
            </div>
            <div className="card-list grid grid-cols-12 md:gap-x-4 gap-y-3">
              {waste_citizen_samples.map((waste, wasteIdx) => {
                return (
                  <>
                    <WasteCard waste={waste} wasteIdx={wasteIdx} />
                  </>
                );
              })}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default ProfileCitizen;
