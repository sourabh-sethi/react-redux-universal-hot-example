import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as actions from 'redux/modules/webinars';
import {isLoaded, load} from 'redux/modules/webinars';
import {initializeWithKey} from 'redux-form';
import { WebinarList } from 'components';
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
    loading: state.webinars.loading,
    result: state.webinars.result,
    meta: state.webinars.meta
  }),
  {...actions, initializeWithKey })
export default class Webinars extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired
  };

  render() {
    const {error, loading, load: localLoad} = this.props;
    let refreshClassName = 'fa fa-refresh';
    if (loading) {
      refreshClassName += ' fa-spin';
    }
    const styles = require('./Webinars.scss');
    const props = this.props;
    return (
      <div className={styles.hello + ' container'}>
        <h1>
          Webinars Listing
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
        <WebinarList result={props.result} meta={props.meta} load={props.load} loadMore={props.loadMore} />)
      </div>
    );
  }
}
