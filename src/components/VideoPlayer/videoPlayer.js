import React from 'react';

class VideoPlayer extends React.Component {
    render() {
        return (
            <iframe id="player" allowfullscreen="allowfullscreen" type="text/html" width="1150" height="760" src={this.props.value} frameborder="0" />
        );
    }
}

export default VideoPlayer;
