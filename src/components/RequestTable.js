import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import "./RequestTable.css";

class RequestRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.request.userId}</td>
        <td>{this.props.request.userNick}</td>
        <td>{this.props.request.email}</td>
        <td>
          {this.props.request.category === "report" ? "신고하기" : "기타 요청"}
        </td>
        <td>{this.props.request.content}</td>
        <td>
          {this.props.request.isReplied ? (
            <Button
              bsStyle="success"
              bsSize="sm"
              className="Requesttable-edit"
              onClick={() => {
                this.props.handleShow();
                this.props.handleEmail(
                  this.props.request.email,
                  this.props.request._id,
                  this.props.request.userNick,
                  this.props.request.userId
                );
              }}
            >
              답 장 완 료
            </Button>
          ) : (
            <Button
              bsStyle="primary"
              bsSize="sm"
              className="Requesttable-edit"
              onClick={() => {
                this.props.handleShow();
                this.props.handleEmail(
                  this.props.request.email,
                  this.props.request._id,
                  this.props.request.userId,
                  this.props.request.userNick
                );
              }}
            >
              답 장 하 기
            </Button>
          )}

          <Button bsStyle="danger" bsSize="sm">
            삭 제
          </Button>
        </td>
      </tr>
    );
  }
}

class RequestTable extends Component {
  state = {
    requests: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps.requests, "this is something");
    if (nextProps.requests) {
      return { requests: nextProps.requests };
    }
    return null;
  }
  render() {
    return (
      <Table responsive hover={true} striped={true}>
        <thead>
          <tr>
            <th width="50">ID</th>
            <th width="200">닉 네 임</th>
            <th width="200">이 메 일</th>
            <th width="200">비 고</th>
            <th width="800">요 청 사 항</th>
            <th width="200">관리</th>
          </tr>
        </thead>
        <tbody>
          {this.state.requests.map((request, index) => {
            return (
              <RequestRow
                key={index}
                request={request}
                handleShow={this.props.handleShow}
                handleEmail={this.props.handleEmail}
              />
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default RequestTable;
