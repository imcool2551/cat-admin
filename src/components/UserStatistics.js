import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Grid, Row, Col } from "react-bootstrap";
import {
  BarChart,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import axios from "axios";
import "./UserStatistics.css";

class UserStatistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRegist: 0,
      cumulativeDay: 0,
      cumulativeWeek: 0,
      isAuthorized: true,
      windowWidth: 1000,
      cumulativeAccessData: [
        { name: "Mon", day: 0 },
        { name: "Tue", day: 0 },
        { name: "Wed", day: 0 },
        { name: "Thu", day: 0 },
        { name: "Fri", day: 0 },
        { name: "Sat", day: 0 },
        { name: "Sun", day: 0 }
      ],
      resigerData: [
        { name: "Mon", sum: 0, day: 0 },
        { name: "Tue", sum: 0, day: 0 },
        { name: "Wed", sum: 0, day: 0 },
        { name: "Thu", sum: 0, day: 0 },
        { name: "Fri", sum: 0, day: 0 },
        { name: "Sat", sum: 0, day: 0 },
        { name: "Sun", sum: 0, day: 0 }
      ]
    };
  }

  _checkLogin = async () => {
    try {
      if (localStorage.token) {
        const response = await axios({
          method: "GET",
          url: "http://localhost:8080/api/users/1",
          headers: { Authorization: "Bearer " + localStorage.token }
        });
        if (response.data.message === "Unauthorized") {
          this.setState({
            isAuthorized: false
          });
        }
      } else {
        this.setState({
          isAuthorized: false
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  _sizeDetector = () => {
    this.setState({
      windowWidth: window.innerWidth - 200
    });
  };
  _getAccessData = () => {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const today = week[new Date().getDay()];
    axios.get("https://catadmin.gq/admin/connectStats").then(response => {
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
        cumulativeWeek,
        cumulativeAccessData: data
      });
    });
  };
  _getRegistData = () => {
    axios.get("https://catadmin.gq/admin/registerStats").then(response => {
      const data = response.data;
      this.setState({
        currentRegist: data[data.length - 1].sum,
        resigerData: data
      });
    });
  };

  async componentDidMount() {
    await this._checkLogin();
    await this._getAccessData();
    await this._getRegistData();
    await window.addEventListener("resize", this._sizeDetector);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._sizeDetector);
  }
  render() {
    const {
      currentRegist,
      cumulativeDay,
      cumulativeWeek,
      isAuthorized,
      windowWidth,
      resigerData,
      cumulativeAccessData
    } = this.state;
    return (
      <div>
        {isAuthorized ? (
          <div>
            <Grid>
              <Row className="show-grid">
                <Col xs={12} className="user-title">
                  <h1>접속 및 고양이 등록 통계</h1>
                </Col>
              </Row>
              <Row>
                <Col xs={2} />
                <Col xs={8}>
                  <div className="summary">
                    <div className="currentAccess">누적 가입자 : {currentRegist}</div>
                    <div className="cumulativeDay">금일 누적 접속 : {cumulativeDay}</div>
                    <div className="cumulativeWeek">금주 누적 접속 : {cumulativeWeek}</div>
                  </div>
                </Col>
                <Col xs={2} />
              </Row>
              <Row>
                <Col xs={12}>
                  <div className="charts">
                    <div className="cumulativeAccessChart">
                      <div className="title">누적 회원 통계</div>
                      <ComposedChart
                        width={windowWidth}
                        height={400}
                        data={resigerData}
                        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                      >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="day" barSize={20} fill="#413ea0" />
                        <Line type="monotone" dataKey="sum" stroke="#ff7300" />
                      </ComposedChart>
                    </div>
                    <div className="registerChart">
                      <div className="title">접속 통계</div>
                      <BarChart
                        width={windowWidth}
                        height={400}
                        data={cumulativeAccessData}
                        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="day" fill="#8884d8" />
                        {/* <Bar dataKey="sum" fill="#82ca9d" /> */}
                      </BarChart>
                    </div>
                  </div>
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
}

export default UserStatistics;

/* <div className="container">
<div className="summary">
<div className="currentAccess">현재 접속자 : {currentAccess}</div>
<div className="cumulativeDay">금일 누적 접속 : {cumulativeDay}</div>
<div className="cumulativeWeek">금주 누적 접속 : {cumulativeWeek}</div>
</div>
<div className="charts">
<div className="cumulativeAccessChart">
<div className="title">누적 회원 통계</div>
<ComposedChart
width={1000}
height={400}
data={resigerData}
margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
>
<CartesianGrid stroke="#f5f5f5" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Legend />
<Bar dataKey="day" barSize={20} fill="#413ea0" />
<Line type="monotone" dataKey="sum" stroke="#ff7300" />
</ComposedChart>
</div>
<div className="registerChart">
<div className="title">접속 통계</div>
<BarChart
width={1000}
height={400}
data={cumulativeAccessData}
margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis dataKey="name" />
<YAxis />
<Tooltip />
<Legend />
<Bar dataKey="day" fill="#8884d8" />
<Bar dataKey="sum" fill="#82ca9d" />
</BarChart>
</div>
</div>
</div> */
