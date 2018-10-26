const classes = require('./data-objects/classes')

function diceRoll(numDice, numSides) {
    let statNums = []
    for (let i = 0; i < numDice; i++) {
        let score = Math.floor(Math.random() * numSides) + 1
        statNums.push(score)
    }
    return statNums
}


function hpRoll(progressLog, triggerFn){
    document.querySelector('#choiceDisplay').textContent = ''
    let hitDie = classes[progressLog[9][0]].hitDie
    document.querySelector('main').innerHTML = '<div class="dice"></div>'
    
    function generateHP(progressLog, triggerFn, hitDie) {    
        let counter = 20
        let rollingDie = setInterval(function () {
            let diceNum = diceRoll(1, hitDie)
            document.querySelector('.dice').textContent = diceNum[0]
            counter--
            if (counter === 0) {
                clearInterval(rollingDie)
                setTimeout(function () { document.querySelector('.dice').classList.add('animatedNum') }, 0)
                let rolledNum = document.querySelector('.dice').textContent
                const HP = Number(Math.floor((progressLog[17][0].CON - 10) / 2)) + Number(rolledNum)
                
                document.querySelector('#next').classList.remove('hidden')
                document.querySelector('#next').onclick = function () {
                    progressLog.push([HP])
                    triggerFn()
                }
            }
        }, 100)

        document.querySelector('.dice').removeEventListener('click', generateHP)

    }

    document.querySelector('.dice').onclick = function(){generateHP(progressLog, triggerFn, hitDie)}
}




module.exports = hpRoll
