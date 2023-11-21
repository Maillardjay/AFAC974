import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import connexion from "../../services/connexion";
import ImageCard from "../../components/ImageCard";

function WorksAdmin() {
  const workModel = {
    id: null,
    reference: "",
    title: "",
    summary_title: "",
    date: "",
    summary1: "",
    summary2: "",
    summary3: "",
    summary4: "",
    techniques_id: "",
    format: "",
    categories_id: "",
    image_alt: "",
  };
  const [work, setWork] = useState(workModel);
  const [techniques, setTechniques] = useState([]);
  const [categories, setCategories] = useState([]);
  const [works, setWorks] = useState([]);
  const image = useRef();

  const refreshWork = (id) => {
    if (id === "") {
      setWork(workModel);
    } else {
      const find = works.find((w) => w.id === +id);
      setWork(find);
    }
  };

  const getWorks = async () => {
    const w = await connexion.get("/works");
    try {
      if (w) {
        setWorks(w);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleWork = (name, value) => {
    setWork({ ...work, [name]: value });
  };

  const postWork = async (form) => {
    try {
      const w = await connexion.postFile("/works", form);
      setWork(w);
      setWork(workModel);
      toast.success(
        "L'oeuvre a été correctement ajoutée à la base de données."
      );
      getWorks();
    } catch (error) {
      toast.error("Un problème est survenu, veuillez recommencer.");
      console.error(error);
    }
  };

  const updateWork = async (form) => {
    try {
      await connexion.putFile(`/works/${work.id}`, form);
      getWorks();
      toast.success("L'oeuvre a été correctement mise à jour.");
    } catch (error) {
      toast.error("Un problème est survenu, veuillez recommencer.");
      console.error(error);
    }
  };

  const manageWork = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.current.files[0]);
    formData.append("json", JSON.stringify(work));
    if (work.id) {
      updateWork(formData);
    } else {
      postWork(formData);
    }
  };

  const deleteWork = async (e) => {
    e.preventDefault();
    try {
      await connexion.delete(`/works/${work.id}`);
      setWork(workModel);
      getWorks();
      toast.success("L'oeuvre a bien été supprimée de la base de données.");
    } catch (error) {
      toast.error("Un problème est survenu, veuillez recommencer.");
      console.error(error);
    }
  };

  const getTechniques = async () => {
    try {
      const tech = await connexion.get("/techniques");
      setTechniques(tech);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    try {
      const tech = await connexion.get("/categories");
      setCategories(tech);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
    getTechniques();
    getWorks();
  }, []);

  return (
    <div className="flex flex-col w-full">
      <h1 className="text-right pr-5 pt-5 mr-64 text-2xl font-bold">
        Page Admin
      </h1>
      <h2 className="text-xl font-bold p-4 pb-10">Gestion des oeuvres</h2>
      <div className="flex pl-6">
        <form className="flex gap-20" onSubmit={(event) => postWork(event)}>
          <div className="w-5/12">
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Oeuvre à modifier ou supprimer :
                <select
                  onChange={(e) => refreshWork(e.target.value)}
                  value={work.id}
                  className="border border-black h-7"
                >
                  <option value="">
                    Sélectionnez le nom de l'oeuvre à modifier ou supprimer
                  </option>
                  {works.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.title}
                    </option>
                  ))}
                </select>
              </label>
              <h1>Enregistrement d'une nouvelle oeuvre</h1>
              <label className="flex flex-col font-semibold">
                Référence
                <input
                  className="border border-black h-7 placeholder:pl-2"
                  type="text"
                  required
                  placeholder="Tapez ici la référence de l'oeuvre"
                  minLength={5}
                  maxLength={12}
                  name="reference"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.reference}
                />
              </label>
            </div>
            <div className="pt-5">
              <label className="flex flex-col font-semibold pb-5">
                Titre de l'oeuvre
                <input
                  className="border border-black h-7 placeholder:pl-2"
                  type="text"
                  required
                  placeholder="Titre de l'oeuvre"
                  minLength={5}
                  maxLength={255}
                  name="title"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.title}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Titre Résumé
                <input
                  className="border border-black h-7 placeholder:pl-2"
                  type="text"
                  required
                  placeholder="Titre Résumé"
                  minLength={10}
                  maxLength={255}
                  name="summary_title"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.summary_title}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold  pb-5 ">
                Année de réalisation
                <input
                  className="border border-black h-7 placeholder:pl-2"
                  type="text"
                  required
                  placeholder="Année de réalisation"
                  minLength={4}
                  maxLength={50}
                  name="date"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.date}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Commentaire 1
                <textarea
                  className="border border-black placeholder:pl-2"
                  required
                  placeholder="Description"
                  minLength={50}
                  name="summary1"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.summary1}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Commentaire 2
                <textarea
                  className="border border-black placeholder:pl-2"
                  placeholder="Description"
                  minLength={50}
                  name="summary2"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.summary2}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Commentaire 3
                <textarea
                  className="border border-black placeholder:pl-2"
                  placeholder="Description"
                  minLength={50}
                  name="summary3"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.summary3}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Commentaire 4
                <textarea
                  className="border border-black placeholder:pl-2"
                  placeholder="Description"
                  minLength={50}
                  name="summary4"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.summary4}
                />
              </label>
            </div>
          </div>

          <div className="w-5/10">
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Technique
                <select
                  className="border border-black h-7 placeholder:pl-2"
                  name="techniques_id"
                  type="text"
                  onChange={(event) =>
                    handleWork(event.target.name, +event.target.value)
                  }
                  value={work.techniques_id}
                >
                  <option value="">
                    Choisissez la technique à associer avec l'oeuvre
                  </option>
                  {techniques.map((tech) => (
                    <option key={tech.id} value={tech.id}>
                      {tech.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Dimensions
                <input
                  className="border border-black h-7 placeholder:pl-2"
                  type="text"
                  required
                  placeholder="Notez ici les dimensions de l'oeuvre, en cm"
                  minLength={6}
                  maxLength={50}
                  name="format"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.format}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Catégorie
                <select
                  className="border border-black h-7 placeholder:pl-2"
                  name="categories_id"
                  type="text"
                  onChange={(event) =>
                    handleWork(event.target.name, +event.target.value)
                  }
                  value={work.categories_id}
                >
                  <option value="">
                    Choisissez la catégorie à associer avec l'oeuvre
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Texte alternatif de l'image
                <input
                  className="border border-black h-7 placeholder:pl-2"
                  type="text"
                  required
                  placeholder="Décrivez l'oeuvre en quelques mots"
                  name="image_alt"
                  onChange={(event) =>
                    handleWork(event.target.name, event.target.value)
                  }
                  value={work.image_alt}
                />
              </label>
            </div>
            <div>
              <label className="flex flex-col font-semibold pb-5">
                Image
                <input
                  type="file"
                  className="border border-black h-7 placeholder:pl-2"
                  required
                  accept="jpg, png, jpeg"
                  name="image_src"
                  ref={image}
                />
              </label>
              {work.image_src && (
                <ImageCard
                  cls="w-100 h-80"
                  src={work.image_src}
                  alt={work.summary_title}
                />
              )}

              <div className="flex justify-end pt-24 pb-5 pr-10 gap-10">
                {!work.id && (
                  <button
                    type="submit"
                    className="bg-black text-white py-2 px-4"
                    onClick={(e) => manageWork(e)}
                  >
                    Ajouter
                  </button>
                )}
                {work.id && (
                  <button
                    type="button"
                    className="bg-black text-white py-2 px-4"
                    onClick={(e) => manageWork(e)}
                  >
                    Mettre à jour
                  </button>
                )}
                {work.id && (
                  <button
                    type="button"
                    className="bg-black text-white py-2 px-4"
                    onClick={(e) => deleteWork(e)}
                  >
                    Supprimer
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default WorksAdmin;
