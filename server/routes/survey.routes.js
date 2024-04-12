import express from 'express';
import { createSurvey, updateSurvey, getAllSurveys, getSurvey, deleteSurvey } from '../controllers/survey.controller.js'

const router = express.Router();

router.get('/', getAllSurveys);
router.post('/', createSurvey);
router.get('/:user_id', getSurvey);
router.put('/:user_id', updateSurvey);
router.delete('/:user_id', deleteSurvey);
  
export default router;