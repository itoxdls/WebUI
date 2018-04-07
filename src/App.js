import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Comments from './components/comments';
import Info from './components/info';

import './App.css';

class App extends Component {

  constructor(){
    super();
    
    const hits = localStorage.getItem('comments');
    if (hits) {
      return;
    }

    fetch('http://jsonplaceholder.typicode.com/posts/1/comments')
    .then(response => { return response.json() })
    .then((data) => {
      localStorage.setItem('comments', JSON.stringify(data));
    })
    .catch(error => { console.log('request failed', error); });
  }

  getItems(){
    return this.state.hits;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">WebUI Test</h1>
        </header>
        <Switch>
          <Route exact path="/" component={Comments}></Route>
          <Route path="/info/:number" component={Info}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
