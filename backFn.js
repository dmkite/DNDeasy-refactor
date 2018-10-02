function backFn(progressLog, triggerFn){
    progressLog.pop()
    triggerFn()
}

module.exports = backFn