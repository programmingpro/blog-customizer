import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import styles from './ArticleParamsForm.module.scss';
import React, { FormEvent, SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { Text } from '../text';
import { Select } from 'components/select';
import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'components/select/hooks/useOutsideClickClose';
import { Separator } from '../separator';

type FormProps = {
	articleState: ArticleStateType;
	setArticleState: (params: React.SetStateAction<ArticleStateType>) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: FormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const formRef = useRef(null);

	const [fontFamily, setFontFamily] = useState(articleState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleState.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleState.fontColor);
	const [bgColor, setBgColor] = useState(articleState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(articleState.contentWidth);

	const toggleMenu = (evt: SyntheticEvent) => {
		evt.stopPropagation();
		setIsMenuOpen(!isMenuOpen);
	};

	const submitForm = (evt: FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		setArticleState({
			...articleState,
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
		});
		setIsMenuOpen(false);
	};

	const clearForm = () => {
		setArticleState(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: formRef,
		onChange: () => {
			setIsMenuOpen(false);
		},
	});

	return (
		<div>
			<ArrowButton onClick={toggleMenu} isMenuOpen={isMenuOpen}></ArrowButton>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={formRef}>
				<form className={styles.form} onSubmit={submitForm} onClick={(evt) => evt.stopPropagation()}>
					<Text as='h1' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						title={'Шрифт'}
						options={fontFamilyOptions}
						selected={fontFamily}
						onChange={setFontFamily}
					/>
					<RadioGroup
						title={'Размер'}
						name='font-size'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
					/>
					<Select
						title={'Цвет'}
						options={fontColors}
						selected={fontColor}
						onChange={setFontColor}
					/>
					<Separator />
					<Select
						title={'Цвет'}
						options={backgroundColors}
						selected={bgColor}
						onChange={setBgColor}
					/>
					<Select
						title={'Ширина'}
						options={contentWidthArr}
						selected={contentWidth}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={clearForm} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};