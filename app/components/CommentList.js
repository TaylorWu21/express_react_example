import React from 'react';
import Comment from './Comment';

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


export default CommentList;