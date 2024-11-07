import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import * as cookie from "../utility/Cookie"

function LoginPage({ setAuth }) {
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();

        axios.post('https://eventvista.onrender.com/api/user/login', { Email, Password }).then((res)=>{
            if(res.status===200){
                console.log("Login successful", res.data);
                localStorage.setItem('token', res.data.AccessToken);
                cookie.setCookie("AccessToken", res.data.AccessToken, 1);
                setAuth(true);
                navigate('/home')
            }
            else{
                console.log("Error in status", res.data);
            }
        }).catch((error)=>{
            console.log("Error logging in", error);
        });
        

    };
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const labelStyle = {
        display: "block",
        marginBottom: "5px",
        textAlign: "left",
        fontWeight: "bold",
        color: '#333',
    };

    // const handleLogin = (e) => {
    //     e.preventDefault();
    //     // Handle login logic here
    //     console.log("Email:", email);
    //     console.log("Password:", password);
    // };

    return (

        <div className="flex min-h-screen flex-col items-center justify-center" style={{ backgroundColor: '#f0f0f0', color: '#333' }}>
            <div className="container mx-auto flex max-w-md flex-col items-center px-4">
                <div className="mb-8 flex w-full items-center justify-center">
                    <h1 className="text-3xl font-bold" style={{ color: '#333' }}>Login</h1>
                </div>
                <div className="w-full bg-white p-6 rounded-lg shadow-lg">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div className="relative">
                                <label htmlFor="email" style={labelStyle}>Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    style={{ backgroundColor: '#f0f0f0', color: '#333' }}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" style={labelStyle}>Password</label>
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    value={Password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={{ backgroundColor: '#f0f0f0', color: '#333' }}
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ backgroundColor: 'transparent', border: 'none', marginTop: '12px' }} // Optional: Make the button background transparent
                                >
                                    <EyeIcon />
                                    <span className="sr-only">Toggle password visibility</span>
                                </button>
                            </div>

                        </div>
                        <div className="flex items-center justify-between">
                            <a href="#" className="text-sm" style={{ color: '#007BFF', textDecoration: 'underline' }}>
                                Forgot Password?
                            </a>
                        </div>
                        <Button onClick={handleLogin} className="w-full p-2 rounded block text-center" style={{ backgroundColor: '#333', color: '#fff' }}>
                            Login
                        </Button>
                        <button type="button" className="w-full border p-2 rounded flex items-center justify-center" style={{ borderColor: '#333', color: '#333' }}>
                            <MailIcon />
                            <span className="ml-2">Login with Gmail</span>
                        </button>
                    </form>
                    <div className="mt-4 text-center text-sm" style={{ color: '#333' }}>
                        Don't have an account?{" "}
                        <NavLink to="/signup" className="font-medium" style={{ color: '#007BFF', textDecoration: 'underline' }}>
                            Sign Up
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EyeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            style={{ color: '#333' }}
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function MailIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
            style={{ color: '#333' }}
        >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
    );
}

export default LoginPage;
