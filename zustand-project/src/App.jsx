import { create } from "zustand";
import { combine } from "zustand/middleware";

const useGameStore = create(
  combine({ squares: Array(9).fill(null) }, (set) => {
    return {
      setSquares: (nextSquares) => {
        set((state) => ({
          squares:
            typeof nextSquares === "function"
              ? nextSquares(state.squares)
              : nextSquares,
        }));
      },
    };
  })
);

export default function Board() {
  const squares = useGameStore((state) => state.squares);
  const setSquares = useGameStore((state) => state.setSquares);

  return (
    <div
      style={{
        displat: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
        width: "calc(3 * 2.5rem)",
        height: "calc(3 * 2.5rem)",
        border: "1px solid black",
      }}
    >
      {squares.map((squre, squareIndex) => (
        <Square key={squareIndex} value={squre} />
      ))}
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        backgroundColor: "#fff",
        border: "1px solid #999",
        outline: 0,
        borderRadius: 0,
        fontSize: "1rem",
        fontWeight: "bold",
      }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}
