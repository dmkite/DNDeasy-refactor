//import dndcharacter function

//classList.toggle
//event.target.inputName.value (use instead of queryselector().value)
const races = require('./data-objects/races')
function userInput(inputTag, triggerFn, progressLog, topic){
    const holder = document.getElementById('holder')
    document.querySelector('#choiceDisplay').textContent = ''
    holder.innerHTML = `<div id="inputScreen">${inputTag}</div>`
    
    switch(topic){
        case 'names':
            holder.children[0].innerHTML += `<h3>Having trouble thinking of ${topic}?</h3><br>
            <ul>
                <li><b>Male ${progressLog[0][0]} Names:</b></li>
                <li>${races[progressLog[0][0]].names[0].join('</li><li>')}</li>
            </ul>
            <ul>
                <li><b>Female ${progressLog[0][0]} Names:</b></li>
                <li>${races[progressLog[0][0]].names[1].join('</li><li>')}</li>
            </ul>`
            break
        case 'traits':
            break
        case 'ideals':
            break
        case 'bonds':
            break
        default:
            break            
    }
    // let next = document.getElementById('next')

    //validation

    document.querySelector('#userInput').addEventListener('keyup', function(e){
        if(e.target.value.length > 0){
            let next = document.querySelector('#next')
            let addUserInputToLog = function(){inputComplete(triggerFn, progressLog)}
            next.onclick = addUserInputToLog
            next.classList.remove('hidden')
        }
        else if(e.target.value.length === 0){
            next.classList.add('hidden')
        }
        
    })
    
} 

function inputComplete(triggerFn, progressLog){
    let finalInput = [document.getElementById('userInput').value]
    progressLog.push(finalInput)
    

    document.querySelector('#next').classList.toggle('hidden')
    triggerFn()
}

module.exports = userInput