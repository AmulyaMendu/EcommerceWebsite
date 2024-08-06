import React, { useState } from 'react'
import "../../styles/AuthStyles.css";

import Layout from '../../components/Layout/Layout'
import { toast } from "react-toastify"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, {
                name,
                email, password, phone, address, answer
            });
            if (res && res.data.message) {
                toast.success(res && res.data.message)
                navigate('/login')
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }

    return (
        <div>

            <Layout>
                <div className="form-container">
                    <h1> Register Page</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <input value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text" required className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' />
                        </div>
                        <div className="mb-3">
                            <input value={email} type="email" required
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control" id="exampleInputEmail1" placeholder='Enter your Email' />
                        </div>
                        <div className="mb-3">
                            <input value={password} required type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={phone}
                                onChange={(e) => setPhone(e.target.value)} required
                                className="form-control" id="exampleInputEmail1" placeholder='Phone Number' />
                        </div>
                        <div className="mb-3">
                            <input type="text" value={address}
                                onChange={(e) => setAddress(e.target.value)} required
                                className="form-control" id="exampleInputEmail1" placeholder='Address' />
                        </div>

                        <div className="mb-3">
                            <input type="text" value={answer}
                                onChange={(e) => setAnswer(e.target.value)} required
                                className="form-control" id="exampleInputEmail1" placeholder='what is your favourite sport' />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>

                </div>
            </Layout>
        </div>
    )
}

export default Register