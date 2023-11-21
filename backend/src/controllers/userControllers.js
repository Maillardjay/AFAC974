const { hashPassword } = require("../services/auth");
const models = require("../models");

const browse = (req, res) => {
  models.user
    .findAll()
    .then(([users]) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const find = (req, res) => {
  models.user
    .findByMail(req.params.email)
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

const add = async (req, res) => {
  const hash = await hashPassword(req.body.password);

  models.user
    .insert(req.body.email, hash)
    .then(() => res.status(200).json({ msg: "User created" }))
    .catch((err) => {
      console.error(err);
      res.status(404).json({ msg: "Invalid user" });
    });
};

const destroy = (req, res) => {
  models.user
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

const edit = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
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
  find,
  add,
  destroy,
  edit,
};
