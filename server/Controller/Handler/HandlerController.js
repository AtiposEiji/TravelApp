const catchAsync = require("../../Utils/CatchAsync");
const appError = require("../../Utils/AppError");
const APIFeatures = require("../../Utils/APIFeatures");

exports.deleteOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
        return next(new appError("No document found with that ID", 404))
    }

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
        data: {
            data: doc
        }
    })
})

exports.postOne = Model => catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: "success",
        data: {
            data: doc
        }
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
        data: {
            data: doc
        }
    });
})

exports.getAll = Model => catchAsync(async (req, res, next) => {
    // To allow for nested GET users on location
    let filter = {};
    if(req.params.userId){
        filter.user = req.params.userId
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
        data: {
            data: docList
        }
    });
})