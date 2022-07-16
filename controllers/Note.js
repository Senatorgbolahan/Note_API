const Note = require('../models/Note')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const getAllNotes = async(req, res) => {
    const note = await Note.find({})
    res.status(StatusCodes.OK).json({ noteCount: note.length, message: note })
}
const getNote = async(req, res) => {
    try {
        // Accept _id params from the user
        const { id: noteID } = req.params;

        const note = await Note.findOne({ _id: noteID })
        if (!note) {
            throw new UnauthenticatedError("Note not Found! Fill in the required details")
        }

        return res.status(StatusCodes.OK).json({ message: "Note view successfully", note })
    } catch (error) {
        return res.status(500).json({ message: error });
    }

}
const createNote = async(req, res) => {

    // Accept input 
    const { title, description, writtenBy } = req.body;
    // Validate users input
    if (!title || !description || !writtenBy) {
        throw new UnauthenticatedError("Please check the title, description or writtenby cannot be empty")
    }

    const note = await Note.create({...req.body })
    res.status(StatusCodes.CREATED).json({ message: note })
}
const updateNote = async(req, res) => {
    try {
        // Accept _id params from the user
        const { id: noteID } = req.params;

        const note = await Note.findByIdAndUpdate({ _id: noteID }, req.body, { new: true, runValidators: true })

        if (!note) {
            throw new UnauthenticatedError("Note not Found! Fill in the required details")
        }

        return res.status(StatusCodes.OK).json({ message: "Note updated successfully", note });

    } catch (error) {
        return res.status(500).json({ message: error });
    }
}
const deleteNote = async(req, res) => {

    try {
        const { id } = req.params;
        const note = await Note.findOneAndDelete({ _id: id })

        if (!note) {
            throw new UnauthenticatedError("Note not Found! Fill in the required details")
        }
        return res.status(StatusCodes.OK).json({ message: "Note deleted successfully", note });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}


module.exports = {
    getAllNotes,
    getNote,
    createNote,
    updateNote,
    deleteNote,
}