let startButton = document.querySelector('.start-button');
let playgroundImage = document.querySelector('.playground-image');
let scoreDisplay = document.querySelector('.score-display');
let timeCounter = document.querySelector('.time-counter')
let totalScoreCounter = document.querySelector('.total-score-counter')
let highScoreCounter = document.querySelector('.high-score-counter') 
let muteButton = document.querySelector('.mute-button')
let muteButtonImageDecoration = document.querySelector('.mute-button-image-decoration')
let popSound = new Audio('sounds/pop-clean-3126481.mp3')

let score = 30;
let time = 60;
let savedHighScore = JSON.parse(localStorage.getItem('highScore')) || 0

let plushTimeout;
let gameTimer; 
let gameRunning = false;
let muteSound = false;

let timerInterval

muteButton.addEventListener( "click", function(){
    muteSound = !muteSound;
    if (muteSound === true){
        muteButtonImageDecoration.style.display = "flex"
        muteButtonImageDecoration.style.animation = "muteSoundTrue 0.5s ease"
        setTimeout(function(){
            muteButtonImageDecoration.style.animation = ""
        }, 500)
        console.log("sound is muted")
        
    } else{
        muteButtonImageDecoration.style.animation = "muteSoundFalse 0.5s ease"
        setTimeout(function(){
            muteButtonImageDecoration.style.animation = ""
            muteButtonImageDecoration.style.display = "none"
        }, 400)
    }
})

function timer() {
    // clear any old interval
    clearInterval(timerInterval);

    time = 60; // reset time
    timeCounter.textContent = "Time left: " + time;

    timerInterval = setInterval(function() {
        time -= 1;
        timeCounter.textContent = "Time left: " + time;

        if (time <= 0) {
            clearInterval(timerInterval);
            timeCounter.textContent = "Time's up!";
            endGame();
        }
    }, 1000);
}


startButton.addEventListener('click', function() {
    startButton.style.animation = "scaleButton 0.5s ease-in-out forwards";
    timeCounter.style.display = "block"
    scoreDisplay.style.display = "block"
    totalScoreCounter.style.display = "none"
    highScoreCounter.style.display = "none"
    
    score = 0;
    scoreDisplay.textContent = "Score: " + score + " | High Score: " + savedHighScore;
    gameRunning = true;

    gameLogic_Looped(); 
    timer();
    
    setTimeout(function() {
        startButton.style.animation = "";
    }, 500);
});


function gameLogic_Looped() {
    
    clearTimeout(plushTimeout);

    if (!gameRunning) return;
    
    //   let randomNumber = Math.floor(Math.random() * 4) + 1;
    //   if (randomNumber == 1) {
        //       playgroundImage.style.backgroundImage = "url('images/uzi-plush.png')";
        //   }
//   if (randomNumber == 2) {
//       playgroundImage.style.backgroundImage = "url('images/N-plush.png')";
//   }
//   if (randomNumber == 3) {
//       playgroundImage.style.backgroundImage = "url('images/V-plush.png')";
//   }
//   if (randomNumber == 4) {
//       playgroundImage.style.backgroundImage = "url('images/cyn-plush.png')";
//   }

    const plushPool = [
        { url: "images/uzi-plush.png", weight: 54},
        { url: "images/N-plush.png", weight: 20},
        { url: "images/V-plush.png", weight: 26},
        { url: "images/cyn-plush.png", weight: 0.9},
        { url: "images/2286914_31901.png", weight: 0.1}
    ]

    const selected = getWeightedRandom(plushPool);
    playgroundImage.style.backgroundImage = "url('" + selected.url + "')";

    let randomX = Math.floor(Math.random() * 80) + 10;
    let randomY = Math.floor(Math.random() * 60) + 20;
    playgroundImage.style.left = randomX + "%";
    playgroundImage.style.top = randomY + "%";

    playgroundImage.style.display = "block";

    if( playgroundImage.style.backgroundImage.includes("cyn-plush.png")){
        plushTimeout = setTimeout(function() {
        gameLogic_Looped();
        }, 500);
    }

    else{
        plushTimeout = setTimeout(function() {
        gameLogic_Looped();
        }, 1000);
    }


//    if (score === 10){
//      playgroundImage.style.display = "none"; // hide plushy
//        return;
//    }
}



playgroundImage.addEventListener('click', function handleClick() {
    if (muteSound === false){
        popSound.play();
    }

    if (playgroundImage.style.backgroundImage.includes("N-plush.png")) {
        score += 2;
    } 
    if (playgroundImage.style.backgroundImage.includes("uzi-plush.png")) {
        score += 1;
    }
    if (playgroundImage.style.backgroundImage.includes("V-plush")){
        score -= 2
    }
    if (playgroundImage.style.backgroundImage.includes("cyn-plush.png")){
        score += 4
    }
    if (playgroundImage.style.backgroundImage.includes("2286914_31901.png")){
        score += 50
    }
    scoreDisplay.textContent = "Score: " + score + " | High Score: " + savedHighScore;

    gameLogic_Looped();
});

function getWeightedRandom(plushes) {
    const totalWeight = plushes.reduce((sum, p) => sum + p.weight, 0);
    let random = Math.random() * totalWeight;
    
    for (const plush of plushes) {
        if (random < plush.weight) {
            return plush;
    }
    random -= plush.weight;
}
}

function endGame() {
    gameRunning = false;
    clearTimeout(plushTimeout);
    highScoreCheck(score);
    highScoreSaving(score)
    playgroundImage.style.display = "none";
    scoreDisplay.style.display = "none";
    timeCounter.style.display = "none"
    totalScoreCounter.style.display = "block"
    totalScoreCounter.textContent = "Total Score: " + score
    highScoreCounter.style.display = "block"
    highScoreCounter.textContent = "High score: " + savedHighScore



    if (score <= 10){
        totalScoreCounter.style.color = "red"
        totalScoreCounter.style.textShadow = " rgba(255, 0, 0, 1) 0px 0px 15px, rgb(10, 0, 0) 0px 0px 10px"
    }
    if (score >= 10 && score <= 40){
        totalScoreCounter.style.color = "yellow"
        totalScoreCounter.style.textShadow = "rgba(255, 255, 0, 1) 0px 0px 15px, rgb(10, 10, 0) 0px 0px 10px"
    }
    if (score >= 40){
        totalScoreCounter.style.color = "green"
        totalScoreCounter.style.textShadow = "rgba(0, 255, 0, 1) 0px 0px 15px, rgb(0, 10, 0) 0px 0px 10px"
    }
    
}

function highScoreSaving(score) {
    // Get stored high score (or 0 if none)
    let highScore = JSON.parse(localStorage.getItem('highScore')) || 0;

    // If current score is higher, update
    if (score > highScore) {
        localStorage.setItem('highScore', JSON.stringify(score));
    }
}

function highScoreCheck(score) {
    let highScore = JSON.parse(localStorage.getItem('highScore')) || 0;
    if (score > highScore) {
        highScoreSaving(score);
    }
}