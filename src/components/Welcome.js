import React, { Component } from "react";
import { Carousel, Grid, Row, Col } from "react-bootstrap";
import "./Welcome.css";

class Welcome extends Component {
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
      windowWidth: 1000,
      text: "",
      boardItem: {}
    };
  }
  handleChange = e => {
    this.setState({ text: e.target.value });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.text) {
      const { username } = this.props;
      const { text } = this.state;
      const newIssue = { username, text, date: new Date().getTime() };
      this.setState(prevState => {
        const id = newIssue.date;
        const newState = {
          ...prevState,
          boardItem: {
            ...prevState.boardItem,
            [id]: newIssue
          },
          text: ""
        };
        return { ...newState };
      });
    }
  };
  render() {
    const {
      cumulativeDay,
      cumulativeWeek,
      currentAccess,
      boardItem,
      text
    } = this.state;
    console.log(this.state.boardItem);
    return (
      <div>
        <Grid>
          <Row className="show-grid">
            <Col md={12}>
              <Carousel interval={500000}>
                <Carousel.Item className="a">
                  <img
                    width={320}
                    height={120}
                    alt="320x320"
                    src="/assets/image.png"
                  />
                  <h3>반갑다옹 {this.props.username} 집사</h3>
                </Carousel.Item>
                <Carousel.Item className="summaryItem">
                  <h3>통계 요약</h3>
                  <div className="homeSummary">
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
                </Carousel.Item>
                <Carousel.Item className="noticeItem">
                  <h3>이슈보드</h3>
                  <div className="noticeBoard">
                    <ul className="board-list">
                      {Object.keys(boardItem).map(key => (
                        <li key={boardItem[key].date} className="board-item">
                          {boardItem[key].username} : {boardItem[key].text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <form className="boardInput">
                    <input
                      type="text"
                      className="notice-input"
                      value={text}
                      maxLength="50"
                      onChange={this.handleChange}
                    />
                    <button
                      type="submit"
                      onClick={this.handleSubmit}
                      className="notice-submit"
                    >
                      submit
                    </button>
                  </form>
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Welcome;
