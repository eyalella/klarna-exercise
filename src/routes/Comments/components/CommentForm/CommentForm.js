import React from 'react'
import styles from './CommentForm.css'
import Button from 'react-toolbox/lib/button'
import Input from 'react-toolbox/lib/input'

const CommentForm = React.createClass({
  propTypes () {
    return {
      onCommentSubmit: React.PropTypes.func
    }
  },
  getInitialState () {
    return {author: '', text: ''}
  },
  handleAuthorChange (value) {
    this.setState({author: value})
  },
  handleTextChange (value) {
    this.setState({text: value})
  },
  handleSubmit (e) {
    e.preventDefault()
    const author = this.state.author
    const text = this.state.text
    if (!author || !text) {
      return
    }
    this.props.onCommentSubmit({author, text})
    this.setState({author: '', text: ''})
  },
  render () {
    return (
      <form
        className={styles.form}
        onSubmit={this.handleSubmit}
      >
        <Input
          icon='account_box'
          type='text'
          label='Your name'
          value={this.state.author}
          onChange={this.handleAuthorChange}
          className={styles.input}
        />
        <Input
          icon='textsms'
          type='text'
          label='Say somthing'
          value={this.state.text}
          onChange={this.handleTextChange}
          className={styles.textarea}
          multiline
        />
        <Button
          icon='chevron_right'
          label='post'
          primary
          raised
        />
      </form>
    )
  }
})

export default CommentForm
