import React, { useState } from 'react';

function Presenter() {
  // Will have pollId gotten from backend and passed in?
  const pollId = 1;
  const [answers, setAnswers] = useState<React.JSX.Element[]>([]);
  const [createAnswerPopup, setCreateAnswerPopup] = useState(false);

  function showAnswerPopup() {
    setCreateAnswerPopup(!createAnswerPopup)
  }
  
  function createNewAnswer(e: React.FormEvent): void {
    e.preventDefault();

    const answerInput = (document.getElementById('newAnswerInput') as HTMLInputElement);
    const answersCopy = answers.slice();
    const answersLen = answers.length + 1;

    answersCopy.push(
    <div key={`createPollAnswer${answersLen}`}>
      <p>{answersLen}: {answerInput.value}</p>
    </div>
    )

    setAnswers(answersCopy);
    showAnswerPopup();
  }

  return (
    <div>
      <p>Room ID:{pollId}</p>
      <label htmlFor='pollQuestion'>
        Question:
        <input type='text' id='pollQuestion' name='pollQuestion' placeholder='Question' />
      </label>
      <br />
      <button type='button' onClick={showAnswerPopup}>Create New Answer</button>
      {
      createAnswerPopup ? 
        <form onSubmit={(e) => createNewAnswer(e)}>
          <input type='text' id='newAnswerInput' name='newAnswerInput' placeholder='Answer'/> 
          <button type='submit'>Create</button>
        </form>
        : null
      }
      <p>Answers:</p>
      {answers}
    </div>
  );
}

export default Presenter;