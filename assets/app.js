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
var nextArrival = 0;
var minutesAway = 0;
var firstArrival = 0;

var time = moment();
var displayCurrentT = $("#current-time").text(moment(time).format("HH:mm"));

// reference database
var db = firebase.database();

// capture new train
$("#add-train").on("click", function(event){
event.preventDefault();

trainName = $("#name-input").val().trim();
destination = $("#destination-input").val().trim();
frequency = $("#freq-input").val();
firstArrival = $("#time-input").val();
var nextTrain = parseInt(firstArrival) + parseInt(frequency);
console.log(nextTrain);
var newArrival = moment(firstArrival, "hmm").format("HH:mm");
// Difference between the times
var now = moment();
console.log("Current time: "+moment(now).format("hh:mm"));
var diffTime = moment().diff(moment(firstArrival), "minutes");
console.log("Difference in time: "+diffTime);
// time apart
var timeApart = diffTime % frequency;
console.log(timeApart);
// minutes until next train
var tMinusArrival = frequency - timeApart;
console.log("Minutes till train: "+tMinusArrival);
// next train
var newTrainTime = moment().add(tMinusArrival, "minutes");
console.log("Arrival time: "+ moment(newTrainTime).format("hh:mm"));

// push to firebase
db.ref().push({
name: trainName,
destination: destination,
frequency: frequency,
firstArrival: newArrival,
nextArrival: moment(newTrainTime).format("hh:mm"), 
minutesAway: tMinusArrival,
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
console.log(snap.nextArrival);
console.log(snap.minutesAway);

// insert information on table
$("#new-row").append("<tr><td>"+snapshot.val().name+"</td><td>"+snapshot.val().destination+"</td><td>"+snapshot.val().frequency+"</td><td>"+snapshot.val().nextArrival+"</td><td>"+snapshot.val().minutesAway+"</td></tr>");
});
