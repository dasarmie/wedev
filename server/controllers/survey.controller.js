import Survey from '../models/survey.model.js';

// Create and Save a new Survey
export const createSurvey = async (req, res) => {
    try {
        const survey = new Survey(req.body);
        await survey.save();
        res.status(200).send({ message: 'Survey created successfully!' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Update a Survey by user ID
export const updateSurvey = async (req, res) => {
    try {
        const { user_id } = req.params;
        const survey = await Survey.findOneAndUpdate({ user_id }, req.body, { new: true });
        if (!survey) {
            return res.status(404).send({ message: 'Survey not found!' });
        }
        res.status(200).send({ message: 'Survey updated successfully!' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Get all Surveys
export const getAllSurveys = async (req, res) => {
    try {
        const survey = await Survey.find();
        res.status(200).json(survey);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Get a single Survey by user ID
export const getSurvey = async (req, res) => {
    try {
        const { user_id } = req.params;
        const survey = await Survey.findOne({ user_id });
        if (!survey) {
            return res.status(404).send({ message: 'Survey not found!' });
        }
        res.status(200).json(survey);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};

// Delete a Survey by user ID
export const deleteSurvey = async (req, res) => {
    try {
        const { user_id } = req.params;
        const survey = await Survey.findOneAndDelete({ user_id });
        if (!survey) {
            return res.status(404).send({ message: 'Survey not found!' });
        }
        res.status(200).send({ message: 'Survey deleted successfully!' });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
};