const cards = ['Ac', '2c', '3c', '4c', '5c', '6c', '7c', '8c', '9c', 'Tc', 'Jc', 'Qc', 'Kc', 'Ad', '2d', '3d', '4d', '5d', '6d', '7d', '8d', '9d', 'Td', 'Jd', 'Qd', 'Kd', 'Ah', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', 'Th', 'Jh', 'Qh', 'Kh', 'As', '2s', '3s', '4s', '5s', '6s', '7s', '8s', '9s', 'Ts', 'Js', 'Qs', 'Ks'];
const random = () => {
    let playerHand = [];
    let cardDeck = cards;
    for (let i = 0; i < 5; i++) {
        playerHand.push(cardDeck.splice(Math.random() * (cardDeck.length - 1), 1).pop());
    }
    return playerHand;
}


const analyzeHand = (hand) => {
    let rank = 0;
    rank = straight(hand);
    if (rank == true) {
        rank = 4;
        let checkIfStraightFlush = flush(hand);
        if (checkIfStraightFlush > 0) {
            rank = 5;
            return rank;
        } else {
            return rank;
        }
    } else if (rank == 5) {
        return rank;
    } else {
        rank = twoPairs(hand);
        if (rank < 1) {
            let isFlush = flush(hand);
            if (isFlush > 0) {
                rank = 3;
                return rank;
            }
            rank = 0;
            return rank;
        } else {
            return rank;
        }
    }

}

const drawHand = (hands) => {
    for (i = 0; i < hands; i++) {
        let hand = random();
        let result = analyzeHand(hand);
        let rank = ["Nothing", "Single Pair", "Two Pairs", "Flush", "Straight", "Straight Flush"];
        console.log("Hand " + i + ":" + hand + ", you had: " + rank[result]);
    }
}

const splitOn = (slicable, ...indices) =>
    [0, ...indices].map((n, i, m) => slicable.slice(n, m[i + 1]));

const twoPairs = (hand) => {
    let value = [];
    let suits = [];

    for (let i = 0; i < hand.length; i++) {
        let split = splitOn(hand[i], 1);
        value.push(split[0]);
        suits.push(split[1]);
    }

    let current = null;
    let cnt = 0;
    let twoPairs = 0;
    value.sort();
    for (var i = 0; i < value.length; i++) {
        if (value[i] != current) {
            if (cnt > 0) {
                if (cnt == 2) {
                    twoPairs++;
                }
            }
            current = value[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        if (cnt == 2) {
            twoPairs++;
        }
    }
    return twoPairs;

}

const flush = (hand) => {
    let value = []; 
    let suits = [];

    for (let i = 0; i < hand.length; i++) {
        let split = splitOn(hand[i], 1); 
        value.push(split[0]); 
        suits.push(split[1]);
    }

    let current = null;
    let cnt = 0;
    let flush = 0;
    for (let i = 0; i < suits.length; i++) {
        if (suits[i] != current) {
            if (cnt > 0) {
                if (cnt == 5) {
                    flush++;
                }
            }
            current = suits[i];
            cnt = 1;
        } else {
            cnt++;
        }
    }
    if (cnt > 0) {
        if (cnt == 5) {
            flush++;
        }
    }
    return flush;
}

const straight = (hand) => {
    let value = []; 
    let suits = [];
    let isStraight = 0;
    for (let i = 0; i < hand.length; i++) {
        let split = splitOn(hand[i], 1);  
        value.push(split[0]); 
        suits.push(split[1]);
    }

    value[value.indexOf("T")] = '10';
    value[value.indexOf("J")] = '11';
    value[value.indexOf("Q")] = '12';
    value[value.indexOf("K")] = '13';
    value[value.indexOf("A")] = '14';
   
    value.sort();
    let intArray = value.map(parseFloat);
    let ifStraightArray = (array) => {
        let conseq = 1;
        for (let idx = 1; idx < array.length; idx++) {
            if (array[idx] == array[idx - 1] + 1)
                conseq++;
            else
                conseq = 1;
            if (conseq == 5)
                return true;
        }
        return false;
    }
    isStraight = ifStraightArray(intArray);
    if (isStraight == false) {
        intArray[intArray.indexOf(14)] = 1;
        isStraight = ifStraightArray(intArray);
        return isStraight;
    } else {
        return isStraight;
    }
}