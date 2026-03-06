
// login function
document.getElementById("login-btn")
    .addEventListener("click", () => {

        const userName = document.getElementById("userName");
        const userNameValue = userName.value;
        // console.log(userNameValue);

        const inputPin = document.getElementById("input-pin");

        const inputPinValue = inputPin.value;
        // console.log(inputPinValue);
        if (userNameValue === 'admin' && inputPinValue === 'admin123') {
            alert("successfully logging")
            window.location.assign("/index-home.html")
        }else{
            return alert('login failed')
        }

    })