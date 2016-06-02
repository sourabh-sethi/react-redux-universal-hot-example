import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as actions from 'redux/modules/webinars';
import {isLoaded, load} from 'redux/modules/webinars';
import {initializeWithKey} from 'redux-form';
import { WebinarDetail } from 'components';
import { asyncConnect } from 'redux-async-connect';

@asyncConnect([{
  deferred: true,
  promise: ({store: {dispatch, getState}}) => {
    if (!isLoaded(getState())) {
      return dispatch(load());
    }
  }
}])
@connect(
  state => ({
    loading: state.webinarDetails.loading,
    data: state.webinarDetails.data
  }),
  {...actions, initializeWithKey })
export default class Webinars extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    data: PropTypes.object
  };

  render() {
    const {error, loading, load: localLoad, data} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Webinars.scss');
    return (
      <div className={styles.hello + ' container'}>
        <h1>
          Hello
          <button className={styles.refreshBtn + ' btn btn-success'} onClick={localLoad
          }>
            <i className={refreshClassName}/> {' '} Reload Hello
          </button>
        </h1>
        <Helmet title="Webinars"/>
        {error &&
        <div className="alert alert-danger" role="alert">
          <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
          {' '}
          {error}
        </div>}
        <WebinarDetail data={data} />
      </div>
    );
  }
}
