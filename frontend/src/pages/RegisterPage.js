import React from "react";
import { Link } from "react-router-dom"

const RegisterPage = () => {
    return (
        <div className="main-register d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundImage: URL }}>
            <div className="py-4 px-4 ">
                <label className="heading text-center text-center w-100 fs-1 fw-bold">Register</label>
                <h1 className="email fs-3 ">Full Name:</h1>
                <input className="nameBox px-1 border  rounded-1 py-1" />
                <h1 className="email fs-3 mt-2   ">Email:</h1>
                <input className="inputBox px-1 border rounded-1 py-1" />
                <h1 className="password fs-3 mt-2">Password:</h1>
                <input className="passwordBox px-1 border rounded-1 py-1" />

                <Link to="/login" style={{ textDecoration: "none" }} >
                    <button className="logi-btn">Login</button>
                </Link>

            </div>
        </div>

    );
};

export default RegisterPage;
