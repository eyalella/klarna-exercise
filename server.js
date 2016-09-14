var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var COMMENTS_FILE = path.join(__dirname, 'comments.json')
var PEOPLE_FILE = path.join(__dirname, 'people.json')

var app = express()

app.set('port', process.env.port || 3000)

app.use('/', express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Cache-Control', 'no-cache')
  next()
})

app.get('/', function (req, res) {
  res.send('req')
})

app.get('/api/search', function (req, res) {
  fs.readFile(PEOPLE_FILE, function (err, data) {
    successReadWrite(err, res, JSON.parse(data).slice(0, 10))
  })
})

app.get('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    successReadWrite(err, res, JSON.parse(data))
  })
})

app.post('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    var comments = JSON.parse(data)
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text
    }
    comments.push(newComment)

    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function functionName (err) {
      successReadWrite(err, res, comments)
    })
  })
})

app.delete('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.log(err)
      process.exit(1)
    }

    var comments = JSON.parse(data)
    var newCommentsList = comments.filter(function (comment) {
      return comment.id.toString() !== req.body.id
    })

    fs.writeFile(COMMENTS_FILE, JSON.stringify(newCommentsList, null, 4), function functionName (err) {
      successReadWrite(err, res, newCommentsList)
    })
  })
})

function successReadWrite (err, res, payload) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  res.json(payload)
}

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})