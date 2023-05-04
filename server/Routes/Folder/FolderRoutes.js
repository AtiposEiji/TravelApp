const express = require("express");
const { getAllFolders, getFolder, postFolder, patchFolder, deleteFolder, setUserId } = require("../../Controller/Folders/FoldersController");
const { protect, restrictTo } = require("../../Controller/Auth/AuthController");

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(restrictTo("admin"));

router.route("/").get(getAllFolders).post(setUserId, postFolder);
router.route("/:id").get(getFolder).patch(patchFolder).delete(deleteFolder);

module.exports = router;