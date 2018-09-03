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
import SocketIOClient from "socket.io-client";
import "./UserStatistics.css";

const cumulativeAccessData = [
  { name: "Mon", day: 800 },
  { name: "Tue", day: 967 },
  { name: "Wed", day: 1098 },
  { name: "Thu", day: 1200 },
  { name: "Fri", day: 1108 },
  { name: "Sat", day: 680 },
  { name: "Sun", day: 680 }
];
const resigerData = [
  { name: "Mon", sum: 4000, day: 2400 },
  { name: "Tue", sum: 3000, day: 1398 },
  { name: "Wed", sum: 2000, day: 9800 },
  { name: "Thu", sum: 2780, day: 3908 },
  { name: "Fri", sum: 1890, day: 4800 },
  { name: "Sat", sum: 2390, day: 3800 },
  { name: "Sun", sum: 3490, day: 4300 }
];

class UserStatistics extends Component {
  constructor(props) {
    super(props);
    // 접속정보 받아오는 용도
    // this._socket = SocketIOClient("http://catadmin.gq", {
    //   query: this.props.token
    // });

    this.state = {
      currentAccess: 100,
      cumulativeDay: 234,
      cumulativeWeek: 1203,
      isAuthorized: true,
      windowWidth: 1000
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

  async componentDidMount() {
    await this._checkLogin();
    await window.addEventListener("resize", this._sizeDetector);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this._sizeDetector);
  }
  render() {
    const {
      currentAccess,
      cumulativeDay,
      cumulativeWeek,
      isAuthorized,
      windowWidth
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
                    <div className="currentAccess">
                      현재 접속자 : {currentAccess}
                    </div>
                    <div className="cumulativeDay">
                      금일 누적 접속 : {cumulativeDay}
                    </div>
                    <div className="cumulativeWeek">
                      금주 누적 접속 : {cumulativeWeek}
                    </div>
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
