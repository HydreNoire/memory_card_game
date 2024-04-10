const inputBox = document.querySelector("#input_box");
const suggestionInput = document.querySelector("#suggestions");
let input = inputBox.querySelector("#input_champ");
let suggestions = document.querySelectorAll(".suggest_card");

input.addEventListener("input", (e) => {
    fetch("./champ_infos/champions.json")
        .then((resp) => resp.json())
        .then(function (data) {
            console.log(e.target.value);
            let champions = data.champions;

            clearSuggestions();

            for (i in champions) {
                if (champions[i].name.toLowerCase().startsWith(e.target.value.toLowerCase()) && e.target.value != "") {
                    console.log("Trouvé", champions[i].name);

                    let newSuggest = document.createElement("div");
                    newSuggest.classList.add("suggest_card");
                    // newSuggest.onclick = () => function pour remplir le champ;
                    newSuggest.innerHTML = `<img src="${champions[i].image}" width="40px"> ${champions[i].name}`
                    suggestionInput.append(newSuggest);
                }
            }
        })
        .catch(function (err) {
            console.log(err);
        });
});

input.addEventListener("focusout", () => {
    clearSuggestions();
});

function clearSuggestions() {
    console.log("Je vide les suggestions présentes.")
    return suggestionInput.innerHTML = "";
}