import React from 'react'
import styles from './Search.css'
import Results from '../Results'
import SearchInput from '../SearchInput'
import xhr from '../../../../utils/xhr'

const API_SEARCH_ADDRESS = 'api/search'

const Search = React.createClass({
  getInitialState () {
    return {data: []}
  },
  handleSearchSubmit (query) {
    const payload = {query}
    xhr.doPost(API_SEARCH_ADDRESS, payload, data => {
      this.setState({data})
    }, (xhr, status, err) => {
      console.log(API_SEARCH_ADDRESS, status, err.toString())
    })
  },
  render () {
    return (
      <div className={styles.search}>
        <SearchInput onSearchSubmit={this.handleSearchSubmit} />
        <Results data={this.state.data} />
      </div>
    )
  }
})

export default Search
