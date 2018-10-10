function storeProgress(user, progressLog){
    let num = progressLog.length
    let toStore = {user, progressLog, num}
    toStore = JSON.stringify(toStore)
    if(progressLog[progressLog.length - 1] !== null){
     localStorage.setItem(num, toStore)
    }
}

function revertProgress(user, progressLog, key, triggerFn){
    
    let stringProgress = localStorage.getItem(key)
    let progress = JSON.parse(stringProgress)
    if(progress.userProgress[key] === null){
        key--
        revertProgress(user, progressLog, key)
    } 
    else{
        progressLog = progress.userProgress
        user = progress.userObj    
        triggerFn()
    }
}

module.exports = { storeProgress, revertProgress }
