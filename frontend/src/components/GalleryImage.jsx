import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import connexion from "../services/connexion";
import ImageCard from "./ImageCard";

function GalleryImage() {
  AOS.init();

  const [works, setWorks] = useState([]);
  const getWorks = async () => {
    try {
      const work = await connexion.get("/works");
      setWorks(work);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getWorks();
  }, []);

  return (
    <div className="h-max grid grid-cols-2 gap-10 place-items-center justify-center">
      {works.map((work) => (
        <div
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          className="w-3/4 flex justify-center flex-col content-center flex-wrap pb-8"
          key={work.id}
        >
          <h2 className="text-white text-1xl pb-4">{work.summary_title}</h2>
          <ImageCard
            cls="max-h-[32rem] bg-gradient-to-t from-pink to-purple p-1"
            src={work.image_src}
            alt={work.image_alt}
          />
          <div className="flex justify-between pt-4">
            <Link to={`/gallery/${work.id}`}>
              <button
                type="button"
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple to-pink group-hover:from-purple group-hover:to-pink hover:text-white dark:text-white focus:ring-4"
              >
                <span className="relative text-white px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  En savoir plus
                </span>
              </button>
            </Link>
            <h2 className="text-white text-right text-1xl pt-3">{work.date}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default GalleryImage;
