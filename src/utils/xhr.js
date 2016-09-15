import jQuery from 'jquery'

const xhr = {
  doGet (url, success, error) {
    xhrRequest('GET', {url, success, error})
  },
  doPost (url, data, success, error) {
    xhrRequest('POST', {url, data, success, error})
  },
  doDelete (url, data, success, error) {
    xhrRequest('DELETE', {url, data, success, error})
  }
}

function xhrRequest (type, options) {
  console.log(options)
  jQuery.ajax({
    dataType: 'json',
    cache: false,
    timeout: 3000,
    type,
    ...options
  })
}

export default xhr
