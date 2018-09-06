import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap'

class UserDeleteModal extends Component {
    render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.show} onHide={() => this.props.onHide('delete')}>
                    <Modal.Header closeButton>
                        <Modal.Title>고양이 내쫒기</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>{this.props.userId}번 고양이를 내쫒겠습니까?</Modal.Body>

                    <Modal.Footer>
                        <Button onClick={() => this.props.onHide('delete')}>취소</Button>
                        <Button bsStyle="danger" onClick={this.props.onDelete}>삭제</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default UserDeleteModal;