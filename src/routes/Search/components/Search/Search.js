import React from 'react'
import styles from './Search.css'
import Results from '../Results'
import xhr from '../../../../utils/xhr'

const API_SEARCH_ADDRESS = 'api/search'

const Search = React.createClass({
  getInitialState () {
    return {data: []}
  },
  componentDidMount () {
    const payload = {query: 'Dr'}
    xhr.doPost(API_SEARCH_ADDRESS, payload, data => {
      this.setState({data})
    }, (xhr, status, err) => {
      console.log(API_SEARCH_ADDRESS, status, err.toString())
    })
  },
  handleCommentSubmit (comment) {
    const payload = {...comment, id: Date.now()}
    xhr.doPost(API_SEARCH_ADDRESS, payload, data => {
      this.setState({data})
    }, (xhr, status, err) => {
      console.log(API_SEARCH_ADDRESS, status, err.toString())
    })
  },
  handleCommentDelete (id) {
    const payload = {id}
    xhr.doDelete(API_SEARCH_ADDRESS, payload, data => {
      this.setState({data})
    }, (xhr, status, err) => {
      console.log(API_SEARCH_ADDRESS, status, err.toString())
    })
  },
  render () {
    return (
      <div className={styles.search}>
        <div className='cui__input giant'>
          <label className='cui__input__label'>
              Type your search query
          </label>
          <input className='cui__input__input' />
        </div>
        <Results data={this.state.data} />
      </div>
    )
  }
})

export default Search
