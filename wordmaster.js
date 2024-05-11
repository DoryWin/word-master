const letters = document.querySelectorAll(".scoreboard-letter");
const loadingDiv = document.querySelector(".info-bar");
const ROUND = 6;
async function init() {
    let currentGuess = '';
    let currentRow = 0;
    let isLoading = true;

    const res = await fetch("https://words.dev-apis.com/word-of-the-day");
    const resObj = await res.json();
    const word = resObj.word.toUpperCase();
    const wordParts = word.split("");
    let done = false;
    setLoading(false);
    isLoading = false; 

    function addLetter (letter) {
        // 5 = answer_length
        if (currentGuess.length < 5) {
            //add letter to the end
            currentGuess += letter;
        } else {
            //replace the last letter
            currentGuess = currentGuess.substring(0, currentGuess.length - 1) + letter;
        }

        letters[5 * currentRow + currentGuess.length - 1].innerText = letter;
    }

    async function commit() {
        if (currentGuess.length !== 5 ) {
            //do nothing 
            return;
        }

        //validate word
        isLoading = true;
        setLoading(true);
        const res = await fetch("https://words.dev-apis.com/validate-word", {
            method: "POST", 
            body: JSON.stringify({ word: currentGuess})
        });

        const resObj = await res.json();
        const validWord = resObj.validWord;
        //const {validWord } = resObj;

        isLoading = false;
        setLoading(false);
        if (!validWord) {
            //do nth
            markInvalidWord();
        }
        //do all marking correct or close or wrg

        const guessParts = currentGuess.split("");
        const map = makeMap(wordParts);
        console.log(map);

        for (let i = 0; i < 5; i++) {
        //mark as correct
            if(guessParts[i] === wordParts[i]) {
               letters[currentRow * 5 + i].classList.add("correct");
               map[guessParts[i]]--;
            }
        }

        for (let i = 0; i < 5; i++) {
            if(guessParts[i] === wordParts[i]) {
            // do nth 
            } else if (wordParts.includes(guessParts[i]) && map[guessParts[i]] > 0) {
                letters[currentRow * 5 + i].classList.add("close");
                map[guessParts[i]]--;
            } else {
                letters[currentRow * 5 + i].classList.add("wrong");
            }
            
        }

        currentRow++;
        if (currentGuess === word) {
            //win
            alert('You Win!');
            document.querySelector('.brand').classList.add("winner");
            done = true;
            return;
        } else if (currentRow === ROUND) {
            //lose
            alert(`You lose, the word was ${word}`);
            done = true;
        }
        currentGuess = '';   
    }

    function backspace() {
        currentGuess = currentGuess.substring(0, currentGuess.length - 1);
        letters[5 * currentRow + currentGuess.length].innerText = "";
    }

    function markInvalidWord() {
        //alert('not a valid word');

        for (let i = 0; i < 5; i++) {
            letters[currentRow * 5 + i].classList.remove("invalid");

            setTimeout(function() {
                letters[currentRow * 5 + i].classList.add("invalid");
            }, 10);
        }
    }
    document.addEventListener("keydown", function handleKeyPress(event) {
        if (done || isLoading) {
            //do nothing
            return;
        }
        
        
        const action = event.key;

        if (action === "Enter") {
            commit();
        } else if (action === "Backspace") {
            backspace();
        } else if (isLetter(action)) {
            addLetter(action.toUpperCase());
        } else {
            //do nothing
        }
    });
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

function setLoading(isLoading) {
    loadingDiv.classList.toggle('hidden', !isLoading);
}

function makeMap (array) {
    const obj = {};
    for (let i = 0; i < array.length; i++) {
        const letter = array[i]
        if (obj[letter]) {
            obj[letter]++;
        } else {
            obj[letter] = 1;
        }
    }
    return obj;
}
init();