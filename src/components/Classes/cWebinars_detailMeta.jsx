
var isNode = typeof module !== 'undefined' && module.exports
  , React = isNode ? require('react') : window.React
  , ReactDOM = isNode ? require('react-dom') : window.ReactDOM
  , ReactIntl = isNode ? require('react-intl') : window.ReactIntl;


var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;
var FormattedDate = ReactIntl.FormattedDate;

//*****************************************************************
//  YOUR CODE STARTS HERE
//*****************************************************************


var Section = React.createClass({
    mixins: [IntlMixin],

    render: function () {
        var data = this.props.data;

        return (
             <section id="webinarsTabs">
                    <div className="tabsHeadWrapper moduleBody">
                        <ul className="tabsHead moduleWrapper clearfix">
                            <li className="overview" data-tab="aboutClass"><a href="#">{this.getIntlMessage('aboutTheClass')}</a></li>
                            <li className="host" data-tab="aboutHost"><a href="#">{this.getIntlMessage('aboutTheHost')}</a></li>
                            <li className="discussion" data-tab="discussion"><a href="#">{this.getIntlMessage('discussion')}</a></li>
                        </ul>
                    </div>
                    <div className="tabsContent moduleBody">
                        <div data-tab="aboutClass" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{data.aboutClass.title}</h2>
                                <p className="hostedLang">{data.aboutClass.hostedLang}</p>
                                <p>{data.aboutClass.description}</p>
                            </div>
                        </div>
                        <div data-tab="aboutHost" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{data.aboutHost.title}</h2>
                                <figure className="host">
                                    <img src={data.aboutHost.profilePic} alt="" />
                                    <figcaption>{data.aboutHost.name}</figcaption>
                                </figure>
                            </div>
                        </div>
                        <div data-tab="discussion" className="moduleWrapper">
                            <div className="primaryDetail">
                                <h2 className="title">{this.getIntlMessage('discussionThread')} <span className="count">{data.discussion.count}</span></h2>
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
});

//*****************************************************************
//  YOUR CODE ENDS HERE
//*****************************************************************

if (isNode) {
    module.exports = Section;
} else {
    window.Section = Section;
}