import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import UserTable from './UserTable'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import './User.css'

class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAuthorized: true,
            users: [],
            pageCount: 2
        }
    }
    handlePageClick = (data) => {
        console.log(data.selected + 1)
        axios({
            method: 'GET',
            url: `http://localhost:8080/api/users/${data.selected+1}`,
            headers: {Authorization: 'Bearer ' + localStorage.token}
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                users: response.data.users
            })
        })
        .catch((err) => {
            console.log(err)
        })
    };
    componentDidMount() {
        let self = this
        if (localStorage.token) {
            (function() {
                axios({
                    method: 'GET',
                    url: 'http://localhost:8080/api/users/1',
                    headers: {Authorization: 'Bearer ' + localStorage.token}
                })
                .then((response) => {
                    console.log(response.data)
                    if (response.data.message === 'Unauthorized') {
                        self.setState({
                            isAuthorized: false,
                        })
                    } else {
                        self.setState({
                            pageCount: Math.ceil(response.data.totalNums / 10),
                            users: response.data.users
                        })
                    }
                })
                .catch((err) => {
                    console.log('axios error', err)
                })
            })()
        } else {
            self.setState({
                isAuthorized: false
            })
        }
    }
    render() {
        let { isAuthorized, pageCount, users } = this.state
        return (
            <div>
                { isAuthorized ? (
                <div>
                    <Grid>
                    <Row className="show-grid">
                            <Col xs={12} className="user-title">
                                <h1>고양이들을 잘 부탁한다옹!</h1>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={12}>
                                <UserTable users={users} />
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={12} className="user-pagination">
                                <ReactPaginate  
                                    previousLabel={"<"}
                                    nextLabel={">"}
                                    breakLabel={<a href="">...</a>}
                                    breakClassName={"break-me"}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={1}
                                    pageRangeDisplayed={1}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
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

export default User;