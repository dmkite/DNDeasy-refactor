//import dndcharacter function

//classList.toggle
//event.target.inputName.value (use instead of queryselector().value)

function userInput(title, inputTag, triggerFn, progressLog){

    document.getElementById('holder').innerHTML = ''

    let content  = `<h2>${title}</h2>
    ${inputTag}`
    document.getElementById('holder').innerHTML = content

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
    
    //vv back button stuff
    let back = document.getElementById('back')
    back.classList.toggle('hidden')

    document.querySelector('#next').classList.toggle('hidden')
    triggerFn()
}

module.exports = userInput