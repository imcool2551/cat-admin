import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
// import Textarea from "react-textarea-autosize";
import "./RequestTable.css";
import axios from "axios";

export default class RequestModal extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: this.props.showmodal,
      email: "",
      response: "",
      title: "",
      resemail: "default",
      resId: "default",
      nickname: "",
      userId: 0
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleResponseChange = this.handleResponseChange.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.resEmail) {
      return {
        resemail: nextProps.resEmail,
        resId: nextProps.resId,
        nickname: nextProps.nickname,
        userId: nextProps.userId
      };
    }
    return null;
  }

  handleEmailChange(event) {
    this.setState({ email: event.target.value });
  }

  handleResponseChange(event) {
    this.setState({ response: event.target.value });
  }

  submit() {
    console.log(this.state.email);
    console.log(this.state.response);
  }

  sendEmail() {
    console.log("send email");
    axios
      .post("https://catadmin.gq/admin/mail", {
        email: this.state.resemail,
        content: this.state.response,
        title:
          "안녕하세요 " +
          this.state.nickname +
          "님 슈뢰딩거의 고양이 운영진 입니다.",
        messageId: this.state.resId
      })
      .then(response => {
        this.props.getMessages();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Modal show={this.state.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>이 메 일 보 내 기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div
              style={{
                display: "flex",
                flexDirection: "row"
              }}
            >
              <div>
                <h4>ID : {this.state.userId}</h4>
                <h4>이 메 일 주 소 : {this.state.resemail}</h4>
              </div>
              <h4>닉 네 임 : {this.state.nickname}</h4>
              {/* <input
                type="text"
                onChange={this.handleEmailChange}
                className="input-style"
              /> */}
            </div>
          </form>
          <hr />
          <h4>답 장 하 기</h4>

          <textarea
            value={this.state.response}
            onChange={this.handleResponseChange}
            className="textarea-style"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            bsStyle="info"
            onClick={() => {
              //this.submit();
              this.sendEmail();
              this.props.handleClose();
            }}
          >
            보 내 기
          </Button>
          <Button onClick={this.props.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
