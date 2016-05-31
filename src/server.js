import Express from 'express';
import React from 'react';
import ReactDOM from 'react-dom/server';
import config from './config';
import favicon from 'serve-favicon';
import compression from 'compression';
import httpProxy from 'http-proxy';
import path from 'path';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import PrettyError from 'pretty-error';
import http from 'http';

import { match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ReduxAsyncConnect, loadOnServer } from 'redux-async-connect';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider} from 'react-intl-redux';
import getRoutes from './routes';
import i18n from './i18n/index.js';

const targetUrl = 'http://' + config.apiHost + ':' + config.apiPort;
const targetUrl2 = 'http://www.catapult-system-product-name.com:8051';
//const targetUrl2 = 'http://localhost:8051';
const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  ws: true
});

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

app.use(Express.static(path.join(__dirname, '..', 'static')));

app.use('/api/v1', (req, res) => {
  proxy.web(req, res, {target: targetUrl2});
});

// Proxy to API server
app.use('/api', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/api/v1', (req, res) => {
  proxy.web(req, res, {target: targetUrl});
});

app.use('/ws', (req, res) => {
  proxy.web(req, res, {target: targetUrl + '/ws'});
});

server.on('upgrade', (req, socket, head) => {
  proxy.ws(req, socket, head);
});

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    // Do not cache webpack stats: the script file would change since
    // hot module replacement is enabled in the development env
    webpackIsomorphicTools.refresh();
  }
  const client = new ApiClient(req);
  const memoryHistory = createHistory(req.originalUrl);
  const i18nInstance = new i18n();
  const data = {"intl":{"locale":i18nInstance.getLanguage().getCulture(), "messages":i18nInstance.getCurrentLocalizedString()}};

  const store = createStore(memoryHistory, client, data);
  const history = syncHistoryWithStore(memoryHistory, store);

  function hydrateOnClient() {
    res.send('<!doctype html>\n' +
      ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} store={store}/>));
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: getRoutes(store), location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      //  res.redirect(redirectLocation.pathname + redirectLocation.search);
      res.status(200);
      res.send('{"data":{"result":[{"title":"Live class to be added in course","startAt":"2013-06-15T06:48:00.000Z","status:"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId:53344,"classUrl":"/online-class/49389-live-class-to-be-added-in-course","recordingStatus":"Done","recordingRequestLink:"45o   ","seoClassName":"/online-class/49389-live-class-to-be-added-in-course","idClassMaster":},{"title":"Live class to be added in course","startAt":"2013-06-15T06:48:00.000Z","status":"DONE","duration:60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53345,"classUrl":"/online-class/49390-live-class-to-be-added-in-course","recordingStatus":"Done","recordingRequestLink":"45p   ","seoClassName":"/online-class/49390-live-class-to-be-added-in-course","idClassMaster":49390},{"title":"Live class to be added in course","startAt":"2013-06-15T06:48:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53346,"classUrl":"/online-class/49391-live-class-to-be-added-in-course","recordingStatus":"Done","recordingRequestLink:"45q   ","seoClassName":"/online-class/49391-live-class-to-be-added-in-course","idClassMaster":},{"title":"Shimla","startAt":"2013-06-22T06:56:00.000Z","status":"DONE","duration":60,"creator":{"profilePic:"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName,"country":"India","city":"Gurgaon","gender":"Female"},"classId":53350,"classUrl":"/online-class/49395-shimla,"recordingStatus":"Done","recordingRequestLink":"45r   ","seoClassName":"/online-class/49395-shimla,"idClassMaster":49395},{"title":"public class","startAt":"2013-06-28T13:14:00.000Z","status":"DONE,"duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId:53775,"classUrl":"/online-class/49639-public-class","recordingStatus":"Done","recordingRequestLink:"45u   ","seoClassName":"/online-class/49639-public-class","idClassMaster":49639},{"title":"First mathematics","startAt":"2013-06-29T10:17:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName,"country":"India","city":"Gurgaon","gender":"Female"},"classId":53774,"classUrl":"/online-class/49638-first-class-mathematics,"recordingStatus":"Done","recordingRequestLink":"45t   ","seoClassName":"/online-class/49638-first-class-mathematics,"idClassMaster":49638},{"title":"IBPS Bank Promotion Test Preparation Course For Officers and Managers,"startAt":"2013-07-01T10:25:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53789,"classUrl":"/online-class/49651-ibps-bank-promotion-test-preparation-course-for-officers-and-managers","recordingStatus":"Done","recordingRequestLink":"45y   ","seoClassName":"/online-class/49651-ibps-bank-promotion-test-preparation-course-for-officers-and-managers","idClassMaster":49651},{"title":"JetKing","startAt":"2013-07-01T10:40:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53790,"classUrl":"/online-class/49652-jetking","recordingStatus":"Done","recordingRequestLink":"45z   ","seoClassName":"/online-class/49652-jetking","idClassMaster":49652},{"title":"Today Public  class","startAt":"2013-07-04T06:03:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53810,"classUrl":"/online-class/49675-today-public-class","recordingStatus":"Done","recordingRequestLink":"46c   ","seoClassName":"/online-class/49675-today-public-class","idClassMaster":49675},{"title":"First public class","startAt":"2013-07-06T05:16:00.000Z","status":"DONE","duration":60,"creator":{"profilePic":"http://wqimgpre.s3.amazonaws.com/ut/umt/Neha_Teacher1_teacher-1-77138.jpg","name":"Neha_teacher1 LastName","country":"India","city":"Gurgaon","gender":"Female"},"classId":53777,"classUrl":"/online-class/49641-first-public-class","recordingStatus":"Done","recordingRequestLink":"45v   ","seoClassName":"/online-class/49641-first-public-class","idClassMaster":49641}],"meta":{"page":0,"pageSize":10,"totalPages":4,"order":"ASC","sortField":"TIME"}},"success":true,"errorCode":0}');    } else if (error) {      console.error('ROUTER ERROR:', pretty.render(error));
    } else if (error) {
        console.error('ROUTER ERROR:', pretty.render(error));
        res.status(500);
        hydrateOnClient();
    } else if (renderProps) {
      loadOnServer({...renderProps, store, helpers: {client}}).then(() => {
        const component = (
          <Provider store={store} key="provider">
            <ReduxAsyncConnect {...renderProps} />
          </Provider>
        );

        res.status(200);

        global.navigator = {userAgent: req.headers['user-agent']};

        res.send('<!doctype html>\n' +
          ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={component} store={store}/>));
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, config.apiPort);
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
