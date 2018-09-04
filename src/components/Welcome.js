import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import IssueBoard from "./issueBoard";
import "./Welcome.css";
import axios from "axios";

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentRegist: 0,
      cumulativeDay: 0,
      cumulativeWeek: 0,
      isAuthorized: true,
      windowWidth: 1000,
      text: "",
      boardItems: []
    };
  }
  _handleChange = e => {
    this.setState({ text: e.target.value });
  };
  _handleSubmit = async e => {
    e.preventDefault();
    try {
      if (this.state.text) {
        const { username } = this.props;
        const { text } = this.state;
        await axios
          .post("https://catadmin.gq/admin/issue", {
            username,
            text
          })
          .then(response => {
            this.setState(prevState => {
              const newState = {
                ...prevState,
                boardItems: response.data,
                text: ""
              };
              return { ...newState };
            });
          });
      }
    } catch (err) {
      console.log(err);
    }
  };
  _getUserData = async () => {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = week[new Date().getDay()];
    try {
      await axios.get("https://catadmin.gq/admin/connectStats").then(response => {
        const data = response.data;
        let cumulativeWeek = 0;
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === today) {
            this.setState({
              cumulativeDay: data[i].day
            });
          }
          cumulativeWeek = cumulativeWeek + data[i].day;
        }
        this.setState({
          cumulativeWeek
        });
      });
      await axios.get("https://catadmin.gq/admin/registerStats").then(response => {
        const data = response.data;
        this.setState({
          currentRegist: data[data.length - 1].sum,
          resigerData: data
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
  _getIssueData = () => {
    axios.get("https://catadmin.gq/admin/issue").then(response => {
      this.setState(prevState => {
        const newState = {
          ...prevState,
          boardItems: response.data,
          text: ""
        };
        return { ...newState };
      });
    });
  };

  _deleteIssueData = id => {
    axios.delete(`https://catadmin.gq/admin/issue/${id}`).then(response => {
      this.setState(prevState => {
        const newState = {
          ...prevState,
          boardItems: response.data,
          text: ""
        };
        return { ...newState };
      });
    });
  };

  async componentDidMount() {
    await this._getUserData();
    await this._getIssueData();
  }

  render() {
    const { cumulativeDay, cumulativeWeek, currentRegist, boardItems, text } = this.state;
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12}>
              <div className="homeSummary">
                <div className="currentAccess">누적 가입자 : {currentRegist}</div>
                <div className="cumulativeDay">금일 누적 접속 : {cumulativeDay}</div>
                <div className="cumulativeWeek">금주 누적 접속 : {cumulativeWeek}</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>
              <h3>IssueBoard</h3>
              <div className="noticeBoard">
                <IssueBoard boardItems={boardItems} deleteIssueData={this._deleteIssueData} />
              </div>
              <div className="submit-container">
                <form className="boardInput">
                  <input
                    type="text"
                    className="notice-input"
                    value={text}
                    maxLength="50"
                    onChange={this._handleChange}
                  />
                  <button type="submit" onClick={this._handleSubmit} className="notice-submit">
                    submit
                  </button>
                </form>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Welcome;
