import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import bouton from "../assets/bouton.png";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    border: "3px solid black",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function HomePage() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    navigate("/gallery");
  };

  return (
    <div className="bg-cover h-screen w-screen bg-[url('./assets/background.jpg')] flex flex-col justify-center items-center md:pt-28">
      <h2 className="text-white text-2xl text-center pr-[450px] pb-2">
        Exposition dédiée à
      </h2>
      <h1 className="text-white text-5xl font-bold text-center">
        Hippolyte Mortier
      </h1>
      <h1 className="text-white text-5xl font-bold text-center pr-[11.5rem]">
        De Trévise
      </h1>
      <div className="">
        <h3 className="relative z-3 bg-black bg-opacity-60 w-[10rem] h-[3rem] border-solid border-white border-4 text-xl text-white text-center mt-12 ml-[3rem] mb-[-1rem] pt-2 pb-2 ">
          Le Concept
        </h3>
        <p className="bg-black w-[500px] h-[18rem] bg-opacity-60 text-white p-10 ml-[10rem]">
          L'exposition a pour but de présenter des œuvres de M. Mortier de
          Trévise réalisées durant la décennie 1861-1871 durant son séjour à
          l'île de La Réunion. <br />
          Elles illustrent la vie quotidienne des travailleurs dans les grandes
          plantations du Sud. La vie à cette époque n'était pas aussi tendre
          qu'aujourd'hui. <br />
          Malgré cela, l'artiste nous propose une vision apaisée de la situation
          sans gommer la dureté de la vie sur cette île tropicale.
        </p>
        <div className="relative ml-[50px]">
          <img
            className="h-[10rem] pl-[539px] mt-[-5rem]"
            src={bouton}
            alt="logo_entrer sur le site"
          />
          <button
            type="button"
            onClick={openModal}
            className="absolute bottom-[60px] right-[20px] text-white text-3xl"
          >
            ENTRER
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="pop-up protection des images"
      >
        <div className="flex flex-col text-center">
          <h2>
            Les représentations des oeuvres que vous allez consulter sur ce site
            ne sont pas libres de droit. <br /> <br />
            Elles sont la propriété de{" "}
            <a
              href="https://www.ihoi.org/app/photopro.sk/ihoi_icono/?"
              target="_blank"
              className="underline text-purple"
              rel="noreferrer"
            >
              l'Iconothèque historique de l'océan indien
            </a>
            . <br /> <br />
            En cliquant sur "entrer", vous reconnaissez avoir pris connaissance
            de cette information.
            <br />
            <br />
          </h2>
          <button
            onClick={closeModal}
            type="button"
            className="text-black text-3xl"
          >
            <span className="relative text-sm text-white px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              entrer
            </span>
          </button>
        </div>
      </Modal>
    </div>
  );
}
export default HomePage;
