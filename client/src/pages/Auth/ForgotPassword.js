import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import "../../styles/AuthStyles.css";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const ForgotPassword = () => {


    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [answer, setAnswer] = useState("")

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, newPassword, answer });
            if (res && res.data.success) {
                toast.success(res && res.data.message)

                navigate("/login")
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
                    <h4 className='title'>RESET PASSWORD</h4>
                    <div className="mb-3">
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder='Enter your email' id="exampleInputEmail" required aria-describedby="emailHelp" />

                    </div>

                    <div className="mb-3">

                        <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='Enter your password' className="form-control" required id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder='Enter your favourite sport' className="form-control" required id="exampleInputPassword1" />
                    </div>


                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>

            </div>
        </Layout>
    )
}

export default ForgotPassword