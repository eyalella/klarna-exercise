import jQuery from 'jquery'

const xhr = {
  doGet (url, success, error) {
    jQuery.ajax({
      dataType: 'json',
      cache: false,
      timeout: 10000,
      url,
      success,
      error
    })
  },
  doPost (url, data, success, error) {
    doReadWrite('POST', {url, data, success, error})
  },
  doDelete (url, data, success, error) {
    doReadWrite('DELETE', {url, data, success, error})
  }
}

function doReadWrite (type, options) {
  jQuery.ajax({
    dataType: 'json',
    cache: false,
    timeout: 1000,
    type,
    ...options
  })
}

export default xhr
