import * as THREE from 'three';

export class Mouse2D {
	private static _instance: Mouse2D | null
	private _relativePosition = new THREE.Vector2(0, 0)
	private _absolutePosition = new THREE.Vector2(0, 0)

	private constructor() {
		window.addEventListener('mousemove', this._handleMouseMove)
	}

	static get instance() {
		if (!this._instance) {
			this._instance = new Mouse2D()
		}
		return this._instance
	}

	private _handleMouseMove = (e: MouseEvent) => {
		this._relativePosition.set(e.clientX, e.clientY)
		this._absolutePosition.set(e.offsetX, e.offsetY)
	}

	get normalizedPosition() {
		const x = (this._relativePosition.x / window.innerWidth) * 2 - 1
		const y = (this._relativePosition.y / window.innerHeight) * 2 - 1
		return new THREE.Vector2(x, y)
	}

	get relativePosition() {
		return this._relativePosition.clone()
	}

	get absolutePosition() {
		return this._absolutePosition.clone()
	}

	dispose = () => {
		window.removeEventListener('mousemove', this._handleMouseMove)
	}
}
