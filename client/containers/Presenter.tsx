import React, { useState } from 'react';
import { CreatePollRequestBody } from '../../types/types';

function Presenter() {
  // Will have pollId gotten from backend and passed in?
  const pollId = 1;
  const [answers, setAnswers] = useState<string[]>([]);
  const [timerValue, setTimerValue] = useState<number>(0);

  function createPoll() {
    const questionValue = (
      document.getElementById('pollQuestion') as HTMLFormElement
    ).value as string;

    if (questionValue.length === 0 || answers.length === 0) {
      return;
    }

    const fetchBody: CreatePollRequestBody = {
      question: questionValue,
      timer: timerValue,
      answers,
    };

    fetch(`/api/poll/startPoll${pollId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fetchBody),
    })
      .then(response => response.json())
      .then(data => console.log(data)) // Do something with the data, need to know what we are doing
      .catch(err => console.log(err));
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
      <button type='button' onClick={createPoll}>
        Create Poll
      </button>
      <p>Answers:</p>
      {answersElements}
    </div>
  );
}

export default Presenter;
