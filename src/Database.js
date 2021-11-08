import { getPasswordHash } from "./Components/PasswordHasher"

const url = "http://localhost:3001"

export async function fetchTemplates() {
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

export async function fetchUserData(username) {
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

export async function fetchTemplateById(templateId) {
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

export async function fetchHistoryPackageByUserName(user_name) {
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

export async function fetchHistoryPackageByHistoryId(history_id) {
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

export async function fetchUserFavorites(user) {
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

export async function addUserFavorite(user, id) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/users/${user}/favorites/${id}`, { method: 'POST' })
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

export async function removeUserFavorite(user, id) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/users/${user}/favorites/${id}`, { method: 'DELETE' })
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

// Delete history function
// backend end point - DELETE /users/:user_name/history
export async function deleteHistoryById(user_name, history_id) {
    console.log("Deleting from history:", user_name, history_id)
    return new Promise((resolve, _) => {
        fetch(`${url}/users/${user_name}/history/${history_id}`, {
            method: "DELETE"
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                } else {
                    return res
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log('New history:', json)
                resolve(json)
            })
            .catch(err => resolve(null))
    })
}

export async function postUserAccount(username, password) {
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
                    throw new Error(res)
                } else {
                    return res
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log('post user json', json)
                resolve(json)
            })
            .catch(err => reject('This username is already taken.'))
    })
}

export function loginUser(user_name, password_hash) {
    return new Promise((resolve, reject) => {

        fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({ user_name, password: password_hash })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                } else {
                    return res
                }
            })
            .then(res => res.json())
            .then(json => {
                console.log('Called login, got back', json)
                resolve(json)
            })
            .catch(err => reject(err))
    })
}

export async function patchSerializedOptions(history_id, template_id, file_name, serialized_options) {
    let newHistory = {
        history_id, template_id, file_name, serialized_options
    }
    return fetch(`${url}/history`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(newHistory)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            } else {
                return res
            }
        })
        .then(res => res.json())

}

export async function postSerializedOptions(user_name, template_id, file_name, serialized_options) {
    let newHistory = {
        template_id, file_name, serialized_options
    }
    return fetch(`${url}/users/${user_name}/history`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(newHistory)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(res.statusText)
            } else {
                return res
            }
        })
        .then(res => res.json())

}