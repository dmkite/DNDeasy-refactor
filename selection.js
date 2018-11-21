const user = require('./user')
const { standardTemplate, infoPageHTML } = require('./templates')
const { addListenersToMany } = require('./utils')
const races = require('./data/races')


const displayBoard = document.querySelector('#displayBoard')

function display(arr, templateType = standardTemplate) {
    let result = arr.map(item => templateType(item))
    displayBoard.innerHTML = result.join('')
    prepCards(arr)
}

function prepCards(arr) {
    addListenersToMany('.select', 'click', function (e) { select(e) })
    addListenersToMany('.more', 'click', function (e) { showInfo(e, arr) })
}

function select(e) {
    if (user.numChoices > 0) {
        e.target.onclick = null
        e.target.parentElement.classList.add('selected')
        user.numChoices--
        e.target.onclick = function (e) { unselect(e) }
        e.target.textContent = 'unselect'
    }
    else{
        return false
    }
}

function unselect(e) {
    e.target.onclick = null
    e.target.parentElement.classList.remove('selected')
    e.target.onclick = function(e){select(e)}
    user.numChoices++
    e.target.textContent = 'select'
}

function showInfo(e, arr) {
    let id = e.target.getAttribute('data-id')
    createInfoPage(id, arr)
}

function createInfoPage(index, arr) {
    let specificItem = arr[index - 1]
    displayBoard.innerHTML += infoPageHTML(specificItem)
    document.querySelector('.back').onclick = function (e) { slideOut(e) }
}


function slideOut(e) {
    setTimeout(function () {
        e.target.parentElement.style.animation = 'slideOut .5s ease-in'
        setTimeout(function () {
            e.target.parentElement.remove()
        }, 500)
    }, 0)
}

function readyToGo(returnFn) {
    if (user.numChoices === 0) {
        document.querySelector('#next').classList.remove('inactive')
        document.querySelector('#next').onclick = function () {
            addSelection()
            return returnFn()
        }
    }
    else{
        document.querySelector('#next').classList.add('inactive')
        document.querySelector('#next').onclick = null
    }
}

function addSelection() {
    const selected = Array.from(document.querySelectorAll('.selected'))
    const toLog = selected.reduce((acc, selection) => {
        acc.push(selection.children[2].textContent)
        return acc
    }, [])
    if (toLog.length === 1) user.log.push(toLog[0])
    else user.log.push(toLog)
}

function addIndex(name, array, indexType){
    if(!name) return false
    for (let item of array){
        if (item.name === name){
            user[indexType] = item.index - 1
        } 
    }
}

function skipDisplay(returnFn){
    user.log.push(null)
    return returnFn()
}


function selectFrom(choiceObj, originArray, templateType = standardTemplate) {
    let choiceArray
    if ( Array.isArray(choiceObj) ) choiceArray = choiceObj.map(item => item.name)
    else choiceArray = choiceObj.from.map(item => item.name)
    let displayArray = matchByName(originArray, choiceArray)
    display(displayArray, templateType)
}


function matchByName(masterArray, optionArray) {
    let result = masterArray.reduce((acc, item) => {
        for (let choice of optionArray) {
            if (item.name === choice) acc.push(item)
        }
        return acc
    }, [])
    return result
}

function preventDupe(arr){
    let result = arr.reduce((acc, item) => {
        for (let entry of user.log) {
            if (entry === item.name) { return acc }
            if (Array.isArray(entry)) {
                for (let subEntry of entry) {
                    if (subEntry === item.name) { return acc }
                }
            }
        }
        acc.push(item)
        return acc
    }, [])
    return result
}

function createSpellList(lvl, spells) {
    let spellList = spells.reduce((acc, spell) => {
        for (let classType of spell.classes) {
            if (spell.level === lvl && classType.name === user.log[5]){ 
                acc.push(spell)
            }
        }
        return acc
    }, [])
    return spellList
}



module.exports = {display, readyToGo, addIndex, skipDisplay, selectFrom, preventDupe, createSpellList}
