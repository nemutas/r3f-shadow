import React, { useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { css } from '@emotion/css';
import { Mouse2D } from '../modules/mouse2d';
import { state } from '../modules/store';

export const MouseCircle: VFC = () => {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const mouse2d = Mouse2D.instance
		const pos = () => [mouse2d.relativePosition.x + window.pageXOffset, mouse2d.relativePosition.y + window.pageYOffset]
		const vec2 = new THREE.Vector2(...pos())

		const anime = () => {
			const mPos = vec2.lerp(new THREE.Vector2(...pos()), 0.5)
			ref.current!.style.setProperty('--px', mPos.x + 'px')
			ref.current!.style.setProperty('--py', mPos.y + 'px')

			if (state.hoverLink && !ref.current!.classList.contains('active')) {
				state.hoverLink && ref.current!.classList.add('active')
			} else if (!state.hoverLink && ref.current!.classList.contains('active')) {
				ref.current!.classList.remove('active')
			}

			requestAnimationFrame(anime)
		}
		anime()
	}, [])

	return <div ref={ref} className={styles.container} />
}

const styles = {
	container: css`
		position: absolute;
		top: var(--py);
		left: var(--px);
		transform: translate(-50%, -50%);
		pointer-events: none;
		width: 30px;
		height: 30px;
		transition: 0.3s ease-out;

		&::before {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 25px;
			height: 25px;
			border-top: 5px solid #555;
			border-left: 5px solid #555;
			transition: 0.3s ease-out;
		}

		&::after {
			content: '';
			position: absolute;
			bottom: 0;
			right: 0;
			width: 25px;
			height: 25px;
			border-bottom: 5px solid #555;
			border-right: 5px solid #555;
			transition: 0.3s ease-out;
		}

		&.active {
			width: 350px;
			height: 120px;

			&::before {
				width: 50px;
				height: 50px;
				border-top: 10px solid #555;
				border-left: 10px solid #555;
			}

			&::after {
				width: 50px;
				height: 50px;
				border-bottom: 10px solid #555;
				border-right: 10px solid #555;
			}
		}
	`
}
