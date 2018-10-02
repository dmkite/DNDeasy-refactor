function selectionComplete(progressLog, finalChoice, triggerFn){
    progressLog.push(finalChoice)
    let back = document.getElementById('back')
    back.classList.remove('inactive')
    back.classList.add('active')
    
    triggerFn()

}

module.exports = selectionComplete