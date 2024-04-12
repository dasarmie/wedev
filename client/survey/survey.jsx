import React from "react";
import { Survey } from "survey-react";
import "survey-react/survey.css";
import "./surveyStyle.css";
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import auth from '../lib/auth-helper';

const SurveyWeDev = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!auth.isAuthenticated()) {
          navigate('/signin', { replace: true });
        }
      }, [navigate]);
    
      if (!auth.isAuthenticated()) {
        return null; // or you can render a loading spinner or message
      }
    const surveyJSON = {
        title: "WeDev website Feedback Survey",
        elements: [ 
            { 
                type: "rating",
                name: "recommendation",
                title: "How likely is it that you recommend this website to a friend or colleague?",
                rateMin: 1,
                rateMax: 10,
                minRateDescription: "Not at all likely",
                maxRateDescription: "Extremely likely"
                },
                {
                    type: "radiogroup",
                    name: "satisfaction",
                    title: "Overall, how satisfied or dissatisfied are you with our website?",
                    choices: ["Very satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very dissatisfied"]
                },
                {   
                    type: "checkbox",
                    name: "describe",
                    title: "Which of the following words would you use to describe our website? (Select all that apply)",
                    choices: ["Amazing", "Reliable", "Useful", "Fast", "Confusing", "Poor quality", "Unreliable", "Ineffective", "Boring"]
                },
                {
                    type: "radiogroup",
                    name: "functionality",
                    title: "How would you rate the design and functionality of our website?",
                    choices: ["Excellent", "Good", "Average", "Fair", "Poor"]
                },
                {
                    type: "radiogroup",
                    name: "likelihood",
                    title: "How likely are you to use our website?",
                    choices: ["Very likely", "Likely", "Neutral", "Unlikely", "Very unlikely"]
                },
                {
                    type: "comment",
                    name: "comments",
                    title: "What improvements would you suggest for the WeDev website?"
                }
        ],
        showPrevButton: false,
        completeText: "Submit",
        questionsOnPageMode: "singlePage",
        showQuestionNumbers: "false",
        width: "100px",
        completedHtml: "<h2>Thank you for sharing your feedback!</h2>"
    };

    const surveySubmit = async (survey) => {
        try {
            const response = await axios.post("http://localhost:3000/api/survey", survey.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Survey json={surveyJSON} cssClass="survey-container" onComplete={surveySubmit} />
        </div>
    );
};

export default SurveyWeDev;