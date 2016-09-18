import React from 'react'
import Result from '../Result'
import styles from './Results.css'

const Results = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    onLoadMore: React.PropTypes.func,
    totalResults: React.PropTypes.number,
    loading: React.PropTypes.bool,
    query: React.PropTypes.string
  },
  results () {
    return this.props.data.map(item => (
      <Result
        key={item.id}
        item={item}
        query={this.props.query}
      />
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
    } else if (this.props.data.length === this.props.totalResults) {
      return `Showing ${this.props.totalResults} Search results`
    }
    return `Showing ${this.props.data.length} / ${this.props.totalResults} Search results`
  },
  render () {
    const results = this.results()
    return (
      <div className={styles.results}>
        <div className='cui__selector--direct title'>
          <h2 className={`${styles.title} cui__selector--direct__title`}>
            <span>{this.resultsTitle()}</span>
          </h2>
        </div>
        <div className={styles.resultsList}>
          {results}
        </div>
        <div className={styles.loadMore}>
          {this.showMoreButton(results.length)}
        </div>
      </div>
    )
  }
})

export default Results
