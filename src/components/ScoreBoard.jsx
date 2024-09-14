export default function ScoreBoard({ score, bestScore }) {
  return (
    <div className="score-board">
      <p>
        Score: <span>{score}</span>
      </p>
      <p>
        Best Score: <span>{bestScore}</span>
      </p>
    </div>
  );
}
