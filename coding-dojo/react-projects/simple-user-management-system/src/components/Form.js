import React from 'react';

import '../styles/form.css';
import CustomButton from './CustomButton';


const Form = ({ user, handleSubmit, handleOnChange, submitContent, formHeading}) => (
        <div className='form-container'>
            <form onSubmit={handleSubmit} className='form-inputs'>
                <h2>{formHeading}</h2>
                <label for='name'>Name: </label>
                <input className='form-input' onChange={handleOnChange} name='name' value={user.name} required/> 
            
                <label for='email'>Email: </label>
                <input className='form-input' onChange={handleOnChange} name='email' value={user.email} required/>  
                {user.errors && user.errors.email.length > 0 && 
                <span className='error'>{user.errors.email}</span>}

                <label for='phone'>Phone Number: </label>
                <input className='form-input' onChange={handleOnChange} name='phone' value={user.phone} required/>  
                {user.errors && user.errors.phone.length > 0 && 
                <span className='error'>{user.errors.phone}</span>}
          
                <div className='buttons'>
                    <CustomButton type='submit'>{submitContent}</CustomButton >
                </div>
            </form>
    </div>
    )

export default Form;




{/* <FormInput
                    name='email' 
                    type='email' 
                    value={user.email} 
                    handleChange={handleOnChange}
                    label='Email'
                    required 
                />
                <FormInput
                    name='phone' 
                    type='number' 
                    value={user.phone} 
                    handleChange={handleOnChange}
                    label='Phone No.'
                    required 
                /> */}