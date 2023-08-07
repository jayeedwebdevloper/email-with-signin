/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from './firebase.init';
const auth = getAuth(app);

const SignIn = () => {
    const [error, setError] = useState('');
    const [user, setUser] = useState({})


    const login = (e) => {

        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                form.reset();
                setUser(user)

            }).catch(error => {
                setError(error.message);
            })
    }

    const resetPass = () => {
        const email = document.getElementById('inputEmail3').value;

        sendPasswordResetEmail(auth, email)
        .then(()=> {
            alert('Check Your Email Please')
        })
        .catch(error => {
            setError(error.message)
        })
    }
   
    return (
        <div className='container'>
            {
                user.uid ? <div className='py-3'>
                    <h3 className="text-secondary">Name: {user.displayName}</h3>
                    <h3 className="text-secondary">Email: {user.email}</h3>
                    <h3 className="text-secondary d-flex">Email-Verify: {user.email ? <p className='text-success fw-semibold ps-2'>Verified</p> : <p className='text-danger fw-semibold'>Not Verified</p>}</h3>
                </div> : <><div className="d-flex align-items-center justify-content-center height w-100">

                    <form className='shadow px-5 pb-5 pt-3 w-75 rounded-4' onSubmit={login}>
                        <h3 className='text-secondary fw-semibold'>Sign In Your Account</h3>
                        <div className="row mb-3">
                            <label htmlFor="inputEmail3" className="col-12 col-form-label">Email</label>
                            <div className="col-12">
                                <input type="email" required name='email' className="form-control" id="inputEmail3" />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="inputPassword3" className="col-12 col-form-label">Password</label>
                            <div className="col-12">
                                <input type="password" required name='password' className="form-control" id="inputPassword" />
                                <p className='text-primary pt-3 pointer' onClick={resetPass}>Forgot Password?</p>
                            </div>
                        </div>
                        <p className='text-danger'>{error}</p>
                        <button type="submit" id='submit' className="btn btn-primary w-100">Sign In</button>
                    </form>
                </div></>
            }
        </div>
    );
};

export default SignIn;