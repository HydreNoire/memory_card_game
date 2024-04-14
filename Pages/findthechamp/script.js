const inputBox = document.querySelector("#input_box");
const suggestionInput = document.querySelector("#suggestions");
const resultBox = document.querySelector("#result");
let input = inputBox.querySelector("#input_champ");
let suggestions = document.querySelectorAll(".suggest_card");

// VARIABLE FOR CHAMP TO RETRIEVE
let nameChamp;
let genreChamp;
let roleChamp;
let especeChamp;
let ressourceChamp;
let porteeChamp;
let regionChamp;
let sortieChamp;

window.addEventListener("load", () => {
    fetch("./champ_infos/champions.json")
        .then((resp) => resp.json())
        .then(function (data) {
            let champions = data.champions;
            let randomInt = Math.floor(Math.random() * champions.length);

            nameChamp = champions[randomInt].name;
            console.log(nameChamp)
            genreChamp = champions[randomInt].genre;
            roleChamp = champions[randomInt].role;
            especeChamp = champions[randomInt].espece;
            ressourceChamp = champions[randomInt].ressource;
            porteeChamp = champions[randomInt].portee;
            regionChamp = champions[randomInt].region;
            sortieChamp = champions[randomInt].sortie;

        })
        .catch(function (err) {
            console.log(err);
        });
})

input.addEventListener("input", (e) => {
    fetch("./champ_infos/champions.json")
        .then((resp) => resp.json())
        .then(function (data) {
            let champions = data.champions;

            clearSuggestions();

            for (i in champions) {
                if (champions[i].name.toLowerCase().startsWith(e.target.value.toLowerCase()) && e.target.value != "") {
                    let newSuggest = document.createElement("div");
                    newSuggest.classList.add("suggest_card");
                    newSuggest.innerHTML = `<img src="${champions[i].image}" width="40px"> ${champions[i].name}`
                    newSuggest.onclick = () => {
                        input.value = newSuggest.innerText;
                        newGuess(newSuggest.innerText, resultBox);
                        input.value = "";
                    };
                    suggestionInput.append(newSuggest);
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
});

// Si l'input n'a plus le focus je retire la possibilité de 
inputBox.addEventListener("focusout", () => {
    setTimeout(() => {
        clearSuggestions();
    }, 100);
});

// Function who clear the suggestions box for input
function clearSuggestions() {
    return suggestionInput.innerHTML = "";
}

// Add a new line for new guess
function newGuess(champ, parent) {
    fetch("./champ_infos/champions.json")
        .then((resp) => resp.json())
        .then(function (data) {
            let champions = data.champions;

            for (i in champions) {
                console.log(champions[i]);
                if (champ == champions[i].name) {
                    console.log(champ, "est égal à", champions[i].name);
                    for (const property in champions[i]) {
                        console.log(`${property}: ${champions[i][property]}`);
                        if (property == "name") {
                            continue;
                        } else if (property == "image") {
                            let guess = document.createElement("div");
                            guess.classList.add("guess_card");
                            guess.classList.add("guess_card_img");
                            guess.style.background = `url('${champions[i][property]}')`;
                            guess.style.backgroundSize = "contain";
                            parent.prepend(guess);
                        }
                        else {
                            let guess = document.createElement("div");
                            guess.classList.add("guess_card");
                            if (champions[i][property] == genreChamp) {
                                guess.style.background = "green";
                            } else {
                                guess.style.background = "red";
                            }
                            guess.innerHTML = `${champions[i][property]}`;
                            parent.prepend(guess);
                        }
                    }
                }
            }
        })

}