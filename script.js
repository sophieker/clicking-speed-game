import Box from "./box.js";

var colorCounter = 0;
var score = 0;

// store boxes in an array (not the actual html elements - just box objects)
const numBoxes = 28;
const boxes = [];

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
            document.querySelector("p.score").innerHTML = `score = ${score}`;
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
    document.body.innerHTML = `<p>GAME OVER, score: ${score}</p>`;
    clearInterval(interval);
}

const checkGameStatus = () => {
    let now = new Date();
    boxes.forEach((item) => {
        if (item.isFading && (now - item.startedFading) > 5000) {
            gameOver();
        }
    });
}


const interval = setInterval(() => {
    fadeBox();
    checkGameStatus();
}, 500);