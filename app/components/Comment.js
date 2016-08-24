import React from 'react';
import $ from 'jquery';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.editComment = this.editComment.bind(this);
    this.state = { edit: false }
  }

  comment() {
    return (
      <div onClick={this.toggleEdit}>
        <h2>{this.props.author}</h2>
        <h4>{this.props.content}</h4>
        <p>{moment(this.props.updated_at).format("MMMM/DD/YYYY")}</p>
      </div>
    )
  }

  edit() {
    return (
      <div>
        <h2>{this.props.author}</h2>
        <input ref='editContent' defaultValue={this.props.content} />
        <button onClick={this.toggleEdit}>Cancel</button>
        <button onClick={this.editComment}>Save</button>
      </div>
    )
  }

  toggleEdit() {
    this.setState({ edit: !this.state.edit });
  }

  editComment() {
    $.ajax({
      url: `/comments/${this.props.id}`,
      type: 'PUT',
      dataType: 'JSON',
      data: { content: this.refs.editContent.value }
    }).done( comment => {
      this.props.updateComment(comment);
      this.toggleEdit();
    });
  }

  render() {
    if (this.state.edit)
      return this.edit();
    else
      return this.comment();
  }
}

export default Comment;