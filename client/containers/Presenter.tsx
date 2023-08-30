import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Question, QuestionType } from '../../types/types';
import NavBar from '../components/NavBar';

function Presenter() {
  const navigate = useNavigate();

  // Will have pollId gotten from backend and passed in?
  const [pollId, setPollId] = useState<number | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [timerValue, setTimerValue] = useState<number>(0);

  useEffect((): void => {
    async function getPollId(): Promise<void> {
      try {
        const pollIdResponse = await fetch(`/api/poll/createPoll`);
        const pollIdData = (await pollIdResponse.json()) as {
          roomCode: number;
        };
        setPollId(pollIdData.roomCode);
      } catch (error) {
        console.log(`Error when getting pollId: ${error}`);
      }
    }

    getPollId().catch(error => console.log(error));
  }, []);

  async function startPoll(): Promise<void> {
    const questionValue = (
      document.getElementById('pollQuestion') as HTMLFormElement
    ).value as string;

    if (questionValue.length === 0 || answers.length === 0) {
      // Should do something to tell user they're missing stuff
      return;
    }

    const fetchBody: Question = {
      text: questionValue,
      type: QuestionType.MULTIPLE_CHOICE,
      responseOptions: answers,
    };

    try {
      const createResponse = await fetch(`/api/poll/startPoll/${pollId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: fetchBody }),
      });

      if (createResponse.status === 200) {
        navigate(`/presenter-results/${pollId}`);
      } else {
        console.log('could not create poll');
      }
    } catch (error) {
      console.log(
        `Error occured in Presenter when trying to create new poll: ${error}`,
      );
    }
  }

  // Restricts timer so it will only take numbers
  function updateTimerValue(inputValue: string): void {
    if (/^[0-9]*$/.test(inputValue)) {
      setTimerValue(Number(inputValue));
    }
  }

  function createNewAnswer(e: React.FormEvent): void {
    e.preventDefault();

    const answerInput = document.getElementById(
      'newAnswerInput',
    ) as HTMLInputElement;
    const answersCopy = answers.slice();

    answersCopy.push(answerInput.value);

    answerInput.value = null;
    setAnswers(answersCopy);
  }

  // Create a paragraph element for each answer
  const answersElements: React.JSX.Element[] = [];
  answers.forEach((el, i) => {
    answersElements.push(
      <p key={`answerElementKey${el}`}>
        {i + 1}: {el}
      </p>,
    );
  });

  return (
    <div>
      <NavBar />
      <p>Room ID:{pollId}</p>
      <label htmlFor='pollQuestion'>
        Question:
        <input
          type='text'
          id='pollQuestion'
          name='pollQuestion'
          placeholder='Question'
        />
      </label>
      <br />
      <label htmlFor='pollTimer'>
        Timer:
        <input
          type='text'
          id='pollTimer'
          name='pollTimer'
          placeholder='Seconds'
          value={timerValue}
          onChange={e => updateTimerValue(e.target.value)}
        />
      </label>
      <form onSubmit={e => createNewAnswer(e)}>
        <label htmlFor='newAnswerInput'>
          New Answer:
          <input
            type='text'
            id='newAnswerInput'
            name='newAnswerInput'
            placeholder='Answer'
          />
        </label>
        <button type='submit'>Create</button>
      </form>
      <button type='button' onClick={startPoll}>
        Create Poll
      </button>
      <p>Answers:</p>
      {answersElements}
    </div>
  );
}

export default Presenter;
