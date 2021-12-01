const mongoose = require('mongoose');


const AnswerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please ask a question'],
        trim: true
    },

    votes: Number,
    views: Number,
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },

    question: {
        type: mongoose.Schema.ObjectId,
        ref: 'Question',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

// Add votes
AnswerSchema.methods.getVotes = function(newVotes) {
    this.votes += newVotes;
    return this.votes;
}

// Add views
AnswerSchema.methods.getViews = function(newViews) {
    this.views = newViews;
    return this.views; 
}

module.exports = mongoose.model('Answer', AnswerSchema)