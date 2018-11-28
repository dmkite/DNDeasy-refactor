const displayBoard = document.querySelector('#displayBoard')



function charTemplate(arr){
    let charHTML = arr.reduce((acc, char) => {
        acc.push(`<p>${char}</p>`)
    }, [])
    displayBoard.innerHTML = charHTML.join('')
}

module.exports = {charTemplate}
