const user = require('./user')
const races = require('./data/races')
const classes = require('./data/classes')
const backgrounds = require('./data/backgrounds')
const subraces = require('./data/subraces')
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

function finalRender(){
    headerInfo()
    // statInfo()

}

function headerInfo(){
    let subrace = user.log[2]
    if(user.raceId === 6) subrace = null
    displayBoard.innerHTML = `
    <div class="top">
        <h3>${user.log[22][0]}</h3>    
        <p>Level 1 ${user.log[5]} | ${user.log[20]} </p>
        <p>${subrace || user.log[0]} | ${user.log[21]}</p>
    </div>`
}

function statInfo(){
    let finalStats = races[user.raceId].ability_bonuses
    if(!!user.log[2] && !Array.isArray(user.log[2]) ) finalStats = combineArrays(finalStats, subraces[user.subraceId].ability_bonuses)
    finalStats = combineArrays(finalStats, user.log[17])
    if(!!user.log[18]){
        let bonus = figureDifference(user.log[17], user.log[18])
        finalStats = combineArrays(finalStats, bonus)
    }
    return statTemplate(finalStats)
}

function statTemplate(arr){
    displabyBoard.innerHTML += `
    <div class="accordion" id="accordionExample">
        <div class="card">
            <div class="card-header" id="headingOne">
            <h5 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Collapsible Group Item #1
                </button>
            </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                    <div class="finalStat">
                        <p class="statName">STR</p>
                        <div class="rawStat">${arr[0]}</div>
                        <div class="mod">${modCalc(arr[0])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">DEX</p>
                        <div class="rawStat">${arr[1]}</div>
                        <div class="mod">${modCalc(arr[1])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">CON</p>
                        <div class="rawStat">${arr[2]}</div>
                        <div class="mod">${modCalc(arr[2])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">INT</p>
                        <div class="rawStat">${arr[3]}</div>
                        <div class="mod">${modCalc(arr[3])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">WIS</p>
                        <div class="rawStat">${arr[4]}</div>
                        <div class="mod">${modCalc(arr[4])}</div>
                    </div>

                    <div class="finalStat">
                        <p class="statName">CHA</p>
                        <div class="rawStat">${arr[5]}</div>
                        <div class="mod">${modCalc(arr[5])}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>`
}

function modCalc(num){
    return Number(Math.floor((num - 10) / 2))
}

function combineArrays(arr1, arr2){
    const newArr = []
    for(let i = 0; i < arr1.length; i++){
        newArr[i] = arr1[i] + arr2[i]
    }
    return newArr
}

function figureDifference(arr1, arr2){
    const newArr = []
    for(let i = 0; i < arr2.length; i++){
        if(arr1[i] < arr2[i]) newArr[i] = 1
        else newArr[i = 0]
    }
    newarr.push(0)
    return newArr
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



module.exports = {readyToGo, finalRender, prepForSelection, addAlign}