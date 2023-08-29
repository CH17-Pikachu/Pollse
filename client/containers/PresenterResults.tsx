import React from 'react';
import MCResults from '../components/MCResults';

export interface PresenterProps {
  presenterName: string;
  pollTitle: string;
  question: string;
  questionType: string;
  numOfResponses: number;
}

const mockProps: PresenterProps = {
  presenterName: 'Bob',
  pollTitle: 'Mood',
  question: 'How are you feeling today?',
  questionType: 'MC',
  numOfResponses: 5,
};

function PresenterResults() {
  const props = mockProps;

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
