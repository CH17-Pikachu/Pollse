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
import { Question, Response } from '../../types/types';

// import websocket
//! import { socket } from '../socket';
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

  //! const [isConnected, setIsConnected] = useState(socket.connected);
  //! const [pollEvents, setPollEvents] = useState([]);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onPollEvent(value) {
  //     // setPollEvents();
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('poll', onPollEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('poll', onPollEvent);
  //   };
  // }, []);

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
      <h3>Question: {question.text}</h3>

      <Bar options={options} data={data} />
    </div>
  );
}

export default MCResults;
