import React from "react";
import about_kanan from "../../assets/img/about_kanan.png";
import about_kiri from "../../assets/img/about_kiri.png";

const About = () => {
  return (
    <>
      {" "}
      <section className="about w-11/12 mx-auto md:my-28 my-20">
        <div className="about-contents md:w-11/12 mx-auto grid grid-cols-12 items-center">
          <div className="left-content col-span-12 order-2 md:order-2 md:col-span-6  text-primary">
            <h1 className="text-center md:text-left text-2xl md:text-3xl font-bold mb-3">
              About Us
            </h1>
            <p className="text-sm md:text-base font-normal text-center md:text-left mb-3">
              <span className="font-bold ">Olahin.id</span> hadir untuk menjawab
              tantangan ini dengan menyediakan platform yang memungkinkan
              masyarakat untuk berperan aktif dalam pengelolaan limbah rumah
              tangga. Melalui sistem yang transparan dan mudah diakses,
              Olahin.id berkomitmen untuk meningkatkan kesadaran dan
              memfasilitasi tindakan nyata dalam pengelolaan limbah, sehingga
              dapat membantu menjaga kelestarian lingkungan dan mengurangi
              dampak negatif dari limbah rumah tangga.
            </p>
            <div className="hidden md:block image w-64 md:w-full">
              <img src={about_kiri} alt="image jumbotron" />
            </div>
          </div>{" "}
          <div className="right-content col-span-12 order-1 md:order-2 md:col-span-6 items-center mx-auto mb-14 md:mb-0">
            <div className="image w-64 md:w-82">
              <img src={about_kanan} alt="image jumbotron" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
