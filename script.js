const mover = document.querySelector(".mover");
const html = document.querySelector("html");
const button = document.querySelectorAll(".button");
const bTime = document.querySelector(".br");
const sTime = document.querySelector(".ses");
const timedown = document.querySelector(".timedown");
const start = document.querySelector(".start");
const reset = document.querySelector(".reset");
const timeframe = document.querySelector(".timeframe");

let breakTime = Number(bTime.textContent);
let sessionTime = Number(sTime.textContent);
let time = sessionTime * 60;
let chosenTime;
const tubeHeigth = 280;
let fill = 0;
let started = false;
let session = true;
let genesis = false;

function timeToString(time) {
    var date = new Date(null);
    date.setSeconds(time);
    return date.toISOString().substr(14, 5);
}

button.forEach(btn => {
    btn.addEventListener("click", () => {
        if (!genesis) {
            if (btn.classList.contains("plus")) {
                if (btn.classList.contains("b")) {
                    breakTime++;
                    bTime.innerHTML = breakTime;
                }
                if (btn.classList.contains("s")) {
                    sessionTime++;
                    sTime.textContent = sessionTime;
                }
            }
            if (btn.classList.contains("minus")) {
                if (breakTime > 1) {
                    if (btn.classList.contains("b")) {
                        breakTime--;
                        bTime.innerHTML = breakTime;
                    }
                }
                if (sessionTime > 1) {
                    if (btn.classList.contains("s")) {
                        sessionTime--;
                        sTime.textContent = sessionTime;
                    }
                }
            }

            time = sessionTime * 60;
            timedown.innerHTML = timeToString(time);
        }
    });
});

function countdown() {
    time--;
    if (session) {
        chosenTime = sessionTime;
    } else {
        chosenTime = breakTime;
    }
    fill = tubeHeigth / (chosenTime * 60) * (chosenTime * 60 - time);
    console.log(fill);
    timedown.innerHTML = timeToString(time);
    if (time === 0) {
        session = !session;
        if (session) {
            time = sessionTime * 60;
            timeframe.innerHTML = "SESSION";
            html.style.setProperty("--growcolor", 'rgb(249, 168, 40)');
        } else {
            time = breakTime * 60;
            timeframe.innerHTML = "BREAK!";
            html.style.setProperty("--growcolor", 'green');
        }
    }
    html.style.setProperty("--fill", fill + "px");
}

let intervalID;
let intervalFill;

start.addEventListener("click", () => {
    genesis = true;
    if (started === false) {
        start.innerHTML = "PAUSE";

        intervalID = setInterval(countdown, 1000);
    } else {
        start.innerHTML = "START";
        clearInterval(intervalID);
    }
    started = !started;
    console.log(time);
});

reset.addEventListener("click", () => {
    start.innerHTML = "START";
    session = true;
    timeframe.innerHTML = "SESSION";
    html.style.setProperty("--growcolor", 'rgb(249, 168, 40)');
    fill = 0;
    html.style.setProperty("--fill", fill + "px");
    started = false;
    clearInterval(intervalID);
    genesis = false;
    time = sessionTime * 60;
    timedown.innerHTML = timeToString(time);
});

