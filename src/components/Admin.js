import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import AdminTable from './AdminTable'
import axios from 'axios';

class Admin extends Component {
    state = {
        isAuthorized: true,
        admins: []
    }
    componentDidMount() {
        if (localStorage.token) {
            axios({
                method: "GET",
                url: "https://catadmin.gq/api/checkToken",
                headers: {Authorization: "Bearer " + localStorage.token}
            })
            .then((response) => {
                console.log(response)
                if (response.data.message !== 'master authorized') {
                    this.setState({
                        isAuthorized: false
                    })
                } else {
                    axios({
                        method: "GET",
                        url: "https://catadmin.gq/admin/admin",
                        headers: {Authorization: "Bearer " + localStorage.token}
                    })
                    .then((response) => {
                        console.log(response)
                        this.setState({
                            admins: response.data
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                }              
            })
        } else {
            this.setState({
                isAuthorized: false
            })
        }
    }

    handleDelete = (id) => {
        axios({
            method: "DELETE",
            url: `https://catadmin.gq/admin/admin/${id}`,
            headers: {Authorization: 'Bearer ' + localStorage.token}
        })
        .then((response) => {
            this.setState({
                admins: response.data
            })
        })
    }
    render() {
        let { isAuthorized, admins } = this.state
        return (
            <div>
                {isAuthorized? (
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12}>
                                <AdminTable admins={admins} onDelete={this.handleDelete}/>
                            </Col>
                        </Row>
                    </Grid>
                ) : (
                    <Redirect to="/unauthorized" />
                )}
            </div>
        );
    }
}

export default Admin;