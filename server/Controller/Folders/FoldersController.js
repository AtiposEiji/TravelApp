const Folder = require("../../Models/Folder/FolderModel");
const factory = require("../Handler/HandlerController");
const catchAsync = require("../../Utils/CatchAsync");
const slugify = require("slugify");

exports.getAllFolders = factory.getAll(Folder);

exports.setUserId = (req, res, next) => {

    // Allow nested routes
    if (!req.body.user) {
        req.body.user = req.user.id
    }

    next();
}

const createOrUpdateFolder = catchAsync(async (req, res, next) => {
    const { name, location, user } = req.body;

    try {
        const existingFolder = await Folder.findOneAndUpdate(
            { "name": name },
            { $addToSet: { user: user } },
            { new: true }
        );

        if (existingFolder) {
            // The folder already existed and its user field has been updated
            res.status(200).json({ message: "Folder updated", folder: existingFolder });
        } else {
            // The folder didn't exist and has been created with the given values
            const slug = slugify(name, { lower: true });
            const newFolder = await Folder.create({ name, location, user });
            res.status(201).json({ message: "Folder created", folder: newFolder });
        }
    } catch (err) {
        next(err);
    }
});

exports.postFolder = catchAsync(async (req, res, next) => {
    try {
        await createOrUpdateFolder(req, res, next);
    } catch (err) {
        next(err);
    }
});

exports.getFolder = factory.getOne(Folder);
exports.patchFolder = factory.updateOne(Folder);
exports.deleteFolder = factory.deleteOne(Folder);