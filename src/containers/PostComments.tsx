import * as React from 'react';
import { connect } from 'react-redux';

import { fetchCommentsIfNeeded } from '../actions/comments';

import { isEqual } from 'lodash';

interface PostCommentsProps {
    comments: Array<{
        id: number;
        email: string;
        body: string;
    }>;
    dispatch: any;
    match: any;
}

class PostComments extends React.Component<PostCommentsProps, any> {

   static fetchData(store: any, match: any) {
    return store.dispatch(fetchCommentsIfNeeded(match.params.id));
   }

  shouldComponentUpdate(nextProps: any) {
    if (!isEqual(this.props.comments, nextProps.comments)) {
      return true;
    }

    return false;
  }

  fetchCommentsData() {
    const { dispatch } = this.props;
    dispatch(fetchCommentsIfNeeded(this.props.match.params.id));
  }

  componentDidMount() {
    this.fetchCommentsData();
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchCommentsData();
    }
  }

  render() {
    const { comments } = this.props;

    return (
      <div>
        <h3>
          Comments to Post {this.props.match.params.id}
        </h3>
        <ul>
          {comments &&
            comments.map((comment: any) =>
              <li key={comment.id}>
                <strong>{comment.email}</strong> {comment.body}
              </li>
            )}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  let byPostMatch = state.comments.byPost[ownProps.match.params.id];

  return {
    comments: byPostMatch ? byPostMatch.items : null
  };
};

export default connect(mapStateToProps)(PostComments);
