import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'

class CatAdjTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.adj}</td>
                <td>
                    <Button bsStyle="danger" bsSize="xs" onClick={() => {this.props.onDelete(this.props.id)}}>삭제</Button>
                </td>
            </tr>
        )
    }
}
class CatAdjTable extends Component {
    render() {
        return (
            <Table responsive hover={true} striped={true}>
                <thead>
                    <tr>
                        <th>종류</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.adjs.map((adj) => {
                        return(
                            <CatAdjTableRow
                                key={adj._id}
                                id={adj._id}
                                adj={adj.adj}
                                onDelete={this.props.onDelete}
                            />
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}

export default CatAdjTable;