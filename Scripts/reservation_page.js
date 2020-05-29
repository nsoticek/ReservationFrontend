
function addReservation() {
    var seats = document.getElementById("seats").value;
    var token = localStorage['token'];

    var loginData = {
        "seats": seats
    };

    var myJson = JSON.stringify(loginData);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:8080/addReservation", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Token', token);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("seats").value = "";
        } else {
            alert(this.responseText);
        }
    }
    xhttp.send(myJson);
}

function getReservations() {
    var token = localStorage['token'];

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/reservations", false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Token', token);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            printReservations(this.responseText)
        } else {
            alert(this.responseText);
        }
    }
    xhttp.send();
}

function printReservations(responseText) {

    var reservation = JSON.parse(responseText);
    document.getElementById("outputContainer").innerHTML = "<h4>Reservierungen</h4><p>";

    for (let i = 0; i < reservation.length; i++) {
        if (reservation[i].seats == 0) {
            document.getElementById("outputContainer").innerHTML += "<s>" + (i + 1) + ". Reservierte Plätze: " + reservation[i].seats + "</s> Storniert!</p><br>";
        } else {
            document.getElementById("outputContainer").innerHTML += (i + 1) + ". Reservierte Plätze: " + reservation[i].seats + "</p><br>";
        }
    }
}

function deleteReservation() {
    var token = localStorage['token'];
    var inputId = document.getElementById("inputId").value;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "http://localhost:8080/deleteReservation/" + (inputId - 1), false);
    xhttp.setRequestHeader('Token', token);
    xhttp.send();

    var inputId = document.getElementById("inputId").value = "";
    getReservations();
}

function updateFields() {
    document.getElementById("updateContainer").innerHTML = `<p>Reservierung updaten (ID)</p>
        <input type="number" id="updateId" name="updateId">
        <p>Neue anzahl der Sitze</p>
        <input type="number" id="updateSeats" name="updateSeats">
        <button onclick="updateReservation()">Update</button>`;
}

function updateReservation() {
    var token = localStorage['token'];
    var id = document.getElementById("updateId").value;
    var seats = document.getElementById("updateSeats").value;

    var loginData = {
        "seats": seats
    };

    var myJson = JSON.stringify(loginData);

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "http://localhost:8080/updateReservation/" + (id - 1), false);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.setRequestHeader('Token', token);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("updateSeats").value = "";
            document.getElementById("updateId").value = "";
            getReservations();
        } else {
            alert(this.responseText);
        }
    }
    xhttp.send(myJson);
}
