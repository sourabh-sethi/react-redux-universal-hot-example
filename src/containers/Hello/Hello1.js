import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class Hello1 extends Component {

  render() {
    return (
    	<div className="container">
    		<h1>Hello, World!</h1>
    		<Helmet title="Hello!" />
    		Have a wonderful day!
    	</div>
    );
  }
}
