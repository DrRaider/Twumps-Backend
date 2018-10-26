const nounsDao = require('./nouns.dao')
const { NominatimJS } = require('nominatim-js')

const getCityList = async () => {
  return nounsDao.getAllContentRetweets()
    .then(data => {
      for (let i in data) {
        let tweet = data[i]
        let results = tweet.content.split(/[ ,.:!?]+/)
        results = results.split(/https?:\/\/[^\s]+/)
        if (results.length > 0) {
          for (const word of results) {
            if (word !== '' && word !== 'Trump' && word.length > 8) { // TODO: filter adjectives, verbs etc. checkout wordpos (added already via yarn)
              console.log(word)
              return NominatimJS.search({ q: word })
                .then(cities => {
                  if (cities !== null) {
                    // TODO : reduce cities to have the most important place (see object at the end of file)
                    let city
                    console.log(cities)
                    if (cities.length > 1) {
                      city = cities[0]
                    } else {
                      city = results
                    }
                    console.log(city)
                  }
                })
            }
          }
        }
      }
    })
    .then(() => {
      return true
    })
    .catch(err => {
      throw err
    })
}

module.exports = {
  getCityList
}

// { place_id: '199324647',
//   licence:
//   'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
//     osm_type: 'relation',
//   osm_id: '8398124',
//   boundingbox: [ '40.6996823', '40.8777963', '-74.0194416', '-73.9101872' ],
//   lat: '40.7900869',
//   lon: '-73.9598295',
//   display_name: 'Manhattan, New York County, NYC, New York, USA',
//   class: 'boundary',
//   type: 'administrative',
//   importance: 0.79014193609354,
//   icon:
//   'https://nominatim.openstreetmap.org/images/mapicons/poi_boundary_administrative.p.20.png' }
