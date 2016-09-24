
// get keys

var fs = require('fs');
var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var input = process.argv.slice(2);

// get command

switch (input[0]){
	case "tweet":
	case "my-tweets":
		getTwitter(input[1]);
		break;
	
	case "spotify":
	case "spotify-this-song":
		if (input[1]){
			getSpotify(input[1]);
		} else {
			getSpotify("Ace of Base - The Sign");
		}
		break;
}


// my tweets
function getTwitter() {

	var client = new twitter({
    consumer_key: keys.twitterKeys.consumer_key,
    consumer_secret: keys.twitterKeys.consumer_secret,
    access_token_key:  keys.twitterKeys.access_token_key,
    access_token_secret: keys.twitterKeys.access_token_secret   
  	});

	var twitterID = input[1];
	var twitterCount = 20;
	var params = {used_id: twitterID, count: twitterCount};

	client.get('statuses/user_timeline', params, 	 
		function(error, data, response){
		    console.log('4');
		    if(error) {
		      throw error;
		    }
		    
		    for (var i = 0; i < data.length; i++){
		    	var myTweets = 
		        "@" + data[i].user.screen_name + ": " + 
		        data[i].text + "\n" + 
		        data[i].created_at + "\n" + 
		        "--------------\n";
		      	console.log(myTweets);
		      	// logData(myTweets);
		    }
		    
	});
}


// spotify this song

function getSpotify(query){

	spotify.search({ type: 'track', query: query}, function(error, data) {
	    if (error) {
	        throw error
	    }
	    var spotInfo = data.tracks.items[0];
	    var results = 
	      "Artist: " + spotInfo.artists[0].name + "\n" +
	      "Track Name: " + spotInfo.name + "\n" +
	      "Album: " + spotInfo.album.name + "\n" +
	      "Preview Link: " +  spotInfo.preview_url + "\n";
	    console.log(results);
	    // logData(spotifyResults);
	});

}

// movie-this

 //		* Title of the movie.
 //    * Year the movie came out.
 //    * IMDB Rating of the movie.
 //    * Country where the movie was produced.
 //    * Language of the movie.
 //    * Plot of the movie.
 //    * Actors in the movie.
 //    * Rotten Tomatoes Rating.
 //    * Rotten Tomatoes URL.

// do what it says








