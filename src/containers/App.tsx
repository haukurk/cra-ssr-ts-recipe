import * as React from 'react';

import { Helmet } from 'react-helmet';
import { renderRoutes } from 'react-router-config';
import routes from '../routes';

class App extends React.Component {
  render() {
    return (
      <div>
        <Helmet defaultTitle="" titleTemplate="%s - SSR React+Redux+TypeScript App.">
          <meta
            name="description"
            content="This is the default meta description"
          />
        </Helmet>

        {renderRoutes(routes)}
      </div>
    );
  }
}

export default App;
