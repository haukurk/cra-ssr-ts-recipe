# Recipe for using Create React App with SSR (supporting React Router and Redux) and TypeScript.

*This project is WIP.*

This project was bootstrapped with [Create React App with TypeScript](https://github.com/wmonk/create-react-app-typescript). It has been modified to isomorphic application, equiped with a server to handle server side rendering and providing a RESTful API. The project also shows a draft how to use TypeScript for both server and client side source code.

## Developement

When developing you can use ``yarn start`` and use the standard development server that CRA provides, default configuration uses port ``3000``. When the developement server is started an express server is also started that (by default) listenes on port ``3101``, we use the ``proxy`` feature provided by CRA to proxy API calls.

To try out server rendering while developing, simply use port ``3101`` instead of ``3000`` in your browser. 

*n.b.* you need to run yarn start, again when changing server side code.

## Install (Getting started)

You can simply install dependencies by running ``yarn install``.

## Server side rendering


## Defining required data for SSR
You explicitly need to add to ``fetchData`` to your components in your routes if you want to side effects before rendering the application.

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

Redux state is rendered and attached to ``window.DATA``to read it from the client and preloading the redux state we do: 

```javascript
import { Base64 } from 'js-base64';

const initialState = ((window as any).DATA !== null && (window as any).DATA !== '{{WINDOW_DATA}}') 
  ? Base64.decode((window as any).DATA) : '{}';
```

## Server API

``/server/api/`` includes all endpoints for ``/api/*`` routes.

It should be noted that fetch does not work relatively when running on server, a way around this is to do something like:

```javascript
var ExecutionEnvironment = require('exenv');

let uriEndpoint = `/api/healthy`;
if (!ExecutionEnvironment.canUseDOM) { 
  uriEndpoint = `http://localhost:3101/api/healthy`; 
}
```

## Acknowledgements 

This is partly based on ideas from [Ben Lu](https://medium.com/@benlu/ssr-with-create-react-app-v2-1b8b520681d9)
