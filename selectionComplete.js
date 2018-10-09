function selectionComplete(progressLog, finalChoice, triggerFn){
    progressLog.push(finalChoice)
    let back = document.getElementById('back')

    
    document.querySelector('#next').classList.toggle('hidden')

    triggerFn()

}
//problem: if you click items multiple times and then hit next, there are multiple appends to userprogress
module.exports = selectionComplete