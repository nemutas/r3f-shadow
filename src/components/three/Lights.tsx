import { useRef, VFC } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Mouse2D } from '../../modules/mouse2d';

export const Lights: VFC = () => {
	const ref = useRef<THREE.DirectionalLight>(null)
	const boundary = 15

	// const { scene } = useThree()
	// useEffect(() => {
	// 	const helper = new THREE.CameraHelper(ref.current!.shadow.camera)
	// 	scene.add(helper)
	// }, [scene])

	const mouse2d = Mouse2D.instance

	useFrame(({ viewport }) => {
		const x = mouse2d.normalizedPosition.x * (viewport.width / 2) * 1.5
		const z = mouse2d.normalizedPosition.y * (viewport.height / 2) * 1.5
		ref.current!.position.lerp(new THREE.Vector3(x, ref.current!.position.y, z), 0.1)
	})

	return (
		<>
			<ambientLight intensity={0.1} />
			<directionalLight
				ref={ref}
				position={[10, 20, 10]}
				castShadow
				shadow-camera-top={boundary}
				shadow-camera-bottom={-boundary}
				shadow-camera-left={-boundary}
				shadow-camera-right={boundary}
				shadow-camera-far={50}
				shadow-mapSize={[2048, 2048]}
			/>
		</>
	)
}
