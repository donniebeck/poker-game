import { Card } from '../components/Card';

export enum HandRank {
  HIGH_CARD,
  ONE_PAIR,
  TWO_PAIR,
  THREE_OF_A_KIND,
  STRAIGHT,
  FLUSH,
  FULL_HOUSE,
  FOUR_OF_A_KIND,
  STRAIGHT_FLUSH,
  ROYAL_FLUSH
}

function countValues(hand: Card[]): Map<string, number> {
    const valueCounts = new Map<string, number>();
    hand.forEach(card => {
        const value = card.rank;
        valueCounts.set(value, (valueCounts.get(value) || 0) + 1);
    })
    return valueCounts;
}

function countSuits(hand: Card[]): Map<string, number> {
    const suitCounts = new Map<string, number>();
    hand.forEach(card => {
        const suit = card.suit;
        suitCounts.set(suit, (suitCounts.get(suit) || 0) + 1);
    })
    return suitCounts;
}



export const evaluateHand = (hand: Card[]): HandRank => {

    const values = "23456789TJQKA";

    const valueCounts = countValues(hand);
    const suitCounts = countSuits(hand);
    let isFlush = false;
    let isStraight = false;
    let isRoyalFlush = false;

    if(hand.length === 5) {
        isFlush = Array.from(suitCounts.values()).some(count => count >= 5);

        const sortedValues = Array.from(valueCounts.keys())
                                .map(value => values.indexOf(value))
                                .sort((a,b) => a-b);
        isStraight = sortedValues.every((value, index) =>
            index === 0 || value === sortedValues[index - 1] + 1);

        isRoyalFlush = isStraight && isFlush && 
            JSON.stringify(sortedValues) === JSON.stringify([8, 9, 10, 11, 12]);
    }

    

        if (isRoyalFlush) {
            return HandRank.ROYAL_FLUSH;
        } else if (isStraight && isFlush) {
            return HandRank.STRAIGHT_FLUSH;
        } else if (Array.from(valueCounts.values()).includes(4)) {
            return HandRank.FOUR_OF_A_KIND;
        } else if (Array.from(valueCounts.values()).includes(3) && 
                   Array.from(valueCounts.values()).includes(2)) {
            return HandRank.FULL_HOUSE;
        } else if (isFlush) {
            return HandRank.FLUSH;
        } else if (isStraight) {
            return HandRank.STRAIGHT;
        } else if (Array.from(valueCounts.values()).includes(3)) {
            return HandRank.THREE_OF_A_KIND;
        } else if (Array.from(valueCounts.values()).filter(count => count === 2).length === 2) {
            return HandRank.TWO_PAIR;
        } else if (Array.from(valueCounts.values()).includes(2)) {
            return HandRank.ONE_PAIR;
        } else {
            // const highCard = values[Math.max(...sortedValues)];
            return HandRank.HIGH_CARD;
        }
};
