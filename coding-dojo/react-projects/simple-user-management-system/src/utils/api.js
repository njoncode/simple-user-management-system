import axios from 'axios';

export const getAllUsers = () => {
   return axios({
    method: 'get',
    url: '/users',
    headers: { "Content-type": "application/json" }
    })
}

export const getUser = (id) => {
    return axios({
     method: 'get',
     url: `/user/${id}`,
     headers: { "Content-type": "application/json" }
     })
 }

export const addUser = (user) => {
    return axios({
        method: 'post',
        url: '/user',
        data: JSON.stringify(user),
        headers: { "Content-type": "application/json"}
    })
}


export const editUser = (id, user) => {
    return axios({
        method: 'put',
        url: `/user/${id}`,
        data: JSON.stringify(user),
        headers: { "Content-type": "application/json"}
    })
        // .then(res => console.log('res: ', res.data))
        // .catch(err => console.log('ERROR: ', err))
}

export const deleteUser = (id) => {
    return axios({
            method: 'delete',
            url: `/user/${id}`,
            headers: { "Content-type": "application/json" }
        })
}