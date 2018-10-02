// function displayX(type){
//     for(let i = 0; i < Object.keys(races).length; i++){
//       buildDom(getFirstEl, '#holder', createEl, 'div', appendEl)
//       let div = document.querySelectorAll('#holder div')[i]
//       div.innerHTML = `<h3>${Object.keys(type)[i]}</h3>`
//       div.classList.add('card')
//       div.appendChild(createEl('p'))
//       getXEl('p',i).innerHTML = type[Object.keys(type)[i]].desc
//       div.addEventListener('click', select)
//     }
//   }



//   function displayX(choiceArray, key){
//     document.getElementById('holder').innerHTML = ''
//     let counter = choiceArray[0]
//     let choiceList = Object.keys(choiceArray[1])
//     let userList = races[userProgress[0]][key]
//     for(let i = 0; i < userList.length; i++){
//       //in the user's race, loop through the keyword, e.g. languages, etc.
//       /*remove list  */
//       if(choiceList.includes(userList[i])){
//         choiceList.splice(choiceList.indexOf(userList[i]), 1)
//       }
//     }
//     choiceList.forEach(
//         (choice, i) =>{
//           buildDom(getFirstEl, '#holder', createEl, 'div', appendEl)
//           let div = document.querySelectorAll('#holder div')[i]
//           div.innerHTML = `<h3>${choice}</h3>`
//           div.classList.add('card')
//           div.appendChild(createEl('p'))
//           getXEl('p',i).innerHTML = races[userProgress[0]].choices[key][1][choice]
//           let numOfChoices = races[userProgress[0]].choices[key][0]
//           div.addEventListener('click', select)
//           // div.addEventListener('click', function(e){select(e, numOfChoices)})
//         }
//       )
//     }

function display(choiceObj, progressLog){
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
        cards[i].addEventListener('click', function(e){select(e, choiceCount, progressLog)})
    }
    
    
}

function select(e, numOfChoices, progressLog){
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
    
    next.addEventListener('click', () => {
        progressLog.push(finalChoice)
        console.log(progressLog)
    })
}
module.exports = display