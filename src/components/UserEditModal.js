import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'

class UserEditModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nickname: ''
        }
    }
    
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        let {nickname} = this.state
        return (
            <div className="static-modal">
                <Modal show={this.props.show} onHide={() => this.props.onHide('edit')}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.props.userId} 번 고양이의 닉네임을 바꾸시겠습니까?</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <h5>{this.props.nickname}</h5>
                        <input type="text" name="nickname" onChange={this.handleChange} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.props.onHide('edit')}>취소</Button>
                        <Button bsStyle="primary" onClick={() => this.props.onEdit(nickname)}>수정</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UserEditModal;