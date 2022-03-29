import React, { useRef, VFC } from 'react';
import { css } from '@emotion/css';
import { BackgroundText } from './BackgroundText';
import { LinkIconButton } from './LinkIconButton';
import { MouseTracker } from './MouseTracker';
import { TCanvas } from './three/TCanvas';

export const App: VFC = () => {
	const ref = useRef<HTMLDivElement>(null)

	return (
		<div ref={ref} className={styles.container}>
			<BackgroundText />
			<MouseTracker />
			<LinkIconButton imagePath="/assets/icons/github.svg" linkPath="https://github.com/nemutas/r3f-shadow" />
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
