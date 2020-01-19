const cssClass = {
    faPrefix: 'fa fa-',
    default: 'card',
    match: 'card match',
    openShow: 'card open show',
    star: 'star',
    starO: 'star-o'
};

const cardNames = [
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'leaf',
    'bicycle',
    'bomb',
];

const arrCards = [
    ...cardNames,
    ...cardNames
];

var selected = null;
var move;
var matched = 0;

const deck = document.getElementById('deck');

function displayCards() {

    reset();
    shuffle(arrCards);

    for (let i = 0; i < arrCards.length; i++) {

        element = createItem(cssClass.faPrefix + arrCards[i]);
        element.addEventListener('click', elementClick, true);

        deck.appendChild(element);
    }

}

function reset() {
    move = 0;
    updateMove();
    deck.innerText = '';
    while (document.getElementsByClassName('fa-star-o').length > 0) {
        document.getElementsByClassName('fa-star-o')[0].className = cssClass.faPrefix + cssClass.star;
    }
}

function elementClick(event$) {

    var src = event$.srcElement;
    src.className = cssClass.openShow;

    src.removeEventListener('click', elementClick, true);

    if (selected === null) {
        selected = src;
    } else {

        setTimeout(() => {
            checkMatch(src);
        }, 500);

        move++;
        updateMove();
    }

}

function checkMatch(src) {
    if (src.querySelector('i').className === selected.querySelector('i').className) {
        console.log('match');
        src.className = cssClass.match;
        selected.className = cssClass.match;
        matched++;

        if (matched >= arrCards.length / 2) {
            alert('Congratulations! score: ' + move);
            displayCards();
        }
    }
    else {
        console.log('not matched');
        src.className = cssClass.default;
        selected.className = cssClass.default;
        src.addEventListener('click', elementClick, true);
        selected.addEventListener('click', elementClick, true);
    }
    selected = null;
}

function createItem(iconClass) {
    const item = document.createElement("li");
    item.className = cssClass.default

    const icon = document.createElement("i");
    icon.className = iconClass;
    item.appendChild(icon);

    return item;
}

function updateMove() {
    document.querySelector('.moves').innerText = move;

    if (document.getElementsByClassName('fa-star').length >= 0) {
        if ((move > 0) && (move % 3 === 0)) {
            document.getElementsByClassName('fa-star')[document.getElementsByClassName('fa-star').length - 1].className = cssClass.faPrefix + cssClass.starO;
        }
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




displayCards();