const user = require('./user')
const races = require('../data/races')
const classes = require('../data/classes')
const backgrounds = require('../data/backgrounds')
const subraces = require('../data/subraces')
const displayBoard = document.querySelector('#displayBoard')
function readyToGo(returnFn){
    const inputs = document.querySelectorAll('.backstory')
    for( let input of inputs ){
        if(!input.value){
            document.querySelector('#next').onclick = null
            document.querySelector('#next').classList.add('inactive')
            return false
        }
    }
    document.querySelector('#next').onclick = function(){
        addToLog()
        return returnFn()
    }
    document.querySelector('#next').classList.remove('inactive')
}

function addToLog(){
    let inputs = document.querySelectorAll('.backstory')
    let backstoryArray = []
    for(let input of inputs){
        backstoryArray.push(input.value)
    }
    user.log.push(backstoryArray)
}


function prepForSelection(){
    let choices = document.querySelectorAll('.alignment')
    for (let choice of choices){
        choice.onclick = function(e){select(e)}
    }
}

function select(e) {
    if (user.numChoices > 0) {
        e.target.onclick = null
        e.target.classList.add('selected')
        user.numChoices--
        e.target.onclick = function (e) { unselect(e) }
    }
    else {
        return false
    }
}

function unselect(e) {
    e.target.onclick = null
    e.target.classList.remove('selected')
    e.target.onclick = function (e) { select(e) }
    user.numChoices++
}

function addAlign(returnFn){
    document.querySelector('#next').onclick = function(){
        user.log.push(document.querySelector('.selected').textContent)
        return returnFn()
    }
}





module.exports = {readyToGo, prepForSelection, addAlign}