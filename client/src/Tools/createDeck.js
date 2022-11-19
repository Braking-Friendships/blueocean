import React from "react";
React.createContext();

const bomb = {
  type: 'bomb',
  count: 4,
  variation: []
}
const defuse = {
  type: 'defuse',
  count: 6,
  variation: []
}

const attack = {
  type: 'attack',
  count: 4,
  variation: ['img1']
}
const favor = {
  type: 'favor',
  count: 4,
  variation: []
}
const nope = {
  type: 'nope',
  count: 5,
  variation: []
}
const shuffle = {
  type: 'shuffle',
  count: 4,
  variation: []
}
const skip = {
  type: 'skip',
  count: 4,
  variation: []
}
const future = {
  type: 'future',
  count: 5,
  variation: []
}
const tacocat = {
  type: 'tacocat',
  count: 4,
  variation: []
}
const watermeloncat = {
  type: 'watermeloncat',
  count: 4,
  variation: []
}
const burritocat = {
  type: 'burritocat',
  count: 4,
  variation: []
}
const rainbowcat = {
  type: 'rainbowcat',
  count: 4,
  variation: []
}
const beardcat = {
  type: 'beardcat',
  count: 4,
  variation: []
}

const cardTypes = [defuse, attack, skip, favor, nope, shuffle, future, tacocat, watermeloncat, burritocat, rainbowcat, beardcat];

const createDeck = (playerCount) => {

  let deck = [];

  cardTypes.forEach((cardDesc) => {
    let variationCount = cardDesc.variation.length;

    let cardCount = cardDesc.count;
    if(cardDesc.type === 'defuse'){
      if (playerCount < 4) {
        cardCount = 2;
      } else {
        cardCount = cardCount - playerCount;
      }
    }

    for(let i = 0; i < cardCount; i++){
      let card = {};

      let img = cardDesc.variation[i % variationCount]

      card.type = cardDesc.type;
      card.img = img;

      deck.push(card);
    }
  })

  deck = shuffleDeck(deck);

  return finalHandsAndDeck(deck, playerCount);

}

const shuffleDeck = (deck) => {
  let i = deck.length;
  while(i > 0) {
    let idxToSwitch = Math.floor(Math.random() * deck.length);
    i--;
    let temp = deck[i];
    deck[i] = deck[idxToSwitch];
    deck[idxToSwitch] = temp;

  }
  return deck;
}

//CHANGE IMGs LATER
const finalHandsAndDeck = (deck, playerCount) => {
  let result = {};

  for(let i = 0; i < playerCount; i++) {
    let hand = [{type: 'defuse', img: null}];
    for(let i = 0; i < 7; i++){
      hand.push(deck.pop());
    }
    result[`hand${i+1}`] = hand;
  }

  for(let i = 0; i < playerCount - 1; i++) {
    deck.push({type: 'bomb', img: bomb.variation[i]})
  }

  result.deck = shuffleDeck(deck);

  return result;
}

export default createDeck;

/*
  (total players - 1) bombs
  6 defuses - 1 per player, rest in deck
  2-3 players: only place 2 extra defuses in deck
  7 cards to each player (total 8 each)

  replace bombs
  shuffle

  clockwise order
  play any cards or dont
  end turn by drawing 1

  on death, all cards in hand discarded
  on defuse, place bomb randomly in stack (no shuffle)

  attacks can stack (2, 4, etc)

  optional: special combos (2 of a kind: applies to any card to steal from opponent; 3 of a kind: pick a player, name a card. If they have it you steal)

*/