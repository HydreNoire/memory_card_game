const cardBox = document.querySelector("#card_section");
const guessingBox = document.querySelector("#guessing");
let startBtn = document.querySelector("#start_game");
let champArr = [];

startBtn.addEventListener("click", () => {
    champArr = [];
    cardBox.innerHTML = "";
    guessThisChamp();
    fetch("./champs.json")
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(Object.keys(data.data).length)
            createArrCards(Object.keys(data.data).length, 24, champArr);

            for (i in champArr) {
                let newCard = document.createElement("div");
                newCard.innerHTML = `<div class="guess_card" style="color: white;"><img weidth="50px" height="50px" src="${data.data[champArr[i]].image}">${data.data[champArr[i]].name}</div>`;
                newCard.onclick = () => {
                    if (newCard.classList.contains("unselected")) {
                        newCard.classList.remove("unselected");
                        newCard.style.opacity = "1";
                        newCard.style.border = "none";
                    } else {
                        newCard.classList.add("unselected");
                        newCard.style.opacity = ".5";
                        newCard.style.border = "1px solid red";
                    }

                };
                cardBox.append(newCard);
            }
        })
        .catch(function (err) {
            console.log(err);
        });
})

function guessThisChamp() {
    guessingBox.innerHTML = "";

    fetch("./champs.json")
        .then((resp) => resp.json())
        .then(function (data) {
            let randomInt = getRandomInt(0, Object.keys(data.data).length);

            let newGuess = document.createElement("div");
            newGuess.innerHTML = `<div class="guess_champ" style="color: white;"><img weidth="50px" height="50px" src="${data.data[randomInt].image}">${data.data[randomInt].name}</div>`
            guessingBox.append(newGuess);
        })
        .catch(function (err) {
            console.log(err);
        });
}

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

// RULES EVENT
let infos = document.querySelector("#rules h2 span");
let infosText = document.querySelector("#rules_text");

infos.addEventListener("mouseover", () => {
    infosText.style.display = "block";
});

infos.addEventListener("mouseleave", () => {
    infosText.style.display = "none";
})