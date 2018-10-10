function inputComplete(progressLog, triggerFn){
        progressLog.push(document.getElementById('userInput').value)
       
        
        triggerFn()
    
}

module.exports = inputComplete