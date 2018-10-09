const selectionComplete = require('./selectionComplete')
const races = require('./data-objects/races')

function display(choiceObj, progressLog, triggerFn, topic){
    
    let choiceCount = 1

    if(Array.isArray(choiceObj)){
        choiceCount = choiceObj[0]
        choiceObj = choiceObj[1]
    }

    let holder = document.getElementById('holder')
    holder.innerHTML = ''

    let choiceArray = Object.keys(choiceObj)
    
    let options = []

    for(let choices of choiceArray){
        if(progressLog.length > 0 && !!races[progressLog[0][0]][topic] === true ){
            if( races[progressLog[0][0]][topic].includes(choices) ){
                continue
            }

        }
        options.push(`
        <div class="card-wrapper">
        
            <div class="card">
                <div class="card-front">
                    <h3>${choices}</h3>
                    <p>${choiceObj[choices].desc}</p>
                    <div class="btn-turn-to-back"></div>
                </div>

                <div class="card-back">
                    <p>Back</p>
                    <div class="btn-turn-to-front"></div>
                </div>

            </div>

        </div>`)
    }
    holder.innerHTML = options.join('\n')

    let cards = document.querySelectorAll('.card')
    let finalChoice = []
    document.querySelector('#choiceDisplay').textContent = choiceCountDisplay(choiceCount)
    let prepCardsForSelection = function(e){select(e, choiceCount, finalChoice, progressLog, triggerFn)}

    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', prepCardsForSelection)
        document.querySelectorAll('.btn-turn-to-front')[i].style.visibility = 'visible';
        document.querySelectorAll('.btn-turn-to-back')[i].style.visibility = 'visible';

        document.querySelectorAll('.btn-turn-to-front')[i].onclick = function (event) {
            event.stopPropagation();
            document.querySelectorAll('.card')[i].classList.toggle('do-flip')
        };

        document.querySelectorAll('.btn-turn-to-back')[i].onclick = function (event) {
            event.stopPropagation()
            document.querySelectorAll('.card')[i].classList.toggle('do-flip');
            
        };
    }  

    
}

function choiceCountDisplay(choicesLeft) {
    if (choicesLeft === 1) {
        return `you have 1 selection left to make`
    }
    else {
        return `you have ${choicesLeft} selections left to make`
    }
}

function select(event, numOfChoices,finalChoice, progressLog, triggerFn){
    let next = document.querySelector('#next')
    let choiceDisplay = document.querySelector('#choiceDisplay')
    let choiceCount = numOfChoices - finalChoice.length
    let logSelectionMoveOn = function(e){selectionComplete(progressLog, finalChoice, triggerFn)} 
   
    choiceDisplay.textContent = choiceCountDisplay(finalChoice.length)
   
    if(choiceCount !== 0){ //have choices left
        if(event.currentTarget.classList.contains('selected')){
            event.currentTarget.classList.remove('selected')
            choiceCount++
            finalChoice.splice(finalChoice.indexOf(event.currentTarget.children[0].children[0].innerHTML), 1)
            
            choiceDisplay.textContent = choiceCountDisplay(choiceCount)
        }
        else{
            event.currentTarget.classList.add('selected')
            choiceCount--
            finalChoice.push(event.currentTarget.children[0].children[0].textContent)

            choiceDisplay.textContent = choiceCountDisplay(choiceCount)
        }
    }
    else{                   //have no choices left
        if(event.currentTarget.classList.contains('selected')){
            event.currentTarget.classList.remove('selected')
            choiceCount++
            finalChoice.splice(finalChoice.indexOf(event.currentTarget.children[0].children[0].innerHTML), 1)
            
            choiceDisplay.textContent = choiceCountDisplay(choiceCount)
        }
        else{
            choiceDisplay.textContent = choiceCountDisplay(choiceCount)
            // return false;
        }
    }
    
    if(choiceCount === 0 && finalChoice.length === numOfChoices){
        next.classList.remove('hidden')
        // next.addEventListener('click', logSelectionMoveOn, {once:true})
        next.onclick = logSelectionMoveOn
    }else if(choiceCount !== 0){
        next.classList.add('hidden')
        // next.removeEventListener('click', logSelectionMoveOn)
    }
    // if(progressLog.length === origLength){
    //     progressLog.push(finalChoice)
    // }
    // else if(progressLog.length > origLength){
    //     progressLog.pop()
    //     progressLog.push(finalChoice)
    // }
    
}

module.exports = { display, select}