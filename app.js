var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser());

app.get('/', function(req, res) {
  fs.readFile('./public/presets/Init.patch', 'utf8', function(err, text) {
    //console.log(text);
    res.render('index', { title: 'Sound Deck', preset: text});
  });
});

app.get('/presets', function(req, res) {
  fs.readdir('./public/presets', function(err, files) {
    var presetList = [];
    for(var i = 0; i < files.length; i++) {
      presetList.push(files[i].replace(".patch", ""));
    }
    res.render('presets', { title: 'Sound Deck', presetList: presetList});
  });
});

app.get('/presets/:name', function(req, res) {
  // read presets file(json)
  fs.readFile('./public/presets/' + req.params.name + '.patch', 'utf8', function(err, text) {
    console.log(text);
    res.render('index', { title: 'Sound Deck', preset: text});
  });
});

app.post('/presets/:name', function(req, res) {
  var data = JSON.stringify(req.body);
  var name = req.params.name;
  fs.writeFile('./public/presets/' + name + '.patch', data);
});

var port = process.env.PORT || 3000;
app.listen(port);


module.exports = app;
