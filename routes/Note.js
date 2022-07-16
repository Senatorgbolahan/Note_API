const express = require('express')
const router = express.Router()


const { getAllNotes, getNote, createNote, updateNote, deleteNote } = require('../controllers/Note')


router.route('/').post(createNote).get(getAllNotes)
router.route('/:id').get(getNote).delete(deleteNote).patch(updateNote)

module.exports = router;