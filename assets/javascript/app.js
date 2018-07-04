
    // START CODING BELOW!!

    // Initialize Firebase
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyBbMp0uNbJGN4buw8DCrIwu_bbdWoBzLf8",
    authDomain: "fir-project1-cc2db.firebaseapp.com",
    databaseURL: "https://fir-project1-cc2db.firebaseio.com",
    projectId: "fir-project1-cc2db",
    storageBucket: "fir-project1-cc2db.appspot.com",
    messagingSenderId: "112629210402"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Values
    var trainname = "";
    var destination = "";
    var firstarrival = "";
    var frequency = "";

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();

      // YOUR TASK!!!
      // Code in the logic for storing and retrieving the most recent user.
      // Don't forget to provide initial data to your Firebase database.
      trainname = $("#trainname-input").val().trim();
      destination = $("#destination-input").val().trim();
      firstarrival = moment($("#traintime-input").val().trim(), "HH:mm").subtract(10, "years").format("X");
      frequency = $("#frequency-input").val().trim();

      database.ref().push({
        trainname: trainname,
        destination: destination,
        firstarrival: firstarrival,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

      });

    });

    // Firebase watcher + initial loader HINT: .on("value")
    //databasa.ref().orderByChild("dateAdded").limitToLast(1).on
    database.ref().orderByChild("dateAdded").limitToLast(4).on("child_added", function(snapshot, prevChildKey) {

      // Log everything that's coming out of snapshot
      //console.log(snapshot.val());
      //console.log(snapshot.val().trainname);
      //console.log(snapshot.val().destination);
      //console.log(snapshot.val().firstarrival);
      //console.log(snapshot.val().frequency);
      //console.log(snapshot.val().dateAdded);

      //Compute NEXT ARRIVAL
      var diffTime = moment().diff(moment.unix(snapshot.val().firstarrival), "minutes");
      var timeRemainder = moment().diff(moment.unix(snapshot.val().firstarrival), "minutes") % snapshot.val().frequency;
      console.log(snapshot.val().frequency);
      var minutes = snapshot.val().frequency - timeRemainder;
      console.log(minutes);

		  var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
		
		// Test for correct times and info
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

      // Change the HTML to reflect
     
      $("#data_table").append("<tr><td> " + snapshot.val().trainname + "</td><td>" + snapshot.val().destination + "</td><td>" + snapshot.val().frequency + "</td><td>" +  nextTrainArrival + "</td><td>" + minutes + "</td></tr>" );
      //$("#destination_table").append("<tr><td>" + snapshot.val().destination + "</td></tr>");
      //$("#frequency_table").append("<tr><td>" + snapshot.val().frequency + "</td></tr>");
      //$("#nextarrival_table").append("<tr><td>" + nextTrainArrival + "</td></tr>");
      //$("#minutesaway_table").append("<tr><td>" + minutes + "</td></tr></tbody>");
      

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });

    

    //console.log(moment().format("DD/MM/YYYY"));
