const mongoose = require('mongoose');


const QuestionSchema = new mongoose.Schema({
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

    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);


// Reverse populate with virtuals
QuestionSchema.virtual('answers', {
    ref: 'Answer',
    localField: '_id',
    foreignField: 'question',
    justOne: false
})

// Add votes
QuestionSchema.methods.getVotes = function(newVotes) {
    this.votes += newVotes;
    return this.votes;
}

// Add views
QuestionSchema.methods.getViews = function(newViews) {
    this.views = newViews;
    return this.views;
}


module.exports = mongoose.model('Question', QuestionSchema);