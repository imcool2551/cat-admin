import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Image } from 'react-bootstrap'
import './NoMatch.css'

class NoMatch extends Component {
    render() {
        return (
            <Grid>
              <Row className="show-grid">
                <Col xs={12} className="nomatch-container">
                    <Jumbotron>
                        <h1 className="nomatch-text">어떻게 왔냐옹</h1>
                        <p>
                            <Image src="/assets/mayomi.jpg" rounded responsive/>
                        </p>
                        <p className="nomatch-button-line">
                            <button 
                            onClick={() => this.props.history.push('/')} 
                            className="nomatch-button">
                            홈으로
                            </button>
                        </p>
                    </Jumbotron>; 
                </Col>
              </Row>
            </Grid>
        );
    }
}

export default NoMatch;