import { canMove, hasMoves, move, spawn } from '@xiuxiuy/arcade-core';

const STORAGE_KEY = 'xiuxiu-arcade-2048';

function emptyBoard() {
	return [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
}

export const game = $state({
	board: emptyBoard(),
	score: 0,
	highScore: 0,
	won: false,
	winReached: false,
	over: false,
	announcement: ''
});

// Adds up the new tiles made by merging one row or column.
function pointsForLine(line) {
	const tiles = [];
	for (const tile of line) {
		if (tile !== 0) {
			tiles.push(tile);
		}
	}

	let points = 0;
	let i = 0;
	while (i < tiles.length - 1) {
		if (tiles[i] === tiles[i + 1]) {
			points += tiles[i] * 2;
			i += 2;
		} else {
			i += 1;
		}
	}
	return points;
}

function pointsForMove(board, direction) {
	let points = 0;
	for (let i = 0; i < 4; i++) {
		if (direction === 'left' || direction === 'right') {
			points += pointsForLine(board[i]);
		} else {
			const column = [board[0][i], board[1][i], board[2][i], board[3][i]];
			points += pointsForLine(column);
		}
	}
	return points;
}

function hasTile2048(board) {
	for (const row of board) {
		for (const tile of row) {
			if (tile >= 2048) {
				return true;
			}
		}
	}
	return false;
}

function saveGame() {
	const data = {
		board: game.board,
		score: game.score,
		highScore: game.highScore,
		won: game.won,
		winReached: game.winReached,
		over: game.over
	};
	localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function newGame() {
	game.board = spawn(spawn(emptyBoard()));
	game.score = 0;
	game.won = false;
	game.winReached = false;
	game.over = false;
	game.announcement = 'New game started. Score is zero.';
	saveGame();
}

export function restoreGame() {
	const saved = localStorage.getItem(STORAGE_KEY);
	if (saved === null) {
		newGame();
		return;
	}

	try {
		const data = JSON.parse(saved);
		game.board = data.board;
		game.score = data.score || 0;
		game.highScore = data.highScore || 0;
		game.won = data.won === true;
		game.winReached = data.winReached === true;
		// hasMoves throws an error if the saved board is broken.
		game.over = !hasMoves(game.board);
		game.announcement = 'Saved game restored.';
	} catch {
		newGame();
	}
}

export function playMove(direction) {
	if (game.over || !canMove(game.board, direction)) {
		return;
	}

	game.score += pointsForMove(game.board, direction);
	game.board = spawn(move(game.board, direction));

	if (game.score > game.highScore) {
		game.highScore = game.score;
	}

	if (hasTile2048(game.board) && !game.winReached) {
		game.won = true;
		game.winReached = true;
	}

	game.over = !hasMoves(game.board);

	let message = 'Score ' + game.score + '. Best score ' + game.highScore + '.';
	if (game.won) {
		message += ' You reached 2048! Keep playing or start a new game.';
	}
	if (game.over) {
		message += ' Game over. No moves remain.';
	}
	game.announcement = message;

	saveGame();
}

export function keepPlaying() {
	game.won = false;
	game.announcement = 'Continuing game. Score ' + game.score + '.';
	saveGame();
}
