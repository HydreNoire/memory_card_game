const inputBox = document.querySelector("#input_box");
const suggestionInput = document.querySelector("#suggestions");
let input = inputBox.querySelector("#input_champ");
let suggestions = document.querySelectorAll(".suggest_card");

input.addEventListener("input", (e) => {
    fetch("./champ_infos/champions.json")
        .then((resp) => resp.json())
        .then(function (data) {
            let champions = data.champions;

            clearSuggestions();

            for (i in champions) {
                if (champions[i].name.toLowerCase().startsWith(e.target.value.toLowerCase()) && e.target.value != "") {
                    // console.log("Trouvé", champions[i].name);

                    let newSuggest = document.createElement("div");
                    newSuggest.classList.add("suggest_card");
                    newSuggest.innerHTML = `<img src="${champions[i].image}" width="40px"> ${champions[i].name}`
                    newSuggest.onclick = () => input.value = newSuggest.innerText;
                    suggestionInput.append(newSuggest);
                    console.log(newSuggest.innerText)
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