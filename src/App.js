import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import ArticleList from './components/ArticleList/ArticleList';
import Article from './components/Article/Article';
import Editor from './components/Editor/Editor';
import Profile from './components/Profile/Profile';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Settings from './components/Settings/Settings';
import store from './store/store';


let isAuth = !!localStorage.getItem('token');
const unsubscribe = store.subscribe(() => isAuth = !!store.getState().auth.token);
const RouteIfAuth = props => isAuth ? <Route {...props} /> : <Redirect to="/" />;
const RouteIfNotAuth = props => !isAuth ? <Route {...props} /> : <Redirect to="/" />;

class App extends Component {

  componentWillUnmount(){
    unsubscribe();
  }

  render() {
    return (
      <Layout>
      	<Switch>
          <Route path="/profile/:id" component={Profile} />
      		<Route path="/articles/:id" component={Article} />          
          <RouteIfNotAuth path="/login" component={Login} />
          <RouteIfNotAuth path="/signup" component={Signup} />
          <RouteIfAuth path="/editor/:id" component={Editor} />
          <RouteIfAuth path="/editor" component={Editor} />
          <RouteIfAuth path="/settings" component={Settings} />
      		<Route exact path="/" component={ArticleList} />
          <Redirect to="/" />
      	</Switch>
      </Layout>
    )
  }
}

export default App;