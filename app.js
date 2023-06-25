const timeLeftDisplay = document.querySelector('#time-left')
const resultDisplay = document.querySelector('#result')
const startPauseButton = document.querySelector('#start-pause-button')
const squares = document.querySelectorAll('.grid div')
const logsLeft = document.querySelectorAll('.log-left')
const logsRight = document.querySelectorAll('.log-right')
const carLeft = document.querySelectorAll('.car-left')
const carsRight = document.querySelectorAll('.car-right')

let currIndex = 76
const width = 9
let timerId
let outcomeTimerId
let currTime = 20

function moveFrog(e) {
    squares[currIndex].classList.remove('frog')
    switch(e.key) {
        case 'ArrowLeft' :
            if (currIndex % width !== 0) currIndex -= 1
            break
        case 'ArrowRight' :
            if (currIndex % width < width - 1) currIndex += 1
            break
        case 'ArrowUp' :
            if (currIndex - width >= 0) currIndex -= width
            break
        case 'ArrowDown' :
            if (currIndex + width < width * width)currIndex += width
            break
    }
    squares[currIndex].classList.add('frog')
}

function autoMoveElements() {
    currTime --
    timeLeftDisplay.textContent = currTime
    logsLeft.forEach(logleft => moveLogLeft(logleft))
    logsRight.forEach(logright => moveLogright(logright))
    carLeft.forEach(carsleft => moveCarLeft(carsleft))
    carsRight.forEach(carsright => moveCarRight(carsright))
    lose()
    win()
}

function checkOutcomes() {
    lose()
    win()
}

function moveLogLeft(logleft) {
    switch (true) {
        case logleft.classList.contains('l1'):
            logleft.classList.remove('l1')
            logleft.classList.add('l2')
            break
        case logleft.classList.contains('l2'):
            logleft.classList.remove('l2')
            logleft.classList.add('l3')
            break
        case logleft.classList.contains('l3'):
            logleft.classList.remove('l3')
            logleft.classList.add('l4')
            break
        case logleft.classList.contains('l4'):
            logleft.classList.remove('l4')
            logleft.classList.add('l5')
            break
        case logleft.classList.contains('l5'):
            logleft.classList.remove('l5')
            logleft.classList.add('l1')
            break
    }
}

function moveLogright(logright) {
    switch (true) {
        case logright.classList.contains('l1'):
            logright.classList.remove('l1')
            logright.classList.add('l5')
            break
        case logright.classList.contains('l2'):
            logright.classList.remove('l2')
            logright.classList.add('l1')
            break
        case logright.classList.contains('l3'):
            logright.classList.remove('l3')
            logright.classList.add('l2')
            break
        case logright.classList.contains('l4'):
            logright.classList.remove('l4')
            logright.classList.add('l3')
            break
        case logright.classList.contains('l5'):
            logright.classList.remove('l5')
            logright.classList.add('l4')
            break
    }
}

function moveCarLeft(carsleft) {
    switch (true) {
        case carsleft.classList.contains('c1'):
            carsleft.classList.remove('c1')
            carsleft.classList.add('c2')
            break
        case carsleft.classList.contains('c2'):
            carsleft.classList.remove('c2')
            carsleft.classList.add('c3')
            break
        case carsleft.classList.contains('c3'):
            carsleft.classList.remove('c3')
            carsleft.classList.add('c1')
            break
    }
}

function moveCarRight(carsright) {
    switch (true) {
        case carsright.classList.contains('c1'):
            carsright.classList.remove('c1')
            carsright.classList.add('c3')
            break
        case carsright.classList.contains('c2'):
            carsright.classList.remove('c2')
            carsright.classList.add('c1')
            break
        case carsright.classList.contains('c3'):
            carsright.classList.remove('c3')
            carsright.classList.add('c2')
            break
    }
}

function lose() {
    if (
        squares[currIndex].classList.contains('c1') ||
        squares[currIndex].classList.contains('l4') ||
        squares[currIndex].classList.contains('l5') ||
        currTime <= 0
    ) {
        resultDisplay.textContent = 'YOU LOSE'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        squares[currIndex].classList.remove('frog')
        document.removeEventListener('keyup', moveFrog)
    }
}

function win() {
    if (squares[currIndex].classList.contains('ending-block')) {
        resultDisplay.textContent = 'YOU WIN!'
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        document.removeEventListener('keyup', moveFrog)
    }
}

startPauseButton.addEventListener('click', () => {
    if (timerId) {
        clearInterval(timerId)
        clearInterval(outcomeTimerId)
        outcomeTimerId = null
        timerId = null
        document.removeEventListener('keyup', moveFrog)
    } else {
        timerId = setInterval(autoMoveElements, 1000)
        outcomeTimerId = setInterval(checkOutcomes, 50)
        document.addEventListener('keyup', moveFrog)
    }
}
)

