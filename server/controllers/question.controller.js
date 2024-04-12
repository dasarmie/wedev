import Question from '../models/question.model.js'
import extend from 'lodash/extend.js'
import errorHandler from './error.controller.js'

const create = async (req, res) => { 
    const question = new Question(req.body) 
    try {
        await question.save()
        return res.status(200).json({ 
        message: "Question has been added succesfully!!!"
        })
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}
const list = async (req, res) => { 
    try {
        let question = await Question.find().select('question_text question_type updated created') 
        res.json(question)
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}
const questionByID = async (req, res, next, id) => { 
    try {
        let question = await Question.findById(id) 
        if (!question)
            return res.status('400').json({ 
            error: "Question not found"
        })
        req.profile = question 
        next()
    } catch (err) {
        return res.status('400').json({ 
        error: "Could not retrieve question"
        }) 
    }
}

const update = async (req, res) => { 
    try {
        let question = req.profile
        question = extend(question, req.body) 
        question.updated = Date.now() 
        await question.save()
        res.json(question) 
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}
const remove = async (req, res) => { 
    try {
        let question = req.profile
        let deletedQuestion = await question.deleteOne() 
        deletedeletedQuestiondquestion.hashed_password = undefined 
        deletedQuestion.salt = undefined
        res.json(deletedQuestion) 
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err) 
        })
    } 
}


export default { create, questionByID, list, remove, update}
