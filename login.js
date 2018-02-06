
var config = {
    apiKey: "AIzaSyCI-yqLxkI2DeawNekc-PTso9H7mBL-e1I",
    authDomain: "train-schedule-7c96a.firebaseapp.com",
    databaseURL: "https://train-schedule-7c96a.firebaseio.com",
    projectId: "train-schedule-7c96a",
    storageBucket: "train-schedule-7c96a.appspot.com",
    messagingSenderId: "884218061813"
  };

  firebase.initializeApp(config);

signup.addEventListener("click", error => {
	  var email = document.getElementById("email").value;
	  var password =  document.getElementById("password").value;
	  var auth = firebase.auth();

	  if (email.length < 4) {
	  	alert("Please enter a valid email address");
	  	return;
	  }
	  else if (password.length < 5) {
	  	alert("Please enter a valid password");
	  	return;
	  }	

	  var promise = auth.createUserWithEmailAndPassword(email, password)

	  promise.catch(error => console.log(error.message));
});


login.addEventListener("click", error => {
	  var email = document.getElementById("email").value;
	  var password =  document.getElementById("password").value;
	  var auth = firebase.auth();

	  if (email.length < 4) {
	  	alert("Please enter a valid email address");
	  	return;
	  }
	  else if (password.length < 5) {
	  	alert("Please enter a valid password");
	  	return;
	  }	

	  var promise = auth.signInWithEmailAndPassword(email, password)

	  promise.catch(error => console.log(error.message));
});

firebase.auth().onAuthStateChanged(firebaseUser => {

	if (firebaseUser) {
		console.log(firebaseUser);
		window.location = "index.html";
	}
	else {
		console.log("Not logged in");
	}

});