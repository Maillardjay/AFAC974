import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import connexion from "../services/connexion";
import "react-toastify/dist/ReactToastify.css";
import AcceptRGPD from "../components/AcceptRGPD";

function UserSubscription() {
  const [users, setUsers] = useState({
    firstname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  // Nous avons déplacé la gestion de l'état de l'acceptation du RGPD ici.
  const [disableButton, setDisableButton] = useState(true);

  const handleUser = (name, value) => {
    setUsers({
      ...users,
      [name]: value,
    });
  };

  // La fonction de toggle a été déplacée ici.
  const toggleDisableButton = () => {
    setDisableButton(!disableButton);
  };

  const postUsers = async (e) => {
    e.preventDefault();
    if (users.password !== users.confirmPassword) {
      console.error("Les mots de passe ne correspondent pas");
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const myUser = { ...users };
      delete myUser.confirmPassword;
      await connexion.post("/signup", myUser);
      toast.success(
        "Votre compte a été créé, vous allez être redirigé·e vers la page de connexion"
      );
      setTimeout(() => {
        navigate("/auth/connexion");
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <form
        className="bg-white border-purple border-solid border-4 p-6 rounded-lg shadow-lg  w-80 h-100"
        onSubmit={(e) => postUsers(e)}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Prénom
            <input
              type="text"
              name="firstname"
              value={users.firstname}
              onChange={(e) => handleUser(e.target.name, e.target.value)}
              className="border-pink border-solid border-2 rounded py-2 px-4 w-full"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Adresse mail
            <input
              type="email"
              name="email"
              value={users.email}
              onChange={(e) => handleUser(e.target.name, e.target.value)}
              className="border-pink border-solid border-2 rounded py-2 px-4 w-full"
              required
              pattern="^[\w-.]+@([\w-])+.([\w-]{2,4})$"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Mot de passe
            <input
              type="password"
              name="password"
              value={users.password}
              onChange={(e) => handleUser(e.target.name, e.target.value)}
              className="border-pink border-solid border-2 rounded py-2 px-4 w-full"
              required
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirmer le mot de passe
            <input
              type="password"
              name="confirmPassword"
              value={users.confirmPassword}
              onChange={(e) => handleUser(e.target.name, e.target.value)}
              className="border-pink border-solid border-2 rounded py-2 px-4 w-full"
              required
            />
          </label>
        </div>
        <AcceptRGPD toggleDisableButton={toggleDisableButton} />
        <div className="flex">
          <button
            type="submit"
            disabled={disableButton}
            className="relative inline-flex items-center justify-center ml-12 mt-5 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple to-pink group-hover:from-purple group-hover:to-pink hover:text-white dark:text-white focus:ring-4"
          >
            <span className="relative text-white px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Créer un compte
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserSubscription;
