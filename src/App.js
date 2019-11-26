import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
const Post = React.lazy(() => import('./Component/Blog-Post/blogPost.component.js'));
const Home = React.lazy(() => import('./Component/User-Home/userHome.component.js'));
const userComment = React.lazy(() => import('./Component/User-Comment/userComment.component'));

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {

    return (
      <Router>
        <div className="home">
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/post/:id" component={Post} />
              <Route exact path="/" component={Home} />
              <Route exact path="/detail/:id" component={userComment} />
            </Switch>
          </Suspense>
        </div></Router>)
  }
}



