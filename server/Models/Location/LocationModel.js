const mongoose = require("mongoose");
const slugify = require("slugify");

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A tour must have a name"],
        trim: true
    },
    slug: String,
    description: {
        type: String,
        trim: true
    },
    visited: {
        type: Boolean,
        default: false
    },
    tag: {
        type: String,
        required: [true, "A tour must have a tag"],
        enum: {
            values: ["Cibo", "Alloggio", "Attività"],
            message: "Tag is either 'Cibo, Alloggio, Attività'"
        }
    },
    rating: {
        type: Number,
        min: [1, "Rating must be between 1 and 5"],
        max: [5, "Rating must be between 1 and 5"]
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    location: {
        //GeoJSON
        type: {
            type: String,
            default: "Point",
            enum: ["Point"]
        },
        coordinates: [Number]
    },
    folder: [{
        type: mongoose.Schema.ObjectId,
        ref: "Folder",
        required: [true, "Location must belong to a folder"]
    }],
    user: [{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Location must belong to an user"]
    }]
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
})

locationSchema.index({ slug: 1 });
locationSchema.index({ location: "2dsphere" }, { unique: true });


const Location = mongoose.model("Location", locationSchema);

module.exports = Location;