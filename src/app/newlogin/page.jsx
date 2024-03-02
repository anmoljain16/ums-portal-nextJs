"use client";

import './style.css';
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {useRouter} from "next/navigation";
import axios from "axios";
import {signIn} from "next-auth/react";

export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()



        try {
            setLoading(true)
            const response = await signIn('credentials', {
                redirect: false,
                email: user.email,
                password: user.password
            })

            if (response.error) {
                setError(response.error)
                return;
            }

            router.push('/')

        } catch(error) {
            setError('Failed to log in')
        }

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

                {loading ? <h3><span className="text-green-600"> Loading... </span></h3> : <h3>{!error ? `New Log in` : <span className="text-red-600">{error}</span>}</h3>}

                <label htmlFor="email">Email</label>
                <input type="text" placeholder="Email" id="email" onChange={
                    (e) => setUser({...user, email: e.target.value})
                } />

                <label htmlFor="password">Password</label>
                <input type="password" placeholder="Password" id="password" onChange={
                    (e) => setUser({...user, password: e.target.value})
                }/>

                <button onClick={
                    handleSubmit
                } disabled={loading}
                        style={{cursor: loading ? 'not-allowed' : 'pointer'}
                        } >Log In</button>
                <div className="social">
                    <div className="go"><i className="fab fa-google"></i> Google</div>
                    <div className="fb"><i className="fab fa-facebook"></i> <Link href="/signup">Signup</Link></div>
                </div>
            </form>
        </>
    )
}
