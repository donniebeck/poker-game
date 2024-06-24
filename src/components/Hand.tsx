import { Card } from './Card';
import CardComponent from './Card';
import { maxhandsize } from '../App';

interface HandProps {
  hand: Card[];
  selectedCards: Card[];
  onSelectCard: (card: Card) => void;
  onDiscardCards: () => void;
  onPlayCards: () => void;
}

const Hand = ({ hand, selectedCards, onSelectCard, onDiscardCards, onPlayCards }: HandProps) => {
    return (
        <>
        <div className='hand-container flex space-x-2 gap-4'>
            {hand.map((card) => (
                <div key={card.id} onClick={() => onSelectCard(card)} className={`card transform transition-transform duration-100 ${selectedCards.includes(card) ? 'scale-110 -translate-y-2' : ''}`}>
                    <CardComponent id={card.id} rank={card.rank} suit={card.suit} />
                </div>
            ))}
        </div>
        {hand.length === maxhandsize && <div className='flex gap-4'>
            <button onClick={onPlayCards} className="discard-button p-2 mt-4 bg-white text-green-900 rounded w-40 h-20" >Play</button>
            <button onClick={onDiscardCards} className="discard-button p-2 mt-4 bg-red-500 text-white rounded w-40 h-20">Discard</button>
        </div>}
        </>
    )
}

export default Hand;