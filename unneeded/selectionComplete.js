function selectionComplete(progressLog, finalChoice, triggerFn){
    progressLog.push(finalChoice)

    document.querySelector('#next').classList.toggle('hidden')

    triggerFn()

}

module.exports = selectionComplete