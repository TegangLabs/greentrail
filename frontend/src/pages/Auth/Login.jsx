import React from "react";
import Layout from "../../layout/Layout";
import jumbotron_image from "../../assets/img/jumbotron.svg";
import CustomInput from "../../components/Form/CustomInput";
import { Form, Formik } from "formik";
import Swal from "sweetalert2";
import { loginSchemas } from "../../components/Form/Schemas";

const Login = () => {
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
        <section className="login w-11/12 mx-auto md:my-28 my-20">
          <div className="login-contents mx-auto grid grid-cols-12 items-center">
            <div className="left-content col-span-12 md:col-span-6 items-center mx-auto mb-14 md:mb-0 ">
              <div className="image w-64 md:w-96">
                <img src={jumbotron_image} alt="image jumbotron" />
              </div>
            </div>{" "}
            <div className="right-content col-span-12 w-11/12 md:w-10/12 md:col-span-6 items-center mx-auto mb-14 md:mb-0 ">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={loginSchemas}
                onSubmit={onSubmitHandler}
                enableReinitialize={true}
              >
                {(props) => (
                  <Form>
                    <div className="form-item flex flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="Silahkan masukkan email..."
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
                    </div>
                    <div className="form-item flex flex-col md:gap-y-2 text-primary mb-3 md:mb-4">
                      <CustomInput
                        autocomplete="new-password"
                        label="Password"
                        name="password"
                        type="password"
                        placeholder="Silahkan masukkan password..."
                        classLabel="font-medium pl-3 md:text-xl text-md"
                        classInput="rounded-md bg-light text-sm md:text-base px-3 py-3 md:px-5 md:py-3"
                      />
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
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Login;
