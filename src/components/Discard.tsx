import { getCardImagePath } from "./Card";

interface DiscardProps {
  id: number;
  suit: string;
  rank: string;
  toggleContainer: () => void;
}

const DiscardPile = ({ id, rank, suit, toggleContainer }: DiscardProps) => {
  return (
    <div className="card">
      <button className='p-0 m-0 border-none select-none w-36 h-52.5' onClick={toggleContainer}>
        <img 
          src={getCardImagePath(rank, suit)} 
          alt={`Discard Pile`} 
          className="block object-contain" 
        />
      </button>
    </div>
  );
};

export default DiscardPile;