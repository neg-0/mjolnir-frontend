import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AllForms from './Components/AllForms/AllForms';
import Editor from './Components/Editor/Editor';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import santa_options from './test_data/Letter to Santa Options.json';
import letter_to_santa from './test_data/Letter to Santa Template.json';
import santa_serialized_options from './test_data/Santa Brian History.json'

const url = "http://localhost:3001"

const templates = [
  {
    "id": 1,
    "title": "Letter to Santa",
    "body": "Dear Santa,\n        My name is {NAME}. I am {AGE} years old. I'm really looking forward to Christmas and your visit! I've been really good this year - well, mostly!\n        There are a few very special things I would really like. They are:\n        \n        {ITEM_LIST}\n        \n        Your friend,\n        {NAME}\n        \n        {SALUTATION}",
    "created_at": "2021-11-05T14:51:53.962Z",
    "updated_at": "2021-11-05T14:51:53.962Z"
  }
]

let mockUsers = [{
  id: 1,
  user_name: "Brian",
  serializedOptions: [
    { id: 1, title: "First Letter to Santa", name: "Little Brian" }
  ],
  favorites: [1, 2, 3]
},
{
  id: 2,
  user_name: "Dustin",
  serializedOptions: [
    { id: 1, title: "First Letter to Santa", name: "Little Dustin" }
  ],
  favorites: [2, 3, 4]
},
{
  id: 3,
  user_name: "Floyd",
  serializedOptions: [
    { id: 1, title: "First Letter to Santa", name: "Little Dustin" }
  ],
  favorites: [2, 3, 4]
}]

export const UserDataContext = createContext()
export const AppFunctionsContext = createContext()

function App() {

  const [userData, setUserData] = useState()
  const [template, setTemplate] = useState()

  const appFunctions = { login, logout, fetchTemplates, fetchTemplateById, setTemplate, fetchTemplateIdByName, fetchTemplateByName, fetchTemplateOptions, fetchSerializedOptions, postUserAccount }

  async function login(username) {

    let user = await fetchUserData(username)

    if (!user || !user[0]) {
      return false
    }

    console.log("Recieved data", user)


    setUserData(user[0])
    return true
    // let userId = -1
    // let userObj = users.find((user) => user.name === username)
    // if (userObj) {
    //   userId = userObj.id
    // }

    // if (userId > -1) {
    //   console.log(`User found, logging in ${username}`)
    //   let user = await fetchUserData(userId)
    //   setUserData(user)
    // } else {
    //   console.log("User not found, creating new...")
    //   let newId = await createUserAccount(username)
    //   let user = await fetchUserData(newId)
    //   setUserData(user)
    // }
  }

  function logout() {
    setUserData()
    setTemplate()
  }

  async function fetchUsers() {
    const response = await fetch(`${url}/users`);
    const json = await response.json();
    return json
  }

  async function fetchUserData(username) {

    if (mockUsers) {
      return [mockUsers.find((user) => user.user_name === username)]
    }

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

    // let index = users.findIndex((user) => user.name === username)
    // console.log("User ID", username, "user index", index)
    // if (index > -1) {
    //   return users[index]
    // }

    // return {}
  }

  async function fetchTemplates() {
    // if (templates) {
    //   return templates
    // }

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

    // if (templates) {
    //   return templates.find((template) => template.id === templateId)
    // }

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

  async function fetchTemplateByName(templateName) {
    // let template = await fetch(letter_to_santa)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     return json
    //   })
    // return template
    return letter_to_santa
  }

  async function fetchTemplateIdByName(templateName) {
    return 1
  }

  async function fetchTemplateOptions(templateName) {
    return santa_options
  }

  async function fetchSerializedOptions(serializedOptionsId) {
    return santa_serialized_options
  }

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
          <Login path='/login' exact />
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
