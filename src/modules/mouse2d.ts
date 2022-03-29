import * as THREE from 'three';

export class Mouse2D {
	private static _instance: Mouse2D | null
	private _relativePosition = new THREE.Vector2(0, 0)

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
	}

	get normalizedPosition() {
		return new THREE.Vector2(
			(this._relativePosition.x / window.innerWidth) * 2 - 1,
			(this._relativePosition.y / window.innerHeight) * 2 - 1
		)
	}

	get relativePosition() {
		return this._relativePosition.clone()
	}

	get absolutePosition() {
		return new THREE.Vector2(
			this._relativePosition.x + window.pageXOffset,
			this._relativePosition.y + window.pageYOffset
		)
	}

	dispose = () => {
		window.removeEventListener('mousemove', this._handleMouseMove)
	}
}
