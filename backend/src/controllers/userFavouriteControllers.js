const models = require("../models");

const browse = (req, res) => {
  models.userFavourites
    .findFavouritesUser()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.userFavourites
    .findFavouritesByEmailUser(req.token.email)
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.userFavourites
    .deleteFavouritesByEmailUser(req.token.email, req.params.works_id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  models.userFavourites
    .insert(req.token.email, req.body.works_id)
    .then(([result]) => {
      res.location(`/favourites/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  destroy,
  add,
};
