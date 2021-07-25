import React from 'react';
import { useToasts } from 'react-toast-notifications';

import '../styles/createUserPage.css';
import {addUser} from '../utils/api';
import Form from './Form';


const CreateUserPage = ({ history }) => {

    const [submitForm, setSubmitForm] = React.useState(false);

    const { addToast } = useToasts();

    React.useEffect(() => {
        if (!!submitForm) {
          addToast('Invalid email or phone number', {
            appearance: 'error',
            autoDismiss: true,
          });
          setSubmitForm(!submitForm)
      }
    }, [submitForm]);

    const validEmailRegex = RegExp(
        /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );

    const phoneNumberRegex = /^[0-9]{10}$/

      const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
      };

      const state = {
        name: '',
        email: '',
        phone: '',
        errors: {
            email: '',
            phone: '',
          }
    }

    const [user, setUser] = React.useState(state);
    
    const handleOnChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        let errors = user.errors;

    switch (name) {
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'phone': 
        errors.phone = 
        value.match(phoneNumberRegex)
            ? ''
            : 'Phone No. must be 10 digits long!'
        break;
      default:
        break;
    }
    
    setUser({
            ...user,
            [e.target.name]: e.target.value,
            errors
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(validateForm(user.errors)) {
            addUser(user)
                .then(res => setUser(res.data))
                .catch(err => console.log('ERROR: ', err))
        history.push('/users')
          } else setSubmitForm(true)
    }

    return (
        <div className='create-user'>
             <Form user={user} handleSubmit={handleSubmit} handleOnChange={handleOnChange} submitContent='Add User'
                formHeading='Fill the details to add user.'
             /> 
        </div>
    )
}

export default CreateUserPage;