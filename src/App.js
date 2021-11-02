import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';

function App() {

  //states 
  const [data, setData] = useState([])

  const [username, setUsername] = useState('')

  const appFunctions = { setUsername }

  useEffect(() => {
    getData();
  }, [])


  async function getData() {
    const response = await fetch(`http://localhost:3000/`);
    const data = await response.json();
    setData(data);
  }


  return (
    <Router>
      <Login username={username} />
      <Switch>
        <Route path="/">
          <Home username={username} appFunctions={appFunctions} />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
