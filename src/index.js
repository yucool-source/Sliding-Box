import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';

const MOV_LEFT = [0, 1, 3, 4, 6, 7]
const MOV_RIGHT = [1, 2, 4, 5, 7, 8]
const MOV_UP = [0, 1, 2, 3, 4, 5]
const MOV_DOWN = [3, 4, 5, 6, 7, 8]


function Square(props) {
	return (
		<button className="square">
			{props.value}
		</button>
	);
}

class Board extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			squares: [
				1, 2, 3,
				4, 5, 6,
				7, 8, null
			],
		};
		this.empty_square = 8;
	}

	renderSquare(i) {
		return (
			<Square
				value={this.state.squares[i]}
			/>
		);
	}

	handleKeyPress = (event) => {
		console.log(event.key)

		if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {

			const cur_pos = this.empty_square;
			var next_pos;

			if (event.key === "ArrowRight" && MOV_RIGHT.includes(this.empty_square)) {

				next_pos = this.empty_square - 1;

			} else if (event.key === "ArrowLeft" && MOV_LEFT.includes(this.empty_square)) {

				next_pos = this.empty_square + 1;

			} else if (event.key === "ArrowDown" && MOV_DOWN.includes(this.empty_square)) {

				next_pos = this.empty_square - 3;

			} else if (event.key === "ArrowUp" && MOV_UP.includes(this.empty_square)) {

				next_pos = this.empty_square + 3;

			}
			
			if (next_pos != null) {
				const squares = this.state.squares.slice();
				console.log("next_pos: " + next_pos);
				squares[cur_pos] = squares[next_pos];
				squares[next_pos] = null;
				this.empty_square = next_pos;

				this.setState({ squares: squares });

			}

		}
	}

	render() {
		return (
			<div onKeyDown={this.handleKeyPress}>
				<div className="board-row">
					{this.renderSquare(0)}
					{this.renderSquare(1)}
					{this.renderSquare(2)}
				</div>
				<div className="board-row">
					{this.renderSquare(3)}
					{this.renderSquare(4)}
					{this.renderSquare(5)}
				</div>
				<div className="board-row">
					{this.renderSquare(6)}
					{this.renderSquare(7)}
					{this.renderSquare(8)}
				</div>
			</div>
		);
	}
}

class Game extends React.Component {




	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board />
				</div>
				<div className="game-info">
					<div>{/* status */}</div>
					<ol>{/* TODO */}</ol>
				</div>
			</div>
		);
	}
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Game />
	</React.StrictMode>
);

