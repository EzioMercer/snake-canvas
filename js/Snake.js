import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH, gameObjects, RECT_SIZE} from "./Globals.js";
import Rect from "./Rect.js";
import Dot from "./Dot.js";

export default class Snake {

	/**
	 * @type {CanvasRenderingContext2D}
	 */
	#ctx;

	/**
	 * @type {Rect[]}
	 */
	#body = [];

	/**
	 * @type {{
	 *     x: number,
	 *     y: number
	 * }}
	 */
	#direction = {
		x: 0,
		y: -1
	};

	/**
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(ctx) {
		this.#ctx = ctx;

		this.#body[0] = new Rect(
			ctx,
			'green',
			(GAME_FIELD_WIDTH - RECT_SIZE) / 2,
			(GAME_FIELD_HEIGHT - RECT_SIZE) / 2
		);
		this.#body[0].draw();
		this.addTail(0, 1);
	}

	getHead() {
		return this.#body[0];
	}

	getBody() {
		return this.#body;
	}

	/**
	 * @param {number} xDirection
	 * @param {number} yDirection
	 */
	setDirection(xDirection, yDirection) {
		this.#direction.x = xDirection;
		this.#direction.y = yDirection;

		this.moveHead();
	}

	moveHead() {
		const head = this.#body[0];

		this.moveTails();

		let newX = head.X + RECT_SIZE * this.#direction.x;
		let newY = head.Y + RECT_SIZE * this.#direction.y;

		if (newX < 0) newX = GAME_FIELD_WIDTH;
		else if (newX + RECT_SIZE > GAME_FIELD_WIDTH) newX = 0;
		else if (newY < 0) newY = GAME_FIELD_HEIGHT - RECT_SIZE;
		else if (newY + RECT_SIZE > GAME_FIELD_HEIGHT) newY = 0;

		head.moveTo(newX, newY);
	}

	/**
	 * @param {number} [xDirection]
	 * @param {number} [yDirection]
	 */
	addTail(xDirection, yDirection) {
		const lastTail = this.#body[this.#body.length - 1];
		const [lastTailX, lastTailY] = [lastTail.X, lastTail.Y];

		if (xDirection === undefined && yDirection === undefined) {
			const penultimateTail = this.#body[this.#body.length - 2];
			const [penultimateTailX, penultimateTailY] = [penultimateTail.X, penultimateTail.Y];

			xDirection = 0;
			yDirection = 0;

			if (lastTailY === penultimateTailY) {
				if (lastTailX - penultimateTailX < 0) {
					xDirection = -1;
				} else {
					xDirection = 1;
				}
			} else if (lastTailX === penultimateTailX) {
				if (lastTailY - penultimateTailY < 0) {
					yDirection = -1;
				} else {
					yDirection = 1;
				}
			}
		}

		const newTail = new Rect(
			this.#ctx,
			'yellow',
			lastTailX + RECT_SIZE * xDirection,
			lastTailY + RECT_SIZE * yDirection
		);

		this.#body.push(newTail);
	}

	moveTails() {

		const snakeHead = this.getHead();
		const snakeCenterDot = new Dot(snakeHead.X + RECT_SIZE / 2, snakeHead.Y + RECT_SIZE / 2);

		for (let i = this.#body.length - 1; i > 0; --i) {
			const prevElem = this.#body[i - 1];
			const currElem = this.#body[i];

			if (i > 2 && this.#ctx.isPointInPath(currElem.Path2D, snakeCenterDot.x, snakeCenterDot.y)) {
				const deletedTails = this.#body.splice(i);

				for (const deletedTail of deletedTails) {
					deletedTail.removeSelf();
				}
			}

			currElem.moveTo(prevElem.X, prevElem.Y);
		}
	}

	get direction () {
		if (this.#direction.x === -1) return 'Left';
		if (this.#direction.y === -1) return 'Up';
		if (this.#direction.x === 1) return 'Right';
		if (this.#direction.y === 1) return 'Down';
	}
}
