import mongoose from 'mongoose'

const QuestionSchema = new mongoose.Schema({
    question_text: {
        type: String,
        trim: true,
        required: 'Question text is required'
    },
    question_type: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});
export default mongoose.model('Question', QuestionSchema);