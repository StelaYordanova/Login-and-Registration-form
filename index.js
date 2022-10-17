const loginBtn = document.querySelector('#lgn-btn');
const registerBtn = document.querySelector('#reg-btn');
const loginContainer = document.querySelector('#login-container');
const registerContainer = document.querySelector('#register-container');

loginBtn.addEventListener('click', function() {
    registerContainer.style.display = 'none';
    loginContainer.style.display = 'block';
})

registerBtn.addEventListener('click', function() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'block';
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    let welcomeMsg = document.querySelector('#welcome-msg');
    welcomeMsg.innerText = '';
    let loginGeneralErrors = document.querySelector('#login-general-errors');
    loginGeneralErrors.innerText = '';

    let usernameInput = loginForm.username;
    let passwordInput = loginForm.password;
    let hasErrors = false;

    if(usernameInput.value.length < 4 || usernameInput.value.length > 32 || passwordInput.value.length < 8){
        hasErrors = true;
        loginGeneralErrors.innerText = 'Username or password is invalid!';
    }
   
    if(hasErrors) {
        return;
    }

    try {
        let users = JSON.parse(localStorage.getItem('users'));
        // loginGeneralErrors.innerText = 'Username or password is invalid!';
        
        if(users) {
            let [user] = users.filter(user => user.username === usernameInput.value && user.password === passwordInput.value)
            console.log(user);
            if(user) {
                welcomeMsg.innerText = `Welcome ${user.firstname} ${user.lastname}`;
            } else {
                loginGeneralErrors.innerText = 'No user found!'
                return;
            }
        } else {
            loginGeneralErrors.innerText = 'No user found!'
            return;
        }
    } catch(e){
        console.log(e);
        loginGeneralErrors.innerText = 'Tova grumna!';
        return;
    }

    console.log('Login succesful!')
})

const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', function(e){
    e.preventDefault();
    let generalErrors = document.querySelector('#general-errors');
    generalErrors.innerText = '';
    let firstnameInput = registerForm.firstname; 
    let lastnameInput = registerForm.lastname; 
    let usernameInput = registerForm.username; 
    let emailInput = registerForm.email; 
    let passwordInput = registerForm.password; 
    let repeatPasswordInput = registerForm.repeatPassword;
    let hasErrors = false;

    firstnameInput.nextElementSibling.innerText = '';
    lastnameInput.nextElementSibling.innerText = '';
    usernameInput.nextElementSibling.innerText = '';
    emailInput.nextElementSibling.innerText = '';
    passwordInput.nextElementSibling.innerText = '';
    repeatPasswordInput.nextElementSibling.innerText = '';

    let registerObj = {
        firstname: firstnameInput.value,
        lastname: lastnameInput.value,
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }

    if(!registerObj.firstname.length){
        hasErrors = true;
        firstnameInput.nextElementSibling.innerText = 'First Name should not be empty';    
    }

    if(!registerObj.lastname.length){
        hasErrors = true;
        lastnameInput.nextElementSibling.innerText = 'Last Name should not be empty';    
    }

    if(registerObj.username.length < 4 || registerObj.username.length > 32){
        hasErrors = true;
        usernameInput.nextElementSibling.innerText = 'Username should be between 4 and 32 sybmols';    
    }

    if(!(registerObj.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))){
        hasErrors = true;
        emailInput.nextElementSibling.innerText = 'Email should be valid'
    }

    if(!(registerObj.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@#$!%*?&]{8,}$/gm))){
        hasErrors = true;
        passwordInput.nextElementSibling.innerText = 'Password should be at least 8 symbols and contain one lowercase letter, one cappital letter, one number and one special symbol [@#$!%*?&]';    
    }

    if(repeatPasswordInput.value.length < 8 && repeatPasswordInput.value === registerObj.password){
        hasErrors = true;
        repeatPasswordInput.nextElementSibling.innerText = 'Passwords should match';    
    }

    if(hasErrors){
        return;
    }

    try{
        let users = JSON.parse(localStorage.getItem('users'));
        if(users) {
            let emailExist = users.some(user => user.email === registerObj.email);
            let usernameExist = users.some(user => user.username === registerObj.username);
            if(emailExist) {
                emailInput.nextElementSibling.innerHTML += 'User with that email already exists \n';
            }

            if(usernameExist) {
                usernameInput.nextElementSibling.innerHTML += 'Username is already taken';
            }

            if(!emailExist && !usernameExist) {
                users.push(registerObj);
                localStorage.setItem('users', JSON.stringify(users));
            }
        } else {
            localStorage.setItem('users', JSON.stringify([registerObj]));
        }
    } catch(e) {
        generalErrors.innerHTML += 'Tova grumna!';
        return;
    }

    console.log('Succesfully registered', registerObj);
})


