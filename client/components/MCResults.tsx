import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import chart.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { io } from 'socket.io-client';
import { Question, Response } from '../../types/types';


const socket = io('http://localhost:3000');

// import websocket
// import { socket } from '../socket';
// const mockData = {
//   1: 'happy',
//   2: 'content',
//   3: 'sad',
//   4: 'hungry',
// };

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

//* This is to render multiple choice results
function MCResults() {
  const { pollId } = useParams();
  const [questionHasBeenUpdated, setQuestionHasBeenUpdated] = useState(false);
  const [question, setQuestion] = useState<Question>({
    id: 1,
    text: 'question1',
    type: 0,
    responseOptions: [
      {
        questionId: 1,
        text: 'answer1',
        count: 3,
      },
      {
        questionId: 1,
        text: 'answer2',
        count: 6,
      },
    ],
  });

  const [isConnected, setIsConnected] = useState(socket.connected);
  // ! const [pollEvents, setPollEvents] = useState([]);


  useEffect(() => {

    if (!questionHasBeenUpdated) {
      fetch(`/api/poll/questionsInPoll/${pollId}`)
        .then(response => response.json())
        .then(data => setQuestion(data.questions[0]))
        .catch(error => console.log(error));

      setQuestionHasBeenUpdated(true);
    }

    function onConnect() {
      setIsConnected(true)
      socket.emit('join', pollId)
      console.log('websocket connected to room ', pollId);
    }
    
    function onDisconnect() {
      setIsConnected(false);
      console.log('websocket disconnected');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // socket.off('poll', onPollEvent);
    };
  }, []);

  useEffect(() => {
    function updateResponseCount(response: any) {
      const parsedResponse = JSON.parse(response) as Response;
      const copyQuestion = structuredClone(question);
      const foundResponse = (copyQuestion.responseOptions as Response[]).find((el) => el.responseId == parsedResponse.responseId)
      foundResponse.count += 1;
      setQuestion(copyQuestion);
    }

    socket.on(pollId.toString(), updateResponseCount);

    return () => {
      socket.off(pollId.toString(), updateResponseCount)
    }
  }, [question])

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: `${question.text}`,
      },
    },
  };

  const labels: string[] = [];
  const countData: number[] = [];

  (question.responseOptions as Response[]).forEach(el => {
    labels.push(el.text);
    countData.push(el.count);
  });

  // export interface Question {
  //   id?: number;
  //   text: string;
  //   type: QuestionType;
  //   responseOptions?: Response[] | string[];
  // }

  // export interface Response {
  //   questionId: number;
  //   text: string;
  //   count: number;
  // }

  const data = {
    labels,
    datasets: [
      {
        label: 'Group 1',
        data: countData,
        borderColor: '#940700',
        backgroundColor: '#dd4224',
      },
      // {
      //   label: 'Group 2',
      //   data: [3, 4, 5, 6],
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
    ],
  };

  return (
    <div className='MC-results'>
      <h3>Poll: {pollId}</h3>
      <h3>Question: {question.text}</h3>

      <Bar options={options} data={data} />
    </div>
  );
}

export default MCResults;
