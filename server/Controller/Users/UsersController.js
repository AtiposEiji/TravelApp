const catchAsync = require("../../Utils/CatchAsync");
const User = require("../../Models/User/UserModel");
const AppError = require("../../Utils/AppError");
const factory = require("../Handler/HandlerController");

const filterObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach(el => {
        if(allowedFields.includes(el)){
            newObj[el] = obj[el];
        }
    })
    return newObj;
}

exports.getAllUsers = factory.getAll(User);

exports.getMe = (req, res, next) => {
    req.params.id = req.user.id;
    next();
}

exports.updateMe = catchAsync(async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);

    // 1) Create error if user POSTs password data
    if(req.body.password || req.body.passwordConfirm){
        return next(new AppError("This route is not for password updates. Please use /updateMyPassword", 400))
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email");

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, { new: true, runValidators: true });


    res.status(200).json({
        status: "success",
        data: {
            user: updatedUser
        }
    })
})

exports.deleteMe = factory.deleteOne(User)
exports.getUser = factory.getOne(User);
exports.patchUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);