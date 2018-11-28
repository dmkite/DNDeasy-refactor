

function addListenersToMany(element, listenerType, fn) {
    const elements = document.querySelectorAll(element)
    elements.forEach(ele => ele.addEventListener(listenerType, fn))

}

function addDifferentListeners(element, listenerArray, fn){
    listenerArray.forEach(listener => addListenersToMany(element, listener, fn))
}

function addToLocalStorage(name, data){
    let stringData = JSON.stringify(data)
    localStorage.setItem(name, stringData)
}
function getFromLocalStorage(name){
    let StringData = localStorage.getItem(name)
    let data = JSON.parse(data)
    return data
}

module.exports = {addListenersToMany, addDifferentListeners, addToLocalStorage, getFromLocalStorage}