
function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var loginData = {
        "email": email,
        "password": password
    };

    var myJson = JSON.stringify(loginData);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/login", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200) {
            window.location = "reservation_page.html"
            localStorage['token'] = this.responseText;
        }
    }
    xhttp.send(myJson);
}
