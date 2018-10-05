let userProgress = [['barbarian']]
const classes = { barbarian: { savingThrows: ['STR', 'CON'] } }

function diceRoll(numDice, numSides) {
    let statNums = []
    for (let i = 0; i < numDice; i++) {
        let score = Math.floor(Math.random() * numSides) + 1
        statNums.push(score)
    }
    return statNums
}

diceRoll(4, 6)

function statGen(rollFn, numDice, numSides, numTimes) {
    let stats = []
    for (let i = 0; i < numTimes; i++) {
        let statNums = rollFn(numDice, numSides)
        statNums.sort((a, b) => a - b)
        statNums.shift()
        stats.push(statNums.reduce((acc, num) => acc + num, 0))
    }
    return stats
}


let stats = statGen(diceRoll, 4, 6, 6)

function render(statArr) {
    const holder = document.querySelector('#holder')
    holder.innerHTML = '<div class="col col1"></div> <div class="col col2"></div>'
    for (let i = 0; i < statArr.length; i++) {
        document.querySelector('.col1').innerHTML += `<div class="numContainer" draggable="true"
ondragstart="drag(event)">${statArr[i]}</div>`
        document.querySelectorAll('.numContainer')[i].id = `num${i + 1}`
        document.querySelectorAll('.numContainer')[i].addEventListener('click', function (event) {
            event.target.style.transform = 'scale(.7)'
        })
    }
}
render(stats)

let statTypes = ['STR', 'CON', 'INT', 'WIS', 'CHA', 'DEX']

for (let i = 0; i < statTypes.length; i++) {

    document.querySelector('.col2').innerHTML += `<div class="statHolder" ondrop="drop(event)" ondragover="allowDrop(event)"><span>${statTypes[i]}</span></div>`
    if (classes[userProgress[0][0]].savingThrows.includes(statTypes[i])) {
        document.querySelectorAll('.statHolder')[i].classList.add('special')
        document.querySelectorAll('.statHolder')[i].id = `stat${i + 1}`
    }
}
document.querySelector('main').innerHTML += `As a ${userProgress[0][0]}, ${classes[userProgress[0][0]].savingThrows.join(' and ')} are important`



function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}



const userStats = {}

let statHolder = document.querySelectorAll('.statHolder')
let numHolder = document.querySelectorAll('.numHolder')

for(let stat of statHolder){
    let statType = stat.children[0].textContent
    let statNum = stat.children[1].textContent
    userStats.statType = statNum
}

userProgress.push([userStats])