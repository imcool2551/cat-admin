import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'

class CatTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.name}</td>
                <td>
                    <Button bsStyle="danger" bsSize="xs" onClick={() => {this.props.onDelete(this.props.id)}}>삭제</Button>
                </td>
            </tr>
        )
    }
}
class CatTable extends Component {
    render() {
        return (
            <Table responsive hover={true} striped={true}>
                <thead>
                    <tr>
                        <th>종류</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.cats.map((cat) => {
                        return(
                            <CatTableRow
                                key={cat._id}
                                id={cat._id}
                                name={cat.name}
                                onDelete={this.props.onDelete}
                            />
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}

export default CatTable;