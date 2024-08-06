import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/AuthStyles.css";
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth()
    const location = useLocation()

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                toast.success("login success")
                navigate(location.state || '/')
            } else {
                toast.error(res.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        }
    }
    return (
        <Layout>
            <div className="form-container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='Enter your email' id="exampleInputEmail" required aria-describedby="emailHelp" />

                    </div>

                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter your password' className="form-control" required id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">

                        <button type="button" className="btn btn-primary" onClick={() => {
                            navigate("/forgot-password")
                        }}>Forgot Password</button>

                    </div>

                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        </Layout>
    )
}


export default Login;