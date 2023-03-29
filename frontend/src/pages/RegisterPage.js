import React from "react";

const RegisterPage = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
            <div className="py-4 px-4 border border-primary">
                <label className="heading text-center text-center w-100 fs-1 fw-bold">Register</label>
                <h1 className="email fs-3 ">Full Name:</h1>
                <input className="nameBox px-1" />
                <h1 className="email fs-3 mt-2   ">Email:</h1>
                <input className="inputBox px-1" />
                <h1 className="password fs-3 mt-2">Password:</h1>
                <input className="passwordBox px-1" />
            </div>
        </div>

    );
};

export default RegisterPage;
