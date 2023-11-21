import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import connexion from "../../services/connexion";
import "react-toastify/dist/ReactToastify.css";

const categoryModel = {
  id: null,
  name: "",
};

function CategoriesAdmin() {
  const [category, setCategory] = useState(categoryModel);

  const [categories, setCategories] = useState([]);

  const handleCategory = (name, value) => {
    setCategory({ ...category, [name]: value });
  };

  const getCategories = async () => {
    try {
      const cat = await connexion.get("/categories");
      setCategories(cat);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const refreshCategory = (id) => {
    if (id === "") {
      setCategory(categoryModel);
    } else {
      setCategory(categories.find((cat) => cat.id === +id));
    }
  };

  const postCategory = async (e) => {
    e.preventDefault();
    try {
      await connexion.post("/categories", category);
      setCategory(categoryModel);
      getCategories();
      toast.success("La catégorie a été correctement ajoutée.");
    } catch (err) {
      toast.error("Un problème est survenu, veuillez recommencer.");
      console.error(err);
    }
  };

  const deleteCategory = async (e) => {
    e.preventDefault();
    try {
      await connexion.delete(`/categories/${category.id}`);
      setCategory(categoryModel);
      getCategories();
      toast.success("La catégorie a été supprimée de la base de données.");
    } catch (error) {
      toast.error("Un problème est survenu, veuillez recommencer.");
      console.error(error);
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    try {
      await connexion.put(`/categories/${category.id}`, category);
      getCategories();
      toast.success("La catégorie a été correctement mise à jour.");
    } catch (error) {
      toast.error("Un problème est survenu, veuillez recommencer.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-right pr-5 pt-5 text-2xl font-bold">Page Admin</h1>
      <h2 className="text-xl font-bold p-4 mb-5">Gestion des catégories</h2>

      <form className="ml-10" onSubmit={(event) => postCategory(event)}>
        <label className="flex flex-col font-semibold w-80">
          Selection d'une categorie
          <select
            onChange={(event) => refreshCategory(event.target.value)}
            value={category.id}
            className="border border-black h-7 mt-5 text-black"
          >
            <option value="">Choisir la catégorie</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col font-semibold w-80">
          {" "}
          <input
            className="border border-black h-7 mt-10 placeholder:pl-2"
            type="text"
            minLength={4}
            placeholder="Tapez ici le nom de la catégorie"
            name="name"
            onChange={(event) =>
              handleCategory(event.target.name, event.target.value)
            }
            value={category.name}
          />
        </label>

        <div className="flex pt-10 pb-5 pr-10 gap-10">
          {!category.id && (
            <button className="bg-black text-white py-2 px-4" type="submit">
              Ajouter
            </button>
          )}
        </div>
      </form>
      <div className="flex pl-10 pb-5 pr-10 gap-10">
        {category.id && (
          <button
            className="bg-black text-white py-2 px-4"
            type="button"
            onClick={(e) => updateCategory(e)}
          >
            Modifier
          </button>
        )}
        {category.id && (
          <button
            className="bg-black text-white py-2 px-4"
            type="button"
            onClick={(e) => deleteCategory(e)}
          >
            Supprimer
          </button>
        )}
      </div>
    </div>
  );
}

export default CategoriesAdmin;
