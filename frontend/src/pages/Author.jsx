import React, { useState, useEffect } from "react";
import connexion from "../services/connexion";
import ImageCard from "../components/ImageCard";
import hexaRose from "../assets/hexa_rose.png";

function Author() {
  const [biographies, setBiographies] = useState([]);

  const getBiographies = async () => {
    try {
      const bio = await connexion.get("/biographies");
      setBiographies(bio);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBiographies();
  }, []);

  return (
    <div className="bg-black h-full pt-32">
      <div className="relative  flex flex-col text-right mt-10">
        <h1 className="text-3xl text-white pr-[35px] z-10 pb-1">Biographie</h1>
        <div className=" h-[2px] bg-gradient-to-r from-pink to-purple z-10 ml-10 mr-10" />
      </div>
      {biographies.map((biographie) => (
        <div
          className="flex flex-col mr-10 ml-10 text-white "
          key={biographie.id}
        >
          <div className="flex pt-20">
            <img className="h-10 mr-2 ml-[-8px]" src={hexaRose} alt="logo" />
            <h3 className="mt-2 font-bold text-2xl">{biographie.title1}</h3>
          </div>
          <div className="flex pb-20 pt-5">
            <p className="text-justify">
              <ImageCard
                cls="w-[18rem] h-[25rem] float-left mr-10 mb-8"
                src={biographie.image1_src}
                alt={biographie.image1_alt}
              />
              {biographie.text1}
            </p>
          </div>

          <div className="flex flex-row-reverse items-center pb-20">
            <ImageCard
              cls="w-1/3 h-64 ml-10"
              src={biographie.image2_src}
              alt={biographie.image2_alt}
            />
            <div>
              <div className="flex pb-5">
                <img
                  className="h-10 mr-2 ml-[-8px]"
                  src={hexaRose}
                  alt="logo"
                />
                <h3 className="mt-2 font-bold text-2xl">{biographie.title2}</h3>
              </div>
              <p className="text-justify"> {biographie.text2}</p>
            </div>
          </div>

          <div className="flex">
            <img className="h-10 mr-2 ml-[-8px]" src={hexaRose} alt="logo" />
            <h3 className="mt-2 font-bold text-2xl">{biographie.title3}</h3>
          </div>
          <div className="flex pb-20 pt-5">
            <p className="text-justify">
              <ImageCard
                cls="w-[15rem] h-[10rem] float-left mr-10 mb-8"
                src={biographie.image3_src}
                alt={biographie.image3_alt}
              />
              {biographie.text3}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Author;
