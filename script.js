const foodMusic = new Audio(`food.mp3`);
const gameoverMusic = new Audio(`gameover.mp3`);
const moveMusic = new Audio(`move.mp3`);
const music = new Audio(`music.mp3`);
let direction = { x: 0, y: 0 };
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 14, y: 14 }];
let food = { x: 7, y: 9 };
let score = 0;

music.play();

function main(ctime) {
    window.requestAnimationFrame(main);

    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function gameOver(snake) {
    // If you bump into yourself 
    
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // If you bump into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;
}

function gameEngine() {


    // body and sides collision

    if (gameOver(snakeArr)) {

        gameoverMusic.play();
        direction = { x: 0, y: 0 };

        over.innerHTML = `Game Over. Press any key to play again!`;
        snakeArr = [{ x: 14, y: 14 }];
        score = 0;


    }

    // food shift and snake tail adding

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodMusic.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({ x: snakeArr[0].x + direction.x, y: snakeArr[0].y + direction.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }


    // snake movement
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += direction.x;
    snakeArr[0].y += direction.y;


    // snake and food display
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}



let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}





window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    direction = { x: 0, y: 1 } // Start the game
    moveMusic.play();
    title.innerHTML = ``;
    play.innerHTML = ``;
    over.innerHTML=``;
    switch (e.key) {
        case "ArrowUp":
            direction.x = 0;
            direction.y = -1;
           
            break;

        case "ArrowDown":

            direction.x = 0;
            direction.y = 1;
            
            break;

        case "ArrowLeft":

            direction.x = -1;
            direction.y = 0;
           
            break;

        case "ArrowRight":
            ;
            direction.x = 1;
            direction.y = 0;
            
            break;
        default:
            break;
    }

});


// Add event listeners for mobile and tablet control buttons
const upButton = document.getElementById('up-button');
const leftButton = document.getElementById('left-button');
const rightButton = document.getElementById('right-button');
const downButton = document.getElementById('down-button');

upButton.addEventListener('click', () => {
    changeDirection(0, -1);
});

leftButton.addEventListener('click', () => {
    changeDirection(-1, 0);
});

rightButton.addEventListener('click', () => {
    changeDirection(1, 0);
});

downButton.addEventListener('click', () => {
    changeDirection(0, 1);
});

// Function to change the snake direction
function changeDirection(x, y) {
    direction.x = x;
    direction.y = y;
    moveMusic.play();
    title.innerHTML = ``;
    play.innerHTML = ``;
    over.innerHTML=``;
}







