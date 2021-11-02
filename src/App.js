import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Editor from './Components/Editor/Editor';

function App() {

  const [data, setData] = useState([])
  const [username, setUsername] = useState('')
  const [template, setTemplate] = useState('')
  const appFunctions = { setUsername, logout }

  useEffect(() => {
    getData();
  }, [])

  function logout() {
    setUsername('')
    setTemplate('')
  }

  async function getData() {
    const response = await fetch(`http://localhost:3000/`);
    const json = await response.json();
    setData(json);
  }



  return (
    <Router>
      <Login username={username} />
      <Switch>
        <Route path="/editor">
          <Editor username={username} appFunctions={appFunctions} template={template} />
        </Route>
        <Route path="/">
          <Home username={username} appFunctions={appFunctions} />
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
