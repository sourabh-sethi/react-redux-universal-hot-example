import React, {Component, PropTypes} from 'react';
import ReactIntl from 'react-intl';
import {IntlProvider, FormattedNumber, FormattedPlural, FormattedMessage, FormattedDate} from 'react-intl';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as helloActions from 'redux/modules/hello';

//*****************************************************************
//  YOUR CODE STARTS HERE
//*****************************************************************
const SortMenuItem = React.createClass({
    clickHandler: function (event) {
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
    render: function () {
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
    getInitialState: function () {
        return {
            selectedField: ''
        };
    },
    componentWillMount: function () {
        this.setState({
            selectedField: 'popularity'
        });
    },
    setCurrentSortField: function (sortField) {
        this.setState({
            selectedField: sortField
        });
    },
    getCurrentSortField: function () {
        return this.state;
    },
    render: function () {
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

        const sortFields = defaultSortFields.map(function (field) {
            const className = (_this.state.selectedField === field.dataVal) ? 'active' : '';
            return (
                <SortMenuItem key={field.key} className={className} data={field} sortClickHandler={_this.props.sortClickHandler} setCurrentSortField={_this.setCurrentSortField} getCurrentSortField={_this.getCurrentSortField}/>
            );
        });

        return (
            <ul className="courseQuickLinks clearfix">
                <li className="sorting hide">
                    <FormattedMessage id='sortBy'/>: <a href="#" data-val={this.state.selectedField}>--{this.state.selectedField}--<FormattedMessage id={this.state.selectedField}/></a>
                    <ul className="options">
                        {sortFields}
                    </ul>
                </li>
            </ul>
        );
    }
});

const TutorInfo = React.createClass({
    render: function(){
        const data = this.props.data;
        return(
                <figure className="userInfo clearfix">
                    <img src={data.profilePic} />
                    <figcaption>
                        <a href="#">{data.name}</a>
                        <p>{data.city}, {data.country}</p>
                    </figcaption>
                </figure>
            )
    }
});
const ViewRecordingBtn = React.createClass({
    render: function(){
        const data = this.props.data;
        if(data.recordingStatus === "Deleted"){
            return (
                    <li>RECORDING IN PROGRESS</li>
                )
        }else {
            return(
                    <li className="cta filledOrng"><a href={data.recordingLink}>
                      <FormattedMessage id='viewRecording'/>
                    </a></li>
                )
        }
    }
});

const EachWebinarRoww = React.createClass({
    render: function(){
        const data = this.props.data;
        const tutor = data.tutorq;
        const duration = data.duration ? data.duration : 0;
        const attendeeCount= data.attendeeCount ? data.attendeeCount : 0;
        const title = data.title ? data.title : 'No Title';
        const classUrl = data.classUrl ? data.classUrl : '/online-class/' + data.idClassMaster + '-' + title + "/"
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
            )
    }
});
@connect(
  state => ({
    saveError: state.widgets.saveError
  }),
  dispatch => bindActionCreators(helloActions, dispatch)
)
export default class WebinarListing extends Component {
  // static propTypes = {
  //   fields: PropTypes.object.isRequired,
  //   editStop: PropTypes.func.isRequired,
  //   handleSubmit: PropTypes.func.isRequired,
  //   invalid: PropTypes.bool.isRequired,
  //   pristine: PropTypes.bool.isRequired,
  //   save: PropTypes.func.isRequired,
  //   submitting: PropTypes.bool.isRequired,
  //   saveError: PropTypes.object,
  //   formKey: PropTypes.string.isRequired,
  //   values: PropTypes.object.isRequired
  // };
    loadWebinarsFromServer = function (payload, isAppend) {
        const _this = this;
        const allRecordsFetched = _this.state.meta.page == _this.state.meta.totalPages;

        if (payload && !allRecordsFetched) {
            $.ajax({
                url: '',
                data: {payload: payload},
                cache: false,
                dataType: 'json',
                contentType: "application/json",
                type: 'GET',
                success: function (response) {
                    try {
                        const state = {
                            meta: _this.state.meta,
                            data: _this.state.data
                        };

                        if (isAppend) {
                            state.data = state.data.concat(response.result);
                        } else {
                            state.data = response.result;
                        }

                        state.meta = response.meta;

                        _this.setState(state);
                    } catch (ex) {
                        console.log('Exception inside loadWebinarsFromServer ajax success: ' + ex.message);
                    }
                },
                error: function (xhr, status, err) {
                    console.log('Exception inside loadWebinarsFromServer ajax error: ' + err);
                }
            });
        }
    };
    viewMoreClickHandler =function (event) {
        event.preventDefault();

    };
    sortClickHandler = function (event) {
        event.preventDefault();

        const payload = {};
        const _this = this;
        try {
            payload.page = 0;
            payload.pageSize = _this.props.meta.pageSize;
            payload.sortField = event.target.getAttribute('data-sort-field');
            payload.order = _this.props.meta.order;
        } catch (ex) {
            console.log("Exception inside sortClickHandler: " + ex);
            return;
        }

        this.loadWebinarsFromServer(payload, false);
    };
    render = function () {
        const {result : items, meta} = this.props;
        if(items === undefined)
        {
          return (<div>Loading....</div>)
        }

        const itemList = items.map(function(eachItem){
            return (
                     <EachWebinarRoww key={eachItem.classId} data={eachItem} />
                )
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
                        <div className="cta wired" onClick={this.viewMoreClickHandler}>
                            <a href="#"><FormattedMessage id='viewMore'/></a>
                        </div>
                    }
                </div>
            </section>
        );
    };
};
