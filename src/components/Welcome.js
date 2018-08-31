import React, { Component } from 'react';
import { Carousel, Grid, Row, Col } from 'react-bootstrap'
import './Welcome.css'

class Welcome extends Component {
    render() {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col md={12}>
                            <Carousel interval={500000}>
                                <Carousel.Item className="a">
                                   <img width={320} height={120} alt="320x320" src="/assets/image.png" />
                                    <h3>반갑다옹 {this.props.username} 집사</h3>                                   
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={320} height={320} alt="320x320" src="/assets/cat2.png" />
                                    <h3>2번냥이</h3>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={320} height={320} alt="320x320" src="/assets/cat3.png" />
                                    <h3>3번냥이</h3>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={320} height={320} alt="320x320" src="/assets/cat4.png" />
                                    <h3>4번냥이</h3>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={320} height={320} alt="320x320" src="/assets/cat5.png" />
                                    <h3>5번냥이</h3>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img width={320} height={320} alt="320x320" src="/assets/cat6.png" />
                                    <h3>6번냥이</h3>
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Welcome;