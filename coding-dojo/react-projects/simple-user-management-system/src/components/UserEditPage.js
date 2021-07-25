import React from 'react';      

import {getUser, editUser} from '../utils/api';
import Form from './Form';

const UserEditPage = (props) => {

    const {history, match } = props
    
    React.useEffect(() => {
        getUser(match.params.id)
            .then(res => {
                console.log('res is: ', res.data)
                setUserEdit(res.data[0])
            })
            .catch(error => console.log(error))
    }, [match.params.id])
    
      const state = {
        name: '',
        email: '',
        phone: '',
    }

    const [userEdit, setUserEdit] = React.useState(state);

    console.log('userEdit: UserEditPage', userEdit)
    const handleOnChange = (e) => {
        setUserEdit({
            ...userEdit,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("userEdit.id: ", userEdit._id);
        editUser(match.params.id, userEdit)
            .then(res => console.log('res server 😀: ', res.data))
            .catch(err => console.log('ERROR: ', err.message))
        history.push('/users')
    }

    return (
    <>
       <Form user={userEdit} handleSubmit={handleSubmit} handleOnChange={handleOnChange} submitContent= 'Update User'
        formHeading='Update the user details.'
       />
    </>
)}

export default UserEditPage;



