import React from 'react'
import Result from '../Result'
import styles from './Results.css'

const Results = React.createClass({
  propTypes: {
    data: React.PropTypes.array
  },
  results () {
    return this.props.data.map(item => (
      <Result key={item.id} item={item} />
    ))
  },
  render () {
    return (
      <div>
        <div className={styles.results}>
          <div className='cui__selector--direct title'>
            <h2 className='cui__selector--direct__title'>
              Search results
            </h2>
            {this.results()}
          </div>
        </div>
      </div>
    )
  }
})

export default Results
