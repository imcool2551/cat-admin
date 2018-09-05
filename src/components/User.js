import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Grid, Row, Col, Button } from 'react-bootstrap'
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
            pageCount: 2,
            currentPage: 0,
            filter: 'default',
            search: ''
        }
    }
    handleChange= (e) => {
        console.log(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSearch = (data) => {
        axios({
            method: 'GET',
            url: `https://catadmin.gq/admin/user/${data}`,
            headers: {Authorization: 'Bearer ' + localStorage.token}
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                users: [response.data]
            })
            this.formRef.reset()
            this.searchInputRef.focus()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handleEdit = (data) => {
        console.log(data)
        console.log(this.state.currentPage)
    }
 
    handleDelete = (data) => {
        console.log(data)
    }
    handleFilter = (filter) => {
        this.setState({
            filter: filter
        })
        axios({
            method: 'GET',
            url: `https://catadmin.gq/api/users/${this.state.currentPage}/${filter}`,
            headers: {Authorization: 'Bearer ' + localStorage.token}
        })
        .then((response) => {
            console.log(response.data)
            this.setState({
                users: response.data.users
            })
            this.searchInputRef.focus()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    handlePageClick = (data) => {
        this.setState({
            currentPage: data.selected
        })
        axios({
            method: 'GET',
            url: `https://catadmin.gq/api/users/${data.selected}/${this.state.filter}`,
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
                    url: 'https://catadmin.gq/api/users/0/default',
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
                        self.searchInputRef.focus()
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
        let { isAuthorized, pageCount, users, filter, search } = this.state
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
                                <form ref={ref => this.formRef=ref}>
                                    <input type="text" ref={ref => this.searchInputRef=ref} name="search" className="user-input" placeholder="냥이 번호를 입력하라옹" onChange={this.handleChange} />
                                    <Button className="user-search" onClick={() => {this.handleSearch(search)}}>검색</Button>
                                </form>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={12}className="user-btngroup">
                                <button 
                                className=
                                    {filter === "default" ? "user-filter-clicked" : "user-filter"}
                                onClick={() => {this.handleFilter('default')}}   
                                >번호</button>
                                <button 
                                className=
                                    {filter === "_enterCount" ? "user-filter-clicked" : "user-filter"}
                                onClick={() => {this.handleFilter('_enterCount')}}   
                                >채팅 횟수</button>
                                <button 
                                className=
                                    {filter === "_hittenCount" ? "user-filter-clicked" : "user-filter"}
                                onClick={() => {this.handleFilter('_hittenCount')}}   
                                >맞은 횟수</button>
                                <button 
                                className=
                                    {filter === "_muteCount" ? "user-filter-clicked" : "user-filter"}
                                onClick={() => {this.handleFilter('_muteCount')}}   
                                >뮤트된 횟수</button>
                            </Col>
                        </Row>
                        <Row className="show-grid">
                            <Col xs={12}>
                                <UserTable users={users} onEdit={this.handleEdit} onDelete={this.handleDelete} />
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