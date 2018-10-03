function backFn(progressLog, triggerFn){
    console.log(progressLog[progressLog.length - 1],'xxxxxxxxxxxxx')
    if(progressLog[progressLog.length - 1] === null){
        for(let i = progressLog.length - 1; i >= 0; i--){
            console.log(progressLog[i], i)
            if(progressLog[i] === null){
                progressLog.pop()
            }
            else{
                progressLog.pop()
                console.log(progressLog.length, '----------------------------')
                break
            }
        }
        console.log('broke out because of ', progressLog[progressLog.length - 1])
    }
    else{
        progressLog.pop()
    }
    console.log('======about to enter dnd function again=========')
    triggerFn(progressLog)
}

function choiceNotPresent(progressLog, triggerFn){
    console.log('--no choice to make--')
    progressLog.push(null)
    triggerFn()
}
module.exports = {backFn, choiceNotPresent}