import { VFC } from 'react';
import { css } from '@emotion/css';
import { Stats } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Floor } from './Floor';
import { Lights } from './Lights';
import { PhysicalObjects } from './PhysicalObjects';
import { ConstantNoisePass } from './postprocessing/ConstantNoisePass';
import { DiagonalLinePass } from './postprocessing/DiagonalLinePass';
import { Effects } from './postprocessing/Effects';

type TCanvasProps = {
	containerRef: React.RefObject<HTMLDivElement>
}

export const TCanvas: VFC<TCanvasProps> = ({ containerRef }) => {
	return (
		<Canvas
			camera={{
				position: [0, 15, 0],
				fov: 50,
				aspect: window.innerWidth / window.innerHeight,
				near: 0.1,
				far: 2000
			}}
			dpr={window.devicePixelRatio}
			shadows
			onCreated={state => state.events.connect!(containerRef.current)}
			style={{ position: 'fixed', top: '0', left: '0', pointerEvents: 'none' }}>
			{/* lights */}
			<Lights />
			{/* objects */}
			<PhysicalObjects />
			<Floor />
			{/* effects */}
			{/* <Effects>
				<ConstantNoisePass />
				<DiagonalLinePass />
			</Effects> */}
			{/* helper */}
			{/* <Stats /> */}
		</Canvas>
	)
}
