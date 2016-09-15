var fs = require('fs')
var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var getPeopleSearchResults = require('./server/modules/search')

var PEOPLE_FILE = path.join(__dirname, 'people.json')
var CHUNK_SIZE = 10

var app = express()
var peopleCache
var searchResultCache
var lastPersonIndex = 0

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
  lastPersonIndex = 0
  fs.readFile(PEOPLE_FILE, function (err, data) {
    cachePeople(data)
    var peopleChunk = getPeopleCunk(peopleCache)
    searchResultCache = peopleCache
    successReadWrite(err, res, peopleChunk)
  })
})

app.get('/api/search/load-more', function (req, res) {
  var peopleChunk = getPeopleCunk(searchResultCache)
  successReadWrite(null, res, peopleChunk)
})

app.post('/api/search', function (req, res) {
  var queries, noQuery
  lastPersonIndex = 0
  if (peopleCache) {
    queries = req.body.query.split(' ')
    noQuery = queries.length === 1 && queries[0] === ''
    searchResultCache = noQuery ? peopleCache : getPeopleSearchResults(peopleCache, queries)

    var peopleChunk = getPeopleCunk(searchResultCache)
    successReadWrite(null, res, peopleChunk)
  }
})

function getPeopleCunk (people) {
  var peopleChunk = people.slice(lastPersonIndex, lastPersonIndex + CHUNK_SIZE)
  lastPersonIndex += CHUNK_SIZE
  return peopleChunk
}

function cachePeople (data) {
  peopleCache = JSON.parse(data).map(function (person) {
    person.birthday = new Date(person.birthday).toDateString()
    person.address = `${person.address.street}, ${person.address.city}, ${person.address.country}.`
    return person
  })
}

function successReadWrite (err, res, payload) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  res.json({payload, length: searchResultCache.length})
}

app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/')
})
