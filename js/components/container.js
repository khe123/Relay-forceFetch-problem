import React from 'react';
import Relay from 'react-relay';

class ChatList extends React.Component {
  static propTypes = {
    viewer: React.PropTypes.object.isRequired,
  }

  fetch() {
    this.props.relay.forceFetch();
  }

  render() {
    return (
      <div>
        <button onClick={this.fetch.bind(this)}>Click</button>
      </div>
    );
  }
}

export default Relay.createContainer(ChatList, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User{
        id,
      }
    `,
  }
});
