import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AllForms from './Components/AllForms/AllForms';
import Editor from './Components/Editor/Editor';
import Home from './Components/Home/Home';
import MenuBar from './Components/MenuBar/MenuBar';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import { addUserFavorite, deleteHistoryById, fetchHistoryPackageByHistoryId, fetchHistoryPackageByUserName, fetchTemplateById, fetchTemplates, fetchUserData, fetchUserFavorites, postUserAccount, removeUserFavorite, loginUser } from './Database';

export const UserDataContext = createContext()
export const AppFunctionsContext = createContext()

function App() {

  const [userData, setUserData] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['logged-in-username', 'logged-in-password-hash']);

  const appFunctions = { login, logout, fetchTemplates, fetchTemplateById, deleteHistoryById, fetchHistoryPackageByUserName, fetchHistoryPackageByHistoryId, postUserAccount, fetchUserFavorites, addUserFavorite, removeUserFavorite }

  useEffect(() => {
    let username = cookies['logged-in-username']
    let password_hash = cookies['logged-in-password-hash']
    if (username && password_hash) {
      login(username, password_hash)
    }
  }, [])

  async function login(username, password_hash) {
    return loginUser(username, password_hash)
      .then(response => {
        setUserData(response)
        setCookie('logged-in-username', username)
        setCookie('logged-in-password-hash', password_hash)
        return true
      })
      .catch(err => {
        return false
      })
  }

  function logout() {
    setUserData()
    removeCookie('logged-in-username')
    removeCookie('logged-in-password-hash')
  }

  return (
    <Router>
      <UserDataContext.Provider value={userData}>
        <AppFunctionsContext.Provider value={appFunctions}>
          <MenuBar />
          <Switch>
            <Route path="/editor" component={Editor} />
            <Route path="/dashboard" component={UserDashboard} />
            <Route path="/forms" component={AllForms} />
            <Route path="/" component={Home} />
          </Switch>
        </AppFunctionsContext.Provider>
      </UserDataContext.Provider>
    </Router >
  );
}

export default App;
