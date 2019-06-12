import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
                <div className="bg">
                    <div className="modal">
                        <button className="btn light" onClick={this.props.closePopup}>Close</button>
                        <form>
                            <div className="form-group">
                                <label>Name</label>
                                <input autoFocus onChange={this.props.handleName} placeholder="Enter name" value={
                                    this.props.name ? this.props.name : ''
                                }></input>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input onChange={this.props.handleEmail} placeholder="Enter email" value={
                                    this.props.email ? this.props.email : ''
                                }></input>
                            </div>
                            <div className="form-group">
                                <button onClick={this.props.btnText == "Add Client" ? this.props.addClient : this.props.editClient} 
                                        className={this.props.btnText == "Add Client" ? 'btn primary': 'btn second'}>
                                    {this.props.btnText == "Add Client" ? 'Add Client': 'Edit Client'}
                                </button>
                            </div>
                            
                        </form>
                    </div>
                </div>
        );
    }
}

export default Modal;
