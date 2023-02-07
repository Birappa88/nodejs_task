import React, { useState } from "react"
import "./AddOrder.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const AddOrder = ({ setUser , user}) => {

    const navigate = useNavigate()

    const [order, setOrder] = useState({
        userId: "",
        phoneNumber: "",
        sub_total: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setOrder({
            ...order,
            [name]: value
        })
    }
    const logout = () => {
        setUser({ })
        navigate("/login")
    }
    const AddOrder = async () => {
        try {
            const { userId, phoneNumber, sub_total } = order

            if (userId && phoneNumber && sub_total) {
                const response = await axios.post("http://localhost:8080/add-order", order)
                alert(response.data.message)
            }
            else {
                alert("inavlid input")
            }
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    return (
        <div className="AddOrder">
            <h1 >Order</h1>
            <div className="name">
                <input type="text" name="userId" value={order.userId} onChange={handleChange} placeholder="Order UserId"></input>
            </div>
            <div className="phoneNumber">
                <input type="number" name="phoneNumber" value={order.phoneNumber} onChange={handleChange} placeholder="Phone Number"></input>
            </div>
            <div className="total">
                <input type="number" name="sub_total" value={order.sub_total} onChange={handleChange} placeholder="sub_total"></input>
                </div>
            <div className="button" onClick={AddOrder}>
                <div className="AddOrderb">
                    AddOrder
                </div>
            </div>
            <div className="button" onClick={() => logout()}>Logout</div>

        </div>
    )
}

export default AddOrder