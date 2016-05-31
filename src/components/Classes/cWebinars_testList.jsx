import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as helloActions from 'redux/modules/hello';
import {FormattedMessage, FormattedDate} from 'react-intl';

// *****************************************************************
//  YOUR CODE STARTS HERE
// *****************************************************************
const SortMenuItem = React.createClass({
  clickHandler: function clickHandler(event) {
    try {
      const currentSortField = this.props.getCurrentSortField();
      if (currentSortField.selectedField !== this.props.data.dataVal) {
        this.props.sortClickHandler(event);
      }
      this.props.setCurrentSortField(this.props.data.dataVal);
    } catch (ex) {
      console.log('Exception inside SortMenuItem clickHandler: ' + ex);
    }
  },
  render: function render() {
    const data = this.props.data;

    return (
            <li data-val={data.dataVal} className={this.props.className}>
                <a href="#" data-sort-field={data.fieldName} onClick={this.clickHandler}>
                  <FormattedMessage id={data.dataVal}/>
                </a>
            </li>
        );
  }
});

const SortMenu = React.createClass({
  getInitialState: function getInitialState() {
    return {
      selectedField: ''
    };
  },
  componentWillMount: function componentWillMount() {
    this.setState({
      selectedField: 'popularity'
    });
  },
  setCurrentSortField: function setCurrentSortField(sortField) {
    this.setState({
      selectedField: sortField
    });
  },
  getCurrentSortField: function getCurrentSortField() {
    return this.state;
  },
  render: function render() {
    const _this = this;
    const defaultSortFields = [
      {
        key: 0,
        dataVal: 'popularity',
        fieldName: 'POPULARITY'
      },
      {
        key: 1,
        dataVal: 'time',
        fieldName: 'TIME'
      },
      {
        key: 2,
        dataVal: 'rating',
        fieldName: 'RATING'
      }
    ];

    const sortFields = defaultSortFields.map(function defaultSortField(field) {
      const className = (_this.state.selectedField === field.dataVal) ? 'active' : '';
      return (
                <SortMenuItem key={field.key} className={className} data={field} sortClickHandler={_this.props.sortClickHandler} setCurrentSortField={_this.setCurrentSortField} getCurrentSortField={_this.getCurrentSortField}/>
            );
    });

    return (
            <ul className="courseQuickLinks clearfix">
                <li className="sorting hide">
                    <FormattedMessage id="sortBy"/>: <a href="#" data-val={this.state.selectedField}>--{this.state.selectedField}--<FormattedMessage id={this.state.selectedField}/></a>
                    <ul className="options">
                        {sortFields}
                    </ul>
                </li>
            </ul>
        );
  }
});

const TutorInfo = React.createClass({
  render: function() {
    const data = this.props.data;
    return (
                <figure className="userInfo clearfix">
                    <img src={data.profilePic} />
                    <figcaption>
                        <a href="#">{data.name}</a>
                        <p>{data.city}, {data.country}</p>
                    </figcaption>
                </figure>
            );
  }
});
const ViewRecordingBtn = React.createClass({
  render: function() {
    const data = this.props.data;
    if (data.recordingStatus === 'Deleted') {
      return (
                    <li>RECORDING IN PROGRESS</li>
                );
    }else {
      return (
                    <li className="cta filledOrng"><a href={data.recordingLink}>
                      <FormattedMessage id='viewRecording'/>
                    </a></li>
                );
    }
  }
});

const EachWebinarRoww = React.createClass({
  render: function() {
    const data = this.props.data;
    const tutor = data.tutorq;
    const duration = data.duration ? data.duration : 0;
    const attendeeCount = data.attendeeCount ? data.attendeeCount : 0;
    const title = data.title ? data.title : 'No Title';
    const classUrl = data.classUrl ? data.classUrl : '/online-class/' + data.idClassMaster + '-' + title + '/';
        //http://myschool.wizqe.authordm.com/SignIn?returnUrl=/online-class/21142-public-class-0001
    const viewRecording = '/SignIn?returnUrl=' + classUrl;

    const recordingData = {};
    recordingData.recordingStatus = data.recordingStatus;
    recordingData.recordingLink = viewRecording;

    return (
                <li className="item clearfix">
                    <div className="col-2 content">
                        <h2><a href={classUrl}>{title}</a></h2>
                        <p className="shortInfo"><FormattedMessage id='public'/></p>
                        <ul className="placed">
                            <li>
                                <FormattedDate value={new Date(data.startAt)} month='long'
                                day='numeric'
                                weekday='long' />
                                <span className="date">{data.recordingStatus}</span>
                            </li>
                        </ul>
                        <ul className="type clearfix">
                            <li>
                                <span className="no">{duration}</span> <FormattedMessage id='minutes'/>
                            </li>
                            <li>
                                <span className="no">{attendeeCount}</span> <FormattedMessage id='attendees'/>
                            </li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul className="ctaGroup">
                            <li>
                                <TutorInfo data={data.creator} />
                            </li>
                            <ViewRecordingBtn data={recordingData} />
                        </ul>
                    </div>
                </li>
            );
  }
});
@connect(
  state => ({}),
  dispatch => bindActionCreators(helloActions, dispatch)
)
export default class WebinarListing extends Component {

  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    loadMore: PropTypes.func.isRequired
  };
    sortClickHandler = function(event) {
      event.preventDefault();

      const payload = {};
      const _this = this;
      try {
        payload.page = 0;
        payload.pageSize = _this.props.meta.pageSize;
        payload.sortField = event.target.getAttribute('data-sort-field');
        payload.order = _this.props.meta.order;
      } catch (ex) {
        console.log('Exception inside sortClickHandler: ' + ex);
        return;
      }

      this.loadWebinarsFromServer(payload, false);
    };
    render = function() {
      const {result : items, meta} = this.props;
      if (items === undefined)
        {
        return (<div>Loading....</div>);
      }
      const loadMore = this.props.loadMore;
      const page = meta.page + 1;
      const pageSize = meta.pageSize;
      const viewMoreClickHandler = function(event) {
        event.preventDefault();
        loadMore(pageSize, page);
      };
      {/*<EachWebinarRoww key={eachItem.classId} data={eachItem} />*/}
      const itemList = items.map(function(eachItem) {
        return (
                     <EachWebinarRoww key={eachItem.classId} data={eachItem} />
                );
      });
      return (
            <section id="webinarListing" className="moduleBody">
                <div className="moduleWrapper">
                    <h1 className="title"><FormattedMessage id='webinars'/></h1>
                    <SortMenu sortClickHandler={this.sortClickHandler} />
                    <ul className="courseList webinar">
                       {itemList}
                    </ul>
                    {
                        (meta.page === meta.totalPages - 1) ?
                        null :
                          <div className="cta wired" onClick={viewMoreClickHandler}>
                            <a href="#"><FormattedMessage id='viewMore'/></a>
                        </div>
                    }
                </div>
            </section>
        );
    };
}
