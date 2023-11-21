import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import connexion from "../services/connexion";
import { useCurrentUser } from "../contexts/UserContexts";

function Auth() {
  const [userToLog, setUserToLog] = useState({
    email: "",
    password: "",
  });
  const { setUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleUser = (event) => {
    setUserToLog({ ...userToLog, [event.target.name]: event.target.value });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const log = await connexion.post("/login", userToLog);
      setUser(log);
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black flex items-center justify-center h-screen">
      <form
        className="bg-white border-purple border-solid border-4 p-6 rounded-lg shadow-lg w-80"
        onSubmit={(event) => login(event)}
      >
        <div className="mb-4">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="form2Example1"
          >
            Adresse mail
          </label>
          <input
            type="email"
            id="form2Example1"
            name="email"
            value={userToLog.email}
            onChange={(event) => handleUser(event)}
            className="border-pink border-solid border-2 rounded py-2 px-4 w-full"
            required
            pattern="^[\w-\.]+@([\w-])+\.([\w-]{2,4})$"
          />
        </div>

        <div className="mb-4 ">
          <label
            className="block text-black text-sm font-bold mb-2"
            htmlFor="form2Example2"
          >
            Mot de passe
          </label>
          <input
            type="password"
            id="form2Example2"
            value={userToLog.password}
            onChange={(event) => handleUser(event)}
            name="password"
            className="border-pink border-solid border-2 rounded py-2 px-4 w-full"
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <div className="flex">
            <button
              type="submit"
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple to-pink group-hover:from-purple group-hover:to-pink hover:text-white dark:text-white focus:ring-4"
            >
              <span className="relative text-white px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Connexion
              </span>
            </button>
          </div>
          <p className="text-center mt-4">Vous n'avez pas de compte ?</p>
          <Link to="/subscription">
            <p className="text-center underline pt-4">Cliquez ici</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Auth;
