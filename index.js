let player = {
    name: "Your Name",
    chips: 100
}

let cards = []
let sum = 0
let goBtn = false;
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const createPlayerEl = document.querySelector(".create-player")
const inputEl = document.querySelector("input");
const modalLostEl = document.querySelector("#modal-lost");
const modalWinEl = document.querySelector("#modal-win");
const modalGoEl = document.querySelector("#modal-go");

function createPlayer() {
    player.name = inputEl.value ? inputEl.value : "Joker";
    createPlayerEl.style.display = "none";
    playerEl.style.display = "block";
    playerEl.textContent = player.name + ": $" + player.chips;
    goBtn = true;
}

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    if (!goBtn) {
        modalGoEl.style.display = "block";
    }
    
    if (!isAlive || sum === 21) {
        chipsCalc();
    }
    if (goBtn) {
        isAlive = true
        let firstCard = getRandomCard()
        let secondCard = getRandomCard()
        cards = [firstCard, secondCard]
        sum = firstCard + secondCard
        renderGame()
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }

    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (!goBtn) {
        modalGoEl.style.display = "block";
    }
    if (isAlive === true && hasBlackJack === false && goBtn === true) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
    }
}

function chipsCalc() {
    if (sum > 21) {
        player.chips -= sum;
        if (player.chips <= 0) {
            modalLostEl.style.display = "block";
        }
        playerEl.textContent = player.name + ": $" + player.chips;
    } else if (sum === 21) {
        player.chips += 1000;
        modalWinEl.style.display = "block";
        playerEl.textContent = player.name + ": $" + player.chips;
    }
}

function newStart() {
    modalLostEl.style.display = "none";
    sum = 0;
    player.chips = 100
    playerEl.textContent = player.name + ": $" + player.chips;
    sumEl.textContent = "Sum: " + sum;
    cardsEl.textContent = "Cards: "
}

function continueWin() {
    modalWinEl.style.display = "none";
    hasBlackJack = false;
    sum = 0;
    sumEl.textContent = "Sum: " + sum;
    cardsEl.textContent = "Cards: "
}

function closeGo() {
    modalGoEl.style.display = "none";
}
