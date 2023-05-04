const express = require("express");
const { getAllFolders: getAllLocations, getLocation, postLocation, patchLocation, deleteLocation, setFolderUserId } = require("../../Controller/Locations/LocationsController");
const { protect, restrictTo } = require("../../Controller/Auth/AuthController");

const router = express.Router({ mergeParams: true });

router.use(protect);
router.use(restrictTo("admin"));

router.route("/").get(getAllLocations).post(setFolderUserId, postLocation);
router.route("/:id").get(getLocation).patch(patchLocation).delete(deleteLocation);

module.exports = router;