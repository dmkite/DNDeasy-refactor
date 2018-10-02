function userInput(title, inputTag){
    document.getElementById('holder').innerHTML = ''
    let content  = `<h2>${title}</h2>
    ${inputTag}`

    document.getElementById('holder').innerHTML = content
} 

module.exports = userInput