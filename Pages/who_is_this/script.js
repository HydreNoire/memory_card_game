const cardBox = document.querySelector("#card_section");
let startBtn = document.querySelector("#start_game");
let champArr = [];

startBtn.addEventListener("click", () => {
    champArr = [];
    fetch("./champs.json")
        .then((resp) => resp.json())
        .then(function (data) {
            createArrCards(Object.keys(data.data).length, 24, champArr);

            for (i in champArr) {
                let newCard = document.createElement("div");
                newCard.classList.add("guess_card");
                newCard.innerHTML = `<div class="front" style="color: white;"><img src="${data.data[i].image}">${data.data[i].name}</div>`
                cardBox.append(newCard);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
})

// CREATE CARDS BY NB OF CARDS SELECTED
// function createCard(parent) {
//     let newCard = document.createElement("div");
//     newCard.classList.add("guess_card");
//     newCard.innerHTML = `<div class="front">${}</div>`
//     parent.append(newCard);
// }

// CREATE A ARRAY
function createArrCards(length, maxArrCard, arr) {
    while (arr.length < maxArrCard) {
        let numberToPush = getRandomInt(0, length);

        if (arr.includes(numberToPush)) {
            continue;
        } else {
            arr.push(numberToPush);
        }
    }
    return arr
}

// GET A RANDOM INTEGER BETWEEN A MAX AND MIN
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}