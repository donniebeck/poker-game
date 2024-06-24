interface ScoreProps {
  score: number;
  discards: number;
  hands: number;
}

const Score = ({ score, discards, hands }: ScoreProps) => {
  return (
    <div className="bg-gray-800 text-white p-4 rounded shadow-md text-center mb-4">
      <h2 className="text-l font-bold mb-2">Score</h2>
      <div className="text-2xl font-bold">{score}</div>
      <h2 className="text-l font-bold mb-2">Hands</h2>
      <div className="text-2xl font-bold">{hands}</div>
      <h2 className="text-l font-bold mb-2">Discards</h2>
      <div className="text-2xl font-bold">{discards}</div>
    </div>
  );
};

export default Score;
