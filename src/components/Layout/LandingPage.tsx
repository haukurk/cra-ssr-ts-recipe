import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { isEqual } from 'lodash';

interface LandingPageLayoutProps {
    posts: Array<{ id: number, title: string}>;
}

class LandingPageLayout extends React.Component<LandingPageLayoutProps, any> {
  
  shouldComponentUpdate(nextProps: any) {
    if (!isEqual(this.props.posts, nextProps.posts)) {
      return true;
    }
    return false;
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <Helmet>
          <meta
            name="description"
            content={'Awesome ' + (posts ? posts.length : '') + ' posts'}
          />
        </Helmet>

        <ul>
          {posts &&
            posts.map(post =>
              <Link key={post.id} to={`/posts/withcommentsfor/${post.id}`}>
                <li>
                  {post.title}
                </li>
              </Link>
            )}
        </ul>
      </div>
    );
  }
}

export default LandingPageLayout;
