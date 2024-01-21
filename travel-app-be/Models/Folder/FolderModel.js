const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A folder must have a name"],
        trim: true,
        unique: true
    },
    location: [{
        type: mongoose.Schema.ObjectId,
        ref: "Location",
        required: [true, "Location must belong to a folder"]
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "User must belong to a folder"]
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

folderSchema.methods.toJSON = function () {
    const obj = this.toObject();
    return { id: obj._id, name: obj.name };
};

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;