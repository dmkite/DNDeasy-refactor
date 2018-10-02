//import dndcharacter function

//classList.toggle
//event.target.inputName.value (use instead of queryselector().value)

function userInput(title, inputTag, triggerFn, progressLog){

    document.getElementById('holder').innerHTML = ''
    let content  = `<h2>${title}</h2>
    ${inputTag}`
    document.getElementById('holder').innerHTML = content
    next.addEventListener('click', function(){inputComplete(triggerFn, progressLog)})
    //validation

    document.querySelector('#userInput').addEventListener('keyup', function(e){
        if(e.target.value.length > 0){
            document.getElementById('next').classList.remove('inactive')
            document.getElementById('next').classList.add('active')
        }
        else{
            document.getElementById('next').classList.add('inactive')    
        }
    })
} 

function inputComplete(triggerFn, progressLog){
    let finalInput = [document.getElementById('userInput').value]
    progressLog.push(finalInput)
    let back = document.getElementById('back')
    back.classList.remove('inactive')
    back.classList.add('active')
    
    triggerFn()

}

module.exports = userInput