import './App.css';
import Home from './pages/home/home';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Country from './pages/country/country';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/country'>
            <Country />
          </Route>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
