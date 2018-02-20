  //train scheduler


  var config = {
      apiKey: "AIzaSyCI-yqLxkI2DeawNekc-PTso9H7mBL-e1I",
      authDomain: "train-schedule-7c96a.firebaseapp.com",
      databaseURL: "https://train-schedule-7c96a.firebaseio.com",
      projectId: "train-schedule-7c96a",
      storageBucket: "train-schedule-7c96a.appspot.com",
      messagingSenderId: "884218061813"
    };
    firebase.initializeApp(config);

  var database = firebase.database();

  $(document).ready(function() {

  	var frequency;
  	var trainName;
  	var firstTrain;
  	var trainTime;
  	var minutesAway;
  	var destination;

    //on-click event for submit button
  	$("#form-submit").on("click", function(event) {

  		event.preventDefault(); //prevents reload of page when submit button pressed

  		trainName = $("#train-name").val().trim();
  		firstTrain = $("#first-train").val().trim(); //moment.js here
  		destination = $("#destination").val().trim();
  		frequency = parseInt($("#frequency").val().trim());

  		database.ref().push({
  			name: trainName,
  			first: firstTrain,
  			destination: destination,
  			frequency: frequency
  		});

  		// console.log(trainName);
  		// console.log(firstTrain);
  		// console.log(destination);
  		// console.log("this is the frequency" + frequency);

  		//clear text boxes
  		$("#train-name").val("");
  		$("#first-train").val("");
  		$("#destination").val("");
  		$("#frequency").val("");

  	});


  	//pushs database values into Firebase

  	database.ref().on("child_added", function(snapshot, prevChildKey) {

  		var frequency = snapshot.val().frequency;
  		var trainName = snapshot.val().name;
  		var firstTrain = snapshot.val().first;
  		var destination = snapshot.val().destination;

      var timeLog = firstTrain.split(":");

      var train = moment().hours(timeLog[0]).minutes(timeLog[1]);

      // var maxMoment = moment.max(Moment(), train);
      //
      // if(maxMoment === train) {
      //
      // }

  		//var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(0, "years");

  		var currentTime = moment();
  		console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  		var diffTime = moment().diff(train, "minutes");
  		console.log("DIFFERENCE IN TIME: " + diffTime);

  		var remainderTime = diffTime % frequency;
  		console.log(remainderTime);

  		var minutesNextTrain = frequency - remainderTime;
  		console.log(minutesNextTrain);

  		var nextArrival = moment().add(minutesNextTrain, "m").format("hh:mm A");
  		console.log(nextArrival);

  		$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + " min" + "</td><td>" +
  		nextArrival + "</td><td>" + minutesNextTrain + " min" + "</td></tr>");


  	});


  		$("#logout").on("click", function() {

  			firebase.auth().signOut().then(function() {
  		  		console.log("signed out");
  		  		window.location = "login.html";
  			}).catch(function(error) {
  			  console.log(error);
  			});
  		});


  	// };

  	// logout.addEventListener("click", error => {
  	// 	firebase.auth().signOut();
  	// 	console.log(error.message);
  	// });

  	// firebase.auth().onAuthStateChanged(firebaseUser => {

  	// if (firebaseUser) {
  	// 	console.log(firebaseUser);
  	// 	window.location = "index.html";
  	// }
  	// else {
  	// 	console.log("Not logged in");
  	// }

  	// });

  });
