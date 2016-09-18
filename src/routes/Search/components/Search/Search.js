import React from 'react'
import styles from './Search.css'
import Results from '../Results'
import SearchInput from '../SearchInput'
import debounce from 'lodash/debounce'
import { fatchInitialData, loadMoreHandler, queryChangeHandler } from './modules'

let onQueryChange

const Search = React.createClass({
  getInitialState () {
    return {
      data: [],
      loading: true,
      total: 0,
      query: ''
    }
  },
  componentDidMount () {
    onQueryChange = debounce(queryChangeHandler.bind(this), 100, {leading: true})
    fatchInitialData.bind(this)()
  },
  handleQueryChange (query) {
    this.setState({query})
    onQueryChange(query)
  },
  handleLoadMore () {
    loadMoreHandler.bind(this)()
  },
  render () {
    return (
      <div className={styles.search}>
        <SearchInput
          query={this.state.query}
          onInputChange={this.handleQueryChange}
        />
        <Results
          query={this.state.query}
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
