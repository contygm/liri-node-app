
// get keys

var fs = require('fs');
var keys = require("./keys.js");
var twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var input = process.argv.slice(2);

// get command

function check() {
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

		case "movie":
		case "movie-this":	
			if (input[1]){
				getMovie(input[1]);
			} else {
				getMovie("Mr. Nobody");
			}
			break;

		case "do":
		case "do-what-it-says":
			doIt();
			break;

		default:
	    console.log("Whatchu want holmes?");
	}
}

check();

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
		      	logIt(myTweets);
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
	    logIt(results);
	});
}

// movie-this

 function getMovie(query){

	var url = 'http://www.omdbapi.com/?t=' + query + '&y=&plot=short&r=json&tomatoes=true';
	request(url, function (error, response, body) {

		if (!error && response.statusCode == 200) {
    		var results = 
			    "Title: " + JSON.parse(body)["Title"] + "\n" +
			    "Year Released: " + JSON.parse(body)["Year"] + "\n" +
			    "IMDB Rating: " +  JSON.parse(body)["imdbRating"] + "\n" +
			    "Country of Production: " + JSON.parse(body)["Country"] + "\n" +
			   	"Language: " + JSON.parse(body)["Language"] + "\n" +
			    "Plot: " + JSON.parse(body)["Plot"] + "\n" +
			    "Actors: " + JSON.parse(body)["Actors"] + "\n" +
			    "Rotten Tomatoes Rating: " + JSON.parse(body)["tomatoRating"] + "\n" +
			    "Rotten Tomatoes URL: " + JSON.parse(body)["tomatoURL"] + "\n";

			    console.log(results);
			    logIt(results);
		}
	});
}

// do what it says

function doIt(){
	fs.readFile("./random.txt", "utf8", function(error, data){
		if (error) {
	        throw error;
	    }
	    data = data.split(',');
	    input[0] = data[0];
	    input[1] = data[1];
	    check();
	});
}

function logIt(results) {
  fs.appendFile("./log.txt", results, (error) => {
    if(error) {
      throw error;
    }
  });
}

