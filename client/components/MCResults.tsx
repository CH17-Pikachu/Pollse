// import React, { useState, useEffect } from 'react';
// // import chart.js
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Bar } from 'react-chartjs-2';
// // import presenter types
// import { PresenterProps } from '../containers/PresenterResults';
// // import websocket
// //! import { socket } from '../socket';
// // const mockData = {
// //   1: 'happy',
// //   2: 'content',
// //   3: 'sad',
// //   4: 'hungry',
// // };

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// );

// //* This is to render multiple choice results
// function MCResults(props: PresenterProps) {
//   const { presenterName, pollTitle, question, questionType, responseOptions } =
//     props;

//   //! const [isConnected, setIsConnected] = useState(socket.connected);
//   const [pollEvents, setPollEvents] = useState([]);

//   // useEffect(() => {
//   //   function onConnect() {
//   //     setIsConnected(true);
//   //   }

//   //   function onDisconnect() {
//   //     setIsConnected(false);
//   //   }

//   //   function onPollEvent(value) {
//   //     // setPollEvents();
//   //   }

//   //   socket.on('connect', onConnect);
//   //   socket.on('disconnect', onDisconnect);
//   //   socket.on('poll', onPollEvent);

//   //   return () => {
//   //     socket.off('connect', onConnect);
//   //     socket.off('disconnect', onDisconnect);
//   //     socket.off('poll', onPollEvent);
//   //   };
//   // }, []);

//   const options = {
//     indexAxis: 'y' as const,
//     elements: {
//       bar: {
//         borderWidth: 2,
//       },
//     },
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'right' as const,
//       },
//       title: {
//         display: true,
//         text: `${question}`,
//       },
//     },
//   };

//   const labels = responseOptions;

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Group 1',
//         data: [2, 5, 6, 7],
//         borderColor: '#940700',
//         backgroundColor: '#dd4224',
//       },
//       // {
//       //   label: 'Group 2',
//       //   data: [3, 4, 5, 6],
//       //   borderColor: 'rgb(53, 162, 235)',
//       //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       // },
//     ],
//   };

//   return (
//     <div className='MC-results'>
//       <h3>Question: {question}</h3>

//       <Bar options={options} data={data} />
//     </div>
//   );
// }

// export default MCResults;
