interface DeckProps {
    toggleContainer: () => void;
}

export default function Deck({ toggleContainer }: DeckProps) {

    return (
        <div className="deck">
        <button className='p-0 m-0 border-none select-none w-36 h-52.5' onClick={toggleContainer}>
          <img 
            src={'/cards/BackRed.svg'} 
            alt={`deck`} 
            className="block object-contain" 
          />
        </button>
      </div>
    )

}