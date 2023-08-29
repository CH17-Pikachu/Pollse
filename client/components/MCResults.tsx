import React from 'react';
import { PresenterProps } from '../containers/PresenterResults';

// const mockData = {
//   1: 'happy',
//   2: 'content',
//   3: 'sad',
//   4: 'hungry',
// };

//* This is to render multiple choice results

function MCResults(props: PresenterProps) {
  const { presenterName, pollTitle, question, questionType, numOfResponses } =
    props;

  const responses = [];
  for (let i = 1; i <= numOfResponses; i++) {
    responses.push(
      <li className='response-list' id={`response ${i}`}>
        answer
      </li>,
    );
  }

  return (
    <div className='MC-results'>
      <h3>{question}</h3>
      {responses}
    </div>
  );
}

export default MCResults;
