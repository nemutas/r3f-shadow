import { VFC } from 'react';
import { Canvas } from '@react-three/fiber';
import { Floor } from './Floor';
import { Lights } from './Lights';
import { PhysicalObjects } from './PhysicalObjects';

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
