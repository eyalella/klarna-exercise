import React from 'react'
import CommentList from '../CommentList'
import CommentForm from '../CommentForm'
import xhr from '../../../../utils/xhr'
import styles from './CommentBox.css'

const url = 'api/comments'

const CommentBox = React.createClass({
  getInitialState () {
    return {data: []}
  },
  componentDidMount () {
    xhr.doGet(url, data => {
      this.setState({data})
    }, (xhr, status, err) => {
      console.log(url, status, err.toString())
    })
  },
  handleCommentSubmit (comment) {
    const payload = {...comment, id: Date.now()}
    xhr.doPost(url, payload, data => {
      this.setState({data})
    }, (xhr, status, err) => {
      console.log(url, status, err.toString())
    })
  },
  handleCommentDelete (id) {
    const payload = {id}
    xhr.doDelete(url, payload, data => {
      this.setState({data})
    }, (xhr, status, err) => {
      console.log(url, status, err.toString())
    })
  },
  render () {
    return (
      <div>
        <h1 className={styles.title}>Comments</h1>
        <CommentForm
          onCommentSubmit={this.handleCommentSubmit}
        />
        <CommentList
          data={this.state.data}
          onCommentDelete={this.handleCommentDelete}
        />
      </div>
    )
  }
})

export default CommentBox
