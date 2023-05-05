const express = require("express");
const { getAllUsers, getUser, patchUser, deleteUser, updateMe, deleteMe, getMe } = require("../../Controller/Users/UsersController");
const { signup, login, protect, forgotPassword, resetPassword, updatePassword, restrictTo } = require("../../Controller/Auth/AuthController");
const folderRoutes = require("../Folder/FolderRoutes");
const locationRoutes = require("../Location/LocationRoutes");

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

// Protect all routes after this middleware 
router.use(protect);

router.use("/:userEmail/folders", folderRoutes);
router.use("/:userEmail/folders/:folderId/locations", locationRoutes);

router.patch("/updateMyPassword", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/updateMe", updateMe);
router.delete("/deleteMe", deleteMe);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).patch(patchUser).delete(deleteUser);

module.exports = router;