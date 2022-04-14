
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    user_id: {
        type: String
    }
    ,
    post: {
        type: Array,
        default: []
    },
    created_date: {
        type: Date,
        required: false,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);
