import React from 'react'
import ReactDOM from 'react-dom'
import ReconnectingWebsocket from './ReconnectingWebsocket'

class Websocket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          ws: new ReconnectingWebsocket(this.props.url, this.props.protocol)
        };
    }

    setupWebsocket() {
        let websocket = this.state.ws;

        websocket.onopen = () => {
			this.props.onOpen()
        }

        websocket.onmessage = (evt) => {
          this.props.onMessage(evt.data)
        }

        websocket.onclose = () => {
          this.props.onClose()
        }
    }

    componentDidMount() {
      this.setupWebsocket();
    }

    componentWillUnmount() {
      this.shouldReconnect = false;
      let websocket = this.state.ws;
      websocket.close();
    }

    render() {
      return (
        <div></div>
      );
    }
}

Websocket.defaultProps = {
    debug: false,
    reconnect: true
};

Websocket.propTypes = {
    url: React.PropTypes.string.isRequired,
    onMessage: React.PropTypes.func.isRequired,
	onOpen: React.PropTypes.func,
	onClose: React.PropTypes.func,
    debug: React.PropTypes.bool,
    reconnect: React.PropTypes.bool,
    protocol: React.PropTypes.string
};

export default Websocket;
