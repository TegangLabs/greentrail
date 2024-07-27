import React, { useState } from "react";
import bg_trackwaste from "../../assets/img/bg_trackwaste.png";

const TrackWaste = () => {
  const [phone, setPhone] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    setPhone(event.target.value);
    // console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lakukan sesuatu dengan nilai input, misalnya kirim ke API
    console.log("Phone number submitted:", phone);
  };

  return (
    <>
      <section className="jumbotron bg-[url('assets/img/bg_trackwaste.png')] md:my-28 my-20 py-12 md:py-24 bg-cover bg-center bg-no-repeat">
        <div className="track-contents w-11/12 mx-auto">
          <h1 className="text-center text-xl md:text-3xl font-bold mb-3 text-secondary">
            Track your waste
          </h1>
          <p className="text-coklat w-10/12 md:w-5/12 mx-auto text-sm md:text-base text-center italic">
            You can track the status of the waste you have sent to us. Join us
            in this mission of goodness and make a positive contribution!
          </p>
          <div className="search-waste text-center md:my-4 w-10/12 md:w-5/12 mx-auto">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="0892...."
                className="bg-transparent placeholder:text-coklat text-coklat border-b-2 border-b-primary md:py-3 w-6/12 px-2"
                type="number"
                name="phone"
                id="input-phone-number"
                value={phone}
                onChange={handleInputChange}
              />
              <button className="bg-primary text-white md:px-4 md:py-2 md:text-sm rounded-md md:ml-4">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackWaste;
