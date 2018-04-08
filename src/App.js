import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Comments from './components/comments';
import Info from './components/info';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WebUI Test</h1>
        </header>
        <main>
          <Router>
            <Switch>
              <Route exact path="/" component={Comments}/>
              <Route path="/info/:id" component={Info}/>
            </Switch>
          </Router>
        </main>
      </div>
    );
  }
}

export default App;
