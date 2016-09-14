import React from 'react'
import Comment from '../Comment'

const CommentList = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    onCommentDelete: React.PropTypes.func
  },
  comments () {
    const self = this
    return this.props.data.map(item => (
      <Comment
        key={item.id}
        author={item.author}
        onCommentDelete={function () { self.props.onCommentDelete(item.id) }}
      >
        {item.text}
      </Comment>
    ))
  },
  render () {
    return (
      <div className='comment-list'>
        {this.comments()}
      </div>
    )
  }
})

export default CommentList
