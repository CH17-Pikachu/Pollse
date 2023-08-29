import React from 'react';
import MCResults from '../components/MCResults';

const props = {
  presenterName: 'Bob',
  pollTitle: 'Mood',
  question: 'How are you feeling today?',
  questionType: 'MC',
  numOfResponses: '5',
};

function PresenterResults() {
  return (
    <div>
      <p>PresenterResults</p>
      <MCResults
        presenterName={props.presenterName}
        pollTitle={props.pollTitle}
        question={props.question}
        questionType={props.questionType}
        numOfResponses={props.numOfResponses}
      />
    </div>
  );
}

export default PresenterResults;
