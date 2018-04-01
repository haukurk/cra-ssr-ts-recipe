import LandingPage from './containers/LandingPage';
import PostsApiPage from './containers/PostsPage';
import PostComments from './containers/PostComments';

import NoMatch from './components/Layout/NoMatch';

const routes = [
  {
    path: '/',
    exact: true,
    component: LandingPage
  },
  {
    path: '/posts',
    component: PostsApiPage,
    routes: [
      {
        path: '/posts/withcommentsfor/:id',
        component: PostComments
      }
    ]
  },
  {
    component: NoMatch
  }
];

export default routes;
