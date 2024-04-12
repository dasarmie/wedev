import mongoose from 'mongoose'

const surveySchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    timestamp: {
        type: Date,
        default: Date.now
        },
    recommendation: {
        type: Number,
        required: true
        },
    satisfaction: {
        type: String,
        required: true
        },
    describe: [{
        type: String,
        required: true
        }],
    functionality: {
        type: String,
        required: true
        },
    likelihood: {
        type: String,
        required: true
        },
    comments: {
        type: String,
        required: true
        }
    });

export default mongoose.model('Survey', surveySchema);