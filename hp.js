const classes = require('./data/classes')
const user = require('./user')
const stats = require('./stats')

function HPGen(returnFn) {
    let counter = 20
    let hitDie = classes[user.classId].hit_die
    let rollingDie = setInterval(function () {
        let diceNum = stats.diceRoll(1, hitDie)
        document.querySelector('.dice').textContent = diceNum[0]
        counter--
        if (counter === 0) {
            clearInterval(rollingDie)
            setTimeout(function () { 
                document.querySelector('.dice').classList.add('animatedNum') 
                addHP(returnFn)
            }, 0)
    }
     }, 100)
}


function addHP(returnFn){
    const dice = document.querySelector('.dice')
    let rolledNum = dice.textContent
    const HP = Number(Math.floor((user.log[17][2] - 10) / 2)) + Number(rolledNum)
    dice.onclick = null
    user.log.push(HP)
    document.querySelector('#next').classList.remove('inactive')
    document.querySelector('#next').onclick = returnFn
}





module.exports = HPGen