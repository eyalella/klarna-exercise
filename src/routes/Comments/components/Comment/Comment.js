import React from 'react'
import Remarkable from 'remarkable'
import Button from 'react-toolbox/lib/button'
import { Card, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card'

const Comment = React.createClass({
  propTypes: {
    author: React.PropTypes.string,
    children: React.PropTypes.string,
    onCommentDelete: React.PropTypes.func
  },
  rawMarkup () {
    const md = new Remarkable()
    const rawMarkup = md.render(this.props.children.toString())
    return {__html: rawMarkup}
  },
  render () {
    return (
      <Card>
        <CardTitle title={this.props.author} />
        <CardText dangerouslySetInnerHTML={this.rawMarkup()} />
        <CardActions>
          <Button
            label='remove'
            icon='close'
            onClick={this.props.onCommentDelete}
            accent
          />
        </CardActions>
      </Card>
    )
  }
})

export default Comment
