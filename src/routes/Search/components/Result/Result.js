import React from 'react'
import Highlighter from 'react-highlight-words'
import styles from './Result.css'

const Result = React.createClass({
  propTypes: {
    item: React.PropTypes.object,
    query: React.PropTypes.string
  },
  quotes () {
    return ['chuck', 'quote'].map(this.wrapWithHighlight)
  },
  bio () {
    return ['id', 'birthday', 'email', 'phone', 'address'].map(this.wrapWithHighlight)
  },
  wrapWithHighlight (prop) {
    return (
      <div key={prop}>
        <span className={styles.italic}>{prop} - </span>
        <Highlighter
          highlightClassName='Highlight'
          searchWords={this.props.query.split(' ')}
          textToHighlight={this.props.item[prop]}
        />
      </div>
    )
  },
  render () {
    return (
      <div>
        <div className='cui__selector--direct__item'>
          <img className={styles.userAvatar} src={imgSrc(this.props.item)} />
          <div className='cui__selector--direct__label'>
            {this.wrapWithHighlight('name')}
          </div>

          <div className={styles.quotes}>
            {this.quotes()}
          </div>
          <br />
          <div className='cui__selector--direct__description'>
            {this.bio()}
          </div>
        </div>
      </div>
    )
  }
})

function imgSrc (item) {
  return item.avatar_origin.replace('400x400', '80x80')
}

export default Result
