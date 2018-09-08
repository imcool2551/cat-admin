import React, { Component } from 'react';
import { Table, Button } from 'react-bootstrap'

class CatNounTableRow extends Component {
    render() {
        return (
            <tr>
                <td>{this.props.noun}</td>
                <td>
                    <Button bsStyle="danger" bsSize="xs" onClick={() => {this.props.onDelete(this.props.id)}}>삭제</Button>
                </td>
            </tr>
        )
    }
}
class CatNounTable extends Component {
    render() {
        return (
            <Table responsive hover={true} striped={true}>
                <thead>
                    <tr>
                        <th>종류</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.nouns.map((noun) => {
                        return(
                            <CatNounTableRow
                                key={noun._id}
                                id={noun._id}
                                noun={noun.noun}
                                onDelete={this.props.onDelete}
                            />
                        )
                    })}
                </tbody>
            </Table>
        );
    }
}

export default CatNounTable;