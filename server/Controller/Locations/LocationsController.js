const Location = require("../../Models/Location/LocationModel");
const factory = require("../Handler/HandlerController");
const catchAsync = require("../../Utils/CatchAsync");
const slugify = require("slugify");

exports.getAllFolders = factory.getAll(Location);

exports.setFolderUserId = (req, res, next) => {
    // Allow nested routes
    if (!req.body.user) {
        req.body.user = req.user.id
    }

    if (!req.body.folder) {
        req.body.folder = req.params.folderId
    }

    next();
}

const createOrUpdateLocation = catchAsync(async (req, res, next) => {
    // Middleware to swap longitude and latitude in location coordinates
    if (req.body.location && req.body.location.coordinates) {
        const [longitude, latitude] = req.body.location.coordinates;
        req.body.location.coordinates = [latitude, longitude];
    }

    const { name, description, visited, tag, rating, location, folder, user } = req.body;
    const [latitude, longitude] = location.coordinates;

    try {
        const existingLocation = await Location.findOneAndUpdate(
            { "location.coordinates": [latitude, longitude] },
            { $addToSet: { user: user, folder: folder } },
            { new: true }
        );

        if (existingLocation) {
            // The location already existed and its user field has been updated
            res.status(200).json({ message: "Location updated", location: existingLocation });
        } else {
            // The location didn't exist and has been created with the given values
            const slug = slugify(name, { lower: true });
            const newLocation = await Location.create({ name, slug, description, visited, tag, rating, location, folder, user });
            res.status(201).json({ message: "Location created", location: newLocation });
        }
    } catch (err) {
        next(err);
    }
});

exports.postLocation = catchAsync(async (req, res, next) => {
    try {
        await createOrUpdateLocation(req, res, next);
    } catch (err) {
        next(err);
    }
});

exports.getLocation = factory.getOne(Location);
exports.patchLocation = factory.updateOne(Location);
exports.deleteLocation = factory.deleteOne(Location);