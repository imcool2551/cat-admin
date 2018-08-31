import React, { Component } from 'react'
import { SocialIcon } from 'react-social-icons'
import { Grid, Row, Col } from 'react-bootstrap'
import './CustomFooter.css'
// xsPush={6} sm={12} smPush={4}
class CustomFooter extends Component {
    render() {
        return (   
            <div className="footer">
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12} className="footer-icon">
                            <SocialIcon url="https://github.com" className="footer-link" />
                            <SocialIcon url="https://facebook.com" className="footer-link" />
                            <SocialIcon url="https://instagram.com" className="footer-link" />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4} className="footer-text">
                            <h4>Copyright©{new Date().getFullYear()} Team Cat In A Box</h4>
                        </Col>
                        <Col xs={4} className="footer-text">
                            <h4>Contact: 010-0000-0000</h4>
                        </Col>
                        <Col xs={4} className="footer-text">
                            <h4>Email: catinabox88@gmail.com</h4>
                        </Col>
                    </Row>       
                </Grid>

            </div>
        );
    }
}

export default CustomFooter;