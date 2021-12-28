import React from 'react';

class ButtonTag extends React.Component {
    render() {
        return (
            <input className="btn btn-primary" type={this.props.type} value={this.props.value}></input>
        );
    }
}

export default ButtonTag;
