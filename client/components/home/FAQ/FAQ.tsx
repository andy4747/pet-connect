import React from 'react';
import { QNA } from './QNA';

export const FAQ = () => {
	const qna = [
		{ question: 'What is your name?', answer: 'Angel Dhakal' },
		{ question: 'Where do you live?', answer: 'Biratnagar' },
		{
			question: 'Where do you go to college?',
			answer: 'Itahari International College',
		},
		{
			question: 'What is your name?',
			answer: 'None of your business',
		},
	];
	return (
		<section className='bg-pet-white py-28'>
			<div className='container'>
				{/* Heading */}
				<div className='sm:w-3/4 lg:w-5/12 mx-auto px-2'>
					<h1 className='text-3xl text-center text-pet-blue'>
						Frequently Asked Questions
					</h1>
				</div>
				{/* FAQ Items */}
				<div className='flex flex-col sm:w-3/4 lg:w-5/12 mt-12 mx-auto px-4'>
					{/* Questions */}
					{qna.map((value, index) => {
						return (
							<QNA
								question={value.question}
								key={index}
								answer={value.answer}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
};
