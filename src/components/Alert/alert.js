import React from 'react';

class Alert extends React.Component {
    render() {
        return (
            <div className="alert alert-danger"  role="alert">
              {this.props.value}
            </div>
        );
    }
}

export default Alert;