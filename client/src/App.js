import React, { Component } from 'react';
import './App.css';
import Modal from './Components/Modal';
import AdminPanel from './Components/AdminPanel';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      showPopup: false,
      name: '',
      email: '',
      btnText: '',
      editId: '',
      authenticated: false
    }
  }

  componentDidMount() {
    this.getAllClients();
  }

  togglePopup = () => {
    this.setState({
      showPopup: !this.state.showPopup,
    });

    if (!this.state.name == '') {
      this.setState({
        name: ''
      })
    }
    if (!this.state.email == '') {
      this.setState({
        email: ''
      })
    }
  }

  showModal = (e) => {
    // Set btn text to add
    if (e.target.id == "add") {
      this.setState({
        btnText: 'Add Client'
      })
    } else {
      this.setState({
        btnText: 'Edit Client',
        editId: e.target.id
      })
      this.loadData(e.target.id);
    }
    this.togglePopup();
  }

  loadData = (id) => {
    for (const client of this.state.clients) {
      if (client._id == id) {
        console.log('vul in');
        this.setState({
          name: client.name,
          email: client.email
        })
      }
    }
  }

  handleEmail = (e) => {
    console.log(e.target.value);
    this.setState({
      email: e.target.value
    })
  }

  handleName = (e) => {
    console.log(e.target.value);
    this.setState({
      name: e.target.value
    })
  }

  handleUsername = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  handlePwd = (e) => {
    this.setState({
      pwd: e.target.value
    })
  }

  login = () => {
    if (this.state.username === 'admin' && this.state.pwd === 'admin') {
      console.log('Okay');
      this.setState({
        authenticated: true
      })
    } else {
      console.log('Not okay');
      alert('The credentials were wrong! Try again.');
    }
  }

  logout = () => {
    this.setState({
      authenticated: false,
      username: '',
      pwd: ''
    })
  }

  addClient = (e) => {
    e.preventDefault();
    let client = {
      name: this.state.name,
      email: this.state.email
    }
    // Add client with api
    axios.post(`http://localhost:4000/add`, client).then(res => {
      console.log(res);
      this.getAllClients();
      this.togglePopup();
    }).catch(err => {
      console.log(err);
    })
  }


  getAllClients = () => {
    fetch('http://localhost:4000/clients')
      .then(res => res.json())
      .then(clients => this.setState({
        clients: clients
      }));
  }

  editClient = (e) => {
    e.preventDefault();
    let id = this.state.editId;
    console.log(id);
    let client = {
      name: this.state.name,
      email: this.state.email
    }

    axios.post(`http://localhost:4000/update/${id}`, client).then(res => {
      console.log(res);
      this.getAllClients();
      this.togglePopup();
    }).catch(err => {
      console.log(err);
    })
  }

  removeClient = (e) => {
    let id = e.target.id;
    if (window.confirm('Are you sure you want to remove this client?')) {
      // Remove client
      axios.get(`http://localhost:4000/delete/${id}`).then(res => {
        console.log(res);
        this.getAllClients();
      }).catch(err => {
        console.log(err);
      })
    }
  }
  render() {
    return (
      <div>
         { this.state.authenticated ? 
           <div className="container">
            <br/>
            <br/> 
            <button className="btn primary" onClick={this.showModal} id="add">New Client</button>
            <button className="btn logout" onClick={this.logout}>Log Out</button>
            <br/>
            <br/>
              <table>
                <thead>
                  <tr>
                    <td>#</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {this.state.clients.map((clients, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{clients.name}</td>
                        <td>{clients.email}</td>
                        <td>
                          <button className="btn second mr-1" onClick={this.showModal} id={clients._id}>Edit</button>
                          <button className="btn danger" onClick={this.removeClient} id={clients._id}>Remove</button>
                        </td>
                      </tr>
                    )
                  })}
                  {this.state.showPopup ?
                    <Modal
                      closePopup={this.togglePopup}
                      handleEmail={this.handleEmail}
                      handleName={this.handleName}
                      addClient={this.addClient}
                      editClient={this.editClient}
                      btnText={this.state.btnText}
                      name={this.state.name}
                      email={this.state.email}
                    />
                    : null
                  }
                </tbody>
              </table>
           </div>
          
          : 
            <AdminPanel
            handleUsername={this.handleUsername}
            handlePwd={this.handlePwd}
            login={this.login}
            />
          }
       
      </div>
    );
  }
}

export default App;
