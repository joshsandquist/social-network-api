const { Schema, model } = require('mongoose');

// User schema 
const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true,
        unique: true,
        // email matching regex from previous module
        match: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/

    },
    //Refers to the 'Thought' model object IDs
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    // Refers to the 'User' model object IDs
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});
// Virtual for retrieveing the amount of user friends
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
})

const User = model('User', UserSchema);

module.exports = User;