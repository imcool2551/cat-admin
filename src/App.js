import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './components/CustomNavbar'
import Home from './components/Home'
import User from './components/User'
import UserStatistics from './components/UserStatistics'
import PlaceStatistics from './components/PlaceStatistics'
import Ads from './components/Ads'
import Admin from './components/Admin'
import AddAdmin from './components/AddAdmin'
import Logout from './components/Logout'
import NoMatch from './components/NoMatch'
import Unauthorized from './components/Unauthorized'
import Footer from './components/CustomFooter'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <Navbar />
              <div className="app-container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/user" component={User} />
                    <Route path="/statistics/user" component={UserStatistics} />
                    <Route path="/statistics/place" component={PlaceStatistics} />
                    <Route path="/ads" component={Ads} />
                    <Route path="/admin" component={Admin} />
                    <Route path="/add_admin" component={AddAdmin} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/unauthorized" component={Unauthorized} />
                    <Route component ={NoMatch} />
                </Switch>
              </div>
            <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
