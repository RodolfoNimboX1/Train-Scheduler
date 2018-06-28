  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAci7pBLHDvtfsqUbtsek4-CRAh056c3RQ",
    authDomain: "rps-game-f595f.firebaseapp.com",
    databaseURL: "https://rps-game-f595f.firebaseio.com",
    projectId: "rps-game-f595f",
    storageBucket: "rps-game-f595f.appspot.com",
    messagingSenderId: "803457440283"
  };
  firebase.initializeApp(config);

// initial values

var trainName = "";
var destination = ""; //unknown (enter "destination unknown" music)
var frequency = 0;
var nextArrival = "00:00";
var minutesAway = 0;
var firstArrival = "00:00";

// reference database
var db = firebase.database();

// capture new train
$("#add-train").on("click", function(event){
event.preventDefault();

trainName = $("#name-input").val().trim();
destination = $("#destination-input").val().trim();
frequency = $("#freq-input").val();
firstArrival = $("#time-input").val();
//nextArrival
//minutes away

// push to firebase
db.ref().push({
name: trainName,
destination: destination,
frequency: frequency,
firstArrival: firstArrival,
//nextArrival
//minutesAway
dataAdded: firebase.database.ServerValue.TIMESTAMP
});
$("#name-input").val("");
$("#destination-input").val("");
$("#freq-input").val("");
$("#time-input").val("");
});

// firebase listners and loader
db.ref().orderByChild("dataAdded").limitToLast(1).on("child_added",function(snapshot) {
var snap = snapshot.val();

// checking info is being saved
console.log(snap.name);
console.log(snap.destination);
console.log(snap.frequency);
console.log(snap.firstArrival);
//console.log(snap.nextArrival);
//console.log(snap.minutesAway);

// insert information on table
$("#new-row").append("<tr><td>"+snapshot.val().name+"</td><td>"+snapshot.val().destination+"</td><td>"+snapshot.val().frequency+"</td><td>"+"nextArrival"+"</td><td>"+"minutesAway"+"</td></tr>");
});
