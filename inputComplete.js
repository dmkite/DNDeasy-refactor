function inputComplete(progressLog, triggerFn){
        progressLog.push(document.getElementById('userInput').value)
        let back = document.getElementById('back')
        back.classList.remove('inactive')
        back.classList.add('active')
        
        triggerFn()
    
}

module.exports = inputComplete