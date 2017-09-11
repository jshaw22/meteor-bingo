import React, { Component, PropTypes } from 'react';

class Conversation extends Component {
  constructor(props){
    super(props);
  }

  renderConversations () {
    const {individualConversations} = this.props;
    let individualConvos = individualConversations.map((message) => {
      return (
        <div 
          key={message._id}
          className=
            {
              'message ' + 
                (this.props.userId == message.fromuser ? 'outgoing' : 'incoming')
            }
        >
            {`${message.fromUsername}: ${message.message}`}
        </div>
      )
    });
    return individualConvos;
  }

  render() {
    return (
      <div className="conversation">{this.renderConversations()}</div>
    )
  }
}

export default Conversation;