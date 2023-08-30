import React from 'react';
import MCResults from '../components/MCResults';
import NavBar from '../components/NavBar';

// export interface PresenterProps {
//   presenterName: string;
//   pollId: number;
//   question: string;
//   questionType: string;
//   responseOptions: string[];
// }

// const mockProps: PresenterProps = {
//   presenterName: 'Bob',
//   pollId: 12345,
//   question: 'How are you feeling today?',
//   questionType: 'MC',
//   responseOptions: ['happy', 'hungry', 'sad', 'excited'],
// };

function PresenterResults() {
  // const props = mockProps;

  const closePoll = () => {
    // this need to do socket.disconnet()
  };

  return (
    <div>
      <NavBar />
      <h3>Results</h3>
      <h4>Presenter View</h4>
      <MCResults
      // pollId={pollId}
      // question={props.question}
      // questionType={props.questionType}
      // responseOptions={props.responseOptions}
      />
      <button type='button' onClick={closePoll}>
        Close Poll
      </button>
    </div>
  );
}

export default PresenterResults;
