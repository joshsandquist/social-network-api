const { Schema, model } = require('mongoose');

//Schema for reactions - will be usede in thought model
const ReactionSchema = new Schema({
    reactitonId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // using the .toISOString for the date formatting
        get: createdAtVal => createdAtVal.toISOString()
      }
})

const Reaction = model('Reaction', ReactionSchema)

module.exports = Reaction;