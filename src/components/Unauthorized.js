import React, { Component } from 'react';
import { Grid, Row, Col, Jumbotron, Image } from 'react-bootstrap'
import './Unauthorized.css'

class Unauthorized extends Component {
    render() {
        return (
            <Grid>
              <Row className="show-grid">
                <Col xs={12} className="unauthorized-container">
                    <Jumbotron>
                        <h1 className="unauthorized-text">권한이 없다옹</h1>
                        <p>
                            <Image src="/assets/whoaru.jpg" rounded responsive/>
                        </p>
                        <p className="unauthorized-button-line">
                            <button 
                            onClick={() => this.props.history.push('/')} 
                            className="unauthorized-button">
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

export default Unauthorized;