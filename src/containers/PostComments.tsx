import * as React from 'react';
import { connect } from 'react-redux';
import { fetchCommentsIfNeeded } from '../actions/comments';
import { isEqual } from 'lodash';
import { RootState } from '../reducers';

interface PostCommentsProps {
    comments: Array<Comment>;
    dispatch: any;
    match: any;
}

/**
 * Container for Comments
 */
class PostComments extends React.Component<PostCommentsProps, {}> {

   // Dependendency for server side rendering
   static fetchData(store: any, match: any) {
    return store.dispatch(fetchCommentsIfNeeded(match.params.id));
   }

  shouldComponentUpdate(nextProps: any) {
    if (!isEqual(this.props.comments, nextProps.comments)) {
      return true;
    }
    return false;
  }

  /**
   * Fetch comments if not already exist. 
   */
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

const mapStateToProps = (state: RootState, ownProps: PostCommentsProps) => {
  let byPostMatch = state.comments.byPost[ownProps.match.params.id];

  return {
    comments: byPostMatch ? byPostMatch.items : null
  };
};

export default connect(mapStateToProps)(PostComments);
