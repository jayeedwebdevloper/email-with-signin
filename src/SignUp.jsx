/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from './firebase.init';
import { Link } from 'react-router-dom';

const auth = getAuth(app);


const SignUp = () => {

    const [errorPass, setErrorPass] = useState('');
    const [match, setMatch] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');


    const register = (e) => {
        setSuccess('');

        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmPassword.value;
        const photo = form.photo.value;
        const fullName = firstName + ' ' + lastName;

        if (!/(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}/.test(password)) {
            setErrorPass('please provide strong password (include: capital letter, small letter, number, minimum 8 characters, special characters)')
        } else {
            setErrorPass('')
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            form.reset();
            setSuccess('Your Account Successfully Created');
            profile(fullName, photo);
            sendEmailVerification(auth.currentUser)
            .then(()=>{
                alert('We Sent Verification Link in Your Email, Please Check and Verify Your Email Address');
            });

        }).catch(error => {
            setError(error.message);
        })

        const profile = (fullName, photo) => {
            updateProfile(auth.currentUser, {
                displayName: fullName,
                photoURL: photo
            })
        }
        
    }
    const confirmPass = () => {
        const password = document.getElementById('inputPassword').value;
        const cPassword = document.getElementById('inputPasswordC').value;
        const submit = document.getElementById('submit');

        if(password != cPassword){
            setMatch('Please Match Your Password');
            submit.setAttribute('disabled', true);
        } else {
            setMatch('');
            submit.removeAttribute('disabled');
        }
    }
    const newPass = () => {
        const password = document.getElementById('inputPassword').value;
        const cPassword = document.getElementById('inputPasswordC').value;
        const submit = document.getElementById('submit');

        if(password != cPassword){
            setMatch('Please Match Your Password');
            submit.setAttribute('disabled', true);
        } else {
            setMatch('');
            submit.removeAttribute('disabled');
        }
    }

    return (
        <div className='container'>
            <div className="d-flex align-items-center justify-content-center height w-100">

                <form className='shadow px-5 pb-5 pt-3 w-75 rounded-4' onSubmit={register}>
                    <h3 className='text-secondary fw-semibold'>Register Your Account</h3>
                    <div className="row mb-3">
                        <label htmlFor="inputName" className="col-12 col-form-label">First Name</label>
                        <div className="col-12">
                            <input type="text" required name='firstName' className="form-control" id="inputName" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputNameLast" className="col-12 col-form-label">Last Name</label>
                        <div className="col-12">
                            <input type="text" required name='lastName' className="form-control" id="inputNameLast" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputEmail3" className="col-12 col-form-label">Email</label>
                        <div className="col-12">
                            <input type="email" required name='email' className="form-control" id="inputEmail3" />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-12 col-form-label">Password</label>
                        <div className="col-12">
                            <input type="password" required onKeyUp={newPass} name='password' className="form-control" id="inputPassword" />
                            <p className='text-danger mt-2 mb-0'>{
                                errorPass
                            }</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label htmlFor="inputPassword3" className="col-12 col-form-label">Confirm Password</label>
                        <div className="col-12">
                            <input type="password" onKeyUp={confirmPass} required name='confirmPassword' className="form-control" id="inputPasswordC" />
                            <p className='text-danger mt-2 mb-0'>{match}</p>
                        </div>
                    </div>

                    <label className="form-label" htmlFor="inputGroupFile02">Upload Your Photo</label>
                    <div className="input-group mb-3">
                        <input type="file" required name='photo' className="form-control" id="inputGroupFile02" />
                    </div>
                    <p className='text-danger'>{error}</p>
                    <p className="text-success">{success}</p>
                    <button type="submit" id='submit' className="btn btn-primary w-100">Sign Up</button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;