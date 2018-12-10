const axios = require('axios')
const displayBoard = document.querySelector('#displayBoard')
const baseURL = 'http://localhost:3000'
const utils = require('./utils')

function loginInit(){
    document.querySelector('#signup').addEventListener('submit', function(e){signup(e)})
    document.querySelector('#login').addEventListener('submit', function (e) { login(e) })
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
        loginSuccess()
    })
    .catch(err => {
        removeHidden('.alert-danger', 'Something went wrong')
    })
}

function loginSuccess() {
    window.location.pathname = '/user.html'
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

function userInit(){
    const token = localStorage.getItem('token')
    return axios.get(baseURL + '/auth/token', {headers: {Authorization: `Bearer ${token}`}})
    .then(data => {
        document.querySelector('body').setAttribute('data-id', data.data.data.id)
        document.querySelector('#displayBoard').innerHTML += `<h3>Welcome ${data.data.data.name}</h3>`
        return getChars()
    })
    .catch(err => {
        authGate()
    })
}

function getChars(){
    const id = body.getAttribute('data-id')
    return axios.get(`baseURL/characters/${id}`)
    .then(result => console.log(result))

}
function authGate(){
    const token = localStorage.getItem('token')
    return axios.get(baseURL + '/auth/token', { headers: { Authorization: `Bearer ${token}` } })
        .then()
        .catch(() => {
            localStorage.removeItem('token')
            window.location.pathname = '/'
        })
}






module.exports = {loginInit, userInit}