import React from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import connexion from "../services/connexion";
import { useCurrentUser } from "../contexts/UserContexts";
import hexa from "../assets/hexa.png";
import "react-toastify/dist/ReactToastify.css";

function NavBarAdmin() {
  const { setUser } = useCurrentUser();
  const navigate = useNavigate();

  const logout = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("/logout");
      toast.success("Votre déconnexion à bien été effectué.");
      setUser();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex bg-black w-80 h-full text-white pl-5 flex-col items-left pt-40">
      <div className="pb-8">
        <h1 className="font-bold text-2xl pl-5">Tableau de bord</h1>
      </div>
      <div className="pl-5">
        <div className="flex w-auto">
          <img className="h-8 pr-2" src={hexa} alt="logo_deconnexion" />
          <Link className="pt-2" to="/admin">
            {" "}
            Oeuvres{" "}
          </Link>
        </div>
        <div className="pt-4 flex">
          <img className="h-8 pr-2" src={hexa} alt="logo_deconnexion" />
          <Link className="pt-2" to="/admin/articles">
            {" "}
            Articles{" "}
          </Link>
        </div>
        <div className="pt-4 flex">
          <img className="h-8 pr-2" src={hexa} alt="logo_deconnexion" />
          <Link className="pt-2" to="/admin/biographies">
            {" "}
            Biographie{" "}
          </Link>
        </div>
        <div className="pt-4 flex">
          <img className="h-8 pr-2" src={hexa} alt="logo_deconnexion" />
          <Link className="pt-2" to="/admin/categories">
            {" "}
            Catégories{" "}
          </Link>
        </div>
        <div className="pt-4 flex">
          <img className="h-8 pr-2" src={hexa} alt="logo_deconnexion" />
          <Link className="pt-2" to="/admin/techniques">
            {" "}
            Techniques{" "}
          </Link>
        </div>
        <div className="pt-4 flex">
          <img className="h-8 pr-2" src={hexa} alt="logo_deconnexion" />
          <Link className="pt-2" to="/admin/users">
            {" "}
            Utilisateurs{" "}
          </Link>
        </div>
        <div className="pt-4 flex">
          <img className="h-8 pr-2" src={hexa} alt="logo_deconnexion" />
          <Link className="pt-2" to="/admin/about">
            {" "}
            A propos{" "}
          </Link>
        </div>
      </div>
      <div className="flex pt-60 pl-6 pr-10 mb-48">
        <Link to="/" className="flex p-3 text-xl text-black">
          <div className="flex pt-10 pb-5  gap-10">
            <button
              type="submit"
              className="bg-white text-black py-2 px-4"
              onClick={logout}
            >
              Deconnexion
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default NavBarAdmin;
