import Box from "./box.js";

var colorCounter = 0;
var gameStatus = true; // false = game over
var score = 0;

const currentlyFaded = new Set();


// make each box an object
// const numBoxes = 28;

// const boxes = new Set();

// for (let i = 1; i <= numBoxes; i++) {

//     // convert to string
//     if (i < 10) {
//         i = "0" + i;
//     }
//     else {
//         i = i.toString();
//     }
    
//     // add box objects
//     boxes.set(new Box(i));
// }

// for (let i = 0; i < numBoxes; i++) {
//     const newBox = document.createElement("li");
//     document.querySelector("ul").append(newBox);
    
// }


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
            item.classList.remove("fade");
            currentlyFaded.delete(item.classList.item(1).substring(4, 6));

            
            score++;
            document.querySelector("p.score").innerHTML = `score = ${score}`;
        }
    }, false);

});


const fadeBox = () => {
    let boxNum = Math.floor(Math.random() * 28) + 1;

    while (currentlyFaded.has(boxNum.toString())) {
        boxNum = Math.floor(Math.random() * 28) + 1;
        console.log(boxNum);
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



const interval = setInterval(() => {
    fadeBox();
}, 500);