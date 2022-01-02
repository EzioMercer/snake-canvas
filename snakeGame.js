import Apple from "./js/Apple.js";
import {FPS, GAME_FIELD_HEIGHT, GAME_FIELD_WIDTH, gameObjects} from "./js/Globals.js";
import Snake from "./js/Snake.js";

/**
 * @type {HTMLCanvasElement}
 */
const gameField = document.getElementById('gameField');
const gameFieldCtx = gameField.getContext('2d');

gameField.height = GAME_FIELD_HEIGHT;
gameField.width = GAME_FIELD_WIDTH;

const snake = new Snake(gameFieldCtx);
const apple = new Apple(gameFieldCtx, 64, 128, snake);

document.addEventListener('keyup', (e) => {

	const direction = snake.direction;

	switch (e.code) {
		case 'ArrowLeft':
			if (direction !== 'Right' && direction !== 'Left') {
				snake.setDirection(-1, 0);
			}
			break;
		case 'ArrowUp':
			if (direction !== 'Down' && direction !== 'Up') {
				snake.setDirection(0, -1);
			}
			break;
		case 'ArrowRight':
			if (direction !== 'Left' && direction !== 'Right') {
				snake.setDirection(1, 0);
			}
			break;
		case 'ArrowDown':
			if (direction !== 'Up' && direction !== 'Down') {
				snake.setDirection(0, 1);
			}
			break;
	}
});

function updateGame() {
	snake.moveHead();
	apple.detectCrossing();
}

function updateFrame() {
	gameFieldCtx.clearRect(0, 0, GAME_FIELD_WIDTH, GAME_FIELD_HEIGHT);

	gameFieldCtx.font = "30px Arial";
	gameFieldCtx.fillStyle = "white";
	gameFieldCtx.textAlign = "left";
	gameFieldCtx.fillText(`Score: ${snake.getBody().length - 2}`, 0, 30);

	for (const gameObject of gameObjects) {
		gameObject.draw();
	}
}

setInterval(updateFrame, FPS(60));
setInterval(updateGame, 45);
