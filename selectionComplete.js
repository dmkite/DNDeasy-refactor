function selectionComplete(progressLog, finalChoice){
    progressLog.push(finalChoice)
    console.log(progressLog, finalChoice)
    console.log('worked')
    let back = document.getElementById('back')
    back.classList.remove('inactive')
    back.classList.add('active')
    createDNDCharacter()
}

module.exports = selectionComplete