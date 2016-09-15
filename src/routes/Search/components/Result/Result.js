import React from 'react'
import styles from './Result.css'

const Result = React.createClass({
  propTypes: {
    item: React.PropTypes.object
  },
  address (addr = {}) {
    return `${addr.street}, ${addr.city}, ${addr.country}.`
  },
  birthDay (time) {
    return new Date(time).toDateString()
  },
  render () {
    return (
      <div>
        <div className='cui__selector--direct__item'>
          <img className={styles.userAvatar} src={this.props.item.avatar_origin} />
          <div className='cui__selector--direct__label'>
            {this.props.item.name}
          </div>

          <p>
            <span className={styles.quote}>&quot;{this.props.item.chuck}&quot;</span> <br />
            <span className={styles.quote}>&quot;{this.props.item.quote}&quot;</span>
          </p>
          <br />
          <p className='cui__selector--direct__description'>
            <span className={styles.italic}>id - {this.props.item.id}<br /></span>
            <span className={styles.italic}>BirthDay - {this.birthDay(this.props.item.birthday)}<br /></span>
            <span className={styles.italic}>Email - {this.props.item.email}<br /></span>
            <span className={styles.italic}>Phone - {this.props.item.phone}<br /></span>
            <span className={styles.italic}>Address - {this.address(this.props.item.address)}<br /></span>
          </p>
        </div>
      </div>
    )
  }
})

export default Result
