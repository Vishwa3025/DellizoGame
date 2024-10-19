const firebaseConfig = {
    apiKey: "AIzaSyC2UwsyZJvhDAIDIj1-AWuPy98NIHQ0m3s",
    authDomain: "game-e7fce.firebaseapp.com",
    databaseURL: "https://game-e7fce-default-rtdb.firebaseio.com",
    projectId: "game-e7fce",
    storageBucket: "game-e7fce.appspot.com",
    messagingSenderId: "64711248423",
    appId: "1:64711248423:web:94547e550b488a297b9c02"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference your database
var gamedb = firebase.database().ref("game");

document.getElementById("loginForm").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("username");
    var email = getElementVal("gmail");

    // Get current date and time in IST
    var loginDateTime = getCurrentISTDateTime();

    console.log(name, email, loginDateTime);
    saveInfo(name, email, loginDateTime);
}

const saveInfo = (name, email, loginDateTime) => {
    var newContactForm = gamedb.push();

    newContactForm.set({
        name: name,
        email: email,
        loginTime: loginDateTime // Save the formatted date string
    })
        .then(() => {
            console.log("Data saved successfully!");
        })
        .catch((error) => {
            console.error("Error saving data: ", error);
        });
};

const getElementVal = (id) => {
    return document.getElementById(id).value;
}

// Function to get the current date and time in IST
function getCurrentISTDateTime() {
    // Create a new Date object
    let now = new Date();

    // Calculate IST time (UTC + 5:30)
    let istOffset = 5.5 * 60; // IST is UTC+5:30
    let utc = now.getTime() + (now.getTimezoneOffset() * 60000); // Convert to UTC
    let istTime = new Date(utc + (istOffset * 60000)); // Convert to IST

    // Return the IST time in a custom string format (e.g., YYYY-MM-DD HH:MM:SS)
    return `${istTime.getFullYear()}-${(istTime.getMonth() + 1).toString().padStart(2, '0')}-${istTime.getDate().toString().padStart(2, '0')} ${istTime.getHours().toString().padStart(2, '0')}:${istTime.getMinutes().toString().padStart(2, '0')}:${istTime.getSeconds().toString().padStart(2, '0')}`;
}
