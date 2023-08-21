'use strict'
/////////    Selectors     ///////////
const cardFront = document.getElementById("card-front");

const cardBack = document.getElementById("card-back");

const newCardButton = document.getElementById("new-card-button");

const closeModalButton = document.querySelector('#close-modal');

const showButton = document.getElementById('show-button');

const modal = document.getElementById('modal');

const addButton = document.getElementById('button-modal');

const easyButton = document.getElementById('easy-button');

const fairButton = document.getElementById('normal-button');

const difficultButton = document.getElementById('difficult-button');

const forgotButton = document.getElementById('forgot-button');

const explanationModal = document.getElementById('explanation-modal')

const explanationLink = document.getElementById('explanation-link')

const closeExplanation = document.getElementById('close-explanation')
////////////////// Storage ////////////////////
let flashCards = [];
let currentCard = 0;
let previousCard = 0;
// to be used to set the difficulty buttons as inactive until answer shown
let buttonsActive = false;   

//////////////////    Functions      //////////////// 
//////////// Showing next card /////////////
const showNextCard = function () {
    if (flashCards.length === 0) {
        cardFront.append("Click 'Add New Card' to begin");
    }
        else {cardBack.textContent = '';
            cardFront.textContent = flashCards[currentCard]['frontCard']};
}

/////// Sets next card to show ///////////
const setNextCard = function (cards, key) {
    currentCard = findLowest(cards, key);   // finds object in array with lowest value
    // finds next lowest card if card will repeat
    if (currentCard === previousCard && cards.length > 1) { 
        const notSameCard = function(thisCard, index) {
            return index !== previousCard;
        }
        const tempArray = cards.filter(notSameCard);
        currentCard = findLowest(tempArray, key);
        previousCard = currentCard;
    }
       else {
           previousCard = currentCard;
       }
};

/////////////Adding new card///////////////
const newCard = function (a) {
    a.preventDefault();
    flashCards.push({
        'frontCard': document.getElementById('front-input').value,
        'backCard': document.getElementById('back-input').value,
        'delay': 100,            //sets delay before card shown again
        'multiplier': 1,   //multiplies delay when card is repeatedly fair or easy
        'modifier': 25           //removed from delay each time any card gets revised to control when shown
    });
    document.querySelector('form').reset();
    if (flashCards.length === 1) {
        showNextCard();
    }
    modal.close();
    console.log(flashCards);
};

///// Loop returning index of array object with lowest key value ////////
const findLowest = function (arr, num) {
    let lowest = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][num] < arr[lowest][num] || i === 0) {
            lowest = i;
        }    
}
    return lowest;
};

//// Hiding and removing difficulty buttons ///
const hiddenButtons = function () {
    easyButton.classList.add('hidden');
    fairButton.classList.add('hidden');
    difficultButton.classList.add('hidden');
    forgotButton.classList.add('hidden');
}

const visibleButtons = function () {
    easyButton.classList.remove('hidden');
    fairButton.classList.remove('hidden');
    difficultButton.classList.remove('hidden');
    forgotButton.classList.remove('hidden');
}

////////////// App start function calls ////////////////////

showNextCard();


/////////// Button Listeners ///////////////
/////////// Sends new card to array /////////////
closeExplanation.addEventListener('click', (a) => {
    a.preventDefault();
    explanationModal.close();
});

addButton.addEventListener('click', (newCard));

/////////////opening and closing modal for new card entry form//////////
newCardButton.addEventListener('click', () => {
    modal.showModal();
});

//////////// X button closes the modal ///////////
closeModalButton.addEventListener('click', (a) => {
    a.preventDefault();
    modal.close();
});

/////// Show Answer reveals back of card +_activates difficulty buttons //////////
showButton.addEventListener('click', () => {
    cardBack.textContent = flashCards[currentCard].backCard;
    buttonsActive = true;
    visibleButtons();
} );

/////// Diffculty Buttons //////////

easyButton.addEventListener('click', () => {
    if (buttonsActive === true) {
        for (let i = 0; i < flashCards.length; i++) {
            if (i !== currentCard) {
                flashCards[i].delay = flashCards[i].delay - flashCards[i].modifier;
         }
        }
        flashCards[currentCard].multiplier = flashCards[currentCard].multiplier + 0.1;
        flashCards[currentCard].delay = 100 * flashCards[currentCard].multiplier;
        flashCards[currentCard].modifier = 5;
        setNextCard(flashCards, 'delay');
        showNextCard();
        buttonsActive = false;
        hiddenButtons();
}
});


fairButton.addEventListener('click', () => {
    if (buttonsActive === true) {
        for (let i = 0; i < flashCards.length; i++) {
            if (i !== currentCard) {
                flashCards[i].delay = flashCards[i].delay - flashCards[i].modifier;
            }
        }
        flashCards[currentCard].multiplier = flashCards[currentCard].multiplier + 0.05;
        flashCards[currentCard].delay = 100 * flashCards[currentCard].multiplier;
        flashCards[currentCard].modifier = 10;
        setNextCard(flashCards, 'delay');
        showNextCard();
        buttonsActive = false;
        hiddenButtons();
}
});

difficultButton.addEventListener('click', () => {
    if (buttonsActive === true) {
        for (let i = 0; i < flashCards.length; i++) {
            if (i !== currentCard) {
                flashCards[i].delay = flashCards[i].delay - flashCards[i].modifier;
            }
        }
        flashCards[currentCard].multiplier = 1;
        flashCards[currentCard].delay = 100 * flashCards[currentCard].multiplier;
        flashCards[currentCard].modifier = 20;
        setNextCard(flashCards, 'delay');
        showNextCard();
        buttonsActive = false; 
        hiddenButtons();
}
});

forgotButton.addEventListener('click', () => {
    if (buttonsActive === true) {
        for (let i = 0; i < flashCards.length; i++) {
            if (i !== currentCard) {
                flashCards[i].delay = flashCards[i].delay - flashCards[i].modifier;
            }
        }
        flashCards[currentCard].delay = 100 * flashCards[currentCard].multiplier;
        flashCards[currentCard].multiplier = 1;
        flashCards[currentCard].modifier = 25;
        setNextCard(flashCards, 'delay');
        showNextCard();
        buttonsActive = false; 
        hiddenButtons();
}
});

explanationLink.addEventListener('click', () => {
    explanationModal.showModal();
})
