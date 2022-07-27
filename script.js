import Box from "./box.js";

var colorCounter = 0;
var gameStatus = true; // false = game over
var score = 0;

const currentlyFaded = new Set();


// make each box an object
const numBoxes = 28;

const boxes = [];

for (let i = 1; i <= numBoxes; i++) {    
    // add box objects
    boxes[i-1] = new Box(i);
}

const createBoxes = () => {
    boxes.forEach((item) => {
        const newBox = document.createElement("li");
        newBox.classList.add("cell");

        let x;

        // convert to string
        if (item.id < 10) {
            x = "0" + item.id;
        }
        else {
            x = item.id.toString();
        }

        newBox.classList.add("cell" + x);
        newBox.setAttribute("id", item.id);

        document.querySelector("ul").append(newBox);
    });
}

createBoxes();


// add event listeners
document.querySelectorAll("li.cell").forEach((item) => {
    item.addEventListener("mouseenter", () => {
        item.classList.add("hover");
    }, false);

    item.addEventListener("mouseleave", () => {
        item.classList.remove("hover");
    }, false);

    item.addEventListener("click", () => {
        if (item.classList.contains("fade")) {

            boxes[item.id].date = new Date();
            boxes[item.id].isFading = false;

            item.classList.remove("fade");
            currentlyFaded.delete(item.classList.item(1).substring(4, 6));

            
            score++;
            document.querySelector("p.score").innerHTML = `score = ${score}`;
        }
    }, false);

});


const fadeBox = () => {
    let boxNum = Math.floor(Math.random() * 28) + 1;

    // update date object
    boxes[boxNum].date = new Date();
    boxes[boxNum].isFading = true;

    while (currentlyFaded.has(boxNum.toString())) {
        boxNum = Math.floor(Math.random() * 28) + 1;
    }

    // add 0 in front of single digits
    if (boxNum < 10) {
        boxNum = "0" + boxNum;
    }
    else {
        boxNum = boxNum.toString();
    }

    document.querySelector(".cell" + boxNum).classList.add("fade");

    currentlyFaded.add(boxNum);
}

const gameOver = () => {
    document.body.innerHTML = `<p>GAME OVER</p>`;
}

const checkGameStatus = () => {
    let now = new Date();
    boxes.forEach((item) => {
        if (item.isFading && (now - item.date) > 5000) {
            console.log(item.id);
            console.log(now - item.date);
            gameOver();
            return;
        }
    });
}



const interval = setInterval(() => {
    fadeBox();
    checkGameStatus();
}, 500);