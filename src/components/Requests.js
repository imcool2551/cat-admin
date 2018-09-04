import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Requests.css";
import RequestTable from "./RequestTable";
import RequestModal from "./RequestModal";

class Requests extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      isAuthorized: true,
      showmodal: false,
      requests: [],
      pageCount: 2,
      resemail: "",
      resid: "",
      nickname: "",
      userId: 0
    };
  }

  handleEmail = (email, id, nickname, userId) => {
    this.setState({
      resemail: email,
      resid: id,
      nickname: nickname,
      userId: userId
    });
  };

  handleShow() {
    this.setState({ showmodal: true });
  }

  handleClose() {
    this.setState({
      showmodal: false
    });
  }

  componentDidMount() {
    this._getMessages();
    let self = this;
    if (localStorage.token) {
      (function() {
        axios({
          method: "GET",
          url: "http://localhost:8080/api/users/1",
          headers: { Authorization: "Bearer " + localStorage.token }
        })
          .then(response => {
            if (response.data.message === "Unauthorized") {
              self.setState({
                isAuthorized: false
              });
            } else {
              self.setState({
                pageCount: Math.ceil(response.data.totalNums / 10),
                requests: response.data.requests
              });
            }
          })
          .catch(err => {
            console.log("axios error", err);
          });
      })();
    } else {
      self.setState({
        isAuthorized: false
      });
    }
  }
  render() {
    let { isAuthorized } = this.state;
    return (
      <div>
        {isAuthorized ? (
          <div>
            {this.state.showmodal ? (
              <RequestModal
                showmodal={true}
                handleClose={this.handleClose}
                resEmail={this.state.resemail}
                resId={this.state.resid}
                nickname={this.state.nickname}
                userId={this.state.userId}
                getMessages={this._getMessages}
              />
            ) : null}
            <Grid>
              <Row className="show-grid">
                <Col xs={12} className="user-title">
                  <h1>고양이들이 할 말이 있다옹!</h1>
                </Col>
              </Row>
              <Row className="show-grid">
                <Col xs={12}>
                  <RequestTable
                    requests={this.state.requests}
                    handleShow={this.handleShow}
                    handleEmail={this.handleEmail}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        ) : (
          <Redirect to="/unauthorized" />
        )}
      </div>
    );
  }

  _getMessages = () => {
    axios.get("https://catadmin.gq/admin/messages").then(response => {
      this.setState({
        requests: response.data
      });
    });
  };
}

export default Requests;
