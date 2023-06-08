const express = require('express');
const router = express.Router();
// importing functions for thought routes
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
} = require('../../controllers/thoughtController')

//Thought Routes using api/thoughts endpoint

router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);
router.post('/:thoughtId/reactions', addReaction);

module.exports = router;
