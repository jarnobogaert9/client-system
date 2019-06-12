import React, { Component } from 'react';

class Modal extends Component {
    render() {
        return (
                <div className="bg">
                    <div className="modal">
                        <button className="btn" onClick={this.props.closePopup}>Close</button>
                        <form>
                            <div className="form-group">
                                <input autoFocus onChange={this.props.handleName} placeholder="Enter name"></input>
                            </div>
                            <div className="form-group">
                                <input onChange={this.props.handleEmail} placeholder="Enter email"></input>
                            </div>
                            <div className="form-group">
                            {/* <button onClick={this.props.addClient} className="btn primary"> */}

                                <button onClick={this.props.btnText == "Add Client" ? this.props.addClient : this.props.editClient} className="btn primary">
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
