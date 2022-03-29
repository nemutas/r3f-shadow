import React, { useEffect, useRef, VFC } from 'react';
import * as THREE from 'three';
import { css } from '@emotion/css';
import { Mouse2D } from '../modules/mouse2d';
import { state } from '../modules/store';

export const MouseTracker: VFC = () => {
	const ref = useRef<HTMLDivElement>(null)
	const animationID = useRef<number | null>(null)

	useEffect(() => {
		const mouse2d = Mouse2D.instance
		const vec2 = mouse2d.absolutePosition

		const anime = () => {
			const mPos = vec2.lerp(mouse2d.absolutePosition, 0.5)
			ref.current!.style.setProperty('--mx', mPos.x + 'px')
			ref.current!.style.setProperty('--my', mPos.y + 'px')

			if (state.hoverLink && !ref.current!.classList.contains('active')) {
				ref.current!.classList.add('active')
			} else if (!state.hoverLink && ref.current!.classList.contains('active')) {
				ref.current!.classList.remove('active')
			}

			animationID.current = requestAnimationFrame(anime)
		}
		anime()

		return () => {
			animationID.current && cancelAnimationFrame(animationID.current)
		}
	}, [])

	return <div ref={ref} className={styles.container} />
}

const styles = {
	container: css`
		position: absolute;
		top: var(--my);
		left: var(--mx);
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
