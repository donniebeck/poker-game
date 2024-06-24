import Card from "./Card";

interface CardContainerProps {
    cards: { id: number, rank: string; suit: string }[];
    type: string;
}

export default function CardContainer({ cards, type } : CardContainerProps){
    const sortedCards = [...cards]
    if (type === "deck") sortedCards.sort((a,b) => a.id - b.id);

    return (
        <div className="card-container grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
            {sortedCards.map((card) => (
                <Card id={card.id} rank={card.rank} suit={card.suit} />
            ))}
        </div>
    );
}