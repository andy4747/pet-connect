import React, { FC } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export const QNA: FC<{ question: string; answer: string }> = ({
	question,
	answer,
}) => {
	const [faqBtn, setFaqBtn] = React.useState(true);
	return (
		<div className='mt-4 bg-pet-light-grey px-4 sm:px-2'>
			<div className='flex items-center py-4'>
				<span
					className='flex-1 font-normal text-xl'
					onClick={() => {
						setFaqBtn(!faqBtn);
					}}>
					{question}
				</span>
				<FaChevronDown
					size={20}
					className='text-pet-indigo'
					onClick={() => {
						setFaqBtn(!faqBtn);
					}}
				/>
			</div>
			{!faqBtn && <span className='flex-1 text-center'>{answer}</span>}
		</div>
	);
};
