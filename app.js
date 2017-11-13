var express = require('express')
var app = express()

var staticDir = 'public'
app.use(express.static(staticDir))

// time calculator
var startTime = 1510695000; // Tuesday, November 14, 2017 4:30:00 PM GMT-05:00

var vis215 = 2454; // t-y-p-o-g-r-a-p-h-y seconds
var vis216 = 5009; // g-e-s-t-a-l-t seconds
var vis415 = 2672; // i-n-t-e-r-f-a-c-e seconds

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send(staticDir + 'index.html')
})

app.get('/timestamp/:courseID', function (req, res) {
  var courseID = req.params.courseID;
  var ts = 1; // default x % 1 = 0

  switch (courseID) {
    case 'vis215':
      ts = vis215;
      break;
    case 'vis216':
      ts = vis216;
      break;
    case 'vis415':
      ts = vis415;
      break;
  }

  var nowTime = Math.round(new Date().getTime()/1000);

  if (nowTime < startTime) {
    // Temp start time so that it doesn't go backwards
    startTime = 1510416671; // Saturday, November 11, 2017 11:11:11 AM GMT-05:00
  }
  var time = Math.abs(nowTime - startTime)%ts;

  var ret = {"time": time};
  res.json(ret)
})

var port = process.env.PORT || 3000;
app.listen(port);

console.log("Listening on port " + port);
