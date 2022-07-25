var colorCounter = 0;
var gameStatus = true; // false = game over
var score = 0;

const currentlyFaded = new Set();

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