
// reference to firebase
var commentsRef = new Firebase("https://rps-game2.firebaseio.com/Chat");

game = [{
	"choices" : ["rock","paper", "scissors"],
	"player" : ["1", "2"]
}]

function go() {
  var name = prompt('Name?', 'Guest');
  // Consider adding '/<unique id>' if you have multiple games.
  var gameData = new Firebase("https://rps-game2.firebaseio.com/Players");
  assignPlayerNumberAndPlayGame(userId, gameRef);
};

gameData.on("value", function(snapshot) {

	var wins = 0;

	var loses = 0;

	var ties = 0;

	if (snapshot.child("rock").exists() && snapshot.child("rock").exists()){
		ties += 1;
	}
	 else if (snapshot.child("rock").exists() && snapshot.child("paper").exists()){
			loses += 1;
		}
		else if (snapshot.child("rock").exists() && snapshot.child("scissors").exists()) {
			wins += 1;
			alert("Congrats, YOU WIN absoulutely nothing!");
		}
		else if (snapshot.child("paper").exists() && snapshot.child("paper").exists()){
			ties += 1;
		}
		else if (snapshot.child("paper").exists() && snapshot.child("scissors").exists()){
			loses += 1;
		}
		else if (snapshot.child("paper").exists() && snapshot.child("rock").exists()){
			wins += 1;
			alert("Congrats, YOU WIN absoulutely nothing!");
		}

		else if (snapshot.child("scissors").exists() && snapshot.child("scissors").exists()){
			ties += 1;
		}
		else if (snapshot.child("scissors").exists() && snapshot.child("rock").exists()){
			loses += 1;
		}
		else if (snapshot.child("scissors").exists() && snapshot.child("paper").exists()){
			wins += 1;
			alert("Congrats, YOU WIN absoulutely nothing!");
		}
	
	
			console.log("wins = "  + wins);
			console.log("Loses = "  + loses);
			console.log("Ties = "  + ties);

			$('#loses').html(loses);
			$('#wins').html(wins);
			$('#ties').html(ties);
})


  // REGISTER DOM ELEMENTS
commentsRef.on("value", function(snapshot){
	var commentField = $('#comment-input').val();
	var nameField = $('#nameInput').val();
	var messageList = $('#messages').val();
})

 commentsRef.limitToLast(10).on('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var name = data.name || "anonymous";
    var message = data.text;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'></strong>")
    nameElement.text(name);
    messageElement.text(message).prepend(nameElement);

    //ADD MESSAGE
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  });


$(".submit").on("click", function() {
	var name = $('#name-input').val().trim();
	var currentWins = wins;
	var currentLosses = loses;
	var currentTies = ties;
	var comment = commentField.val();

		gameData.push({
		name: name,
		currentWins : currentWins,
		currentLosses : currentLosses,
		currentTies : currentTies
	})

		commentsRef.push({
		name:name, 
		text:comment
	});
      	commentField.val('');

		return false;
});
// gameData.orderByChild("rock").equalTo(rock).on("child_added", function(snapshot) {
//   console.log(snapshot.key());
// });

// on click button events



  // LISTEN FOR KEYPRESS EVENT
  
  

  // Add a callback that is triggered for each chat message.
 


$(".submitInfo").on("click", function() {
	gameData.set({
			newPlayer: addPlayer,
			newChoice: addChoice,
			wins: wins,
			loses: loses
		});

});

// var onComplete = function(error) {
//   if (error) {
//     console.log('Synchronization failed');
//   } else {
//     console.log('Synchronization succeeded');
//   }
// };
// fredRef.remove(onComplete);