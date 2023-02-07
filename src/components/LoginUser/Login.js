import React, { useState } from "react";
import "./Login.css"
import axios from "axios"
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const Login = ({ setUser }) => {
    const navigate = useNavigate()

    const [user, setLoginUser] = useState({
        phoneNumber: "",
        password: ""
    })

    const [passwordType, setPasswordType] = useState("password");


    const handleChange = (e) => {
        const { name, value } = e.target
        setLoginUser({
            ...user,
            [name]: value
        })
    }

    const login = async () => {
        try {
            const result = await axios.post("http://localhost:8080/login-user", user)
            alert(result.data.message)
            navigate("/order")
            setUser(result)

        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }

    return (
        <div className="login">
            <h1 >Login In</h1>
            <div className="number">
                <input type="number" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number"></input>
            </div>
            <div className="password">
                <input type={passwordType} name="password" value={user.password} onChange={handleChange} placeholder="Password">
                </input>
                {passwordType === "password" ? <FaRegEye onClick={togglePassword} style={{ fill: "black", height: "1.5em", width: "1.5em", cursor: "pointer", paddingLeft: "10px" }} /> : <FaRegEyeSlash onClick={togglePassword} style={{ fill: "black", height: "1.5em", width: "1.5em", cursor: "pointer" }} />}
            </div>
            <div className="button" onClick={login}>
                <div className="loginb">
                    Login
                </div>
            </div>
            <div className="button" onClick={() => navigate("/")}>Sign Up</div>
        </div>
    )

}

export default Login