const hourHand = document.getElementsByClassName("hour")[0];
const minuteHand = document.getElementsByClassName("minute")[0];
const secondHand = document.getElementsByClassName("second")[0];
const digitalWatch = document.getElementsByClassName("digitalWatch")[0];
const digitalHours = document.getElementsByClassName("digitalHours")[0];
const digitalMinutes = document.getElementsByClassName("digitalMinutes")[0];
const digitalSeconds = document.getElementsByClassName("digitalSeconds")[0];
const digitalTime = document.getElementsByClassName("digitalTime")[0]
const timerHours = document.getElementsByClassName("timerHours")[0]
const timerMinutes = document.getElementsByClassName("timerMinutes")[0]
const timerSeconds = document.getElementsByClassName("timerSeconds")[0]
const startButton = document.getElementsByClassName("startButton")[0];
const stopButton = document.getElementsByClassName("stopButton")[0];
const resetButton = document.getElementsByClassName("resetButton")[0];
const progressContainer = document.getElementsByClassName("progress-container")[0]



let currently = 0;
let secondsInTimer = 0;
let minutesInTimer = 0;
let hoursInTimer = 0;
let timer = 0;

const circle = document.querySelector('.progress-ring__circle');

function updateStopWatch(){
    for(let i = 0; i <= 60; i++){
        timerHours.innerHTML += i < 10 ? `<p>0${i}</p>` : `<p>${i}</p>`;
        timerMinutes.innerHTML += i < 10 ? `<p>0${i}</p>` : `<p>${i}</p>`;
        timerSeconds.innerHTML += i < 10 ? `<p>0${i}</p>` : `<p>${i}</p>`;
    }
}

updateStopWatch()



function observeVisibleElement(container, name) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // console.log(`Currently viewing: ${entry.target.textContent}`);
                if(name === 'hours'){
                    hoursInTimer = Number(entry.target.textContent);
                }else if(name === 'minutes'){
                    minutesInTimer = Number(entry.target.textContent);
                }else if(name === 'seconds'){
                    secondsInTimer = Number(entry.target.textContent);
                }
            }
        });
    }, { threshold: 0.5 }); // Adjust the threshold as needed

    const paragraphs = container.getElementsByTagName('p');
    for (let p of paragraphs) {
        observer.observe(p);
    }

}

observeVisibleElement(timerHours, 'hours');
observeVisibleElement(timerMinutes, 'minutes');
observeVisibleElement(timerSeconds, 'seconds');


let timerInterval
startButton.addEventListener("click", () =>{
    clearInterval(timerInterval);
    if(startButton.innerText === "Start"){
        currently = 0;
        timer = (hoursInTimer * 3600) + (minutesInTimer * 60) + (secondsInTimer);
        updateProgress(((timer - currently) * 100) / timer);
        timerInterval = setInterval(() =>{
            addTimeSpent()
            updateProgress(((timer - currently) * 100) / timer);
            resetButton.style.display = 'none';
            if((timer - currently) === 0){
                timer = 0;
                startButton.innerText = "Start";
                startButton.style.display = 'block';
                resetButton.style.display = 'block';
                clearInterval(timerInterval);
            }
        }, 1000)
        startButton.style.display = 'none';
        startButton.innerText = "Resume";
    }else{
        timerInterval = setInterval(() =>{
            addTimeSpent()
            updateProgress(((timer - currently) * 100) / timer);
            resetButton.style.display = 'none';
            if((timer - currently) === 0){
                timer = 0;
                startButton.innerText = "Start";
                startButton.style.display = 'block';
                resetButton.style.display = 'block';
                clearInterval(timerInterval);
            }
        }, 1000)
        startButton.style.display = 'none';
    }



//    console.log(hoursInTimer, minutesInTimer, secondsInTimer)
})

stopButton.addEventListener("click", () =>{
    resetButton.style.display = 'block';
    clearInterval(timerInterval);
    startButton.style.display = 'block';


//    console.log(hoursInTimer, minutesInTimer, secondsInTimer)
})

resetButton.addEventListener("click", () =>{
    currently = 0;
    timer = 0;
    clearInterval(timerInterval);
    updateProgress(((timer - currently) * 100) / timer);
    startButton.innerText = "Start";
    startButton.style.display = 'block';
//    console.log(hoursInTimer, minutesInTimer, secondsInTimer)
})

progressContainer.addEventListener("click", () =>{
    if (digitalWatch.classList.contains("digitalWatchShow")){
        digitalWatch.classList.remove("digitalWatchShow")
    }else{
        digitalWatch.classList.add("digitalWatchShow");
    }
})

function setProgress(percent) {
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;
    const offset = circumference - (percent / 100) * circumference;

    circle.style.transition = `stroke-dashoffset 1s`;
    circle.style.strokeDashoffset = offset;
}

function updateProgress(percent) {
    document.querySelector('.progress-text').textContent = ``;
    setProgress(percent);
}


function addTimeSpent(){
    if((timer - currently) > 0){
        currently = currently + 1

    }
}

function changeDegrees() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    // console.log(hours);

    const secondDegrees = (seconds / 60) * 360;
    const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6; // Adding seconds for smooth transition
    const hourDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
    console.log(hours)



    secondHand.style.transform = `rotate(${secondDegrees - 90}deg)`;
    minuteHand.style.transform = `rotate(${minuteDegrees - 90}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees - 90}deg)`;
}

function changeDigitalClock(){
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
    // console.log(hours);

    if(timer > 0){
        digitalTime.innerText = ``;
        let remainingTime = timer - currently;
        let hoursRemaining = Math.floor(remainingTime / 3600);
        let minutesRemaining = Math.floor((remainingTime % 3600) / 60);
        let secondsRemaining = remainingTime % 60;
        // Update the display
        digitalHours.innerText = hoursRemaining > 9 ? hoursRemaining: `0${hoursRemaining}`;
        digitalMinutes.innerText = minutesRemaining > 9 ? minutesRemaining : `0${minutesRemaining}`;
        digitalSeconds.innerText = secondsRemaining > 9 ? secondsRemaining : `0${secondsRemaining}`;
    }else{
        digitalHours.innerText = (hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours)) > 9 ? `${(hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours))}` : `0${(hours === 0 ? 12 : (hours > 12 ? hours - 12 : hours))}` ;
        digitalMinutes.innerText = minutes > 9 ? minutes : `0${minutes}`;
        digitalSeconds.innerText = seconds > 9 ? seconds : `0${seconds}`;
        digitalTime.innerText = hours >= 12 ? 'PM' : "AM";
    }

}


let clockType = 'digital';
function changeClockType(){

}

setInterval(() =>{
    changeDegrees()
    changeDigitalClock()
}, 1000)

// updateProgress(((timer - currently) * 100) / timer);
changeDigitalClock()
changeDegrees()