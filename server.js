var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var getPeopleSearchResults = require('./server/modules/search')

var PEOPLE_FILE = path.join(__dirname, 'people.json')

var app = express()
var peopleCache

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
  if (peopleCache) {
    successReadWrite(null, res, peopleCache.slice(0, 100))
  } else {
    fs.readFile(PEOPLE_FILE, function (err, data) {
      peopleCache = JSON.parse(data)
      successReadWrite(err, res, peopleCache.slice(0, 100))
    })
  }
})

app.post('/api/search', function (req, res) {
  var queries = req.body.query.split(' ')

  if (peopleCache) {
    returnRelevantPepole(queries, peopleCache, null, res)
  } else {
    fs.readFile(PEOPLE_FILE, function (err, data) {
      if (err) {
        console.log(err)
        process.exit(1)
      }
      peopleCache = JSON.parse(data)
      returnRelevantPepole(queries, peopleCache, err, res)
    })
  }
})

function returnRelevantPepole (queries, peopleCache, err, res) {
  var noQuery = queries.length === 1 && queries[0] === ''
  var filteredPepole = noQuery ? peopleCache : getPeopleSearchResults(peopleCache, queries)
  successReadWrite(err, res, filteredPepole.slice(0, 100))
}

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
