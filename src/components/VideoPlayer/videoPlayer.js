import React from 'react';

class VideoPlayer extends React.Component {
    render() {
        return (
            <iframe id="player" allowfullscreen="allowfullscreen" type="text/html" width="100%" height="100%" src={this.props.value} frameborder="0" />
        );
    }
}

export default VideoPlayer;
