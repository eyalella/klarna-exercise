import React from 'react'
import styles from './SearchInput.css'

const SearchInput = React.createClass({
  propTypes: {
    onSearchSubmit: React.PropTypes.func
  },
  getInitialState () {
    return {searchQuery: ''}
  },
  handleInputChange (e) {
    this.setState({searchQuery: e.target.value})
    this.props.onSearchSubmit(e.target.value)
  },
  render () {
    const LABEL = 'Type your search query'
    return (
      <div className={styles.searchInput}>
        <div className='cui__input giant'>
          <label className='cui__input__label'>
              {this.state.searchQuery ? '' : LABEL}
          </label>
          <input
            className='cui__input__input'
            onChange={this.handleInputChange}
            value={this.state.searchQuery}
          />
        </div>
      </div>
    )
  }
})

export default SearchInput
