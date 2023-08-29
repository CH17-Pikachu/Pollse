// import React from 'react';

// function Audience() {
//   return (
//     <div>
//       <p>Audience</p>
//     </div>
//   );
// }

// export default Audience;

// import React, { useState, useEffect } from 'react'
// import { supabase } from '../client.js'
// import { useNavigate } from 'react-router-dom'


// async function fetchQuestion() {
// 	const { data, error } = await supabase.from('questions').select("*");

// 	if (error) {
// 		console.log("Error fetching poll:", error);
// 		return [];
// 	}

// 	return data || [];
// }

// const question = () => {
// 	const [questions, setQuestions] = useState([]);

// 	let navigate = useNavigate();
// 	const routeChange = (question_id) => {
// 		let path = `/question/` + `${question_id}`;
// 		navigate(path)
// 	}

// 	useEffect(() => {
// 		async function getQuestion() {
// 			const data = await fetchQuestion();
// 			setQuestions(data);
// 		}
// 		getQuestion();
// 	}, []);

// 	return (
// 		<div>
// 			<div className="question-container">
// 				<ul className="question">
// 						<div className="gallery-card" onClick={() => routeChange(question.id)}>
// 								question={question.name}
// 								answer={question.answer}
// 							/>
// 						</div>
// 				</ul>
// 			</div>
// 		</div>
// 	)
// }

export default Audience;
