const express = require("express");
const multer = require("multer");

const router = express.Router();

// const itemControllers = require("./controllers/itemControllers");

// router.get("/items", itemControllers.browse);
// router.get("/items/:id", itemControllers.read);
// router.put("/items/:id", itemControllers.edit);
// router.post("/items", itemControllers.add);
// router.delete("/items/:id", itemControllers.destroy);

const authControllers = require("./controllers/authControllers");
const { checkUserData } = require("./services/auth");
const { checkUser, checkAdmin } = require("./services/jwt");

router.post("/signup", checkUserData, authControllers.signup);
router.post("/login", checkUserData, authControllers.login);
router.post("/logout", checkUser, authControllers.logout);

const workControllers = require("./controllers/workControllers");

router.get("/categories/:id/works", workControllers.browseByCategory);
router.get("/works", workControllers.browse);
router.get("/works/:id", workControllers.read);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "public/assets/images");
  },
  filename(req, file, cb) {
    const fileArray = file.originalname.split(".");
    const extension = fileArray.pop();
    const fileName = fileArray.join("-").split(" ").join("-");
    cb(null, `${fileName}_${Date.now()}.${extension}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: "2MB" },
});

router.put(
  "/works/:id",
  checkUser,
  checkAdmin,
  upload.single("image"),
  workControllers.edit
);
router.post(
  "/works",
  checkUser,
  checkAdmin,
  upload.single("image"),
  workControllers.add
);
router.delete(
  "/works/:id",
  checkUser,
  checkAdmin,
  upload.single("image"),
  workControllers.destroy
);

const biographyControllers = require("./controllers/biographyControllers");

router.get("/biographies", biographyControllers.browse);
router.get("/biographies/:id", biographyControllers.read);

router.put(
  "/biographies/:id",
  checkUser,
  checkAdmin,
  upload.single("image1"),
  upload.single("image2"),
  upload.single("image3"),
  biographyControllers.edit
);
router.post(
  "/biographies",
  checkUser,
  checkAdmin,
  upload.single("image1"),
  upload.single("image2"),
  upload.single("image3"),
  biographyControllers.add
);
router.delete(
  "/biographies/:id",
  checkUser,
  checkAdmin,
  biographyControllers.destroy
);

const categoryControllers = require("./controllers/categoryControllers");

router.get("/categories", categoryControllers.browse);
router.get("/categories/:name", categoryControllers.browseByCategoryName);
router.post("/categories", checkUser, checkAdmin, categoryControllers.add);
router.put("/categories/:id", checkUser, checkAdmin, categoryControllers.edit);
router.delete(
  "/categories/:id",
  checkUser,
  checkAdmin,
  categoryControllers.destroy
);

const techniqueControllers = require("./controllers/techniqueControllers");

router.get("/techniques", techniqueControllers.browse);
router.get("/techniques/:id", techniqueControllers.read);
router.put("/techniques/:id", checkUser, checkAdmin, techniqueControllers.edit);
router.post("/techniques", checkUser, techniqueControllers.add);
router.delete(
  "/techniques/:id",
  checkUser,
  checkAdmin,
  techniqueControllers.destroy
);

const articleControllers = require("./controllers/articleControllers");

router.get("/articles", articleControllers.browse);
router.get("/articles/:id", articleControllers.read);
router.get("/works/:id/articles", articleControllers.browseByWork);
router.put("/articles/:id", checkUser, checkAdmin, articleControllers.edit);
router.post("/articles", checkUser, checkAdmin, articleControllers.add);
router.delete(
  "/articles/:id",
  checkUser,
  checkAdmin,
  articleControllers.destroy
);

const aboutControllers = require("./controllers/aboutControllers");

router.get("/about", aboutControllers.browse);
router.get("/about/:id", aboutControllers.read);
router.put("/about/:id", checkUser, checkAdmin, aboutControllers.edit);
router.post("/about", checkUser, checkAdmin, aboutControllers.add);
router.delete("/about/:id", checkUser, checkAdmin, aboutControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:email", userControllers.find);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);
router.put("/users/:id", userControllers.edit);

const userFavouritesController = require("./controllers/userFavouriteControllers");

router.get("/favourites", checkUser, userFavouritesController.read);
router.delete(
  "/favourites/:works_id",
  checkUser,
  userFavouritesController.destroy
);
router.post("/favourites", checkUser, userFavouritesController.add);

module.exports = router;
