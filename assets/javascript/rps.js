
// reference to firebase
var gameLocation = new Firebase("https://rps-game2.firebaseio.com/");
var commentsRef = new Firebase("https://rps-game2.firebaseio.com/Chat");


function go() {
var name = prompt('Name?', 'Guest');
 
var gameData = gameLocation;
assignPlayerNumberAndPlayGame(name, gameData);
};

var NUM_PLAYERS = 2;
var PLAYERS_LOCATION = 'player_list';
var PLAYER_DATA_LOCATION = 'player_data';

function playGame(myPlayerNumber, name, justJoinedGame, gameData) {
  var playerDataRef = gameRef.child(PLAYER_DATA_LOCATION).child(myPlayerNumber);
  alert('You are player number ' + myPlayerNumber + 
      '.  Your data will be located at ' + playerDataRef.toString());

  if (justJoinedGame) {
    alert('Doing first-time initialization of data.');
    playerDataRef.set({
    	name: name, 
    	state: 'game state'
    });
  }
}

function assignPlayerNumberAndPlayGame(name, gameData) {
  var playerListRef = gameData.child(PLAYERS_LOCATION);
  var myPlayerNumber, alreadyInGame = false;

 playerListRef.transaction(function(playerList) {
 	if (playerList === null) {
      playerList = [];
    }
	for (var i = 0; i < playerList.length; i++) {
	    if (playerList[i] === name) {
	  	    alreadyInGame = true;
	        myPlayerNumber = i; 
	        return;
    	}
	}
	if (i < NUM_PLAYERS) {
	 	    playerList[i] = name;  
    myPlayerNumber = i; 
    return playerList;
    }
    myPlayerNumber = null;
}, function (error, committed) {
		if (committed || alreadyInGame) {
      		playGame(myPlayerNumber, name, !alreadyInGame, gameData);
    	} else {
      	alert('Game is full.');
    	}
  	});
}
// gameData.on("value", function(snapshot) {

// 	var wins = 0;

// 	var loses = 0;

// 	var ties = 0;

// 	if (snapshot.child("rock").exists() && snapshot.child("rock").exists()){
// 		ties += 1;
// 	}
// 	 else if (snapshot.child("rock").exists() && snapshot.child("paper").exists()){
// 			loses += 1;
// 		}
// 		else if (snapshot.child("rock").exists() && snapshot.child("scissors").exists()) {
// 			wins += 1;
// 			alert("Congrats, YOU WIN absoulutely nothing!");
// 		}
// 		else if (snapshot.child("paper").exists() && snapshot.child("paper").exists()){
// 			ties += 1;
// 		}
// 		else if (snapshot.child("paper").exists() && snapshot.child("scissors").exists()){
// 			loses += 1;
// 		}
// 		else if (snapshot.child("paper").exists() && snapshot.child("rock").exists()){
// 			wins += 1;
// 			alert("Congrats, YOU WIN absoulutely nothing!");
// 		}

// 		else if (snapshot.child("scissors").exists() && snapshot.child("scissors").exists()){
// 			ties += 1;
// 		}
// 		else if (snapshot.child("scissors").exists() && snapshot.child("rock").exists()){
// 			loses += 1;
// 		}
// 		else if (snapshot.child("scissors").exists() && snapshot.child("paper").exists()){
// 			wins += 1;
// 			alert("Congrats, YOU WIN absoulutely nothing!");
// 		}
	
	
// 			console.log("wins = "  + wins);
// 			console.log("Loses = "  + loses);
// 			console.log("Ties = "  + ties);

// 			$('#loses').html(loses);
// 			$('#wins').html(wins);
// 			$('#ties').html(ties);
// })


  // REGISTER DOM ELEMENTS
commentsRef.on("value", function(snapshot){
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
	var comment = $('#comment-input').val();

		gameLocation.push({
		name: name,
		currentWins : currentWins,
		currentLosses : currentLosses,
		currentTies : currentTies
	})

		commentsRef.push({
		name:name, 
		text:comment
	});
      	comment.val('');

		return false;
});
// gameData.orderByChild("rock").equalTo(rock).on("child_added", function(snapshot) {
//   console.log(snapshot.key());
// });
 


$(".submitInfo").on("click", function() {
	gameLocation.set({
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