

let btnNb = document.querySelectorAll("input[type=button]");
let memoBody = document.querySelector("#memo_container");

btnNb.forEach(btn => {
    btn.addEventListener('click', () => {
        createTab(btn.value)
    });
});

function createTab(value) {
    console.log(value)
    memoBody.classList.remove('cant_click');

    if (document.querySelectorAll(".flip__card").length > 0) {
        console.log("Il y a des cartes déjà générées");
        memoBody.innerHTML = '';
    }

    let randomIndexTab = createTabCards(value);
    console.log("Fonction createTabCards() ", randomIndexTab)

    for (let i = 0; i < randomIndexTab.length; i++) {
        // console.log("Je crée la case N°", i, " avec pour index d'image = ", randomIndexTab[i]);

        let newCard = document.createElement("div");
        newCard.classList.add("flip__card");
        newCard.dataset.validate = randomIndexTab[i];
        newCard.onclick = () => validateCard(newCard);
        newCard.innerHTML = `<div class="front"></div>
                            <div class="back" style="background: url('./assets/img_${randomIndexTab[i]}.png'); background-size: cover;"></div>`
        memoBody.append(newCard);
    }
}

memoBody.addEventListener('click', () => {
    console.log("Je clique sur mon memory")
})

function validateCard(item) {
    item.classList.add("flipped");

    if (memoBody.querySelectorAll(".flipped").length == 2) {
        memoBody.classList.add('cant_click');

        const [firstCard, secondCard] = memoBody.querySelectorAll(".flipped");
        console.log(firstCard.dataset.validate, secondCard.dataset.validate);

        if (firstCard.dataset.validate === secondCard.dataset.validate) {
            firstCard.classList.replace('flipped', 'matching');
            secondCard.classList.replace('flipped', 'matching');

            memoBody.classList.remove('cant_click');
        } else {
            setTimeout(() => {
                firstCard.classList.remove("flipped");
                secondCard.classList.remove("flipped");
                memoBody.classList.remove('cant_click');
            }, 1000);
        }

    }

}

function createTabCards(nb) {
    let arr = [];

    for (let i = 1; i <= nb / 2; i++) {
        let numberToPush = getRandomInt(1, 21);

        if (arr.includes(numberToPush) || numberToPush === 0) {
            numberToPush = getRandomInt(1, 21);
            arr.push(numberToPush);
            arr.push(numberToPush);
        } else {
            arr.push(numberToPush);
            arr.push(numberToPush);
        }
    }

    shuffleArray(arr);
    return arr
}

function shuffleArray(array) {
    let currentIndex = array.length;

    while (currentIndex > 0) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}