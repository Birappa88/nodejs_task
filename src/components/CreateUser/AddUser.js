import React, { useState } from "react"
import "./AddUser.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

const AddUser = () => {

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: "",
        phoneNumber: "",
        password: "",
    })

    const [passwordType, setPasswordType] = useState("password");

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = async () => {
        try {
            const { name, phoneNumber, password } = user

            if (name && phoneNumber && password) {
                const response = await axios.post("http://localhost:8080/add-user", user)
                alert(response.data.message)
                navigate("/login")
            }
            else {
                alert("inavlid input")
            }
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
        <div className="register">
            <h1 >Sign Up</h1>
            <div className="name">
                <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="User Name"></input>
            </div>
            <div className="phoneNumber">
                <input type="number" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} placeholder="Phone Number"></input>
            </div>
            <div className="password">
                <input type={passwordType} name="password" value={user.password} onChange={handleChange} placeholder="Password"></input>
                {passwordType === "password" ? <FaRegEye onClick={togglePassword} style={{ fill: "black", height: "1.5em", width: "1.5em", cursor: "pointer", paddingLeft: "10px" }} /> : <FaRegEyeSlash onClick={togglePassword} style={{ fill: "black", height: "1.5em", width: "1.5em", cursor: "pointer" }} />}

            </div>
            <div className="button" onClick={register}>
                <div className="registerb">
                    Register
                </div>
            </div>
            <div className="button" onClick={() => navigate("/login")}>Login</div>

        </div>
    )
}

export default AddUser