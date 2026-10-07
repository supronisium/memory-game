// ############## GENERATOR ##############


// HEADER

const header = document.createElement('header');

const newGameBlock = document.createElement('div');

const newGameButton = document.createElement('button');
newGameButton.type = 'button';
newGameButton.classList.add('btn', 'btn--new');
newGameButton.textContent = 'new game';

newGameBlock.append(newGameButton);


const gameName = document.createElement('div');
gameName.classList.add('name');
gameName.textContent = 'Memory Game';


const liderBlock = document.createElement('div');

const liderButton = document.createElement('button');
liderButton.type = 'button';
liderButton.classList.add('btn', 'btn--lider');
liderButton.textContent = 'lider table';

liderBlock.append(liderButton);


header.append(
  newGameBlock,
  gameName,
  liderBlock
);


// CARDS

const cardContainer = document.createElement('div');
cardContainer.classList.add('card-container');

const cards = [];



for (let i = 1; i <= 8; i++) {

  for (let j = 0; j < 2; j++) {

    const card = document.createElement('div');

    card.classList.add('card-item');
    card.id = `card${String(i).padStart(2, '0')}`;


    const cardInner = document.createElement('div');

    card.append(cardInner);

    cards.push(card);
  }
}



cards.sort(() => Math.random() - 0.5);



cardContainer.append(...cards);


// FOOTER

const footer = document.createElement('footer');


//
const moves = document.createElement('div');

moves.textContent = 'number of moves: ';

const countMoves = document.createElement('span');

countMoves.classList.add('count-moves');
countMoves.textContent = '5';

moves.append(countMoves);


//
const pairs = document.createElement('div');

pairs.textContent = 'number of pairs: ';

const countNumber = document.createElement('span');

countNumber.classList.add('count-number');
countNumber.textContent = '2';

const textOf = document.createTextNode(' of ');

const countPairs = document.createElement('span');

countPairs.classList.add('count-pairs');
countPairs.textContent = '8';


pairs.append(
  countNumber,
  textOf,
  countPairs
);


// FOOTER
footer.append(
  moves,
  pairs
);


// ALL SHOW

document.body.append(
  header,
  cardContainer,
  footer
);
