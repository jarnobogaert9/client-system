import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
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
        <h1>Hello</h1>
      </div>
    );
  }
}

export default App;
