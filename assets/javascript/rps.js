

var gameData = new Firebase("https://rps-game2.firebaseio.com/");

game = [{
	"choices" : ["rock","paper", "scissors"],
	"player" 
}]

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

// gameData.orderByChild("rock").equalTo(rock).on("child_added", function(snapshot) {
//   console.log(snapshot.key());
// });

$(".submit").on("click", function() {
	var name = $('#name-input').val().trim();
	var comment = $('#comment-input').val().trim();

		gameData.push({
		name: name,
		comment: comment
	})
		return false;
});

$(".submitInfo").on("click", function() {
	gameData.set({
			newPlayer: addPlayer,
			newChoice: addChoice,
			wins: wins,
			loses: loses
		});

});