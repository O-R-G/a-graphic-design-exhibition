var express = require('express')
var app = express()

var staticDir = 'public'
app.use(express.static(staticDir))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send(staticDir + 'index.html')
})

app.get('/timestamp/:courseID', function (req, res) {
  var courseID = req.params.courseID;
  var ret = {"time": Math.round(Math.random()*100)};
  res.json(ret)
})

var port = process.env.PORT || 3000;
app.listen(port);

console.log("Listening on port " + port);
