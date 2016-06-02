import React, {Component, PropTypes} from 'react';
/* eslint-disable */
import {FormattedMessage, FormattedDate, FormattedTime} from 'react-intl';
import {Link } from 'react-router';
/* eslint-enable */

class Breadcrum extends Component {
  static propTypes = {
    data: PropTypes.string
  };
  render = function render() {
    const data = this.props.data;

    return (
                <div>
                    <section id="breadcrumbs" className="moduleBody">
                        <div className="moduleWrapper">
                            <div className="moduleGutter">
                                <ul className="wrapper clearfix">
                                    <li><a href="/webinars/"><FormattedMessage id="Webinars"/></a></li>
                                    <li> > </li>
                                    <li>{data}</li>
                                </ul>
                            </div>
                        </div>
                    </section>
                </div>
            );
  }
}

const getStatusMessage = (ref, status) => {
  let msg = '';
  const obj = ref;
  switch (status) {
    case 'DONE':
      msg = obj.getIntlMessage('Thisclassisover');// 'This class is over';
      break;
    case 'CANCELLEDBYTEACHER':
      msg = obj.getIntlMessage('ThisSessioncancelled');// 'This class has been Cancelled';
      break;
    case 'EXPIRED':
      msg = obj.getIntlMessage('Thissessionnotheld');// 'This class was not held';
      break;

    default:
      break;
  }

  return msg;
};

class ButtonViewRecording extends Component {
  static propTypes = {
    data: PropTypes.string
  };

  render = function render() {
    const data = this.props.data;
    if (data !== '#') {
      return (
            <div className="col-2">
                <div className="cta filledOrng2 inline"><a href={data}><FormattedMessage id="viewRecording"/></a></div>
            </div>
            );
    }
    return (<div></div>);
  }
}

class ClassScheduleEach extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render = function render() {
    const data = this.props.data;
       /* var btnViewRec = function(data){
            if(data.linkViewRecording){
                return (<ButtonViewRecording data={data.linkViewRecording} />)
            }else{
                return (<ButtonViewRecording data={data.linkViewRecording} />)
            }
        }*/
    const msg = getStatusMessage(this, data.status);
    return (
                <li>
                    <div className="clearfix">
                        <div className="col-1">
                            <p className="recurringDate">{data.startAt}
                                <FormattedDate value={data.startAt} format="webinars" />
                            </p>
                            <p><FormattedMessage id="membersAttended"/>: {data.membersAttended}</p>
                            <p>{msg}</p>
                        </div>
                        <ButtonViewRecording data={data.linkViewRecording} />
                    </div>
                </li>
            );
  }
}

class ClassSchedule extends Component {
  static propTypes = {
    data: PropTypes.array
  };

  render = function render() {
    const data = this.props.data;
    const scheduleItems = data.map(function createClassSchedule(eachScheduleItem) {
      return (
                    <ClassScheduleEach key={eachScheduleItem.sessionId} data={eachScheduleItem} />
                );
    });
    return (
                <ul className="scheduleList">
                    {scheduleItems}
                </ul>
            );
  }
}

class MetaDetail extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render = function render() {
    const data = this.props.data;
    if (!data) {
      return (
           <section id="webinarsTabs">Loading...</section>
         );
    }
    return (
             <section id="webinarsTabs">
                    <div className="tabsHeadWrapper moduleBody">
                        <ul className="tabsHead moduleWrapper clearfix">
                            <li className="overview" data-tab="aboutClass"><a href="#"><FormattedMessage id="aboutTheClass"/></a></li>
                            <li className="host" data-tab="aboutHost"><a href="#"><FormattedMessage id="aboutTheHost"/></a></li>
                            <li className="discussion" data-tab="discussion"><a href="#"><FormattedMessage id="discussion"/></a></li>
                        </ul>
                    </div>
                    <div className="tabsContent moduleBody">
                        <div data-tab="aboutClass" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{data.classTitle}</h2>
                                <p className="hostedLang">{data.language}</p>
                                <p>{data.description}</p>
                            </div>
                        </div>
                        <div data-tab="aboutHost" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{data.tutor.name}</h2>
                                <figure className="host">
                                    <img src={data.tutor.profilePic} alt="" />
                                    <figcaption>{data.tutor.name}</figcaption>
                                </figure>
                                <p dangerouslySetInnerHTML={{__html: data.tutor.presenterInfo}} />
                            </div>
                        </div>
                        <div data-tab="discussion" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title"><FormattedMessage id="discussionThread"/> <span className="count">{/* data.discussion.count */}0</span></h2>
                                <div className="formElement">
                                    <form>
                                        <fieldset>
                                            <ul className="fieldList">
                                                <li className="field">
                                                    <textarea placeholder="Have a question or want to say something? Post it here." name="thread" id="discussion" cols="30" rows="5"></textarea>
                                                </li>
                                                <li className="fieldBtn">
                                                    <input className="cta filledOrng2" type="button" value="Post" />
                                                </li>
                                            </ul>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        );
  }
}

