const { verifyToken } = require("../services/jwt");
const models = require("../models");

const browse = (req, res) => {
  models.work
    .findAll()
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.work
    .find(req.params.id)
    .then(async ([[work]]) => {
      const token = verifyToken(req.cookies.afac_token);
      res.status(200).json({
        ...work,
        isFavourite: token
          ? await models.userFavourites.isFavourite(token.email, req.params.id)
          : false,
      });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByCategory = (req, res) => {
  models.work
    .findAllByCategory(req.params.id)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const work = JSON.parse(req.body.json);
  work.image_src = req.file.filename;
  work.id = parseInt(req.params.id, 10);
  models.work
    .update(work)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).json();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const add = (req, res) => {
  const work = JSON.parse(req.body.json);
  work.image_src = req.file.filename;

  models.work
    .insert(work)
    .then(([result]) => {
      res
        .location(`/works/${result.insertId}`)
        .status(201)
        .json({ ...req.body, id: result.insertID });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.work
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).json();
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  browseByCategory,
  edit,
  add,
  destroy,
};
