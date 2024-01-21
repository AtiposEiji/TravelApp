const catchAsync = require("../../Utils/CatchAsync");
const appError = require("../../Utils/AppError");
const APIFeatures = require("../../Utils/APIFeatures");
const User = require("../../Models/User/UserModel")
const Location = require("../../Models/Location/LocationModel")

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new appError("No document found with that ID", 404))
    }

    // Remove the folder from the folder array of the associated Location object
    await Location.updateMany({ folder: req.params.id }, { $pull: { folder: req.params.id } });

    return res.status(204).json({
        status: 'success',
        data: null
    })
})

exports.updateOne = Model => catchAsync(async (req, res, next) => {

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        returnValidators: true
    })

    if (!doc) {
        return next(new appError("No document found with that ID", 404))
    }

    res.status(200).json({
        status: 'success',
        data: doc
    })
})

exports.postOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: "success",
        data: doc
    });
})

exports.getOne = (Model, popOptions) => catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (popOptions) {
        query = query.populate(popOptions)
    }
    const doc = await query

    if (!doc) {
        return next(new appError("No document found with that ID", 404))
    }

    res.status(200).json({
        status: "success",
        data: doc
    });
})

exports.getAll = Model => catchAsync(async (req, res, next) => {
    // To allow for nested GET users on location
    let filter = {};
    // Find user from email end return id.
    if(req.params.userEmail){
        console.log(req.params.userEmail)
        const user = await User.findOne({ email: req.params.userEmail });
        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'Utente non trovato',
            });
        }
        filter.user = user._id;
    }
    if(req.params.folderId){
        filter.folder = req.params.folderId
    }

    // EXECUTE QUERY
    const features = new APIFeatures(Model.find(filter), req.query).filter().sort().limitFileds().pagination();
    const docList = await features.query;

    res.status(200).json({
        status: "Success",
        results: docList.length,
        data: docList
    });
})