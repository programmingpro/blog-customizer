import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
import { SyntheticEvent, useState } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = (evt: SyntheticEvent) => void;
export type ArrowButtonProps = {
	onClick: OnClick;
	isMenuOpen: boolean;
};

export const ArrowButton = ({
	onClick,
	isMenuOpen = true,
}: ArrowButtonProps) => {
	const [isHovering, setIsHovering] = useState(false);

	const handleMouseOnObject = () => {
		setIsHovering(true);
	};

	const handleMouseLeaveObject = () => {
		setIsHovering(false);
	};

	return (
		<div
			role='button'
			aria-label={'Открыть/Закрыть форму параметров статьи'}
			tabIndex={0}
			onMouseEnter={handleMouseOnObject}
			onMouseLeave={handleMouseLeaveObject}
			style={{ cursor: `${isHovering ? 'pointer' : 'default'}` }}
			className={clsx(styles.container, {
				[styles.container_open]: isMenuOpen,
			})}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx({
					[styles.arrow]: !isMenuOpen,
					[styles.arrow_open]: isMenuOpen,
				})}
			/>
		</div>
	);
};
