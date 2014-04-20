/** @jsx React.DOM */
var HelloMessage = React.createClass({
  click: function(){
    console.log('clicked');
  },
  render: function(){
    return <div onClick={this.click}>Hello {this.props.name} </div>;
  }
});

React.renderComponent(<HelloMessage name="Revath" />, document.querySelector('.jumbotron'));

