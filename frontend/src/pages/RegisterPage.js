import React from 'react'

const RegisterPage = () => {
    return (
        <div className='w-75 bg-light-subtle'>
            <label className='heading text-center'>Register</label>
            <h1 className='email '>Full Name:</h1>
            <input className='nameBox' />
            <h1 className='email '>Email:</h1>
            <input className='inputBox' />
            <h1 className='password'>Password:</h1>
            <input className='passwordBox' />
        </div>
    )
}

export default RegisterPage