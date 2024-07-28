import { Form, Formik } from "formik";
import React, { useState } from "react";
import CustomInput from "../components/Form/CustomInput";
import Swal from "sweetalert2";
import Layout from "../layout/Layout";

import CustomSelect from "../components/Form/CustomSelect";
import WasteCard from "../components/Card/WasteCard";
import { waste_volunteer_samples } from "../datas";

const ProfileVolunteer = () => {
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
          <div className="add-waste mb-5 md:mb-12">
            <h1 className="text-base md:text-xl font-bold text-primary mb-2">
              Tambah Sampah
            </h1>
            <Formik
              initialValues={{
                name: "",
                phone: "",
                category: "",
                rt: "",
                rw: "",
                kelurahan: "",
                kecamatan: "",
                kota: "",
              }}
              onSubmit={onSubmitHandler}
              enableReinitialize={true}
            >
              {(props) => (
                <Form>
                  <div className="flex flex-col md:flex-row md:gap-x-8 w-full ">
                    <div className="form-item w-full flex flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="Nama Warga"
                        name="name"
                        type="text"
                        placeholder="Please input citizen's name"
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>
                    <div className="form-item w-full flex flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="Number Phone"
                        name="phone"
                        type="number"
                        placeholder="Input phone number"
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>{" "}
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-x-8 w-full ">
                    <div className="form-item w-full flex flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="Weight (liter)"
                        name="weight"
                        type="number"
                        placeholder="3"
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>
                    <div className="form-item w-full flex flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <label className="font-medium md:pl-5 pl-3 md:text-xl text-md">
                        Waste Image
                      </label>

                      <input
                        onChange={changeHandlerImg}
                        name="image"
                        type="file"
                        {...props}
                        className="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>{" "}
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-x-8 w-full ">
                    <div className="form-item flex w-full flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomSelect
                        label="Waste Category"
                        name="category"
                        classSelect=" rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                        classLabel="font-medium md:pl-5 pl-3 md:text-xl text-md"
                      >
                        <option value="0">Household Cooking Oil </option>
                        <option value="1">Waste Reguler</option>
                      </CustomSelect>
                    </div>{" "}
                    <div className="form-item flex w-full flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="RT"
                        name="rt"
                        type="number"
                        placeholder="008"
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>{" "}
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-x-8 w-full ">
                    <div className="form-item flex w-full flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="RW"
                        name="rw"
                        type="number"
                        placeholder="008"
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>{" "}
                    <div className="form-item flex w-full flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="Kelurahan"
                        name="kelurahan"
                        type="text"
                        placeholder="Please input kelurahan"
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-x-8 w-full ">
                    <div className="form-item flex w-full flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="Kecamatan"
                        name="kecamatan"
                        type="text"
                        placeholder="Please input kecamatan"
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>
                    <div className="form-item flex w-full flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="Kota / Kabupaten"
                        name="kota"
                        type="text"
                        placeholder="Please input kota / kabupaten"
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit w-full text-center bg-primary rounded py-1 text-white"
                  >
                    {" "}
                    Submit{" "}
                  </button>
                </Form>
              )}
            </Formik>
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
              {waste_volunteer_samples.map((waste, wasteIdx) => {
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

export default ProfileVolunteer;
