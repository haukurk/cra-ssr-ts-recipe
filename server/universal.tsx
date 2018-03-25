import * as path from 'path';
import * as fs from 'fs';
import { Base64 } from 'js-base64';

import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';

import configureStore from '../src/store';
import App from '../src/containers/App';

import routes from '../src/routes';

const PrivateStores = ['auth'];

export default function universalLoader(req: any, res: any) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html');

  fs.readFile(filePath, 'utf8', (err: any, htmlData: any) => {
    if (err) {
      // tslint:disable-next-line:no-console
      console.error('read err', err);
      return res.status(404).end();
    }
    const context: any = {};
    const store = configureStore();

    const requiredData: Array<any> = [];
    const branch = matchRoutes(routes, req.url);
    branch.forEach(({ route, match }: any) => {
      if (route.component && route.component.fetchData) {
        requiredData.push(route.component.fetchData(store, match));
      }
    });

    Promise.all(requiredData).then(() => {
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url);
      } else {
        const helmet = Helmet.renderStatic();
        const headData = `${helmet.meta.toString()}${helmet.title.toString()}`;

        // prepare the serialized store (remove private keys)
        let storeForClient = store.getState();
        PrivateStores.forEach(key => delete storeForClient[key]);

        // we're good, send the response
        const RenderedApp = htmlData
          .replace('{{SSR}}', markup)
          .replace('{{WINDOW_DATA}}', Base64.encode(JSON.stringify(storeForClient)))
          .replace('<meta-head/>', headData);

        res.status(context.statusCode || 200).send(RenderedApp);
      }
    });
  });
}
