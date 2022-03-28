import React, { useRef, VFC } from 'react';
import { css } from '@emotion/css';
import { BackgroundText } from './BackgroundText';
import { MouseCircle } from './MouseCircle';
import { TCanvas } from './three/TCanvas';

export const App: VFC = () => {
	const ref = useRef<HTMLDivElement>(null)

	return (
		<div ref={ref} className={styles.container}>
			<BackgroundText />
			<MouseCircle />
			<TCanvas containerRef={ref} />
		</div>
	)
}

const styles = {
	container: css`
		position: relative;
		width: 100vw;
		height: 100vh;
	`
}
