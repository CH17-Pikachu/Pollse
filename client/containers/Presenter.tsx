import React, { useState } from 'react';

interface FetchBody {
  question: string;
  timer: number;
  answers: string[];
}

function Presenter() {
  // Will have pollId gotten from backend and passed in?
  const pollId = 1;
  const [answers, setAnswers] = useState<string[]>([]);
  
  function createPoll() {
    const questionValue: string = (document.getElementById('pollQuestion') as HTMLFormElement).value;
    const timerValue: number = (document.getElementById('pollTimer') as HTMLFormElement).value;
    const fetchBody: FetchBody = {
      question: questionValue,
      timer: timerValue,
      answers 
    }

    fetch(`/api/poll/startPoll${pollId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(fetchBody)
    })
    .catch((err) => console.log(err));
  }

  function createNewAnswer(e: React.FormEvent): void {
    e.preventDefault();

    const answerInput = (document.getElementById('newAnswerInput') as HTMLInputElement);
    const answersCopy = answers.slice();

    answersCopy.push(answerInput.value)

    answerInput.value = null;
    setAnswers(answersCopy);
  }

  const answersElements: React.JSX.Element[] = []
  answers.forEach((el, i) => {
    answersElements.push(<p key={`answerElementKey${el}`}>{i + 1}: {el}</p>)
  })

  return (
    <div>
      <p>Room ID:{pollId}</p>
      <label htmlFor='pollQuestion'>
        Question:
        <input type='text' id='pollQuestion' name='pollQuestion' placeholder='Question' />
      </label>
      <br />
      <label htmlFor='pollTimer'>
        Timer:
        <input type='text' id='pollTimer' name='pollTimer' placeholder='Timer' />
      </label>
      <form onSubmit={(e) => createNewAnswer(e)}>
        <label htmlFor='newAnswerInput'>
          New Answer:
          <input type='text' id='newAnswerInput' name='newAnswerInput' placeholder='Answer'/> 
        </label>
        <button type='submit'>Create</button>
      </form>
      <button type='button' onClick={createPoll}>Create Poll</button>
      <p>Answers:</p>
      {answersElements}
    </div>
  );
}

export default Presenter;