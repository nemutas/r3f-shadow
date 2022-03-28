import { useMemo, VFC } from 'react';
import * as THREE from 'three';
import {
	CylinderArgs, Debug, Physics, useBox, useCylinder, usePlane, useSphere
} from '@react-three/cannon';
import { Box, Cylinder, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { clampedRandom } from '../../modules/math';
import { Mouse2D } from '../../modules/mouse2d';

export const PhysicalObjects: VFC = () => {
	const amount = 5
	const emissive = new THREE.Color('#8c8c8c')

	return (
		<Physics gravity={[0, -9.8 * 2, 0]}>
			{/* <Debug color="black" scale={1.01}>
				{[...Array(amount)].map((_, i) => (
					<group key={i}>
						<PhysicalBox emissive={emissive} />
						<PhysicalSphere emissive={emissive} />
						<PhysicalTetrahedron emissive={emissive} />
					</group>
				))}
				<Collisions />
			</Debug> */}

			{[...Array(amount)].map((_, i) => (
				<group key={i}>
					<PhysicalBox emissive={emissive} />
					<PhysicalSphere emissive={emissive} />
					<PhysicalTetrahedron emissive={emissive} />
				</group>
			))}
			<Collisions />
		</Physics>
	)
}

// ========================================================
const Collisions: VFC = () => {
	// bottom
	usePlane(() => ({ position: [0, 0, 0], rotation: [-Math.PI / 2, 0, 0] }))
	// back
	usePlane(() => ({ position: [0, 0, -5] }))
	// front
	usePlane(() => ({ position: [0, 0, 5], rotation: [0, Math.PI, 0] }))
	// left
	usePlane(() => ({ position: [-10, 0, 0], rotation: [0, Math.PI / 2, 0] }))
	// right
	usePlane(() => ({ position: [10, 0, 0], rotation: [0, -Math.PI / 2, 0] }))

	const [, api] = useSphere(() => ({ type: 'Kinematic', args: [3] }))

	const mouse2d = Mouse2D.instance

	const vec2 = new THREE.Vector2(0, 0)
	useFrame(({ viewport }) => {
		const x = (mouse2d.normalizedPosition.x * viewport.width) / 2
		const z = (mouse2d.normalizedPosition.y * viewport.height) / 2
		vec2.lerp(new THREE.Vector2(x, z), 0.2)
		api.position.set(vec2.x, -0.5, vec2.y)
	})

	return null
}

// ========================================================
const randomPosition = () => [clampedRandom(-3, 3), clampedRandom(10, 15), clampedRandom(-3, 3)]

const PhysicalBox: VFC<{ emissive: THREE.ColorRepresentation }> = ({ emissive }) => {
	const size = clampedRandom(1, 2)
	const [ref, api] = useBox(() => ({
		mass: 1,
		args: [size, size, size],
		position: randomPosition(),
		angularDamping: 0.8,
		linearDamping: 0.8
	}))

	return (
		<Box ref={ref} args={[size, size, size]} castShadow receiveShadow>
			<meshLambertMaterial emissive={emissive} />
		</Box>
	)
}

const PhysicalSphere: VFC<{ emissive: THREE.ColorRepresentation }> = ({ emissive }) => {
	const size = clampedRandom(0.7, 1.5)
	const [ref, api] = useSphere(() => ({
		mass: 1,
		args: [size],
		position: randomPosition(),
		angularDamping: 0.8,
		linearDamping: 0.8
	}))

	return (
		<Sphere ref={ref} args={[size, 30, 30]} castShadow receiveShadow>
			<meshLambertMaterial emissive={emissive} />
		</Sphere>
	)
}

const PhysicalTetrahedron: VFC<{ emissive: THREE.ColorRepresentation }> = ({ emissive }) => {
	const size = clampedRandom(1, 2)
	const args: CylinderArgs = [0.001, size, Math.sqrt(2) * size, 3]
	const [ref, api] = useCylinder(() => ({
		mass: 1,
		args,
		position: randomPosition(),
		angularDamping: 0.8,
		linearDamping: 0.8
	}))

	return (
		<Cylinder ref={ref} args={args} castShadow receiveShadow>
			<meshLambertMaterial emissive={emissive} />
		</Cylinder>
	)
}
