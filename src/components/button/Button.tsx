import { Text } from 'components/text';
import styles from './Button.module.scss';
import React, { useState } from 'react';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	const [textColor, setTextColor] = useState('black');

	const handleHoverEnter = () => {
		if (type === 'reset') {
			setTextColor('white');
		}
	};

	const handleHoverExit = () => {
		if (type === 'reset') {
			setTextColor('black');
		}
	};

	return (
		<button
			className={styles.button}
			type={type}
			onClick={onClick}
			onMouseEnter={handleHoverEnter}
			onMouseLeave={handleHoverExit}>
			<Text color={textColor} weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
}