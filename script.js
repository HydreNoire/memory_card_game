

(function () {
    const btnNb = document.querySelectorAll("input[type=button]");
    let memoBody = document.querySelector("#memo_container");
    let score = document.querySelector("#score");
    const timer = document.querySelector("#timer");
    let bonuScore = 0;
    let secondes = 0;
    let minutes = 0;
    let timing;

    // ACTION BTN NB CARDS
    btnNb.forEach(btn => {
        btn.addEventListener('click', () => {
            createTab(btn.value);

            clearInterval(timing);
            minutes = 0;
            secondes = 0;
            timer.textContent = "";
            timing = setInterval(() => {
                setTimer(timer)
            }, 1000);

            score.innerText = 0;
            let nbCards = memoBody.querySelectorAll(".flip__card");
            countBonusScore(nbCards.length);
        });
    });

    // GESTION COMPTEUR + SCORE + CLICK COUNTER
    memoBody.addEventListener('click', () => {
        let nbCards = memoBody.querySelectorAll(".flip__card");
        let matchingCards = memoBody.querySelectorAll('.matching');
        console.log("Cartes = ", nbCards.length, " Nombre de paires = ", matchingCards.length);

        addScore(score, matchingCards, bonuScore);

        if (nbCards.length === matchingCards.length) {
            console.log("Toutes les paires sont trouvées");
            clearInterval(timing);
        }
    });

    // CALCULATE SCORE BY NB CARDS ON MEMO
    function countBonusScore(nb) {
        switch (nb) {
            case 12:
                bonuScore = 120;
                break;
            case 16:
                bonuScore = 160;
                break;
            case 20:
                bonuScore = 200;
                break;
            default:
                bonuScore = 10;
                break;
        }
    }

    // CREATE CARDS BY NB OF CARDS SELECTED
    function createTab(value) {
        memoBody.classList.remove('cant_click');
        reorganizeCards(value, memoBody);

        if (document.querySelectorAll(".flip__card").length > 0) {
            memoBody.innerHTML = '';
        }

        let randomIndexTab = createTabCards(value,);

        for (let i = 0; i < randomIndexTab.length; i++) {
            let newCard = document.createElement("div");
            newCard.classList.add("flip__card");
            newCard.dataset.validate = randomIndexTab[i];
            newCard.onclick = () => validateCard(newCard);
            newCard.innerHTML = `<div class="front"></div>
                            <div class="back" style="background: url('./assets/img_${randomIndexTab[i]}.png'); background-size: cover;"></div>`
            memoBody.append(newCard);
        }
    }

    // FUNCTION TO COMPARE TWO CARDS FLIPPED
    function validateCard(item) {
        item.classList.add("flipped");

        if (memoBody.querySelectorAll(".flipped").length == 2) {
            memoBody.classList.add('cant_click');

            const [firstCard, secondCard] = memoBody.querySelectorAll(".flipped");

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

    // CREATE A ARRAY
    function createTabCards(nb) {
        let arr = [];

        while (arr.length < nb) {
            let numberToPush = getRandomInt(1, 21);

            if (arr.includes(numberToPush) || numberToPush === 0) {
                continue;
            } else {
                arr.push(numberToPush);
                arr.push(numberToPush);
            }
        }

        shuffleArray(arr);
        return arr
    }

    // SHUFFLE AN ARRAY TO RANDOMIZE
    function shuffleArray(array) {
        let currentIndex = array.length;

        while (currentIndex > 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    // GET A RANDOM INTEGER BETWEEN A MAX AND MIN
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ADD SCORE INTO DOM
    function addScore(score, matchedCard, bonus) {
        score.innerText = matchedCard.length * bonus;
    }

    // TIMER FUNCTIONNALITY
    function setTimer(time) {
        if (secondes === 60) {
            secondes = 0;
            minutes++;
        } else {
            secondes++
        }
        time.textContent = `${minutes < 10 ? "0" + minutes : minutes} : ${secondes < 10 ? "0" + secondes : secondes}`;
    }

    // STYLE MEMOBODY  NB CARDS
    function reorganizeCards(cards, grid) {
        console.log("Nombre de carte pour style de grille", cards)
        if (cards >= 20) {
            console.log("Plus ou total de 20 cartes");
            return grid.style.gridTemplateColumns = "repeat(5, 150px)";
        } else if (cards < 20) {
            console.log("Moins de 20 cartes");
            return grid.style.gridTemplateColumns = "repeat(4, 150px)";
        }
    }

}());