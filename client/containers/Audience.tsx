import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Question, Response } from '../../types/types';

function Audience() {
  const navigate = useNavigate();

  const { pollId } = useParams();
  const [questionObj, setQuestionObj] = useState<Question>()
  const [question, setQuestion] = useState(pollId);
  const [answers, setAnswers] = useState<Response[]>([
    { questionId: 0, text: 'question', count: 1 },
  ]);

  useEffect(() => {
    async function getQuestion() {
      try {
        // Fetch the questions and answers
        const response = await fetch(`/api/poll/questionsInPoll/${pollId}`);
        const data = (await response.json()).questions[0] as Question;
        setQuestionObj(data);
        setQuestion(data.text);
        setAnswers(data.responseOptions as Response[]);
      } catch (error) {
        console.log(`Error occured when fetching question data: ${error}`);
      }
    }
    getQuestion().catch(error => console.log(error));
  }, []);

  const postAnswers = async (checkedAnswer: number) => {
    const chosenResponse = answers.filter(el => el.responseId == checkedAnswer)[0]
    chosenResponse.questionId = questionObj.id;
    
    try {
      const response = await fetch(`/api/poll/newAnswers/${pollId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ response: chosenResponse }),
      });

      if (response.status === 200) {
        // navigate to the results
        navigate(`/audience-results/${pollId}`);
      } else {
        // figure out what do
        console.log(`did not receive a OK status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error when submitting answers: ${error}`);
    }
    
  };

  const handleSubmitData = (e: React.FormEvent) => {
    e.preventDefault();
    let checkedAnswer: number = 0;
    const givenAnswers: HTMLInputElement[] = // @ts-ignore
    e.target.elements as HTMLInputElement[];

    for (let i = 0; i < givenAnswers.length; i += 1) {
      if (givenAnswers[i].checked) {
        checkedAnswer = givenAnswers[i].id as unknown as number;
      }
    }

    postAnswers(checkedAnswer).catch(error => console.log(error));
  };

  const answersList: React.JSX.Element[] = [];
  answers.forEach(ans => {
    answersList.push(
      <div>
        <input type='radio' id={ans.responseId as unknown as string} name={question} value={ans.text} />
        <label htmlFor={ans.text}>{ans.text}</label>
        <br />
      </div>,
    );
  });

  return (
    <div>
      <NavBar />
      <div className='question-container'>
        <h2>{question}</h2>
        <form
          className='question'
          onSubmit={(e: React.FormEvent) => handleSubmitData(e)}>
          {answersList}
          <input type='submit' value='submit' />
        </form>
      </div>
    </div>
  );
}

export default Audience;
