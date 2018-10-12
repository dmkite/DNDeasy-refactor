const classes = require('./data-objects/classes')
const {userProgress, createDNDcharacter } = require('./main')

function diceRoll(numDice, numSides) {
    let statNums = []
    for (let i = 0; i < numDice; i++) {
        let score = Math.floor(Math.random() * numSides) + 1
        statNums.push(score)
    }
    return statNums
}



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
    holder.innerHTML = '<div class="col col1" ondrop="drop(event)" ondragover="allowDrop(event)"></div> <div class="col col2"></div>'
    for (let i = 0; i < statArr.length; i++) {
        document.querySelector('.col1').innerHTML += `<div class="numContainer" draggable="true"
ondragstart="drag(event)">${statArr[i]}</div>`
        document.querySelectorAll('.numContainer')[i].id = `num${i + 1}`
        document.querySelectorAll('.numContainer')[i].addEventListener('click', function (event) {
            event.target.style.transform = 'scale(.7)'
        })
    }
}


let statTypes = ['STR', 'CON', 'INT', 'WIS', 'CHA', 'DEX']



function displayStats(progressLog, triggerFn){
    document.querySelector('#choiceDisplay').textContent = ''
    render(stats)

    for (let i = 0; i < statTypes.length; i++) {

        document.querySelector('.col2').innerHTML +=  
        `<div class="statDropContainer">
            <span>${statTypes[i]}</span>
            <div class="statHolder" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        </div>`
        if (classes[progressLog[9][0]].savingThrows.includes(statTypes[i])) {
            document.querySelectorAll('.statHolder')[i].classList.add('special')
            document.querySelectorAll('.statHolder')[i].id = `stat${i + 1}`
            
        }
        
    }
    document.querySelector('#prompter').innerHTML += `<p>As a ${progressLog[9][0]}, ${classes[progressLog[9][0]].savingThrows.join(' and ')} are important</p>`



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

    document.addEventListener('drop', function(){
        if(document.querySelector('.col1').children.length === 0){
            document.querySelector('#next').classList.remove('hidden')
            document.querySelector('#next').onclick = function(){statComplete(progressLog, triggerFn)}
        }
        else{
            document.querySelector('#next').classList.add('hidden')
        }
    })
}

function statComplete(progressLog, triggerFn){
    // document.querySelector('#next')
    const userStats = {}

    let statDropContainer = document.querySelectorAll('.statDropContainer')
    let numHolder = document.querySelectorAll('.numHolder')

    for(let stat of statDropContainer){
        let statType = stat.children[0].textContent
        let statNum = stat.children[1].children[0].textContent
        userStats[statType] = statNum
    }

    progressLog.push([userStats])
    
    triggerFn()
}
module.exports = displayStats
