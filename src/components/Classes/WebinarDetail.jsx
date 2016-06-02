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
  switch (status) {
    case 'DONE':
      msg = 'Thisclassisover';// 'This class is over';
      break;
    case 'CANCELLEDBYTEACHER':
      msg = 'ThisSessioncancelled';// 'This class has been Cancelled';
      break;
    case 'EXPIRED':
      msg = 'Thissessionnotheld';// 'This class was not held';
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
                                <FormattedDate value={data.startAt} />
                            </p>
                            <p><FormattedMessage id="membersAttended"/>: {data.membersAttended}</p>
                            <p><FormattedMessage id={msg}/></p>
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
                    <ClassScheduleEach data={eachScheduleItem} />
                );
    });
    return (
                <ul className="scheduleList">
                    {scheduleItems}
                </ul>
            );
  }
}

class DateOnCalendarWithTime extends Component {
  static propTypes = {
    date: PropTypes.string
  };

  render = function render() {
    const {date} = this.props;
    if (date !== undefined) {
      return (
        <span>
          <span className="calenderDate">
            <FormattedDate value={date} day="2-digit" /><br/>
            <FormattedDate value={date} month="short" />
          </span>
          <FormattedDate value={date} year="numeric"/>&#160;
          <FormattedTime value={date} hour="2-digit" minute="2-digit" />
        </span>
      );
    }
  }
}
class TutorProfilePic extends Component {
  static propTypes = {
    tutor: PropTypes.object
  };

  render = function render() {
    const {tutor} = this.props;
    if (tutor !== undefined) {
      let genderCity = '';
      if (tutor.gender) {
        genderCity = tutor.gender;
        if (tutor.city) {
          genderCity += ' | ' + tutor.city;
        }
        if (tutor.country) {
          genderCity += ', ' + tutor.country;
        }
      }
      return (
      <div className="col-1">
          <figure className="courseImg inline">
              {tutor.profilePic ? <img src={tutor.profilePic} alt="" /> : '' }
              <figcaption className="captionWrap">
                  {tutor.name ? tutor.name : '' }
              </figcaption>
              <p className="captionWrap"> {genderCity}</p>
          </figure>
      </div>
      );
    }
  }
}
class MetaDetail extends Component {
  static propTypes = {
    data: PropTypes.object
  };

  render = function render() {
    const data = this.props.data;
    const {tutor} = data;
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
                        {tutor ? <div data-tab="aboutHost" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{tutor.name}</h2>
                                <figure className="host">
                                    <img src={tutor.profilePic} alt="" />
                                    <figcaption>{tutor.name}</figcaption>
                                </figure>
                                <p dangerouslySetInnerHTML={{__html: data.tutor.presenterInfo}} />
                            </div>
                        </div> : ''}
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
    const tutor = data.tutor;
    const {status, date} = data.classStart ? data.classStart : {};
    const msg = getStatusMessage(this, status);
    const classStats = data.classStats || {};

    return (
            <div>
                <Breadcrum data={data.classTitle} />
                <section id="webinarsDetails" className="moduleBody">
                    <div className="moduleWrapper">
                        <ul className="courseList details">
                            <li className="item clearfix">
                                <TutorProfilePic tutor={tutor}/>
                                <div className="col-2 content">
                                    <h2>{data.classTitle}</h2>
                                    <DateOnCalendarWithTime date={date} />
                                    <div className="relatedOpt">
                                        <ul className="placed">
                                            <li>
                                                <DateOnCalendarWithTime date={date}/>
                                                <span className="date">{classStats.status}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="classFixtures hide">
                                        <p>{data.classFixtures.status}</p>
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}><FormattedMessage id="viewRecording"/></a>
                                        </div>&#160;&#160;
                                        <div className="cta filledOrng2 inline">
                                            <a href={data.classFixtures.linkViewRecording}><FormattedMessage id="downloadRecording"/></a>
                                        </div>
                                    </div>
                                    <div className="innerTabsWrap">
                                        <ul className="tabs clearfix">
                                            <li data-tab="schedule" className="active"><a href="#"><FormattedMessage id="classSchedule"/></a></li>
                                            <li data-tab="sessions"><a href="#"><FormattedMessage id="sessionsJoinedByYou"/></a></li>
                                        </ul>
                                        <div className="tabsContentWrap">
                                            <div data-tab="schedule" className="contentOfTab">
                                                <ClassSchedule data={data.classSessions} />
                                            </div>
                                            <div data-tab="sessions" className="contentOfTab">
                                                <p><FormattedMessage id="recurringClassSeriesNotJoined"/>. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <ul className="ctaGroup">
                                        <li className="cta noRadius">
                                            <ul className="type">
                                                <li>
                                                    <span className="no">{classStats.durationInMins}</span> <FormattedMessage id="minutes"/>
                                                </li>
                                                <li>
                                                    <span className="no">{classStats.attendesCount}</span> <FormattedMessage id="attendees"/>
                                                </li>
                                            </ul>
                                            <span className="msg"><FormattedMessage id={msg}/></span>
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
