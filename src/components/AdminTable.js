import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'

class AdminTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.username}</td>
                <td>{this.props.userId}</td>
                <td>{this.props.isMaster ? "마스터" : "어드민"}</td>
                <td>
                    <Button bsStyle="danger" bsSize="xs" onClick={() => {this.props.onDelete(this.props.id)}}>삭제</Button>
                </td>
            </tr>
        )
    }
}
class AdminTable extends Component {
    render() {
        return (
            <Table responsive hover={true} striped={true}>
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>직분</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.admins.map((admin) => {
                        return(
                            <AdminTableRow
                                key={admin._id}
                                id={admin._id}
                                username={admin.username}
                                userId={admin.userId}
                                isMaster={admin.isMaster}
                                onDelete={this.props.onDelete}
                            />
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}

export default AdminTable;