import React, { Component } from "react";
import { Table, Button } from "react-bootstrap";
import "./UserTable.css";

class IssueBoardRow extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.username}</td>
        <td>{this.props.text}</td>
        <td>
          <Button
            bsStyle="danger"
            bsSize="xsmall"
            className="issueBoard-remove"
            onClick={() => this.props.deleteIssueData(this.props.id)}
          >
            삭제
          </Button>
        </td>
      </tr>
    );
  }
}

class IssueBoardTable extends Component {
  render() {
    const { boardItems, deleteIssueData } = this.props;
    return (
      <Table responsive hover={true} striped={true}>
        <thead>
          <tr>
            <th>관리자</th>
            <th>이슈</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {boardItems.map(item => (
            <IssueBoardRow
              key={item._id}
              id={item._id}
              username={item.username}
              text={item.text}
              deleteIssueData={deleteIssueData}
            />
          ))}
        </tbody>
      </Table>
    );
  }
}

export default IssueBoardTable;
