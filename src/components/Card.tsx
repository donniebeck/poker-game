export interface Card {
    id: number;
    suit: string;
    rank: string;
}

export const getCardImagePath = (rank: string, suit: string) => {
  return `/cards/${rank}${suit}.svg`
};

const Card = ({ id, rank, suit }: Card) => {
    return (
      <div className="card">
        <button className='p-0 m-0 border-none select-none w-36 h-52.5'>
          <img 
            src={getCardImagePath(rank, suit)} 
            alt={`${rank} of ${suit}`} 
            className="block object-contain" 
          />
        </button>
      </div>
    );
  };

  export default Card;