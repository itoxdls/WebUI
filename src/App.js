import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Comments from './components/comments';
import Info from './components/info';

import './App.css';

class App extends Component {
  hits = [];
  constructor(){
    super();
    const hits = localStorage.getItem('comments');
    if (hits) {
      return;
    }
    this.getItems(1);
  }

  getItems(p){
    if(p === false){
      localStorage.setItem('comments', JSON.stringify(this.hits));
      return;
    }
    fetch(`http://jsonplaceholder.typicode.com/posts/${p}/comments`)
    .then(response => { return response.json() })
    .then((data) => {
      data.forEach(e => {
        this.hits.push(e);
      });
      this.getItems(data.length > 0 ? p++ : false);
    })
    .catch(error => { console.log('request failed', error); });
  }

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
