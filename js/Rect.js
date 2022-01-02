import {gameObjects, RECT_SIZE} from "./Globals.js";
import Dot from "./Dot.js";

export default class Rect {

	/**
	 * @type {CanvasRenderingContext2D}
	 */
	#ctx;

	/**
	 * @type {string}
	 */
	#color;

	/**
	 * @type {number}
	 */
	#x;

	/**
	 * @type {number}
	 */
	#y;

	/**
	 * @type {number}
	 */
	#width;

	/**
	 * @type {number}
	 */
	#height;

	/**
	 * @type {Path2D}
	 */
	#path2D;

	/**
	 * @type {number}
	 */
	#indexInGameObjects;

	/**
	 * Draw Rectangle
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {string} color
	 * @param {number} x
	 * @param {number} y
	 * @param {number} [width]
	 * @param {number} [height]
	 */
	constructor(ctx, color, x, y, width = RECT_SIZE, height = RECT_SIZE) {
		this.#ctx = ctx;
		this.#color = color;
		this.#x = x;
		this.#y = y;
		this.#width = width;
		this.#height = height;
		gameObjects.push(this);
		this.indexInGameObjects = gameObjects.length - 1;
	}

	draw() {
		this.#path2D = new Path2D();
		this.#path2D.rect(this.#x, this.#y, this.#width, this.#height);

		this.#ctx.fillStyle = this.#color;
		this.#ctx.fill(this.#path2D);
	}

	get Path2D () {
		return this.#path2D;
	}

	/**
	 * @param {number} x
	 */
	set X(x) {
		this.#x = x;
	}

	/**
	 * @returns {number}
	 */
	get X () {
		return this.#x;
	}

	/**
	 * @param {number} y
	 */
	set Y(y) {
		this.#y = y;
	}

	/**
	 * @returns {number}
	 */
	get Y () {
		return this.#y;
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 */
	moveTo(x, y) {
		this.X = x;
		this.Y = y;
	}

	/**
	 * @returns {Dot[]}
	 */
	getCornerDots() {
		return [
			new Dot(this.#x, this.#y),
			new Dot(this.#x + RECT_SIZE, this.#y),
			new Dot(this.#x + RECT_SIZE, this.#y + RECT_SIZE),
			new Dot(this.#x, this.#y + RECT_SIZE)
		]
	}

	/**
	 * @param {number} index
	 */
	set indexInGameObjects(index) {
		this.#indexInGameObjects = index;
	}

	removeSelf() {
		gameObjects.splice(this.#indexInGameObjects, 1);

		for (let i = this.#indexInGameObjects; i < gameObjects.length; ++i) {
			gameObjects[i].indexInGameObjects = i;
		}
	}
}
