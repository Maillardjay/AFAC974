const models = require("../models");

const browse = (req, res) => {
  models.biography
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.biography
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.status(200).json(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const biography = JSON.parse(req.body.json);

  // TODO validations (length, format...)

  biography.id = parseInt(req.params.id, 10);

  models.biography
    .update(biography)
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
  const biographies = JSON.parse(req.body.json);
  biographies.image_src = req.file.filename;

  // TODO validations (length, format...)

  models.biography
    .insert(biographies)
    .then(([result]) => {
      res
        .location(`/biographies/${result.insertId}`)
        .status(201)
        .json({ id: result.insertId, biography: biographies.biography });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.biography
    .delete(req.params.id)
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

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
