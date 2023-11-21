import React, { useEffect, useState } from "react";
import connexion from "../services/connexion";
import hexaRose from "../assets/hexa_rose.png";
import ImageCard from "../components/ImageCard";

function About() {
  const [abouts, setAbouts] = useState([]);

  const getAbouts = async () => {
    try {
      const ab = await connexion.get("/about");
      setAbouts(ab);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAbouts();
  }, []);

  return (
    <div className="bg-black h-full pt-32">
      <div className="relative  flex flex-col text-right mt-10">
        <h1 className="text-3xl text-white pr-[35px] z-10 pb-1">A propos</h1>
        <div className=" h-[2px] bg-gradient-to-r from-pink to-purple z-10 ml-10 mr-10" />
      </div>
      {abouts.slice(0, 1).map((about) => (
        <div className="flex flex-col mr-10 ml-10 text-white " key={about.id}>
          <div className="flex pt-20">
            <img className="h-10 mr-2 ml-[-8px]" src={hexaRose} alt="logo" />
            <h3 className="mt-2 font-bold text-2xl">{about.name}</h3>
          </div>
          <div className="flex flex-row-reverse pb-10 pt-5">
            <p className="text-justify">
              <ImageCard
                cls="w-[18rem] h-[25rem] float-right ml-10 mb-8"
                src={about.image_src}
                alt={about.image_alt}
              />
              {about.summary}
            </p>
          </div>
        </div>
      ))}
      <div className="flex text-white ml-10 ">
        <img className="h-10 mr-2 ml-[-8px]" src={hexaRose} alt="logo" />
        <h3 className="mt-2 font-bold text-2xl">Les partenaires</h3>
      </div>
      {abouts.slice(1, abouts.length).map((about) => (
        <div className="flex flex-col mr-10 ml-10 text-white " key={about.id}>
          <div className="flex flex-row-reverse pt-5">
            <p className="text-justify">
              <ImageCard
                cls="h-[6rem] float-right ml-10 mb-6"
                src={about.image_src}
                alt={about.image_alt}
              />
              {about.summary}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default About;
