import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Heading from './components/Heading';

import './App.css';

function App() {
  const [rows] = React.useState([]);

  return (
    <div className="App">
    <Heading/>
    <Switch>
      <Route exact path="/" component={()=><Home rows={rows} />}  />
      <Route exact path="/about" component={About} />
      <Route component={Home} />
    </Switch>
    </div>
  );
}

export default App;
