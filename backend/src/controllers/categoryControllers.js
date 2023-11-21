const models = require("../models");

const browse = (req, res) => {
  models.category
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const browseByCategoryName = (req, res) => {
  models.work
    .findAllByCategoryName(req.params.name)
    .then(([rows]) => {
      res.status(200).json(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.category
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = (req, res) => {
  const categories = req.body;

  // TODO validations (length, format...)

  categories.id = parseInt(req.params.id, 10);

  models.category
    .update(categories)
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
  const categories = req.body;
  // TODO validations (length, format...)

  models.category
    .insert(categories)
    .then(([result]) => {
      res
        .location(`/categories/${result.insertId}`)
        .status(201)
        .json({ id: result.insertId, category: categories.category });
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const destroy = (req, res) => {
  models.category
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
  browseByCategoryName,
  read,
  edit,
  add,
  destroy,
};
