const selectionComplete = require('./selectionComplete')

function display(choiceObj, progressLog, triggerFn){
    let choiceCount = 1
    if(Array.isArray(choiceObj)){
        choiceCount = choiceObj[0]
        choiceObj = choiceObj[1]
    }

    let holder = document.getElementById('holder')
    holder.innerHTML = ''

    let choiceArray = Object.keys(choiceObj)
    
    let options = []
    let placeholder = 'https://cdn.tutsplus.com/net/uploads/legacy/958_placeholders/placehold.gif'
    for(let choices of choiceArray){
        options.push(`
        <div class="card">
            <img src="${placeholder}" alt="image of ${choices}">
            <h3>${choices}</h3>
            <p>${choiceObj[choices].desc}</p>
            <div class="reverse">
            </div>
        </div>`)
    }
    holder.innerHTML = options.join('\n')

    let cards = document.querySelectorAll('.card')
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', function(e){select(e, choiceCount, progressLog, triggerFn)})
    }  
}

function select(e, numOfChoices, progressLog, triggerFn){
    let finalChoice = []
    let selectedItem = event.currentTarget
    let next = document.getElementById('next')
    let back = document.getElementById('back')

    let cards = document.querySelectorAll('main div')
    for(let i = 0; i < cards.length; i++){
        if(cards[i].classList.contains('selected')){
            numOfChoices--
            finalChoice.pop()
        }
    }
    // ^^go through, if any cards are selected, reduce number of choices

    if(selectedItem.classList.contains('selected')){
        selectedItem.classList.remove('selected')
        numOfChoices++
        for(let i = 0; i < cards.length; i++){
            cards[i].classList.remove('inactive')
        }
        next.classList.add('inactive')
        next.classList.remove('active')
    }
    else if(numOfChoices !== 0){
        selectedItem.classList.add('selected')
        finalChoice.push(event.currentTarget.children[1].innerHTML)
        numOfChoices--
    }

    if(numOfChoices === 0){
        for(let i = 0; i < cards.length; i++){
            cards[i].classList.add('inactive')
        }
        next.classList.remove('inactive')
        next.classList.add('active')
        
    }
    
    next.addEventListener('click', function(){selectionComplete(progressLog, finalChoice, triggerFn)})
}

module.exports = display