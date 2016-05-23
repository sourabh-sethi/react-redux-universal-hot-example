import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import * as helloActions from 'redux/modules/hello';
import {isLoaded, load as loadHello} from 'redux/modules/hello';
import {initializeWithKey} from 'redux-form';
import { WidgetForm } from 'components';
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
    hello: state.hello.data,
    editing: state.hello.editing,
    error: state.hello.error,
    loading: state.hello.loading
  }),
  {...helloActions, initializeWithKey })
export default class Hello extends Component {
  static propTypes = {
    hello: PropTypes.array,
    error: PropTypes.string,
    loading: PropTypes.bool,
    initializeWithKey: PropTypes.func.isRequired,
    editing: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    editStart: PropTypes.func.isRequired
  };

  render() {
    const handleEdit = (hello) => {
      const {editStart} = this.props; // eslint-disable-line no-shadow
      return () => editStart(String(hello.id));
    };
    const {hello, error, editing, loading, load} = this.props;
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
        {hello && hello.length &&
        <table className="table table-striped">
          <thead>
          <tr>
            <th className={styles.idCol}>ID</th>
            <th className={styles.colorCol}>Color</th>
            <th className={styles.sprocketsCol}>Sprockets</th>
            <th className={styles.ownerCol}>Owner</th>
            <th className={styles.buttonCol}></th>
          </tr>
          </thead>
          <tbody>
          {
            hello.map((singleHello) => editing[singleHello.id] ?
              <WidgetForm formKey={String(singleHello.id)} key={String(singleHello.id)} initialValues={singleHello}/> :
              <tr key={singleHello.id}>
                <td className={styles.idCol}>{singleHello.id}</td>
                <td className={styles.colorCol}>{singleHello.color}</td>
                <td className={styles.sprocketsCol}>{singleHello.sprocketCount}</td>
                <td className={styles.ownerCol}>{singleHello.owner}</td>
                <td className={styles.buttonCol}>
                  <button className="btn btn-primary" onClick={handleEdit(singleHello)}>
                    <i className="fa fa-pencil"/> Edit
                  </button>
                </td>
              </tr>)
          }
          </tbody>
        </table>}
      </div>
    );
  }
}

