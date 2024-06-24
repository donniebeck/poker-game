import './App.css'
import { useState } from 'react';
import { Card } from './components/Card';
import Deck from './components/Deck';
import CardContainer from './components/CardContainer';
import newdeck from './newdeck.json';
import DiscardPile from './components/Discard';
import PlaceHolder from './components/Empty';
import Hand from './components/Hand';
import Score from './components/Score';
import { HandRank, evaluateHand } from './utils/evaluateHand';

export const maxhandsize = 8;

function App() {
  const [deck, setDeck] = useState<Card[]>(newdeck);
  const [discardPile, setDiscardPile] = useState<Card[]>([]);
  const [hand, setHand] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [showContainer, setShowContainer] = useState<'deck' | 'discard' | null>(null);
  const [score, setScore] = useState<number>(0);
  const [discards, setDiscards] = useState<number>(2);
  const [hands, setHands] = useState<number>(2);

  const lastDiscardedCard = discardPile.length > 0 ? discardPile[discardPile.length - 1] : null;

  const toggleContainer = (container: 'deck' | 'discard') => {
    setShowContainer((prev) => (prev === container ? null : container));
  }

  const startGame = () => {
    const shuffledDeck = [...deck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }  
    const newHand = [];
  
    for (let i = 0; i < maxhandsize; i++) {
      const drawnCard = shuffledDeck.pop();
      if (drawnCard) {
        newHand.push(drawnCard);
      }
    }
    setHand(newHand);
    setDeck(shuffledDeck);
    setDiscards(2);
    setHands(2);
    setScore(0);
  };

  const restartGame = () => {
    const shuffledDeck = [...newdeck];
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]];
    }  
    const newHand = [];
  
    for (let i = 0; i < maxhandsize; i++) {
      const drawnCard = shuffledDeck.pop();
      if (drawnCard) {
        newHand.push(drawnCard);
      }
    }
    setHand(newHand);
    setDeck(shuffledDeck);
    setDiscardPile([]);
    setDiscards(2);
    setHands(2);
    setScore(0);
  };

  const selectCard = (card: Card) => {
    setSelectedCards((prev) => 
      prev.includes(card) ? prev.filter(i => i !== card) : (selectedCards.length === 5) ? prev : [...prev, card] 
    );
  }

  const discardSelectedCards = () => {
    if (selectedCards.length === 0) return;
    if (discards === 0) return;
    const numberToReplace = selectedCards.length;
    const newHand = hand.filter(card => !selectedCards.includes(card));
    const discardedCards = hand.filter(card => selectedCards.includes(card));
    setDiscardPile([...discardPile, ...discardedCards]);
    setSelectedCards([]);
    const newDeck = [...deck];
    for (let i = 0; i < numberToReplace; i++) {
      if (newDeck.length === 0) break;
      const drawnCard = newDeck.pop();
      if (drawnCard) {
        newHand.push(drawnCard);
      }
    }
    setHand(newHand);
    setDeck(newDeck);
    setDiscards(discards - 1);
  };

  const playSelectedCards = () => {
    if(selectedCards.length === 0) return;
    const rank = evaluateHand(selectedCards);

    let points = 0;
    switch (rank) {
      case HandRank.ONE_PAIR:
        points = 1;
        break;
      case HandRank.TWO_PAIR:
        points = 2;
        break;
      case HandRank.THREE_OF_A_KIND:
        points = 3;
        break;
      case HandRank.STRAIGHT:
        points = 4;
        break;
      case HandRank.FLUSH:
        points = 5;
        break;
      case HandRank.FULL_HOUSE:
        points = 6;
        break;
      case HandRank.FOUR_OF_A_KIND:
        points = 7;
        break;
      case HandRank.STRAIGHT_FLUSH:
        points = 8;
        break;
      case HandRank.ROYAL_FLUSH:
        points = 9;
        break;
      default:
        points = 0;
        break;
    }
    setScore(score + points);

    const numberToReplace = selectedCards.length;
    const newHand = hand.filter(card => !selectedCards.includes(card));
    const discardedCards = hand.filter(card => selectedCards.includes(card));
    setDiscardPile([...discardPile, ...discardedCards]);
    setSelectedCards([]);
    const newDeck = [...deck];
    for (let i = 0; i < numberToReplace; i++) {
      if (newDeck.length === 0) break;
      const drawnCard = newDeck.pop();
      if (drawnCard) {
        newHand.push(drawnCard);
      }
    }
    setHand(newHand);
    setDeck(newDeck);
    setDiscards(2);
    setHands(hands - 1);
  }

  return (
    <div className="app-container bg-green-900 flex h-screen w-screen" style={{ fontFamily: "'Press Start 2P', cursive" }}>
      {/* Sidebar */}
      <div className="sidebar p-4 text-black flex flex-col w-1/8 justify-between items-center">
        {deck.length !== 0 ? (
          <Deck toggleContainer={() => toggleContainer('deck')} />
        ) : (
          <PlaceHolder title="Empty Deck" />
        )}
        <Score score={score} hands={hands} discards={discards} />
        {lastDiscardedCard ? (
          <DiscardPile
            id={lastDiscardedCard.id}
            rank={lastDiscardedCard.rank}
            suit={lastDiscardedCard.suit}
            toggleContainer={() => toggleContainer('discard')}
          />
        ) : (
          <PlaceHolder title="Empty Discard Pile" />
        )}
      </div>
  
      {/* Main Content */}
      <div className="main-content p-4 bg-green-800 flex-grow overflow-auto">
        {showContainer === 'deck' && <CardContainer type="deck" cards={deck} />}
        {showContainer === 'discard' && <CardContainer type="discard" cards={discardPile} />}
        <div className="hand-wrapper flex flex-col items-center justify-center h-full">
          {hands > 0 ? (
            <>
              {hand.length === 0 && deck.length !== 0 && (
                <button className="start-button bg-white text-black w-40" onClick={startGame}>
                  Start Game
                </button>
              )}
              {!showContainer && (
                <Hand
                  hand={hand}
                  selectedCards={selectedCards}
                  onSelectCard={selectCard}
                  onDiscardCards={discardSelectedCards}
                  onPlayCards={playSelectedCards}
                />
              )}
            </>
          ) : (
            <button className="restart-button bg-white text-black w-40" onClick={restartGame}>
              Restart Game
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
}

export default App
