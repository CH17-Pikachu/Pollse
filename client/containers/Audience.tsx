import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

// async function fetchQuestion() {
// 	const { data, error } = await supabase.from('questions').select("*");

// 	if (error) {
// 		console.log("Error fetching poll:", error);
// 		return [];
// 	}

// 	return data || [];
// }

function Audience() {
  const navigate = useNavigate();

  const { pollId } = useParams();
  const [question, setQuestion] = useState(pollId);
  const [answers, setAnswers] = useState(['answer1', 'answer2', 'answer3']);

  useEffect(() => {
    async function getQuestion() {
      try {
        const response = await fetch(`/api/poll/questionsInPoll/${pollId}`);
        const data = response.json();
        //! setQuestion(data);
      } catch (error) {
        console.log(`Error occured when fetching question data: ${error}`);
      }
    }
    getQuestion();
  }, []);

  const handleSubmitData = async (e: any) => {
    e.preventDefault();
    const checkedAnswers: any[] = [];
    const answers = e.target.elements;

    for (let i = 0; i < answers.length; i++) {
      if (answers[i].checked) {
        checkedAnswers.push(answers[i].value);
      }
    }

    try {
      const response = await fetch(`/api/poll/newAnswers/${pollId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers: checkedAnswers }),
      });

      if (response.status === 200) {
        // navigate to the results
        navigate(`/audience-results/${pollId}`);
      } else {
        // figure out what do
        console.log(`did not receive a OK status: ${response}`);
      }
    } catch (error) {
      console.error(`Error when submitting answers: ${error}`);
    }
  };

  return (
    <div>
      <NavBar />
      <div className='question-container'>
        <h2>{question}</h2>
        <form className='question' onSubmit={e => handleSubmitData(e)}>
          {answers.map(ans => (
            <div>
              <input type='checkbox' id={ans} name={ans} value={ans} />
              <label htmlFor={ans}>{ans}</label>
              <br />
            </div>
          ))}
          <input type='submit' value='submit' />
        </form>
      </div>
    </div>
  );
}

export default Audience;
