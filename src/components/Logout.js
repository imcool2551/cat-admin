import React, { Component } from 'react';

class Logout extends Component {

    componentDidMount() {
        localStorage.removeItem('token')
        this.props.history.push('/')
    }
    render() {
        return (
            <div>
                Logout
            </div>
        );
    }
}

export default Logout;