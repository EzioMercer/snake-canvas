import Rect from "./Rect.js";
import {GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH, RECT_SIZE} from "./Globals.js";
import Dot from "./Dot.js";

export default class Apple extends Rect {

	/**
	 * @type {CanvasRenderingContext2D}
	 */
	#ctx

	/**
	 * @type {Snake}
	 */
	#snake

	/**
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 * @param {number} y
	 * @param {Snake} snake
	 */
	constructor(ctx, x, y, snake) {
		super(ctx, 'red', x, y);

		this.#ctx = ctx;
		this.#snake = snake;

		this.draw();
	}

	detectCrossing() {

		const snakeHeadCornerDots = this.#snake.getHead().getCornerDots();

		for (const cornerDot of snakeHeadCornerDots) {
			if (this.#ctx.isPointInPath(this.Path2D, cornerDot.x, cornerDot.y)) {
				this.#snake.addTail();
				this.moveTo(Math.random() * GAME_FIELD_WIDTH, Math.random() * GAME_FIELD_HEIGHT);
				break;
			}
		}
	}
}
