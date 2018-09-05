import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts'
import axios from 'axios'
import update from 'react-addons-update'
import './PlaceStatistics.css'

class PlaceStatistics extends Component {
    state = {
        data: [],
        windowWidth: 1000
    }
    
    initClusterer = async () => {
        let self = this
        let container = document.getElementById('ps-map')
        let options = {
            center: new window.daum.maps.LatLng(37.545211, 127.051337),
            level: 8
        };
    
        let map = new window.daum.maps.Map(container, options);
        let clusterer = new window.daum.maps.MarkerClusterer({
            map: map,
            averageCenter: true,
            minLevel: 6
        })
        let geocoder = new window.daum.maps.services.Geocoder()
        let response = 
        await axios(
                    { method: 'GET',
                      url: 'https://catadmin.gq/admin/locationStats',
                      headers: {Authorization: 'Bearer ' + localStorage.token}
                    }
              )
        
        response.data.filter((p) => {return 124 < p.longitude && p.longitude < 132 && 33 < p.latitude && p.latitude < 43}).forEach(function(position) {
           geocoder.coord2RegionCode(position.longitude, position.latitude, function(result, status) {
               if (status === window.daum.maps.services.Status.OK) {
                   console.log(result[0].region_2depth_name)
                   let i = self.state.data.map((e) => e.name).indexOf(result[0].region_2depth_name)
                   i !== -1 ? 
                   (function(){
                      self.setState({
                        data: update(self.state.data, {[i] : {cnt: {$apply: function(x){return x + 1}}}})
                      })
                    })()
                   : self.setState({data: [...self.state.data, { name: result[0].region_2depth_name, cnt: 1 }]})
               }
           })
        })
        
        let markers = response.data.map(function(position) {
            return new window.daum.maps.Marker({
                position: new window.daum.maps.LatLng(position.latitude, position.longitude)
            })
        })
        clusterer.addMarkers(markers)
    }

    _sizeDetector = () => {
        this.setState({
            windowWidth: window.innerWidth - 200
        });
    };

   async componentDidMount() {
        try {
            if (localStorage.token) {
                let response = await axios({
                    method: 'GET',
                    url: 'https://catadmin.gq/api/checkToken',
                    headers: {Authorization: 'Bearer ' + localStorage.token}
                })
                console.log(response.data)
                if (response.data.message === 'Unauthorized') {
                    this.props.history.push('/unauthorized')
                } else {
                    this.initClusterer()
                    await window.addEventListener("resize", this._sizeDetector);                     
                }
            } else {
                this.props.history.push('/unauthorized')
            }
        } catch (e) {
            console.log(e)
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this._sizeDetector);
    }

    render() {
        let { data } = this.state
        return (
                <Grid>
                    <Row className="show-grid">
                        <Col xs={12}>
                            <h1 className="ps-header">냥이들 위치라옹~</h1>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} id="ps-map">
                        </Col>
                    </Row>
                    <Row className="show-grid">
                        <Col xs={12} className="ps-graph">
                            <BarChart width={730} height={250} data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="cnt" fill="#8884d8" />
                            </BarChart>
                        </Col>
                    </Row>
                </Grid> 

        );
    }
}

export default PlaceStatistics;