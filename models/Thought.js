const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // using the .toISOString for the date formatting
        get: createdAtVal => createdAtVal.toISOString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction'
        }
    ]
})
//reactionCount virtual to retrieve reaction length
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;