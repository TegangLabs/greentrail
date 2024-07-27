import React from "react";
import join_img from "../../assets/img/join_campaign.png";
import { Link } from "react-router-dom";

const JoinCampaign = () => {
  return (
    <>
      <section className="join bg-[url('assets/img/join_campaign.png')] md:my-28 my-20 py-12 md:py-24 bg-cover bg-center bg-no-repeat">
        <div className="track-contents w-11/12 mx-auto">
          <h1 className="text-center text-xl md:text-3xl font-bold mb-3 text-secondary">
            Join Our Campaign
          </h1>
          <p className="text-white font-light w-10/12 md:w-7/12 mx-auto text-sm md:text-base text-center italic">
            Become a part of our community today and take the first step towards
            a greener tomorrow. Your commitment can inspire others and drive
            meaningful change. Together, we can turn waste into worth and make a
            real difference.
          </p>
          <Link to={"/campaign"} className="flex justify-center md:mt-3">
            <div className=" md:px-6 md:py-2 text-white hover:bg-[#428573] hover:border-secondary border border-3 border-hijau-normal rounded-md">
              Let's Start
            </div>
          </Link>
        </div>
      </section>
    </>
  );
};

export default JoinCampaign;
