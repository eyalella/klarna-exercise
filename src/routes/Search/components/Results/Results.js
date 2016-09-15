import React from 'react'
import Result from '../Result'
import styles from './Results.css'

const Results = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    onLoadMore: React.PropTypes.func,
    totalResults: React.PropTypes.number,
    loading: React.PropTypes.bool
  },
  results () {
    return this.props.data.map(item => (
      <Result key={item.id} item={item} />
    ))
  },
  showMoreButton (resultsLength) {
    if (resultsLength < this.props.totalResults) {
      return (
        <div
          className='cui__button--primary'
          onClick={this.props.onLoadMore}
        >Load more</div>
      )
    }
  },
  resultsTitle () {
    if (this.props.loading) {
      return 'Loading...'
    }
    return `Showing ${this.props.data.length} / ${this.props.totalResults} Search results`
  },
  render () {
    const results = this.results()
    return (
      <div>
        <div className={styles.results}>
          <div className='cui__selector--direct title'>
            <h2 className='cui__selector--direct__title'>
              {this.resultsTitle()}
            </h2>
            {results}
          </div>
          <div className={styles.loadMore}>
            {this.showMoreButton(results.length)}
          </div>
        </div>
      </div>
    )
  }
})

export default Results
