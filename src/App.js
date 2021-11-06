import { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AllForms from './Components/AllForms/AllForms';
import Editor from './Components/Editor/Editor';
import Home from './Components/Home/Home';
import MenuBar from './Components/MenuBar/MenuBar';
import UserDashboard from './Components/UserDashboard/UserDashboard';

export const url = "http://localhost:3001"
export const UserDataContext = createContext()
export const AppFunctionsContext = createContext()

function App() {

  const [userData, setUserData] = useState()
  const [template, setTemplate] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['logged-in-account']);

  const appFunctions = { login, logout, fetchTemplates, fetchTemplateById, setTemplate, fetchHistoryPackageByUserName, fetchHistoryPackageByHistoryId, postUserAccount, fetchUserFavorites, addUserFavorite, removeUserFavorite }

  useEffect(() => {
    let username = cookies['logged-in-account']
    console.log('loaded cookie', username)
    if (cookies['logged-in-account']) {
      login(username)
    }
  }, [])

  async function login(username) {

    let user = await fetchUserData(username)

    if (!user) {
      return false
    }

    console.log("Recieved data", user)


    setUserData(user)
    console.log('setting cookie', user.user_name)

    setCookie('logged-in-account', user.user_name)
    return true
  }

  function logout() {
    setUserData()
    setTemplate()
    removeCookie('logged-in-account')
  }

  async function fetchUserData(username) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/users/${username}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => resolve(null))
    })
  }

  async function fetchTemplates() {
    return new Promise((resolve, reject) => {
      fetch(`${url}/templates`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.json())
        .then(templates => {
          resolve(templates)
        })
        .catch(err => resolve(null))
    })
  }

  async function fetchTemplateById(templateId) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/templates/${templateId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => resolve(null))
    })
  }

  async function fetchHistoryPackageByUserName(user_name) {
    console.log("Fetching Serialized Options for user")
    return new Promise((resolve, reject) => {
      fetch(`${url}/users/${user_name}/history`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.json())
        .then(json => {
          //console.log("Got back json:", json)
          resolve(json)
        })
        .catch(err => resolve(null))
    })
  }

  async function fetchHistoryPackageByHistoryId(history_id) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/history/${history_id}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.json())
        .then(json => {
          //console.log("Got back json:", json)
          resolve(json)
        })
        .catch(err => resolve(null))
    })
  }

  async function fetchUserFavorites(user) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/users/${user}/favorites`)
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => resolve(null))
    })
  }

  async function addUserFavorite(user, id) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/users/${user}/${id}`, { method: 'POST' })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => resolve(null))
    })
  }

  async function removeUserFavorite(user, id) {
    return new Promise((resolve, reject) => {
      fetch(`${url}/users/${user}/${id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.json())
        .then(json => resolve(json))
        .catch(err => resolve(null))
    })
  }

  //Delete history function
  //backend end point - DELETE /users/:user_name/history
  // async function deleteHistoryByUsername(user_name){
  //   return new Promise((resolve, _) => {
  //     fetch(`${url}/users/${user_name}/history`, {
  //       method: "DELETE"
  //     })
  //       .then(res => {
  //         if (!res.ok) {
  //           throw new Error(res.statusText)
  //         } else {
  //           return res
  //         }
  //       })
  //       .then(res => res.json())
  //       .then(json => {
  //         resolve(json)
  //       })
  //       .catch(err => resolve(null))
  //   })
  // }

  async function postUserAccount(username, password) {
    console.log('posting', username, password)
    return new Promise((resolve, reject) => {
      let newUser = {
        user_name: username,
        password: password
      }

      fetch(`${url}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }, body: JSON.stringify(newUser)
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(res.statusText)
          } else {
            return res
          }
        })
        .then(res => res.text())
        .then(text => {
          console.log('text', text)
          resolve(text)
        })
    })
  }

  return (
    <Router>
      <UserDataContext.Provider value={userData}>
        <AppFunctionsContext.Provider value={appFunctions}>
          <MenuBar />
          <Switch>
            <Route path="/editor" exact>
              <Editor template={template} />
            </Route>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/dashboard" exact component={UserDashboard} />
            <Route path="/forms" exact component={AllForms} />
          </Switch>
        </AppFunctionsContext.Provider>
      </UserDataContext.Provider>
    </Router >
  );
}

export default App;
