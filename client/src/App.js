import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.callBackendAPI();
  }

  callBackendAPI = () => {
   fetch('http://localhost:4000/users')
   .then(res => res.json())
   .then(users => this.setState({
     users: users
    }));
  }
  render() {
    return (
      <div>
        {this.state.users.map((user,i) => {
          return (
            <p>{user.name}</p>
          )
        })}
      </div>
    );
  }
}

export default App;
