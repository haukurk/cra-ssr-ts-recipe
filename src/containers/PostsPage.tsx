import * as React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PostList from '../components/Layout/PostList';

import { renderRoutes } from 'react-router-config';

import { fetchPostsIfNeeded } from '../actions/posts';

class PostsPage extends React.Component<any, any> {
  static fetchData(store: any) {
    return store.dispatch(fetchPostsIfNeeded());
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchPostsIfNeeded());
  }

  render() {
    const { posts, route } = this.props;

    return (
      <div>
        <Helmet>
          <title>Posts</title>
        </Helmet>

        <h1>Posts</h1>
        {renderRoutes(route.routes)}
        <PostList posts={posts} />
      </div>
    );
  }
}

const mapStateToProps = (posts: any) => ({
  posts: posts.posts.items
});

export default connect(mapStateToProps)(PostsPage);
