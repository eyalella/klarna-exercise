import xhr from '../../../../utils/xhr'

const API_SEARCH_ADDRESS = 'api/search'

export function fatchInitialData () {
  xhr.doGet(API_SEARCH_ADDRESS, (data) => {
    this.setState({
      data: data.payload,
      total: data.length,
      loading: false
    })
  }, errorHandler)
}

export function loadMoreHandler () {
  xhr.doGet(`${API_SEARCH_ADDRESS}/load-more`, data => {
    this.setState({
      data: [...this.state.data, ...data.payload],
      total: data.length
    })
  }, errorHandler)
}

export function queryChangeHandler (query, self) {
  xhr.doPost(API_SEARCH_ADDRESS, {query}, (data) => {
    this.setState({
      data: data.payload,
      total: data.length
    })
  }, errorHandler)
}

function errorHandler (xhr, status, err) {
  console.log(API_SEARCH_ADDRESS, status, err.toString())
}
