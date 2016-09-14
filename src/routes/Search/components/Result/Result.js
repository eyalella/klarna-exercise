import React from 'react'
import styles from './Result.css'

const Result = React.createClass({
  propTypes: {
    item: React.PropTypes.object
  },
  address (addr = {}) {
    return `${addr.street}, ${addr.city}, ${addr.country}.`
  },
  render () {
    return (
      <div>
        <div className='cui__selector--direct__item'>
          <img className={styles.userAvatar} src={this.props.item.avatar_origin} />

          <div className='cui__selector--direct__label'>
            {this.props.item.name}
          </div>

          <p className='cui__selector--direct__description'>
            {this.address(this.props.item.address)}
          </p>
        </div>
      </div>
    )
  }
})

export default Result
