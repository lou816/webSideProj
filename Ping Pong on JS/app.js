const p1 = {
    score: 0,
    button: document.querySelector("#p1Button"),
    display: document.querySelector("#p1Score")
}
const p2 = {
    score: 0,
    button: document.querySelector("#p2Button"),
    display: document.querySelector("#p2Score")
}


p1.button.addEventListener('click', function () {
    updatesScores(p1, p2)
})

p2.button.addEventListener('click', function () {
    updatesScores(p2, p1);
})
function updatesScores(player, opponent) {
    if (!isGameOVer) {
        player.display.textContent = ++player.score;
        if (player.score === winningScore) {
            isGameOVer = true;
            player.display.classList.add("has-text-success");
            opponent.display.classList.add("has-text-danger");
            player.button.disabled = true;
            opponent.button.disabled = true;
        }
    }

}

const resetButton = document.querySelector("#reset");
const select = document.querySelector("#playto");
let winningScore = 3;
let isGameOVer = false;

resetButton.addEventListener('click', reset)

select.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

function reset() {
    isGameOVer = false;
    for (let p of [p1, p2]) {
        p.score = 0;
        p.display.textContent = 0;
        p.display.classList.remove("has-text-success", "has-text-danger");
        p.button.disabled = false;
    }
}