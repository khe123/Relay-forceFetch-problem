import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';

import ChatList from './components/container';

class myRoute extends Relay.Route {
  static queries = {
    viewer: () => Relay.QL`query RootQuery { viewer }`,
  };
  static routeName = 'TodosHomeRoute';
}

ReactDOM.render(
  <Relay.RootContainer Component={ChatList} route={new myRoute()} />,
  document.getElementById('root')
);
