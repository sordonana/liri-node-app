var request = require("request");
var fs = require("fs");
var moment = require ("moment");

var GENERAL = function() {
    var divider =
      "\n------------------------------------------------------------\n\n";
  
// function concert this//--------------------------------------------------
      this.concertThis = function(term) {
      var URL = "https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp";
    
      request(URL, function(err, response, body) {
        var jsonData = JSON.parse(body);
        if (jsonData!= ""){
        for (var x=0;x<jsonData.length;x++){
        var showData = [
           "Venue: " + jsonData[x].venue.name,
           "City: " + jsonData[x].venue.city,
           "Region: " + jsonData[x].venue.region,
            "Date: " + jsonData[x].datetime,
            "-----------------------------------------"
          ].join("\n\n");
        
          fs.appendFile("log.txt", showData + divider, function(err) {
            if (err) throw err;
            console.log(showData);
          });
        }
        }else{
            console.log("No venues found!! Try another artist!!")
        }
    }); 

    };
//Start of function spotify this//-------------------------------------------------

this.spotifyThis = function(term) {

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
});
 
if (!term){
    term="The Sign ace of base"
}
spotify.search({ type: 'track', query: term }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
  var jsonData = data.tracks.items[0].album.artists[0].external_urls.spotify;


var showData = [
    "Artist: " + data.tracks.items[0].album.artists[0].name,
    "Songs Name: " + data.tracks.items[0].name,
    "Album: " + data.tracks.items[0].album.name,
    "Link Preview: " + data.tracks.items[0].album.artists[0].external_urls.spotify,
    "--------------------------------------------------------------"
   ].join("\n\n");

    
  
        fs.appendFile("log.txt",showData + divider, function(err) {
          if (err) throw err;
          console.log(showData);
        });
    
    });

  };
//END of function spotify this//-------------------------------------------------

// function Movie this//--------------------------------------------------
this.movieThis = function(term) {

    if (!term){
        term="Mr. Nobody"
    }
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + term + "&plot=full&r=json&type=movie";
  
     request(URL, function(err, response, body) {
      var jsonData = JSON.parse(body);
       var showData = [
            "Title: " + jsonData.Title,
            "City: " + jsonData.Year,
            "IMDB Rating: " + jsonData.imdbRating,
            "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
            "Country: " + jsonData.Country,
            "Language: " + jsonData.Language,
            "Plot: " + jsonData.Plot,
            "Actors: " + jsonData.Actors,
         ].join("\n\n");
      
        fs.appendFile("log.txt", showData + divider, function(err) {
          if (err) throw err;
          console.log(showData);
        });
      
   }); 

  };
  // End of function Movie this//--------------------------------------------------

  //Start of function do what it says------------------------------------------

  this.doWhat = function() {

        fs.readFile("./random.txt","utf8", (err, data) => {
        if (err) throw err;
        var gen = new GENERAL();
        var dataArr = data.split(",");
        gen.spotifyThis(dataArr[1]);
        });
    };

};


    module.exports = GENERAL;
