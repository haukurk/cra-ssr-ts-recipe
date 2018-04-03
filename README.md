# Recipe for using Create React App with SSR (supporting React Router and Redux) and TypeScript.

*This project is WIP.*

This project was bootstrapped with [Create React App with TypeScript](https://github.com/wmonk/create-react-app-typescript). It has been modified to be an isomorphic application, with support to do server side rendering of the React web application (also the Redux state). The project also provides a way to create a RESTful Web API and is a POC to show how to use TypeScript for both server and client side.

## Developement

When developing you can use ``yarn start`` and use the standard development server that CRA provides. To access the development web server you can use port ``3000``. When you run ``yarn start`` a separate server is started that handles SSR and Web API endpoints. This server by default listens on port ``3101``. To proxy API calls when using the development server,  we use the ``proxy`` feature provided by CRA to proxy API calls.

To use server rendering while developing, simply use port ``3101`` instead of ``3000`` in your browser. 

*n.b.* you still need to re-run ``yarn start`` when changing server side code (will not be like that in the future).

## Install dependencies

You can simply install dependencies by running ``yarn install``.

## Server side rendering

Some important infomation related to SSR.

## Defining required data for SSR
You explicitly need to add a function ``fetchData`` to your components, that you include in our React Router routes,if you want to do any prefetching of data before rendering the web application.

Example:
```javascript
class LandingPage extends React.Component<LandingPageProps, {}> {

  // Dependecies before rendering to client..
  static fetchData(store: any) {
      return store.dispatch(requestHealthCheck());
    }

...
```

## Redux state

Redux state is rendered and attached to ``window.DATA`` for the client to read it from and to preload the redux state. This is done like the follow code snippet shows:

```javascript
import { Base64 } from 'js-base64';

const initialState = ((window as any).DATA !== null && (window as any).DATA !== '{{WINDOW_DATA}}') 
  ? Base64.decode((window as any).DATA) : '{}';
```

## Server API

``/server/api/`` includes all endpoints for ``/api/*`` routes.

It should be noted that ``fetch`` does not work relatively when running on server, a way around this is to do something like:

```javascript
var ExecutionEnvironment = require('exenv');

let uriEndpoint = `/api/healthy`;
if (!ExecutionEnvironment.canUseDOM) { 
  uriEndpoint = `http://localhost:3101/api/healthy`; 
}

...
fetch(uriEndpoint).then(...);
...
```

If we can use the DOM, then we are running on the client, where relative request work.

## Acknowledgements 

This is partly based on ideas from [Ben Lu](https://medium.com/@benlu/ssr-with-create-react-app-v2-1b8b520681d9)
