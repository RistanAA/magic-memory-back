const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Scores", scoreSchema);