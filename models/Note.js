const mongoose = require("mongoose");



const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        maxlength: 300,
        requied: [true, "Please provide title"],
    },
    description: {
        type: String,
        maxlength: 1000,
        requied: [true, "Please provide description"],
    },
    writtenBy: {
        type: String,
        maxlength: 100,
        requied: [true, "Please provide written by"],
    },
    Date: {
        type: Date,
        default: Date.now
    },

}, {
    timestamps: true,
});


NoteSchema.methods.getTitle = function() {
    return this.title;
}

module.exports = mongoose.model('Note', NoteSchema)