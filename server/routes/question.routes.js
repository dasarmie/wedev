import express from 'express'
import questionCtrl from '../controllers/question.controller.js' 
import authCtrl from '../controllers/auth.controller.js'
  const router = express.Router()
  router.route('/surveyapi/question') 
  .get(questionCtrl.list)
  .post(questionCtrl.create)
router.param('questionId', questionCtrl.questionByID)
router.route('/surveyapi/question').post(questionCtrl.create) 
router.route('/surveyapi/question').get(questionCtrl.list)
router.route('/surveyapi/question/:questionId').put(questionCtrl.update)
router.route('/surveyapi/questions/:questionId').delete(questionCtrl.remove)
  
  export default router