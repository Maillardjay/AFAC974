import React from "react";
import GalleryImage from "../components/GalleryImage";

function Gallery() {
  return (
    <div className="">
      <div className="bg-cover bg-[url('./assets/bggallerie.jpg')] h-[1000px]">
        <div className="relative bg-black h-full w-full opacity-60 z-10" />
        <div className="relative mt-[-70px] flex flex-col text-right">
          <h1 className="text-3xl text-white pr-[35px] z-10 pb-1">Galerie</h1>
          <div className="h-[2px] bg-gradient-to-r from-pink to-purple z-10 ml-8 mr-8" />
        </div>
      </div>
      <div className="bg-contain bg-[url('./assets/pattern.jpg')] pt-20">
        <GalleryImage />
      </div>
    </div>
  );
}

export default Gallery;
