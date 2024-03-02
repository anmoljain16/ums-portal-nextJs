"use client";

import './style.css';
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {redirect, useRouter} from "next/navigation";
import axios from "axios";

export default function Signup() {

    const router = useRouter();
    const [user, setUser] = useState({
        username:'',
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!user.username){
            setError('Username!')
            return
        }

        if(!user.email){
            setError('Email!')
            return
        }

        if (!user.password){
            setError('Password!')
            return
        }



        try{
            setLoading(true)
            const response = await axios.post('/api/user/signup', user);
            console.log(response)
            if(response.data.error){
                setLoading(false)
                setError(response.data.error)
                return
            }
            console.log(response.data)
            router.push('/')

        }catch (e) {
            console.log(`Error: ${e}`)
            return
        }

        setError('')
        setLoading(false)



    }

    useEffect(() => {
        if (error) {
            alert(error)
            setLoading(false)
        }
    }, []);

    return (
        <>

            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form>
                {/*<h3>{ error ? `${error}` : ""}</h3>*/}
                {loading ? <h3><span className="text-green-600"> Loading... </span></h3> :
                    <h3>{!error ? `Sign Up` : <span className="text-red-600">{error}</span>}</h3>}

                <label htmlFor="username">Username</label>
                <input type="text" placeholder="Username" id="username" onChange={
                    (e) => setUser({...user, username: e.target.value})
                }/>

                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email" id="email" onChange={
                    (e) => setUser({...user, email: e.target.value})
                }/>

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange={
                    (e) => setUser({...user, password: e.target.value})
                }/>

                <button onClick={
                    handleSubmit
                } disabled={loading}
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}
                        }>Sign Up
                </button>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i> Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i> <Link href="/login">Login</Link></div>
                </div>
            </form>
        </>
    )
}


