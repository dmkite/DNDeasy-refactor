function selectionComplete(progressLog, finalChoice, triggerFn){
    progressLog.push(finalChoice)
    let back = document.getElementById('back')
    back.classList.remove('inactive')
    back.classList.add('active')
    
    document.querySelector('#next').classList.toggle('hidden')

    triggerFn()

}
//problem: if you click items multiple times and then hit next, there are multiple appends to userprogress
module.exports = selectionComplete