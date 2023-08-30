import React from 'react';
import MCResults from '../components/MCResults';

export interface PresenterProps {
  presenterName: string;
  pollTitle: string;
  question: string;
  questionType: string;
  responseOptions: string[];
}

const mockProps: PresenterProps = {
  presenterName: 'Bob',
  pollTitle: 'Mood',
  question: 'How are you feeling today?',
  questionType: 'MC',
  responseOptions: ['happy', 'hungry', 'sad', 'excited'],
};

function PresenterResults() {
  const props = mockProps;

  return (
    <div>
      <h3>Results</h3>
      <h4>Presenter View</h4>
      <MCResults
        presenterName={props.presenterName}
        pollTitle={props.pollTitle}
        question={props.question}
        questionType={props.questionType}
        responseOptions={props.responseOptions}
      />
      <button>Close Poll</button>
    </div>
  );
}

export default PresenterResults;
