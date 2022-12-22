const mongoose = require("mongoose");

const cardsSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true,
    },
    matched: {
        type: Boolean,
        required: true,
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model("Cards", cardsSchema);