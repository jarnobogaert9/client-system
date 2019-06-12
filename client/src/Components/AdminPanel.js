import React, { Component } from 'react';

class AdminPanel extends Component {
    render() {
        return (
          <div>
            <div className="admin-bg">
              <div className="admin-modal">
              <h2>Log in to manage your clients.</h2>
                <div className="form-group">
                  <label>Username</label>
                  <input onChange={this.props.handleUsername} placeholder="Enter username"></input>
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input type="password" onChange={this.props.handlePwd} placeholder="Enter password"></input>
                </div>
                <button onClick={this.props.login} className="btn login">Log In</button>
              </div>
            </div>
          </div>
        );
    }
}

export default AdminPanel;
