import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import $ from 'jquery';

class CommentBox extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.addComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.getAllComments = this.getAllComments.bind(this);
    this.state = { comments: [] }
  }

  componentWillMount() {
    this.getAllComments();
  }

  getAllComments() {
    $.ajax({
      url: '/comments',
      type: 'GET',
      dataType: 'JSON'
    }).done( comments => {
      this.setState({ comments });
    });
  }

  updateComment(newComment) {
    this.getAllComments();
  }

  addComment(comment) {
    this.setState({ comments: [comment, ...this.state.comments] });
  }

  render() {
    return (
      <div>
        <CommentForm addComment={this.addComment} />
        <h1>Comments</h1>
        <CommentList updateComment={this.updateComment} comments={this.state.comments} />
      </div>
    );
  }
}


export default CommentBox;