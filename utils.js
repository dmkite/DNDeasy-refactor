

function addListenersToMany(element, listenerType, fn) {
    const elements = document.querySelectorAll(element)
    elements.forEach(ele => ele.addEventListener(listenerType, fn))

}

function addDifferentListeners(element, listenerArray, fn){
    listenerArray.forEach(listener => addListenersToMany(element, listener, fn))
}


module.exports = {addListenersToMany, addDifferentListeners}