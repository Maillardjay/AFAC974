const Joi = require("joi");
const argon2 = require("argon2");

const options = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  time: 5,
  parallelism: 1,
};

const hashPassword = (password) => {
  return argon2.hash(password, options);
};

const checkPassword = (hash, pwd) => {
  return argon2.verify(hash, pwd);
};

const authSchema = () => {
  return Joi.object({
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "fr"] },
    }),
    password: Joi.string().min(5).required(),
    firstname: Joi.string().optional().allow(""),
  });
};

const checkUserData = (req, res, next) => {
  const { error } = authSchema("required").validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    res.status(400).json({ msg: "Invalid user" });
  } else {
    next();
  }
};

module.exports = { checkUserData, hashPassword, checkPassword };
