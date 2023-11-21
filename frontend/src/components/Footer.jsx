import React from "react";
import { Link } from "react-router-dom";
import ImageCard from "./ImageCard";

function Footer() {
  return (
    <div className="flex h-16 bg-pink w-full">
      <Link
        to="https://www.departement974.fr"
        target="_blank"
        rel="noreferrer"
        className="m-auto text-white font-bold"
      >
        <ImageCard
          cls="w-20 h-10"
          src="Reunion_Logo.png"
          alt="logo_déparement_de_la_Réunion"
        />
      </Link>
      <Link
        to="https://capeline974.re/CAPELINE/CARTOTHEQUE/capeline-accueil.html"
        target="_blank"
        rel="noreferrer"
        className="m-auto text-white"
      >
        AFAC 974
      </Link>
      <Link
        to="https://museo.vandanjon.com/index.php/en/"
        target="_blank"
        rel="noreferrer"
        className="m-auto text-white"
      >
        Objet Témoin
      </Link>
      <Link
        to="https://www.ihoi.org/app/photopro.sk/ihoi_icono/?"
        target="_blank"
        rel="noreferrer"
        className="m-auto text-white"
      >
        IHOI
      </Link>
      <Link
        to="https://www.facebook.com/pedagolab"
        target="_blank"
        rel="noreferrer"
        className="m-auto text-white"
      >
        <ImageCard cls="w-8 h-8" src="logo_facebook.png" alt="logo_facebook" />
      </Link>
    </div>
  );
}

export default Footer;
