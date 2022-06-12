import React from 'react';

type alertType = 'danger' | 'success' | 'info' | 'warning';

interface colorType {
	danger: string[];
	success: string[];
	info: string[];
	warning: string[];
}

export const Alert: React.FC<{ message: string; type: alertType }> = ({
	message,
	type,
}) => {
	const [isShowing, setIsShowing] = React.useState(true);
	const color: colorType = {
		info: ['bg-blue-100', 'text-blue-900', 'border-blue-200'],
		success: ['bg-green-100', 'text-green-900', 'border-green-200'],
		danger: ['bg-red-100', ' text-red-900', 'border-red-200'],
		warning: ['bg-[#fef9c3]', 'text-yellow-900', 'border-[#fde047]'],
	};
	return (
		<div className={`w-full ${!isShowing && 'hidden'}`}>
			<div
				className={`py-3 px-5 text-sm rounded-md ${color[type][0]} ${color[type][1]} ${color[type][2]} border flex items-center justify-between`}
				role='alert'>
				<span>{message}</span>
				<button
					className='w-4'
					type='button'
					onClick={(e) => {
						setIsShowing(false);
					}}
					data-dismiss='alert'
					aria-label='Close'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>
				</button>
			</div>
		</div>
	);
};
