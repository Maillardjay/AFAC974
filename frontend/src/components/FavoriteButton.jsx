import React from "react";
import { toast } from "react-toastify";
import { useCurrentUser } from "../contexts/UserContexts";
import connexion from "../services/connexion";
import "react-toastify/dist/ReactToastify.css";

function FavoriteButton({ item, refresh }) {
  const { user } = useCurrentUser();

  const notifyAddToFavorites = () =>
    toast("Vous avez ajouté l'oeuvre à vos favoris");

  const notifyRemoveFromFavorites = () =>
    toast("Vous avez retiré l'oeuvre de vos favoris");

  const notifyLoginRequired = () =>
    toast("Vous devez être connecté pour ajouter une œuvre à vos favoris");

  const toggleToFavourites = async () => {
    try {
      if (item.isFavourite) {
        await connexion.delete(`/favourites/${item.id}`);
        notifyRemoveFromFavorites();
      } else {
        await connexion.post("/favourites", { works_id: item.id });
        notifyAddToFavorites();
      }
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) {
    return (
      <button
        type="button"
        className="w-fit relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple to-pink group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
        onClick={notifyLoginRequired}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {item.isFavourite ? "Supprimer des favoris" : "Ajouter aux favoris"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      className="w-fit relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple to-pink group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
      onClick={toggleToFavourites}
    >
      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
        {item.isFavourite ? "Supprimer des favoris" : "Ajouter aux favoris"}
      </span>
    </button>
  );
}

export default FavoriteButton;
