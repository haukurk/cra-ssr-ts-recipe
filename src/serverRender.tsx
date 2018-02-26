import * as React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import App from './containers/App';

export function render(req: any, store: any, context: any) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter
        location={req.url}
        context={context}
      >
        <App/>
      </StaticRouter>
    </Provider>
  );
}

export function renderHead(context: any) {
  return context.head.map((h: any) => (
    renderToStaticMarkup(h)
  )).join('');
}
