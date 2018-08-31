import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'
import Welcome from './Welcome'
import axios from 'axios'
import './Home.css'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            password: '',
            isAuthorized: true,
            username: '',
            errorText: ''
        }
    }
    handleChange = (e) => {
        console.log(e.target.value, e.target.name)
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        let { userId, password } = this.state
        try {
            let response = await axios({
                method: 'POST',
                url: 'http://localhost:8080/api/login',
                data: {userId, password}
            })
            console.log(response.data)
            if (response.data.message === 'Authorized') {
                window.localStorage.setItem('token', response.data.token)
                await this.setState({ username: response.data.username, isAuthorized: true})
            } else if (response.data.message === 'There is no user') {
                this.setState({
                    errorText: '아이디가 없다냥!'
                }, () => {
                    this.formRef.reset()
                    this.idRef.focus()
                })
            } else if (response.data.message === 'Wrong password') {
                
                this.setState({
                    errorText: '비밀번호가 틀렸다냥!'
                }, () => {
                    this.formRef.reset()
                    this.idRef.focus()
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
    componentDidMount = () => {
        let self = this
        if (localStorage.token) {
            (function() {
                axios({
                    method: 'POST',
                    url: 'http://localhost:8080/api/login',
                    headers: {Authorization: 'Bearer ' + localStorage.token}
                })
                .then((response) => {
                    console.log(response.data)
                    if (response.data.message !== 'Authorized') {
                        self.setState({
                            isAuthorized: false,
                        }, () => {self.idRef.focus()})
                    } else if (response.data.message === 'Authorized') {
                        self.setState({
                            username: response.data.username
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
            }, () => {self.idRef.focus()})
        }
    }
        
    
    render() {
        let { isAuthorized, username, errorText } = this.state
        return (
            <div>
                {isAuthorized ? (
                    <Welcome username={username} />
                ) : (
                    <Grid>
                        <Row className="show-grid">
                           <Col xs={12} className="home-container">
                                <form ref={(ref) => this.formRef = ref} onSubmit={this.handleSubmit} className="home-form" >
                                    <input ref={(ref) => this.idRef = ref} type="text" name="userId" id="userId" onChange={this.handleChange} placeholder="Id" className="home-id" /><br />
                                    <input type="password" name="password" id="password" onChange={this.handleChange} placeholder="Password" className="home-password" /><br />
                                    <h4 className="home-errorText">{ errorText }</h4>
                                    <button type="submit" onClick={this.handleSubmit} className="home-submit">로그인</button>           
                                </form>
                           </Col>
                        </Row>
                    </Grid>
                )}
            </div>
        );
    }
}

export default Home;