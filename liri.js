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
    
    //URL that graps BANDS IN TOWN API + artist name + event info 
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    // Running the request with Axios module on a URL with a JSON
    axios.get(queryUrl)
    .then(function(response) { 
        //Formatting the Date of the event
        var eventDate = moment(response.data[0].datetime).format('MM/DD/YYYY');
        //Grouping the results in a variable to log out
        var concertResults =
        "\n----------------**Concert Info**---------------\n" +
        "\nArtist: " + artist +
        "\nVenue Name: " + response.data[0].venue.name +
        "\nVenue Location: " + response.data[0].venue.city +
        "\nEvent Date: " + eventDate +
        "\n-----------------------------------------------\n";
        console.log(concertResults);
        //Appending the results to log.txt file to track input
        fs.appendFile("log.txt", concertResults, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Results have been logged!" + "\n===============================================");
            }
        })
    })
    .catch(function(error) {
        console.log("*******NO UPCOMING EVENTS*******");
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
        "\n------------------**Song Info**---------------\n" +
        "\nArtist: " + response.tracks.items[0].album.artists[0].name +
        "\nTrack: " + response.tracks.items[0].name +
        "\nAlbum: " + response.tracks.items[0].album.name +
        "\nPreview URL: " + response.tracks.items[0].preview_url +
        "\n-----------------------------------------------\n";
        console.log(spotifyResults);

        fs.appendFile("log.txt", spotifyResults, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Results have been logged!" + "\n===============================================");
            }
        })
    })
    .catch(function(error) {
        console.log("*******SONG NOT FOUND*******");
    });    
}
//==========================================================================================================

//FUNCTION Movie This=====================================================================================
function movieThis(movie) {
    if(!movie) {
        movie = 'Mr. Nobody';
        console.log("-------------**Check Out This Movie!**------------\n")
        console.log("If you haven't watched " + movie + ", then you should: http://www.imdb.com/title/tt0485947/" + 
        "\n>>>>>>> It's on NetFlix!" + "\n---------------------------------------------\n");
     };

     var queryUrl = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

     // Running the request with Axios module on a URL with a JSON
     axios.get(queryUrl)
     .then(function(response) { 
 
        var movieResults =
        "\n------------------**Movie Info**---------------\n" +
        "\nTitle: " + response.data.Title +
        "\nYear Released: " + response.data.Year +
        "\nImdb Rating: " + response.data.imdbRating +
        "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
        "\nCountry Produced: " + response.data.Country +
        "\nLanguage: " + response.data.Language +
        "\nPlot: " + response.data.Plot +
        "\nActors/Actresses: " + response.data.Actors +
        "\n-----------------------------------------------\n";
        console.log(movieResults);

        fs.appendFile("log.txt", movieResults, function(err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log("Results have been logged!" + "\n===============================================");
            }
        })
     })
    .catch(function(error) {
        console.log("******MOVIE NOT FOUND*******");
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
        spotifyThisSong(dataArray[1]);
    });
}
//==========================================================================================================
