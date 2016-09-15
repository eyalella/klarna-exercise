function getPeopleSearchResults (people, queries) {
  var filteredPepole = []
  var value, keys, personInResults
  people.forEach(function (person) {
    personInResults = false
    keys = getPersonRelevantKeys(person)
    for (var i = 0; i < keys.length; i++) {
      value = person[keys[i]].toString()
      for (var y = 0; y < queries.length; y++) {
        if (value.indexOf(queries[y]) > -1) {
          filteredPepole.push(person)
          personInResults = true
          break
        }
      }
      if (personInResults) {
        break
      }
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
