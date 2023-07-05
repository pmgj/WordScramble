const wordText = document.querySelector(".word"),
    hintText = document.querySelector(".hint"),
    timeText = document.querySelector(".time b"),
    inputField = document.querySelector("input"),
    refreshBtn = document.querySelector(".shuffle"),
    checkBtn = document.querySelector(".check-word");

let correctWord, timer, time = 15;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        hintText.innerText = `Time off! ${correctWord.toUpperCase()} was the correct word`;
        clearInterval(timer);
        setTimeout(initGame, 5000);
    }, 1000);
}

const shuffle = () => {
    let wordArray = correctWord.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
}

const initGame = () => {
    initTimer(time);
    timeText.innerText = time;
    let randomObj = words[Math.floor(Math.random() * words.length)];
    correctWord = randomObj.toLowerCase();
    shuffle();
    hintText.innerHTML = "&nbsp;";
    inputField.value = "";
    inputField.focus();
    inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

const checkWord = evt => {
    evt.preventDefault();
    let userWord = inputField.value.toLowerCase();
    if (!userWord) return hintText.innerText = "Please enter the word to check!";
    if (userWord !== correctWord) return hintText.innerText = `Oops! ${userWord.toUpperCase()} is not a correct word`;
    hintText.innerText = `Congrats! ${correctWord.toUpperCase()} is the correct word`;
    clearInterval(timer);
    setTimeout(initGame, 5000);
}

refreshBtn.addEventListener("click", shuffle);
checkBtn.addEventListener("click", checkWord);