var express = require('express')
var app = express()

var staticDir = 'public'
app.use(express.static(staticDir))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send(staticDir + 'index.html')
})

app.get('/timestamps', function (req, res) {
  var timestamps = {'vis215': 1, 'vis216': 2, 'vis415': 3}
  res.json(timestamps)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
