class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let comments = this.props.comments.map( comment => {
      let id = comment._id;
      return(
        <Comment
          key={id}
          id={id}
          {...comment}
          updateComment={this.props.updateComment}
        />
      );
    });

    return (
      <div>
        { comments }
      </div>
    )
  }
}

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

ReactDOM.render(<CommentBox />, document.getElementById('app'));
