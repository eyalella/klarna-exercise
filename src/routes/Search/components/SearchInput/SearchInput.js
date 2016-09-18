import React from 'react'

import styles from './SearchInput.css'

const SearchInput = React.createClass({
  propTypes: {
    onInputChange: React.PropTypes.func,
    query: React.PropTypes.string
  },
  handleInputChange (event) {
    this.props.onInputChange(event.target.value)
  },
  render () {
    const LABEL = 'Type your search query'
    return (
      <div className={styles.searchInput}>
        <div className='cui__input giant'>
          <label className='cui__input__label'>
              {this.props.query ? '' : LABEL}
          </label>
          <input
            className='cui__input__input'
            onChange={this.handleInputChange}
            value={this.props.query}
          />
        </div>
      </div>
    )
  }
})

export default SearchInput
