import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AllForms from './Components/AllForms/AllForms';
import Editor from './Components/Editor/Editor';
import Home from './Components/Home/Home';
import MenuBar from './Components/MenuBar/MenuBar';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import { fetchTemplates, fetchTemplateById, deleteHistoryById, fetchHistoryPackageByUserName, fetchHistoryPackageByHistoryId, postUserAccount, fetchUserFavorites, addUserFavorite, removeUserFavorite, fetchUserData } from './Database';

export const url = "http://localhost:3001"
export const UserDataContext = createContext()
export const AppFunctionsContext = createContext()

function App() {

  const [userData, setUserData] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['logged-in-account']);

  const appFunctions = { login, logout, fetchTemplates, fetchTemplateById, deleteHistoryById, fetchHistoryPackageByUserName, fetchHistoryPackageByHistoryId, postUserAccount, fetchUserFavorites, addUserFavorite, removeUserFavorite }

  useEffect(() => {
    let username = cookies['logged-in-account']
    if (cookies['logged-in-account']) {
      login(username)
    }
  }, [])

  async function login(username) {
    let user = await fetchUserData(username)

    if (!user) {
      return false
    }

    setUserData(user)
    setCookie('logged-in-account', user.user_name)
    return true
  }

  function logout() {
    setUserData()
    removeCookie('logged-in-account')
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
