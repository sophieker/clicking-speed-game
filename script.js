import Box from "./box.js";

var colorCounter = 0;
var score = 0;

// store boxes in an array (not the actual html elements - just box objects)
const numBoxes = 28;
const boxes = [];

var level = 0;

for (let i = 1; i <= numBoxes; i++) {    
    // add box objects
    boxes[i-1] = new Box(i);
}

// map the array of box objects to html elements
boxes.forEach((item) => {
    const newBox = document.createElement("li");
    newBox.classList.add("cell");

    newBox.setAttribute("num", item.id);
    document.querySelector("ul").append(newBox);
});


// add event listeners
document.querySelectorAll(".cell").forEach((item) => {

    // add the hover class when a mouse enters a box
    item.addEventListener("mouseenter", () => {
        item.classList.add("hover");
    }, false);

    // remove the hover class when a mouse leaves the box
    item.addEventListener("mouseleave", () => {
        item.classList.remove("hover");
    }, false);

    // when the box is clicked, remove the fade class if it is added (resets the color)
    item.addEventListener("click", () => {
        if (item.classList.contains("fade")) {

            boxes[item.getAttribute("num")].isFading = false;

            item.classList.remove("fade");

            score++;
            document.querySelector("p.score").innerHTML = `score: ${score}`;

            if (score % 20 == 0) {
                level++;
                document.querySelector("h1.level").innerHTML = `LEVEL ${level}`;

                // testing these still
                // document.querySelector(".fade").style.transition = "background-color " + (5 - level*4.9) + "s";
                // document.querySelector(".fade.hover").style.transition = "background-color " + (5 - level*4.9) + "s";
            }

            if (level > 100) { // easter egg
                document.querySelector("h1.level").innerHTML = `WTF`;
            }
        }
    }, false);

});

// randomly select a box to fade to red
const fadeBox = () => {
    // randomly select a box. if it is already fading, select again
    let boxNum = Math.floor(Math.random() * 28) + 1;

    while (boxes[boxNum].isFading == true) {
        boxNum = Math.floor(Math.random() * 28) + 1;
    }

    // update date and isFading property 
    boxes[boxNum].startedFading = new Date();
    boxes[boxNum].isFading = true;

    document.querySelector("li:nth-child(" + boxNum + ")").classList.add("fade");    
}

const gameOver = () => {

    document.body.innerHTML = `
    <p class = "gameovertext">GAME OVER 
    <br>
    <span class = "end-score">SCORE: ${score}</span>
    <br>
    <span class = "retry">retry ↻</span>
    </p>`;
    clearInterval(interval);

    const retry = document.querySelector(".retry");

    retry.addEventListener("mouseover", () => {
        retry.classList.add("retry-hover");
    });

    retry.addEventListener("mouseout", () => {
        retry.classList.remove("retry-hover");
    });

    retry.addEventListener("click", () => {
        document.location.reload();
    });
}

const checkGameStatus = () => {
    let now = new Date();
    boxes.forEach((item) => {
        if (item.isFading && (now - item.startedFading) > (5000 - level*100)) {
            gameOver();
        }
    });
}


const interval = setInterval(() => {
    fadeBox();
    checkGameStatus();
}, (500 - level*10));