export default class WebinarDetail extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render = function render() {
    const {data} = this.props;
    if (!data) {
      return (
           <section id="webinarsTabs">Loading...</section>
         );
    }
    let genderCity = '';
    const {tutor} = data;
    if (tutor && tutor.gender) {
      genderCity = tutor.gender;
      if (tutor.city) genderCity += ' | ' + tutor.city;
      if (tutor.country) genderCity += ', ' + tutor.country;
    }
    const status = data.classStart.status;
    const msg = getStatusMessage(this, status);

    return (
            <div>
                <Breadcrum data={data.classTitle} />
                <section id="webinarsDetails" className="moduleBody">
                    <div className="moduleWrapper">
                        <ul className="courseList details">
                            <li className="item clearfix">
                                <div className="col-1">
                                    <figure className="courseImg inline">
                                        <img src={data.tutor.profilePic} alt="" />
                                        <figcaption className="captionWrap">
                                            {data.tutor.name}
                                        </figcaption>
                                        <p className="captionWrap"> {genderCity}</p>
                                    </figure>
                                </div>
                                <div className="col-2 content">
                                    <h2>{data.classTitle}</h2>
                                    <div className="relatedOpt">
                                        <ul className="placed">
                                            <li>
                                                <span className="calenderDate">
                                                	<FormattedDate value={data.classStart.date} day="2-digit" /><br/>
                                                	<FormattedDate value={data.classStart.date} month="short" />
                                                </span>
                                                <FormattedDate value={data.classStart.date} year="numeric"/>&#160;
                                                <FormattedTime value={data.classStart.date} hour="2-digit" minute="2-digit" />
                                                <span className="date">{data.classStats.status}</span>

                                            </li>
                                        </ul>
                                    </div>
                                    <div className="classFixtures hide">
                                        <p>{data.classFixtures.status}</p>
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}>{this.getIntlMessage('viewRecording')}</a>
                                        </div>&#160;&#160;
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}>{this.getIntlMessage('downloadRecording')}</a>
                                        </div>
                                    </div>
                                    <div className="innerTabsWrap">
                                        <ul className="tabs clearfix">
                                            <li data-tab="schedule" className="active"><a href="#">{this.getIntlMessage('classSchedule')}</a></li>
                                            <li data-tab="sessions"><a href="#">{this.getIntlMessage('sessionsJoinedByYou')}</a></li>
                                        </ul>
                                        <div className="tabsContentWrap">
                                            <div data-tab="schedule" className="contentOfTab">
                                                <ClassSchedule data={data.classSessions} />
                                            </div>
                                            <div data-tab="sessions" className="contentOfTab">
                                                <p>{this.getIntlMessage('recurringClassSeriesNotJoined')}. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <ul className="ctaGroup">
                                        <li className="cta noRadius">
                                            <ul className="type">
                                                <li>
                                                    <span className="no">{data.classStats.durationInMins}</span> {this.getIntlMessage('minutes')}
                                                </li>
                                                <li>
                                                    <span className="no">{data.classStats.attendesCount}</span> {this.getIntlMessage('attendees')}
                                                </li>
                                            </ul>
                                            <span className="msg"> {msg}</span>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <MetaDetail data={data}/>
                </section>
            </div>
        );
  }
}
