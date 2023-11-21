const { hashPassword, checkPassword } = require("../services/auth");
const models = require("../models");
const { createJwt } = require("../services/jwt");

const signup = async (req, res) => {
  const hash = await hashPassword(req.body.password);
  models.user
    .insert(req.body, hash)
    .then(() => res.status(200).json({ msg: "User created" }))
    .catch((err) => {
      console.error(err);
      res.status(404).json({ msg: "Invalid user" });
    });
};

const login = async (req, res) => {
  const [user] = await models.user.findByMail(req.body.email);

  if (
    user[0] &&
    (await checkPassword(user[0].hashed_password, req.body.password))
  ) {
    const token = createJwt({ email: req.body.email, role: user[0].is_admin });

    res
      .status(200)
      .cookie("afac_token", token, {
        httpOnly: true,
      })
      .json({ msg: "Connected", admin: user[0].is_admin });
  } else {
    res.status(401).json({ msg: "Wrong credentials" });
  }
};

const logout = async (req, res) => {
  res.status(200).clearCookie("afac_token").json({ msg: "Disconnected" });
};

module.exports = {
  login,
  signup,
  logout,
};
