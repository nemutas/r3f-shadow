import { VFC } from 'react';
import { Plane } from '@react-three/drei';

export const Floor: VFC = () => {
	return (
		<Plane args={[50, 50]} position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
			<shadowMaterial color="#000" transparent opacity={0.15} />
		</Plane>
	)
}
