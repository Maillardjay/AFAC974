import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import connexion from "../services/connexion";
import UserIcon from "../assets/user.svg";
import logo from "../assets/logo.png";
import { useCurrentUser } from "../contexts/UserContexts";

function NavBarUser() {
  const { user, setUser } = useCurrentUser();
  const navigate = useNavigate();

  const logout = async (event) => {
    event.preventDefault();
    try {
      await connexion.post("/logout");
      setUser();
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mb-[-8rem] pl-5 text-white z-20 relative pt-3">
      <ul className="flex justify-between items-center">
        <NavLink to="/">
          <img className="h-16" src={logo} alt="logo" />
        </NavLink>

        <div className="flex gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text underline underline-offset-8 decoration-2 decoration-white"
                : ""
            }
          >
            Accueil
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              isActive
                ? "text underline underline-offset-8 decoration-2 decoration-white"
                : ""
            }
          >
            Galerie
          </NavLink>
          <NavLink
            to="/author"
            className={({ isActive }) =>
              isActive
                ? "text underline underline-offset-8 decoration-2 decoration-white"
                : ""
            }
          >
            Biographie
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? "text underline underline-offset-8 decoration-2 decoration-white"
                : ""
            }
          >
            A propos
          </NavLink>
        </div>
        <div className="flex items-center pr-10 text-xs">
          {user ? (
            <>
              <Link className="pt-1" to="/favourites/">
                <img className="h-6 pr-4" src={UserIcon} alt="user" />
              </Link>
              <button type="button" className="pt-1" onClick={logout}>
                Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link className="pt-1 text-[15px] mr-5" to="/auth/connexion">
                Connexion
              </Link>
              <div className="flex items-center pr-10" />
              <Link className="pt-1 text-[15px]" to="/subscription">
                Inscription
              </Link>
            </>
          )}
        </div>
      </ul>
    </div>
  );
}

export default NavBarUser;
