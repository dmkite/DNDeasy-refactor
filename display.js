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
function display(choiceObj){
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
        options.push(`
        <div class="card">
            <h3>${choices}</h3>
            <p>${choiceObj[choices].desc}</p>
            <div class="reverse">
            </div>
        </div>`)
    }
    holder.innerHTML = options.join('\n')

    let cards = document.querySelectorAll('.card')
    for(let i = 0; i < cards.length; i++){
        cards[i].addEventListener('click', function(e, numOfChoices){select(e, choiceCount)})
    }
    
    
}

function select(e, numOfChoices){
    let selectedItem = event.currentTarget
    if(selectedItem.classList.contains('selected')){
        selectedItem.classList.remove('selected')
        numOfChoices++
    }
    else{
        selectedItem.classList.add('selected')
        numOfChoices--
    }
    if(numOfChoices === 0){
        for(let i = 0; i < document.querySelectorAll('main div').length; i++){
            document.querySelectorAll('main div')[i].style.opacity = '.5'
        }
    }

}
module.exports = display