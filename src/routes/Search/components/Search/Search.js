import React from 'react'
import styles from './Search.css'
import Results from '../Results'
import SearchInput from '../SearchInput'
import xhr from '../../../../utils/xhr'

const API_SEARCH_ADDRESS = 'api/search'

const Search = React.createClass({
  getInitialState () {
    return {
      data: [],
      loading: true,
      total: 0
    }
  },
  componentDidMount () {
    xhr.doGet(API_SEARCH_ADDRESS, (data) => {
      this.setState({
        data: data.payload,
        total: data.length,
        loading: false
      })
    }, (xhr, status, err) => {
      console.log(API_SEARCH_ADDRESS, status, err.toString())
    })
  },
  handleSearchSubmit (query) {
    const payload = {query}
    xhr.doPost(API_SEARCH_ADDRESS, payload, (data) => {
      this.setState({
        data: data.payload,
        total: data.length
      })
    }, (xhr, status, err) => {
      console.log(API_SEARCH_ADDRESS, status, err.toString())
    })
  },
  handleLoadMore () {
    xhr.doGet(`${API_SEARCH_ADDRESS}/load-more`, data => {
      this.setState({
        data: [...this.state.data, ...data.payload],
        total: data.length
      })
    }, (xhr, status, err) => {
      console.log(API_SEARCH_ADDRESS, status, err.toString())
    })
  },
  render () {
    return (
      <div className={styles.search}>
        <SearchInput onSearchSubmit={this.handleSearchSubmit} />
        <Results
          loading={this.state.loading}
          onLoadMore={this.handleLoadMore}
          data={this.state.data}
          totalResults={this.state.total}
        />
      </div>
    )
  }
})

export default Search
