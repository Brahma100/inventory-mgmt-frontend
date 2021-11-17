import React, { Component, Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { connect } from 'react-redux';
import store from './store';
import { Container } from 'reactstrap';
import { loadUser, loginModalOpen } from "./action/authActions";
import Sidebar from './components/Sidebar/Sidebar';
import Footer from './components/Footer/Footer';
import AdminNavbar from './components/Navbars/AdminNavbar';
import { Route, Switch, withRouter } from "react-router-dom";
import routes from "./routes.js";
import { getCategories } from './action/categoryAction';
import { Card } from 'react-bootstrap';
import Loading from './components/LazyLoadingPage/Loading'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "black",
      fixedClasses: "dropdown show-dropdown open",
      isModalOpen: false,
      startRender: false,
    };
  }
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            exact
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };


  componentDidMount(e) {

    store.dispatch(loadUser());
    store.dispatch(getCategories());
    console.log("Action:", this.props.history);
    if (this.props.history.action === 'POP') {
      setTimeout(() => {
        console.log("timeout");
        if (!this.props.isAuthenticated) {
          this.props.history.push('/login')
          // this.props.loginModalOpen(true);
        }
      }, 150)
    }
    else
      if (!this.props.isAuthenticated) {
        console.log("Direct");
        this.props.history.push('/login')
        // this.props.loginModalOpen(true);
      }
    setTimeout(() => {
      this.setState({ startRender: true })
    }, 160)

  }
  componentDidUpdate(e) {

    store.dispatch(loadUser());
    if (!this.props.isAuthenticated) {
      console.log("update Component");
      this.props.history.push('/login')
      // this.props.loginModalOpen(true);
    }
  }

  render() {
    return (
      <>
        {!this.state.startRender ? <Loading /> :
          <div className="wrapper">
            <Sidebar {...this.props} routes={routes}
              color={this.state.color}
            />
            <div id="main-panel" className="main-panel" ref="mainPanel">
              <AdminNavbar
                {...this.props} routes={this.getRoutes(routes)}
                brandText={this.getBrandText(this.props.location.pathname)}
              />


              {this.getRoutes(routes)}

              <Container>

              </Container>
              <Card style={{ margin: '0rem', padding: '0rem' }}>
                <Footer />
              </Card>
            </div>

          </div>}</>
    );
  }
}
const mapStateToProps = state => {
  return ({
    isAuthenticated: state.auth.isAuthenticated,
  })
}

export default connect(mapStateToProps, { loginModalOpen })(withRouter(App));
