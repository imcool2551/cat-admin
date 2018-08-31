import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Grid, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import './AddAdmin.css'

class AddAdmin extends Component {

    state = {
        username: '',
        userId: '',
        password: '',
        isMaster: false,
        isAuthorized: true,
        statusText: ''
    }
    formCheck = (id, pw) => {
        return id.match(/^.{4,13}$/)&& // 4~13 자리
        pw.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/) // 최소 8자리 숫자,문자,특문
    }
    handleChange = (e) => {
        console.log(e.target.value, e.target.name)
        if (e.target.name === 'isMaster') {
            this.setState({
                isMaster: !this.state.isMaster
            }, () => {console.log(this.state)})
        } else {
            this.setState({
                [e.target.name]: e.target.value
            }, () => {console.log(this.state)})
        }
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        var { username, userId, password, isMaster } = this.state
        if (!this.formCheck(userId, password) || username === '') {
            await this.setState({
                     statusText: '형식이 틀렸다옹!'
                  }, () => {
                    this.emptyState()
                    this.myFormRef.reset()
                  })
            return;
        }
        try {
            var response = await axios({
                method: 'POST', 
                url: 'http://localhost:8080/api/signup', 
                headers: {authorization: 'Bearer ' + localStorage.token},
                data: {username, userId, password, isMaster}
            })
            console.log(response.data)
            if (response.data.result === "Existing Id") {
                this.setState({
                    statusText: '집사가 이미 있다옹!'
                }, () => {
                    this.emptyState()
                    this.myFormRef.reset()  
                })
            } else if (response.data.result === "success") {
                this.setState({
                    statusText: '집사가 늘어났다옹!'
                }, () => {
                    this.emptyState()
                    this.myFormRef.reset()  
                })
            } else {
                this.setState({
                    statusText: '서버문제 ㅅㅂ'
                }, () => {
                    this.emptyState()
                    this.myFormRef.reset()  
                })
            }
            console.log(this.state)   
        } catch (e) {
            console.log(e)
        }
    }
    emptyState = () => {
        this.setState({
            username: '',
            userId: '',
            password: '',
            isMaster: false
        }, () => {this.nameRef.focus()})
    }
    
    componentDidMount() {
        let self = this
        self.nameRef.focus()
        if (localStorage.token) {
            (function() {
                axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/signup',
                    headers: {Authorization: 'Bearer ' + localStorage.token}
                })
                .then((response) => {
                    console.log(response.data)
                    if (response.data.message === 'Unauthorized') {
                        self.setState({
                            isAuthorized: false,
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
        let {isAuthorized, statusText} = this.state
        return (
            <div>
            {isAuthorized ? (
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} className="addadmin-container">
                        <form ref={(el) => this.myFormRef = el} onSubmit={this.handleSubmit} className="addadmin-form">
                            <input ref={ref => this.nameRef=ref} type="text" name="username" id="username" onChange={this.handleChange} placeholder="이름" className="addadmin-username" /><br />
                            <input type="text" name="userId" id="userId" onChange={this.handleChange} placeholder="4~13자리 아이디" className="addadmin-id" /><br />
                            <input type="password" name="password" id="password" onChange={this.handleChange} placeholder="8자리이상 비밀번호(특수문자포함)" className="addadmin-password"/><br />
                            <div className="addadmin-master"><input type="checkbox" name="isMaster" id="isMaster" onChange={this.handleChange} />마스터계정</div><br />
                            <h4 className="addadmin-statusText">{statusText}</h4>
                            <button type="submit" onClick={this.handleSubmit} className="addadmin-submit">집사추가</button>          
                        </form>
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

export default AddAdmin;