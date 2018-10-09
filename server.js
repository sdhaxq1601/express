var express = require('express')
var path =require('path')
var querystring=require('querystring')
var app = express()
var openBrowser = require('child_process');
//openBrowser.exec('start http://www.baidu.com');
// app.use(express.static(path.join(__dirname, '../Vue/Todolist/dist')))
app.use(express.static('D:\\Node\\dist'))
console.log(path.join(__dirname, '../Vue/Todolist/dist'))

app.get('/b',function(req,res){
    var q=req.query
    var qs=querystring.stringify(q)
    var {url,...back}=q
    qs=querystring.stringify(back)
    // res.send(qs+"<br>"+JSON.stringify(q))
    console.log(`_${q.url}${qs?"&"+qs:""}`)
    var url=`${q.url}${qs?"&"+qs:""}`.replace(/&/g,`"&"`)
    //console.log(url)
    res.send(`start ${url}`)
    openBrowser.exec(`start ${url}`)
})
app.get('/a',function(req,res){
    res.sendFile('D:\\Node\\dist\\canvas2.html')
    /* res.render('D:\\Vue\\Todolist\\dist\\canvas2.html',function(err, html){
        res.send(html)
    }) */
})
app.get('/fg',function(req,res){
    res.sendFile('D:\\Node\\dist\\fg.html')
})

var server=app.listen(8091,function(){
    var host = server.address().address
    var port = server.address().port
   
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})