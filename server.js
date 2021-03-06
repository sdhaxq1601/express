var express = require('express')
var path = require('path')
var multer = require('multer')
var fs = require('fs')
var querystring = require('querystring')
var openBrowser = require('child_process')
var https = require('https')
var privateKey  = fs.readFileSync('192.168.1.223.key', 'utf8')
var certificate = fs.readFileSync('192.168.1.223.cert', 'utf8')
var credentials = {key: privateKey, cert: certificate, requestCert:false, rejectUnauthorized:false}
// var upload=multer({dest:"dist/static/upload/"})
var storage = multer.diskStorage({
  destination: 'dist/static/upload/',
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage })
var dlPath = 'dist/static/download/'

var app = express()
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
  if(url){
  history.push({ url, time: Date.now() })
  console.log(history)
  if(open)openBrowser.exec(`start ${url}`)
  }
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
var httpsServer = https.createServer(credentials, app)
var server = app.listen(8091, function() {
  var host = server.address().address
  var port = server.address().port

  console.log('应用实例，访问地址为 http://%s:%s', host, port)
})
httpsServer.listen(443,function(){
  console.log("https sever is running")
})