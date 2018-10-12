var express = require('express')
var path = require('path')
var multer = require('multer')
// var upload=multer({dest:"dist/static/upload/"})
var storage = multer.diskStorage({
  destination: 'dist/static/upload/',
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage })
var dlPath = 'dist/static/download/'
var fs = require('fs')
var querystring = require('querystring')
var app = express()
var openBrowser = require('child_process')
var history = []
app.use(express.static('D:\\Node\\dist'))
console.log(new Date())

app.get('/b', function(req, res) {
  var q = req.query
  var qs = querystring.stringify(q)
  var { url, open, ...back } = q
  qs = querystring.stringify(back)
  // res.send(qs+"<br>"+JSON.stringify(q))
  console.log(`_${q.url}${qs ? '&' + qs : ''}`)
  var url = `${q.url}${qs ? '&' + qs : ''}`
    .replace(/&/g, `"&"`)
    .replace(/\s/g, '')
  //console.log(url)
  res.send(`start ${url}`)
  history.push({ url, time: Date.now() })
  console.log(history)
  if(open)openBrowser.exec(`start ${url}`)
})
app.get('/a', function(req, res) {
  res.sendFile('D:\\Node\\dist\\canvas2.html')
})
app.get('/fg', function(req, res) {
  res.sendFile('D:\\Node\\dist\\fg.html')
})
app.get('/getFileList', function(req, res) {
  res.send(fs.readdirSync(dlPath))
})
app.get('/history', function(req, res) {
  res.send(history)
})

app.post('/file-upload', upload.array('sfile'), function(req, res, next) {
  console.log(req.body)
  console.log(req.files)
  res.send('fus')
})

var server = app.listen(8091, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
