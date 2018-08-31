import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'
import './UserTable.css'

class UserRow extends Component {
    render() {
        return(
            <tr>
                <td>{this.props.userId}</td>
                <td>닉네임</td>
                <td>{this.props.catImage}</td>
                <td>{this.props._enterCount}</td>
                <td>{this.props._hittenCount}</td>
                <td>{this.props._muteCount}</td>
                <td>
                    <Button bsStyle="primary" bsSize="xsmall" className="usertable-edit">수정</Button>
                    <Button bsStyle="danger" bsSize="xsmall">제거</Button>
                </td>
            </tr>
        )
    }
}

class UserTable extends Component {
    render() {
        return (
            <Table responsive hover={true} striped={true}>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>닉네임</th>
                    <th>고양이 번호</th>
                    <th>채팅 횟수</th>
                    <th>맞은 횟수</th>
                    <th>뮤트된 횟수</th>
                    <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.users.map((user) => {
                        return(
                            <UserRow
                                key={user._id}
                                userId={user.userId}
                                catImage={user.catImage}
                                _enterCount={user._enterCount}
                                _hittenCount={user._hittenCount}
                                _muteCount={user._muteCount}
                            />
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}


export default UserTable;