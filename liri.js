require("dotenv").config();
var GENERAL = require ("./general")
var request = require('request');
var fs = require('fs');
var keys = require("./keys");
//var spotify = new Spotify(keys.spotify);
var general = new GENERAL();

var action = process.argv[2];
var term = process.argv.slice(3).join(" ");

switch (action) {
    case 'concert-this':
        general.concertThis(term);
        break;
    case 'spotify-this-song':
        general.spotifyThis(term);
        break;
    case 'movie-this':
        general.movieThis(term);
        break;
    case 'do-what-it-says':
        general.doWhat();
        break;
    default:
        console.log("Action not recognized, valid actions are 'concert-this', 'spotify-this-song , 'movie-this' & 'do-what-it-says'");
    break;
}









      