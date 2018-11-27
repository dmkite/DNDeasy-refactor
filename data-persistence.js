const axios = require('axios')
const displayBoard = document.querySelector('#displayBoard')
const baseURL = 'http://localhost:3000'
const utils = require('./utils')
const userTemplates = require('./user-templates')

function prepLogin(){
    userTemplates.loginTemplate()
    document.querySelector('#signup').addEventListener('submit', function(e){signup(e)})
    document.querySelector('#login').addEventListener('submit', function (e) { login(e) })
    validate()
}

function signup(e){
    e.preventDefault()
    const username = document.querySelector('#username2').value
    const password = document.querySelector('#password2').value 
    axios.post(baseURL + '/users', {username, password})
    .then(response => {
        return signupSuccess()
    })
    .catch(err => {
        removeHidden('.alert-danger', response.message)
    })
}

function login(e){
    e.preventDefault()
    const username = document.querySelector('#username').value
    const password = document.querySelector('#password').value
    axios.post(baseURL + '/auth/login', {username, password})
    .then(response => {
        const token = response.data.token
        localStorage.setItem('token', token)
        return loginSuccess(token)
    })
    .catch(err => {
        removeHidden('.alert-danger', 'Something went wrong')
    })
}

function signupSuccess(){
    clearInputs()
    prepLogin()
    removeHidden('.alert-success', 'Sign up successful, please log in')
}

function clearInputs(){
    let inputs = document.querySelectorAll('inputs')
    inputs.forEach(input => input.value = '')
}

function removeHidden(type, message){
    let alert = document.querySelector(`${type}`)
    alert.classList.remove('hidden')
    alert.textContent = message
}

function validate(){
    let pass1 = document.querySelector('#password2')
    let pass2 = document.querySelector('#password3')
    utils.addDifferentListeners('.passwordCheck', ['touch', 'keydown', 'keyup'], function () { match(pass1, pass2) })
}

function match(item1, item2){
    if(item1.value !== item2.value){
        removeHidden('.alert-danger', 'passwords do not match')
        document.querySelector('#signup').onsubmit = null
        document.querySelector('#login').onsubmit = null
    } 
    else{
        document.querySelector('.alert-danger').classList.add('hidden')
        document.querySelector('#signup').onsubmit = function(e){signup(e)}
        document.querySelector('#login').onsubmit = function (e) { login(e) }
    } 
}

function loginSuccess(token){
    getChars(token)
}

function getChars(token){
    axios.post(baseURL + '/users/characters', {token})
    .then(response => {
        utils.addToLocalStorage('chars', response.data.data)
        let shortCharArray = characterShorts(response.data.data)
        return userTemplates.charTemplate(shortCharArray)
    })
    .catch(err =>{
        console.log(err)
    })
}

function characterShorts(array){
    const result = array.reduce((acc, character) => {
        console.log(character.character)
        console.log(typeof(character.character))
        console.log(typeof(JSON.parse(character.character)))
        character = JSON.parse(character.character)
        let short = `${character.character.log[22][0]} the ${character.character.log[0]} ${character.character.log[5]}`
        acc.push(short)
        return acc
    }, [])
    return result
}


module.exports = {prepLogin}