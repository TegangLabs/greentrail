import React from "react";
import Layout from "../layout/Layout";
import { waste_volunteer_samples } from "../datas";
import { useParams } from "react-router-dom";

const DetailWaste = () => {
  const { id } = useParams();

  const data = waste_volunteer_samples.find((item) => item.id === id);

  console.log(data);
  return (
    <>
      <Layout>
        <section className="detail-waste md:w-10/12 w-11/12 mx-auto md:my-28 my-20 ">
          <div className="bg-white rounded md:px-7 px-3 md:pt-9 pt-3 md:pb-28 pb-12">
            <div className="grid grid-cols-12 md:gap-x-6">
              <div className="left-side col-span-12 md:col-span-6">
                <img src={data.image} alt="waste image" />
              </div>
              <div className="right-side col-span-12 md:col-span-6">
                <h1 className="font-bold text-lg md:text-2xl text-primary md:mb-6 mb-3">
                  {data.category} -{" "}
                  <span className="font-light italic">{data.owner}</span>
                </h1>
                <div className="md:flex md:flex-col md:gap-y-5 md:mb-6">
                  <div className="grid grid-cols-12 md:gap-x-5">
                    <div className="col-span-12 text-primary md:col-span-6">
                      <h3 className="font-light text-sm md:text-base">
                        Id Sampah
                      </h3>
                      <p className="font-bold text-base md:text-xl">
                        {data.id}
                      </p>
                    </div>
                    <div className="col-span-12 text-primary md:col-span-6">
                      <h3 className="font-light text-sm md:text-base">
                        Waktu Penyerahan
                      </h3>
                      <p className="font-bold text-base md:text-xl">
                        27 Juni 2024
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 md:gap-x-5">
                    <div className="col-span-12 text-primary md:col-span-6">
                      <h3 className="font-light text-sm md:text-base">
                        Nama Warga
                      </h3>
                      <p className="font-bold text-base md:text-xl">
                        {data.owner}
                      </p>
                    </div>
                    <div className="col-span-12 text-primary md:col-span-6">
                      <h3 className="font-light text-sm md:text-base">RW</h3>
                      <p className="font-bold text-base md:text-xl">
                        {data.rw}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 md:gap-x-5">
                    <div className="col-span-12 text-primary md:col-span-6">
                      <h3 className="font-light text-sm md:text-base">
                        Kelurahan
                      </h3>
                      <p className="font-bold text-base md:text-xl">
                        {data.kelurahan}
                      </p>
                    </div>
                    <div className="col-span-12 text-primary md:col-span-6">
                      <h3 className="font-light text-sm md:text-base">
                        Kota / Kabupaten
                      </h3>
                      <p className="font-bold text-base md:text-xl">
                        {data.kota}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="status-waste">
                  <div className="h3 md:text-lg font-light md:mb-3 text-primary">
                    Status
                  </div>
                  <div className="track-step">
                    <ol className="flex items-center w-full">
                      <div className="flex flex-col w-full">
                        <li
                          className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b ${
                            data?.status[1] !== undefined
                              ? "after:border-primary"
                              : "after:border-gray-200"
                          }  after:border-4 after:inline-block`}
                        >
                          <span
                            className={`flex items-center ${
                              data?.status[0] !== undefined
                                ? "text-white bg-primary"
                                : "text-gray-600 bg-gray-200"
                            }  justify-center w-10 h-10 rounded-full md:text-xl  shrink-0`}
                          >
                            1
                          </span>
                        </li>{" "}
                        <span
                          className={`${
                            data?.status[0] !== undefined
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        >
                          RW
                        </span>
                      </div>
                      <div className="flex flex-col w-full">
                        <li
                          className={`flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b ${
                            data?.status[2] !== undefined
                              ? "after:border-primary"
                              : "after:border-gray-200"
                          }  after:border-4 after:inline-block`}
                        >
                          <span
                            className={`flex items-center ${
                              data?.status[1] !== undefined
                                ? "text-white bg-primary"
                                : "text-gray-600 bg-gray-200"
                            } justify-center w-10 h-10 rounded-full md:text-xl  shrink-0`}
                          >
                            2
                          </span>
                        </li>{" "}
                        <span
                          className={`${
                            data?.status[1] !== undefined
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        >
                          Kelurahan
                        </span>
                      </div>{" "}
                      <div className="flex flex-col w-full">
                        <li className="flex w-full items-center">
                          <span
                            className={`flex items-center ${
                              data?.status[2] !== undefined
                                ? "text-white bg-primary"
                                : "text-gray-600 bg-gray-200"
                            } justify-center w-10 h-10 rounded-full md:text-xl  shrink-0`}
                          >
                            3
                          </span>
                        </li>
                        <span
                          className={`${
                            data?.status[2] !== undefined
                              ? "text-primary"
                              : "text-gray-400"
                          }`}
                        >
                          Pusat
                        </span>
                      </div>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default DetailWaste;
