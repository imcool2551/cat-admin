import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import {Grid, Col, Row} from 'react-bootstrap'
import CatTable from './CatTable'
import CatNounTable from './CatNounTable'
import CatAdjTable from './CatAdjTable'
import axios from 'axios'
import './AddCat.css'

class AddCat extends Component {
    state = {
        isAuthorized: true,
        cats: [],
        nouns: [],
        adjs: [],
        noun: '',
        adj: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (type) => {
        let { adj, noun } = this.state
        if (type === "noun") {
            axios({
                method: "POST",
                url: "https://catadmin.gq/admin/nick/noun",
                headers: {authorization: "Bearer " + localStorage.token},
                data: {noun: noun}
            })
            .then((response) => {
                this.setState({
                    nouns: response.data.nouns,
                    cats: response.data.nicks,
                    noun: '',
                    adj: ''
                })
            })
            .catch((err) => {
                window.alert('이미 냥이가 있다옹')
            })
            .then(() => {
                this.nounInput.reset()
                this.adjInput.reset()
            })
        } else if (type === "adj") {
            axios({
                method: "POST",
                url: "https://catadmin.gq/admin/nick/adj",
                headers: {authorization: "Bearer " + localStorage.token},
                data: {adj: adj}
            })
            .then((response) => {
                this.setState({
                    adjs: response.data.adjs,
                    cats: response.data.nicks,
                    noun: '',
                    adj: ''
                }, () => {
                    this.adjInput.reset()
                })
            })
            .catch((err) => {
                window.alert('이미 냥이가 있다옹')
            })
            .then(() => {
                this.nounInput.reset()
                this.adjInput.reset()
            })
        }
    }

    componentDidMount() {
        let self = this
        if (localStorage.token) {
            (function() {
                axios({
                    method: "GET",
                    url: "https://catadmin.gq/api/checkToken",
                    headers: {Authorization: "Bearer " + localStorage.token}
                })
                .then((response) => {
                    console.log(response.data)
                    if (response.data.message === "Unauthorized") {
                        self.setState({
                            isAuthorized: false,
                        })
                    } else {
                        axios({
                            method: "GET",
                            url: "https:/catadmin.gq/admin/nick/name",
                            headers: {Authorization: "Bearer " + localStorage.token}
                        })
                        .then((response) => {
                            console.log(response)
                            self.setState({
                                cats: response.data
                            })
                        })
                        axios({
                            method: "GET",
                            url: "https:/catadmin.gq/admin/nick/noun",
                            headers: {Authorization: "Bearer " + localStorage.token}
                        })
                        .then((response) => {
                            console.log(response)
                            self.setState({
                                nouns: response.data
                            })
                        })
                        axios({
                            method: "GET",
                            url: "https:/catadmin.gq/admin/nick/adj",
                            headers: {Authorization: "Bearer " + localStorage.token}
                        })
                        .then((response) => {
                            console.log(response)
                            self.setState({
                                adjs: response.data
                            })
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                    }
                })
                .catch((err) => {
                    console.log("axios error", err)
                })
            })()
        } else {
            this.setState({
                isAuthorized: false
            })
        }
    }

    handleDelete = (id) => {
        axios({
            method: "DELETE",
            url: `https://catadmin.gq/admin/nick/name/${id}`,
            headers: {Authorization: "Bearer " + localStorage.token}
        })
        .then((response) => {
            this.setState({
                cats: response.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleNounDelete = (id) => {
        axios({
            method: "DELETE",
            url: `https://catadmin.gq/admin/nick/noun/${id}`,
            headers: {Authorization: "Bearer " + localStorage.token}
        })
        .then((response) => {
            this.setState({
                nouns: response.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    handleAdjDelete = (id) => {
        axios({
            method: "DELETE",
            url: `https://catadmin.gq/admin/nick/adj/${id}`,
            headers: {Authorization: "Bearer " + localStorage.token}
        })
        .then((response) => {
            this.setState({
                adjs: response.data
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render() {
        let { isAuthorized, cats, nouns, adjs } = this.state
        return (
            <div>
                {
                isAuthorized? (
                    <Grid>
                        <Row className="show-grid">
                            <Col xs={12} md={4}>
                                <h1 className="addcat-header">냥이는 어떻냐옹?</h1>
                                <form ref={ref => this.nounInput = ref}>
                                    <input type="text" name="adj" onChange={this.handleChange} className="addcat-input-adj" />
                                </form>
                                <button onClick={() => this.handleSubmit('adj')} className="addcat-button-adj">추가</button> 
                                <CatAdjTable adjs={adjs} onDelete={this.handleAdjDelete} />
                            </Col>
                            <Col xs={12} md={4}>
                                <h1 className="addcat-header">냥이를 추가할고양?</h1> 
                                <form ref={ref => this.adjInput = ref}>
                                    <input type="text" name="noun" onChange={this.handleChange} className="addcat-input-noun"/>
                                </form>
                                <button onClick={() => this.handleSubmit('noun')} className="addcat-button-adj">추가</button> 
                                <CatNounTable nouns={nouns} onDelete={this.handleNounDelete} />
                            </Col>
                            <Col xs={12} md={4}>
                                <h1 className="addcat-header">냥이를 삭제할고양?</h1> 
                                <CatTable cats={cats} onDelete={this.handleDelete} />
                            </Col>
                        </Row>
                    </Grid>                   
                ) :
                <Redirect to="/unauthorized" />
                }
            </div>
        );
    }
}

export default AddCat;