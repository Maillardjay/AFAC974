import React from "react";
import { Link } from "react-router-dom";

function AcceptRGPD({ toggleDisableButton }) {
  return (
    <div className="text-xs flex flex-col items-center pl-5">
      <label>
        <input
          type="checkbox"
          value="accept"
          onChange={toggleDisableButton}
          className="mx-auto"
        />{" "}
        J'ai lu et j'accepte les conditions générales d'utilisation du site AFAC
        974
      </label>
      <Link
        to="/rgpd"
        target="_blank"
        className="underline text-blue pr-6"
        rel="noreferrer"
      >
        (en savoir plus)
      </Link>
    </div>
  );
}

export default AcceptRGPD;
