function getPeopleSearchResults (people, queries) {
  var filteredPepole = []
  var value, keys, matchedQueries, query
  people.forEach(function (person) {
    keys = getPersonRelevantKeys(person)
    matchedQueries = 0
    for (var i = 0; i < queries.length; i++) {
      if (matchedQueries < i) {
        break
      }
      query = queries[i].toString().toLowerCase()
      for (var y = 0; y < keys.length; y++) {
        value = person[keys[y]].toString().toLowerCase()
        if (value.indexOf(query) > -1) {
          matchedQueries++
          break
        }
      }
    }
    if (matchedQueries === queries.length) {
      filteredPepole.push(person)
    }
  })
  return filteredPepole
}

function getPersonRelevantKeys (person) {
  return Object.keys(person).filter(function (key) {
    return key !== 'avatar_origin' && key !== 'avatar_image'
  })
}

module.exports = getPeopleSearchResults
