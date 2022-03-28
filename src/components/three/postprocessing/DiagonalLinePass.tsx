import { useRef, VFC } from 'react';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { Size, useFrame } from '@react-three/fiber';
import { GUIController } from '../../../modules/gui';

const datas = {
	enabled: true,
	thickness: 1,
	alpha: 0.7
}

export const DiagonalLinePass: VFC = () => {
	const passRef = useRef<ShaderPass>(null)

	const gui = GUIController.instance.setFolder('DiagonalLine')
	gui.addCheckBox(datas, 'enabled')
	gui.addNumericSlider(datas, 'thickness', 0.1, 2, 0.01)
	gui.addNumericSlider(datas, 'alpha', 0, 1, 0.01)

	const shader: THREE.Shader = {
		uniforms: {
			tDiffuse: { value: null },
			u_aspect: { value: null },
			u_thickness: { value: datas.thickness },
			u_alpha: { value: datas.alpha }
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader
	}

	const update = (size: Size) => {
		passRef.current!.enabled = datas.enabled

		if (datas.enabled) {
			passRef.current!.uniforms.u_aspect.value = size.width / size.height
			passRef.current!.uniforms.u_thickness.value = datas.thickness
			passRef.current!.uniforms.u_alpha.value = datas.alpha
		}
	}

	useFrame(({ size }) => {
		update(size)
	})

	return <shaderPass ref={passRef} attachArray="passes" args={[shader]} />
}

const vertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`

const fragmentShader = `
uniform sampler2D tDiffuse;
uniform float u_aspect;
uniform float u_thickness;
uniform float u_alpha;
varying vec2 v_uv;

const float PI = 3.14159265358979;

void main() {
  vec4 tex = texture2D(tDiffuse, v_uv);
  float line = sin(2.0 * PI * (v_uv.x * u_aspect + v_uv.y) * 150.0 * u_thickness);
  line = (line + 1.0) * 0.5; // 0 ~ 1
  line = line * (1.0 - u_alpha) + u_alpha; // u_alpha ~ 1
  tex.rgb *= line;
  
  gl_FragColor = tex;
}
`
