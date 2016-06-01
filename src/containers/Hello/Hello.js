import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as helloActions from 'redux/modules/hello';
import {isLoaded, load as loadHello} from 'redux/modules/hello';
import {initializeWithKey} from 'redux-form';
import { WebinarListing } from 'components';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(loadHello());
    }
  }
}])
@connect(
  state => ({
    loading: state.hello.loading
  }),
  {...helloActions, initializeWithKey })
export default class Hello extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  };

  render() {
    const {error, loading, load} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Hello.scss');
    return (
      <div className={styles.hello + ' container'}>
        <h1>
          Hello
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={load}>
            <i className={refreshClassName}/> {' '} Reload Hello
          </button>
        </h1>
        <Helmet title="Hello"/>
        <p>
          If you hit refresh on your browser, the data loading will take place on the server before the page is returned.
          If you navigated here from another page, the data was fetched from the client after the route transition.
          This uses the decorator method <code>@asyncConnect</code> with the <code>deferred: true</code> flag. To block
          a route transition until some data is loaded, remove the <code>deffered: true</code> flag.
          To always render before loading data, even on the server, use <code>componentDidMount</code>.
        </p>
        <p>
          This hello are stored in your session, so feel free to edit it and refresh.
        </p>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        <WebinarListing />)
      </div>
    );
  }
}
