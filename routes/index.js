var request = require('request');
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require("path");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/pokemon',function(req,res,next){
    console.log("sup");
    var pokemon = req.body.pokemon;
    getPokemonSprite(pokemon);
    res.render('game',{pokemon:path.join('images',pokemon + ".png")});
});


function getPokemonSprite(pokemon){
    console.log("first");
    console.log(pokemon);
    request('http://pokeapi.co/api/v2/pokemon/' + pokemon, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log("in here too");
            var obj = JSON.parse(body);
            var image=  obj['sprites']['front_default']
            var writeStream = fs.createWriteStream(path.join(__dirname, '..', 'public', 'images',pokemon + ".png"));
            request(image).pipe(writeStream);
        }
    })     
}

module.exports = router;
