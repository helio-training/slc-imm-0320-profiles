import React, { useState } from 'react';
import { 
  BrowserRouter as Router, 
  Switch, 
  Route,
  Redirect 
} from 'react-router-dom';
import { isLoggedIn } from './config/auth';

import Home from './pages/Home';
import Pokemon from './pages/Pokemon';
import Accounts from './pages/Accounts';
import { PokemonContext } from './context/poke-context';
import data from './context/pokemon.json'
import { Login } from './components/auth/Login';
import './App.css';

function App() {
  const { Provider } = PokemonContext;
  const [pokemon, setPokemon] = useState(data.pokemon);
  const removePokemon = (index) => {
    const copyPoke = Object.assign([], pokemon);
    copyPoke.splice(index, 1);
    setPokemon(copyPoke);
  }
  return (
    <Provider value={{pokemon, removePokemon}}>
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/pokemon' component={Pokemon} />
          <PrivateRoute exact path='/accounts'>
            <Accounts/>
          </PrivateRoute>
        </Switch>
      </Router>
    </Provider>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
const PrivateRoute = ({ children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn() ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}

export default App;
