const login = require('./src/login')
const createDNDChar = require('./src/create-function')

const pageInitialization = {
    '/': main,
    '/login.html': login.loginInit,
    '/create.html': createDNDChar,
    '/user.html': login.userInit
}

const path = window.location.pathname

if (pageInitialization.hasOwnProperty(path)) {
    pageInitialization[path]()
}
else {
    console.error(`${path} does not have an initializer`)
}

function main(){
    const login = document.querySelector('#login')
    const token = localStorage.getItem('token')
    if (!token){
        login.textContent = 'log in'
        login.addEventListener('click', function () { window.location.pathname = '/login.html' })
    }
    else{
        login.textContent = 'characters'
        login.addEventListener('click', function(){window.location.pathname = '/user.html'})
    }
    document.querySelector('#new').addEventListener('click', function(){window.location.pathname = '/create.html'})
}






