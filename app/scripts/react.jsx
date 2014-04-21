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


var UpdateText = React.createClass({
  getInitialState: function(){
    return {name: ''}
  },
  change: function(e){
    this.setState({name: e.target.value})
  },
  render: function(){
    return (
      <div>
        <input type="text" name="name" onChange={this.change} />
        <h1> Hello {this.state.name}!!!</h1>
      </div>
    )
  }
});

React.renderComponent(<UpdateText/>, document.querySelector('.change-text'));

