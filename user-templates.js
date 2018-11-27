const displayBoard = document.querySelector('#displayBoard')

function loginTemplate() {
    displayBoard.innerHTML = `<div class="accordion" id = "loginSignup" >
        <div class="card">
            <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">Log In</button>
                </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#loginSignup">
                <div class="card-body">
                    <form id="login">
                        <label for="username">Username:</label>
                        <input id="username" type="text" required>
                        <label for"password">Password:</label>
                        <input id="password" type="password" required>
                        <button class="btn btn-primary" type="submit">log in</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header" id="headingTwo">
                <h5 class="mb-0">
                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Sign Up
        </button>
                </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#loginSignup">
                <div class="card-body">
                    <form id="signup">
                        <label for="username2">Username:</label>
                        <input id="username2" type="text" required>
                        <label for"password2">Password:</label>
                        <input id="password2" type="password" required>
                        <label for"password3">Retype password:</label>
                        <input id="password3" class="passwordCheck" type="password" required>
                        <button class="btn btn-primary" type="submit">sign up</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="alert alert-danger hidden" role="alert"></div>
         <div class="alert alert-success hidden" role="alert">Sign up successful, please log in</div>
        `
}

function charTemplate(arr){
    let charHTML = arr.reduce((acc, char) => {
        acc.push(`<p>${char}</p>`)
    }, [])
    displayBoard.innerHTML = charHTML.join('')
}

module.exports = {loginTemplate, charTemplate}
