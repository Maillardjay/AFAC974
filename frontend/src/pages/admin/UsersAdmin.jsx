import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import connexion from "../../services/connexion";
import "react-toastify/dist/ReactToastify.css";

function UsersAdmin() {
  const userModel = {
    id: null,
    email: "",
    firstname: "",
  };

  const [user, setUser] = useState(userModel);
  const [users, setusers] = useState([]);

  const getUsers = async () => {
    try {
      const us = await connexion.get("/users");
      setusers(us);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const updateUser = async (event) => {
    event.preventDefault();
    try {
      await connexion.put(`/users/${user.id}`, user);
      getUsers();
      toast.success("L'utilisateur a été correctement mis à jour.");
    } catch (error) {
      toast.error("Un problème est survenu, veuillez recommencer.");
      console.error(error);
    }
  };

  const deleteUser = async (e) => {
    e.preventDefault();
    try {
      await connexion.delete(`/users/${user.id}`);
      setUser(userModel);
      getUsers();
      toast.success("L'utilisateur a bien été supprimé de la base de données.");
    } catch (error) {
      toast.error("Un problème est survenu, veuillez recommencer.");
      console.error(error);
    }
  };

  const handleUser = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  const refreshUser = (id) => {
    if (id === "") {
      setUser(userModel);
    } else {
      setUser(users.find((us) => us.id === +id));
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-right pr-5 pt-5 text-2xl font-bold">Page Admin</h1>
      <h2 className="text-xl font-bold p-4 pb-10">Gestion des utilisateurs</h2>
      <form className="flex pl-10">
        <div className="w-80">
          <div>
            <label
              htmlFor="Select users"
              className="flex flex-col font-semibold w-80"
            >
              <select
                onChange={(event) => refreshUser(event.target.value)}
                value={user.id}
                className="border border-black h-7 mt-5 text-black"
              >
                <option value="">Choisir l'utilisateur</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.email}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col mt-5 font-semibold">
              Prénom
              <input
                className="border border-black h-7 placeholder:pl-2"
                type="text"
                required
                placeholder="Tapez ici le nom de l'utilisateur"
                minLength={5}
                maxLength={12}
                name="firstname"
                onChange={(event) =>
                  handleUser(event.target.name, event.target.value)
                }
                value={user.firstname === null ? "" : user.firstname}
              />
            </label>
          </div>
          <div className="pt-5">
            <label className="flex flex-col font-semibold pb-5">
              Adresse e-mail
              <input
                className="border border-black h-7 w-full"
                type="email"
                required
                placeholder="Adresse e-mail"
                minLength={5}
                name="email"
                onChange={(event) =>
                  handleUser(event.target.name, event.target.value)
                }
                value={user.email}
              />
            </label>
          </div>

          <div className="flex pt-10 pb-5 pr-10 gap-10">
            <button
              type="button"
              className="bg-black text-white py-2 px-4"
              onClick={(e) => updateUser(e)}
            >
              Modifier
            </button>
            <button
              type="button"
              className="bg-black text-white py-2 px-4"
              onClick={(e) => deleteUser(e)}
            >
              Supprimer
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UsersAdmin;
