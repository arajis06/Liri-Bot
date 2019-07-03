//Read and set enivroment variable to make global
require("dotenv").config();

// Load the fs package to read and write the random.txt file
var fs = require('fs');

//Packages
var axios = require('axios');
var moment = require('moment');

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
      spotifyThisSong(value);
      break;
    
    case "movie-this":
      movieThis(value);
      break;
    
    case "do-what-it-says":
      doThis(value);
      break;
    };

//FUNCTION Bands In Town================================================================================
function concertThis(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    // Running the request with Axios module on a URL with a JSON
    axios.get(queryUrl)
    .then(function(response) { 

            var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
            var concertResults =
            "-----------------**Concert Info**-----------------" +
            "\nVenue Name: " + response.data[0].venue.name +
            "\nVenue Location: " + response.data[0].venue.city +
            "\nEvent Date: " + eventDate +
            "\n--------------------------------------------------";
            console.log(concertResults);
    })
    .catch(function(error) {
        console.log(error);
    });
}
//==========================================================================================================

//FUNCTION Spotify Song=====================================================================================
function spotifyThisSong(song) {
    if (!song) {
        song = "The Sign, Ace of Base";
    } 
    spotify
    .search({ 
        type: 'track', 
        query: song, 
        limit: 5 
    })
    .then(function(response) {
        
            var spotifyResults = 
            "----------------**Song Info**-----------------" +
            "\nArtist: " + response.tracks.items[0].artists[0].name +
            "\nTrack: " + response.tracks.items[0].name +
            "\nAlbum: " + response.tracks.items[0].album.name +
            "\nPreview URL: " + response.tracks.items[0].preview_url +
            "\n--------------------------------------------";
            console.log(spotifyResults);
    })
    .catch(function(error) {
        console.log(error);
    });    
}
//==========================================================================================================

//FUNCTION Movie This=====================================================================================
function movieThis(movie) {
    if(!movie) {
        movie = 'Mr. Nobody';
        console.log("-------------**Check Out This Movie**------------")
        console.log("If you haven't watched " + movie + ", then you should: http://www.imdb.com/title/tt0485947/" + 
        "\nIt's on NetFlix!" + "\n----------------------------------------------");
     };

     var queryUrl = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

     // Running the request with Axios module on a URL with a JSON
     axios.get(queryUrl)
     .then(function(response) { 
 
             var movieResults =
             "-----------------**Movie Info**-----------------" +
             "\nTitle: " + response.data.Title +
             "\nYear Released: " + response.data.Year +
             "\nImdb Rating: " + response.data.imdbRating +
             "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
             "\nCountry Produced: " + response.data.Country +
             "\nLanguage: " + response.data.Language +
             "\nPlot: " + response.data.Plot +
             "\nActors/Actresses: " + response.data.Actors +
             "\n-------------------------------------------------";
             console.log(movieResults);
     })
    .catch(function(error) {
        console.log(error);
    });    
}
//==========================================================================================================

//FUNCTION Do This=====================================================================================
function doThis() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
        }
        // We will then print the contents of data
        console.log(data);


        var dataArray = data.split(",");
        spotifyThisSong(dataArray[0], dataArray[1]);
    });
}
//==========================================================================================================
