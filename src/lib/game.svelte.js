import { canMove, hasMoves, move, spawn } from '@xiuxiuying/arcade-core';

const STORAGE_KEY = 'xiuxiu-arcade-2048';
const freshBoard = () => Array.from({ length: 4 }, () => Array(4).fill(0));

export const game = $state({
	board: freshBoard(),
	score: 0,
	highScore: 0,
	started: false,
	won: false,
	winReached: false,
	over: false,
	announcement: ''
});

function pointsForLine(line) {
	const tiles = line.filter((tile) => tile !== 0);
	let points = 0;
	for (let index = 0; index < tiles.length - 1; index += 1) {
		if (tiles[index] === tiles[index + 1]) {
			points += tiles[index] * 2;
			index += 1;
		}
	}
	return points;
}

function pointsForMove(board, direction) {
	if (direction === 'left' || direction === 'right') {
		return board.reduce((total, row) => total + pointsForLine(row), 0);
	}
	return Array.from({ length: 4 }, (_, column) => pointsForLine(board.map((row) => row[column])))
		.reduce((total, points) => total + points, 0);
}

function saveGame() {
	if (typeof localStorage === 'undefined') return;
	try {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify({
				board: game.board,
				score: game.score,
				highScore: game.highScore,
				started: game.started,
				won: game.won,
				winReached: game.winReached,
				over: game.over
			})
		);
	} catch {
		// The game remains usable if storage is unavailable or full.
	}
}

export function newGame() {
	game.board = spawn(spawn(freshBoard()));
	game.score = 0;
	game.started = true;
	game.won = false;
	game.winReached = false;
	game.over = false;
	game.announcement = 'New game started. Score is zero.';
	saveGame();
}

export function restoreGame() {
	if (typeof localStorage !== 'undefined') {
		try {
			const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
			const validBoard =
				Array.isArray(saved?.board) &&
				saved.board.length === 4 &&
				saved.board.every(
					(row) =>
						Array.isArray(row) &&
						row.length === 4 &&
						row.every((tile) => Number.isSafeInteger(tile) && tile >= 0)
				);
			if (validBoard) {
				game.board = saved.board;
				game.score = Number.isSafeInteger(saved.score) && saved.score >= 0 ? saved.score : 0;
				game.highScore = Number.isSafeInteger(saved.highScore) && saved.highScore >= 0 ? saved.highScore : 0;
				game.started = true;
				game.won = Boolean(saved.won);
				game.winReached = Boolean(saved.winReached);
				game.over = Boolean(saved.over) || !hasMoves(game.board);
				game.announcement = 'Saved game restored.';
			}
		} catch {
			// Invalid saved data is discarded by starting a new game below.
		}
	}

	if (!game.started) newGame();
}

export function playMove(direction) {
	if (!game.started) newGame();
	if (game.over || !canMove(game.board, direction)) return;

	const earned = pointsForMove(game.board, direction);
	game.board = spawn(move(game.board, direction));
	game.score += earned;
	game.highScore = Math.max(game.highScore, game.score);

	const reachedTile = game.board.some((row) => row.some((tile) => tile >= 2048));
	if (reachedTile && !game.winReached) {
		game.won = true;
		game.winReached = true;
	}
	game.over = !hasMoves(game.board);
	game.announcement = `Score ${game.score}. Best score ${game.highScore}.${game.won ? ' You reached 2048! Keep playing or start a new game.' : ''}${game.over ? ' Game over. No moves remain.' : ''}`;
	saveGame();
}

export function keepPlaying() {
	game.won = false;
	game.announcement = `Continuing game. Score ${game.score}.`;
	saveGame();
}
