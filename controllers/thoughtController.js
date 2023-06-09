const Thought = require('../models/Thought.js');
const User = require('../models/User.js');

//controller to get all thoughts
const getAllThoughts = async (req,res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } 
    catch (error) {
        console.error(eroor);
        res.status(500).json({error: 'Server Error'})
    }
};

//controller to get single thought by id
const getThoughtById = async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId)
        //conditional if no thought id match
        if (!thought) {
            return res.status(400).json({ message: 'No thought found!'})
        }
        res.json(thought);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error'})
    }
}

// controller for creating a thought
// finding user and validating before creating thought
const createThought = async (req,res) => {
    try {
        const {thoughtText, username, userId} = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({message: 'No user found with this Id!'})
        }
        const thought = await Thought.create({ thoughtText, username, userId})
        // adding the created thought _id property to user thoughts array
        user.thoughts.push(thought._id);
        await user.save();
        res.json(thought);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server Error'})
    }
}

//controller to update a thought by id
//taking thought id as paramater and replacing it with provided body

const updateThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, {
        new: true,
        runValidators: true
      });
      if (!thought) {
        return res.status(400).json({ message: 'No thought found with this Id!' });
      }
      res.json(thought);
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({error: 'Server Error' });
    }
  };

  //controller to delete thought by id
  //same error handling as before 
  const deleteThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(400).json({ message: 'No thought found with this Id!' });
      }
      // using findOne to match the username property of the thought to delete from
      const user = await User.findOne({ username: thought.username });
      user.thoughts.pull(thought._id);
      await user.save();
      res.json({ message: 'Thought deleted successfully!' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  };

  //controller to add a reaction to a thought

  const addReaction = async (req, res) => {
    try {
      const { reactionBody, username } = req.body;
  
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(400).json({ message: 'No thought found with this Id!' });
      }
      //adding reactionBody and username to reactions array of a thought
      thought.reactions.push({ reactionBody, username });
      await thought.save();
      res.json(thought);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };

  //contoller to remove reaction from a thought


  module.exports = {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
  };