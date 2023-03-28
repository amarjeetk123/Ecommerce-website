import React from 'react'

const LoginPage = () => {
  return (
   <div className='d-flex justify-content-center align-items-center' style={{height:"100vh"}} >
    <div className='w-25 py-4 px-4 border border-primary'>
      <label className='heading w-100 fs-1 fw-bold text-center'>Login</label>
      <h1 className='email fs-3'>Email:</h1>
      <input className='inputBox' />
      <h1 className='password fs-3 mt-3' >Password:</h1>
      <input className='passwordBox' />
    </div>
   </div>
  )
}

export default LoginPage;

