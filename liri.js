//Read and set enivroment variable to make global
require("dotenv").config();

// Load the fs package to read and write the random.txt file
var fs = require('fs');

//Packages
var axios = require('axios');
var moment = require('moment');
moment().format();

var keys = require('./keys.js');
var Spotify = require('node-spotify-api');//using Spotify Api & getting the key from key.js
var spotify = new Spotify(keys.spotify);
/*var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
  });*/

// Take two arguments.
var command = process.argv[2];// The first will be the action for switch statement
var value = process.argv[3];// The second will be to send the song/movie/concert to their functions 


// We will then create a switch-case statement (if-else would also work).
// The switch-case will direct which function gets run.
switch (command) {
    case "concert-this":
      concertThis(value);
      break;
    
    case "spotify-this-song":
      spotifySong(value);
      break;
    
    case "movie-this":
      movieThis(value);
      break;
    
    case "do-what-it-says":
      doThis(value);
      break;
    };

    function concertThis(artist) {
        // We then run the request with axios module on a URL with a JSON
        axios.get("http:// rest.bandsintown.com&apikey=trilogy").then(
        function(response) {
            // Then we print out the imdbRating
            console.log("The movie's rating is: " + response.data.imdbRating);
        }
);

    }
    








