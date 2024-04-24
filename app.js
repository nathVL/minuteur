// Constantes et declaration de variable
const countdown = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const resetButton = document.getElementById("resetButton");
const pauseButton = document.getElementById("pauseButton");
const plusDizaineMin = document.getElementById("plusDizaineMin");
const plusUniteMin = document.getElementById("plusUniteMin");
const moinsDizaineMin = document.getElementById("moinsDizaineMin");
const moinsUniteMin = document.getElementById("moinsUniteMin");
const plusDizaineSec = document.getElementById("plusDizaineSec");
const plusUniteSec = document.getElementById("plusUniteSec");
const moinsDizaineSec = document.getElementById("moinsDizaineSec");
const moinsUniteSec = document.getElementById("moinsUniteSec");

let time;
let timeIni = {
    "dsec": 0,
    "seconde" : 30,
    "minute" : 0
};
let intervalId;
let estArrete = true;


// Fonctions
/**
 * Met à jour le compte à rebours en affichant les minutes, les secondes et les dixièmes de seconde.
 */
function updateCountDown() {
    const minutes = Math.floor(time / 600);
    const seconds = Math.floor((time % 600) / 10);
    const dsec = time % 10;
    afficherTemps(minutes, seconds, dsec);
    if (time <= 0) {
        clearInterval(intervalId);
    } else {
        time--;
    }
} 

/**
 * Démarre le timer avec les secondes spécifiées (et les minutes optionnelles).
 * @param {number} timeSeconds - Les secondes pour démarrer le timer.
 * @param {number} [timeMinutes=0] - Les minutes optionnelles pour démarrer le timer.
 */
function StartTimer(timeSeconds, timeMinutes = 0) {
    estArrete = false;
    time = (timeMinutes * 60 + timeSeconds) * 10;
    intervalId = setInterval(updateCountDown, 100);
}

/**
 * Réinitialise le timer et affiche le temps initial.
 */
function resetTimer() {
    estArrete = false;
    clearInterval(intervalId);
    afficherTemps(timeIni.minute, timeIni.seconde);
}

/**
 * Arrête ou redémarre le timer en fonction de son état actuel.
 */
function stopTimer() {
    if (!estArrete) {
        clearInterval(intervalId);
        estArrete = true;
    } else {
        StartTimer(time/10);
        estArrete = false;
    }
}

/**
 * Ajoute un zéro devant un nombre si celui-ci est inférieur à 10.
 * @param {number} val - La valeur à formater.
 * @returns {string} La valeur formatée avec un zéro devant si nécessaire.
 */
function zeroDevant(val) {
    let newVal = val;
    newVal = newVal < 10 ? '0' + newVal : newVal;
    return newVal
}

/**
 * Affiche le temps dans le format 'mm:ss:dsec'.
 * @param {number} [minute=0] - Les minutes à afficher.
 * @param {number} [seconde=0] - Les secondes à afficher.
 * @param {number} [dsec=0] - Les dixièmes de seconde à afficher.
 */
function afficherTemps(minute=0, seconde=0, dsec=0) {
    let minAfficher = zeroDevant(minute);
    let secAfficher = zeroDevant(seconde);
    countdown.innerHTML = `${minAfficher}:${secAfficher}:${dsec}`;
}

/**
 * Vérifie et ajuste les eurs de secondes pour qu'elles restent dans les plages valides.
 */
function passerMinutes() {
    if (timeIni.seconde >= 60) {
        timeIni.seconde -= 60;
        timeIni.minute++;   
    }
}

/**
 * Retire un certain nombre de secondes et de minutes du temps initial et affiche le temps mis à jour.
 * @param {number} sec - Le nombre de secondes à retirer.
 * @param {number} [minute=0] - Le nombre de minutes à retirer.
 */
function retirerTemps(sec, minute = 0) {
    if (timeIni.minute - minute >= 0) {
        timeIni.minute -= minute;
    }
    if (sec != 0) {
        if (timeIni.minute > 0) {
            if (timeIni.seconde - sec >= 0) {
                timeIni.seconde -= sec
            } else {
                timeIni.minute--;
                timeIni.seconde = 60 - sec + timeIni.seconde;
            }
        } else {
            if (timeIni.seconde - sec >= 0) {
                timeIni.seconde -= sec;
        }}}
    afficherTemps(timeIni.minute, timeIni.seconde);
}

/**
 * Ajoute un certain nombre de secondes et de minutes au temps initial et affiche le temps mis à jour.
 * @param {number} sec - Le nombre de secondes à ajouter.
 * @param {number} [minute=0] - Le nombre de minutes à ajouter.
 */
function ajouterTemps(sec, minute = 0) {
    timeIni.seconde += sec;
    timeIni.minute += minute;
    passerMinutes();
    afficherTemps(timeIni.minute, timeIni.seconde);
}

// Controles des boutons
plusDizaineSec.addEventListener("click", () => ajouterTemps(10));
plusUniteSec.addEventListener("click",  () => ajouterTemps(1));
plusDizaineMin.addEventListener("click",  () => ajouterTemps(0, 10));
plusUniteMin.addEventListener("click",  () => ajouterTemps(0, 1));

moinsDizaineSec.addEventListener("click", () => retirerTemps(10));
moinsUniteSec.addEventListener("click", () => retirerTemps(1));
moinsDizaineMin.addEventListener("click", () => retirerTemps(0,10));
moinsUniteMin.addEventListener("click", () => retirerTemps(0,1));

startButton.addEventListener("click", function() {
    resetTimer();
    StartTimer(timeIni.seconde, timeIni.minute);
});
resetButton.addEventListener("click",resetTimer);
pauseButton.addEventListener("click", stopTimer)