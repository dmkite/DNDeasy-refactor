
function storeProgress(user, progressLog){
    let storageString = localStorage.getItem('storedProgress')
    let storage = JSON.parse(storageString)
    let toStore = { user, progressLog}
    storage.push(toStore)
    storageString = JSON.stringify(storage)
    localStorage.setItem('storedProgress', storageString)
}

function revertProgress(){
    let storageString = localStorage.getItem('storedProgress')
    let storage = JSON.parse(storageString)
    storage.pop()

    let mostRecentlyStored = storage[storage.length - 1]
    //returns object w/ user and progressLog keys

    let lastLog = mostRecentlyStored.progressLog
    //returns array
    
    let lastDecision = lastLog[lastLog.length - 1]
    //returns last item of array
    
    if(lastDecision !== null){
        return storage[storage.length - 1] 
    }
    else{
        while (lastDecision === null) {
            storage.pop()
            mostRecentlyStored = storage[storage.length - 1]
            lastLog = mostRecentlyStored.progressLog
            lastDecision = lastLog[lastLog.length - 1]
        }
           
        storageString = JSON.stringify(storage)

        localStorage.setItem('storedProgress', storageString)

        return storage[storage.length - 1]
    }
}


function choiceNotPresent(progressLog, triggerFn) {
    progressLog.push(null)
    triggerFn()
}

module.exports = { storeProgress, revertProgress, choiceNotPresent }
