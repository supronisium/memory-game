
// ############## GENERATOR ##############

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


// ############## CARDS ##############

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


// ############## FOOTER ##############

const footer = document.createElement('footer');

// Ходы
const moves = document.createElement('div');

moves.textContent = 'number of moves: ';

const countMoves = document.createElement('span');

countMoves.classList.add('count-moves');

let moveCount = 0;

countMoves.textContent = moveCount;

moves.append(countMoves);


const pairs = document.createElement('div');

pairs.textContent = 'number of pairs: ';

const countNumber = document.createElement('span');

countNumber.classList.add('count-number');

let pairCount = 0;

countNumber.textContent = pairCount;

const textOf = document.createTextNode(' of ');

const countPairs = document.createElement('span');

countPairs.classList.add('count-pairs');
countPairs.textContent = '8';

pairs.append(
  countNumber,
  textOf,
  countPairs
);


footer.append(
  moves,
  pairs
);


// ############## MODAL WIN ##############

const modalWin = document.createElement('div');
modalWin.classList.add('modal-win');

const win = document.createElement('div');

win.classList.add('win');
win.textContent = 'You win!';


// ############## RESULTS ##############

const results = document.createElement('div');

results.classList.add('results');

const mobileMoves = document.createElement('div');

mobileMoves.textContent = 'number of moves: ';

const mobileCountMoves = document.createElement('span');

mobileCountMoves.classList.add('count-moves');
mobileCountMoves.textContent = '0';

mobileMoves.append(mobileCountMoves);


const mobilePairs = document.createElement('div');

mobilePairs.textContent = 'number of pairs: ';

const mobileCountNumber = document.createElement('span');

mobileCountNumber.classList.add('count-number');
mobileCountNumber.textContent = '0';

const mobileTextOf = document.createTextNode(' of ');

const mobileCountPairs = document.createElement('span');

mobileCountPairs.classList.add('count-pairs');
mobileCountPairs.textContent = '8';

mobilePairs.append(
  mobileCountNumber,
  mobileTextOf,
  mobileCountPairs
);


results.append(
  mobileMoves,
  mobilePairs
);


// ############## MODAL BUTTONS ##############


const newGameModalButton = document.createElement('button');

newGameModalButton.classList.add('btn', 'btn-close');
newGameModalButton.type = 'button';
newGameModalButton.textContent = 'New game';


const closeModalButton = document.createElement('button');

closeModalButton.classList.add('btn', 'btn-closeModal');
closeModalButton.type = 'button';
closeModalButton.textContent = 'Close';


// ############## MODAL STRUCTURE ##############

modalWin.append(
  win,
  results,
  newGameModalButton,
  closeModalButton
);


// ############## MEMORY GAME ##############

let openedCards = [];
let matchedCards = [];
let isChecking = false;


// ############## NEW GAME ##############

function startNewGame() {

  moveCount = 0;
  pairCount = 0;

  countMoves.textContent = moveCount;
  countNumber.textContent = pairCount;


  mobileCountMoves.textContent = moveCount;
  mobileCountNumber.textContent = pairCount;


  openedCards = [];
  matchedCards = [];
  isChecking = false;


  cards.forEach((card) => {

    const cardInner = card.querySelector('div');

    cardInner.classList.remove('open');
  });


  cards.sort(() => Math.random() - 0.5);


  cardContainer.append(...cards);


  modalWin.classList.remove('show');
}


// ############## CHECK WIN ##############

function checkWin() {

  if (pairCount === 8) {

    mobileCountMoves.textContent = moveCount;
    mobileCountNumber.textContent = pairCount;

    modalWin.classList.add('show');
  }
}


// ############## CARD CLICK ##############

cards.forEach((card) => {

  card.addEventListener('click', () => {

    if (isChecking) return;

    if (openedCards.includes(card)) return;

    if (matchedCards.includes(card)) return;


    const cardInner = card.querySelector('div');

    cardInner.classList.add('open');

    openedCards.push(card);

    if (openedCards.length < 2) return;


    // ############## STEP ##############

    moveCount++;

    countMoves.textContent = moveCount;

    mobileCountMoves.textContent = moveCount;


    // ############## PAIR CHECK ##############

    const firstCard = openedCards[0];
    const secondCard = openedCards[1];

    if (firstCard.id === secondCard.id) {

      matchedCards.push(firstCard, secondCard);

      pairCount++;

      countNumber.textContent = pairCount;

      mobileCountNumber.textContent = pairCount;

      openedCards = [];

      checkWin();


    } else {

      isChecking = true;


      setTimeout(() => {

        firstCard.querySelector('div').classList.remove('open');

        secondCard.querySelector('div').classList.remove('open');

        openedCards = [];

        isChecking = false;

      }, 1000);
    }
  });

});


// ############## NEW GAME BUTTON ##############

newGameButton.addEventListener('click', () => {

  startNewGame();

});


// ############## MODAL NEW GAME ##############

newGameModalButton.addEventListener('click', () => {

  startNewGame();

});


// ############## CLOSE MODAL ##############

closeModalButton.addEventListener('click', () => {

  modalWin.classList.remove('show');

});


// ############## INITIAL GAME ##############

startNewGame();


// ############## OUTPUT ##############

document.body.append(
  header,
  cardContainer,
  footer,
  modalWin
);