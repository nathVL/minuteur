// Constantes
const countdown = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const plusDizaine = document.getElementById("plusDizaine");
const plusUnite = document.getElementById("plusUnite");
const moinsDizaine = document.getElementById("moinsDizaine");
const moinsUnite = document.getElementById("moinsUnite");


let time;
let timeIni = {
    "seconde" : 30,
    "minute" : 0
};
let intervalId;
let estArrete = true;

function updateCountDown() {
    const minutes = Math.floor(time / 600); // Conversion des millisecondes en minutes
    const seconds = Math.floor((time % 600) / 10); // Récupération des secondes
    const dsec = time % 10; // Récupération des dixièmes de seconde
  
    // Ajout d'un zéro devant les secondes si elles sont inférieures à 10
    const secondsDisplay = zeroDevant(seconds);
    const minutesDisplay = zeroDevant(minutes);

    
  
    // Affichage des minutes et des secondes
    countdown.innerHTML = `${minutesDisplay}:${secondsDisplay}:${dsec}`;
  
    if (time <= 0) {
      clearInterval(intervalId);
    } else {
      time--;
    }
  }
  

function StartTimer(timeSeconds) {
    estArrete = false;
    time = timeSeconds.seconde * 10;
    intervalId = setInterval(updateCountDown, 100);
}

function resetTimer() {
    estArrete = false;
    clearInterval(intervalId);
    afficherTemps(timeIni.minute, timeIni.seconde);
}


function zeroDevant(val) {
    let newVal = val;
    newVal = newVal < 10 ? '0' + newVal : newVal;
    return newVal
}

function afficherTemps(minute, seconde) {
    let minAfficher = zeroDevant(minute);
    let secAfficher = zeroDevant(seconde);
    countdown.innerHTML = `${minAfficher}:${secAfficher}:0`;
}

// Boutons
// Ajout temps
plusDizaine.addEventListener("click", function() {
    timeIni.seconde += 10;
    afficherTemps(timeIni.minute, timeIni.seconde);
});

plusUnite.addEventListener("click", function() {
    timeIni.seconde += 1;
    afficherTemps(timeIni.minute, timeIni.seconde);
});
// Supp temps
moinsDizaine.addEventListener("click", function() {
    if (timeIni.seconde - 10 >= 0) {
        timeIni.seconde -= 10;
        afficherTemps(timeIni.minute, timeIni.seconde);
    }
});

moinsUnite.addEventListener("click", function() {
    if (timeIni.seconde - 1 >= 0) {
        timeIni.seconde -= 1;
        afficherTemps(timeIni.minute, timeIni.seconde);
    }
});


// Controle boutons
startButton.addEventListener("click", function() {
    let count = timeIni;
    StartTimer(count);
});

resetButton.addEventListener("click",resetTimer);

pauseButton.addEventListener("click", function() {
    if (!estArrete) {
        clearInterval(intervalId);
    } else {
        StartTimer(seconds);
        estArrete = false;
    }
});
