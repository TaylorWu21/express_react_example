import React from 'react';
import $ from 'jquery';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
  }

  addComment(e) {
    e.preventDefault();
    let author = this.refs.author.value;
    let content = this.refs.content.value;
    $.ajax({
      url: '/comments',
      type: 'POST',
      dataType: 'JSON',
      data: { author, content }
    }).done( comment => {
      this.props.addComment(comment);
      this.refs.form.reset();
    });
  }

  render() {
    return (
      <div>
        <form ref="form" onSubmit={this.addComment}>
          <input ref="author" placeholder="author" />
          <input ref="content" placeholder="comment" />
          <button type="submit">Add Comment</button>
        </form>
      </div>
    )
  }
}

export default CommentForm;