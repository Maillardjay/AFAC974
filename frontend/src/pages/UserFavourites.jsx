import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import connexion from "../services/connexion";
import "react-toastify/dist/ReactToastify.css";
import ImageCard from "../components/ImageCard";

function UserFavourites() {
  const [favourites, setFavourites] = useState([]);

  const getFavourites = async () => {
    try {
      const fav = await connexion.get(`/favourites`);
      if (fav) {
        setFavourites(fav);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  const deleteFavourite = async (e, worksId) => {
    e.preventDefault();
    try {
      await connexion.delete(`/favourites/${worksId}`);
      getFavourites();
      toast.success("l'oeuvre a bien été retiré de vos favoris");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-black h-full pt-32">
      <div className="relative  flex flex-col text-right mt-10">
        <h1 className="text-3xl text-white pr-[35px] z-10 pb-1">Favoris</h1>
        <div className=" h-[2px] bg-gradient-to-r from-pink to-purple z-10 ml-10 mr-10" />
        {!favourites.length && (
          <div className="text-white mt-5 text-left ml-20">
            Vous n'avez pas encore de favoris.
          </div>
        )}
        <div className="flex-col text-white ml-20 mt-16">
          <div className="flex flex-col pb-40">
            {favourites.map((fav) => (
              <div key={fav.works_id}>
                <div className="flex mb-8 mt-8">
                  <ImageCard
                    cls="max-h-[18rem] bg-gradient-to-t from-pink to-purple p-1"
                    src={fav.image_src}
                    alt={fav.image_alt}
                  />
                  <div className="flex flex-col justify-end ml-4">
                    <p className="font-bold text-xl mb-2">{fav.title}</p>
                    <div className="flex justify-between pt-4">
                      <Link to={`/gallery/${fav.works_id}`}>
                        <button
                          type="button"
                          className="relative inline-flex items-center justify-center p-0.5 mb-4 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple to-pink group-hover:from-purple group-hover:to-pink hover:text-white dark:text-white focus:ring-4"
                        >
                          <span className="relative text-white px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                            En savoir plus
                          </span>
                        </button>
                      </Link>
                    </div>
                    <button
                      type="button"
                      className="w-fit relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple to-pink group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                      onClick={(e) => deleteFavourite(e, fav.works_id)}
                      value={fav.works_id}
                    >
                      <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-black dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        Supprimer
                      </span>
                    </button>
                  </div>
                </div>
                <div className=" h-[2px] bg-gradient-to-r from-pink to-purple z-10 mr-10" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserFavourites;
