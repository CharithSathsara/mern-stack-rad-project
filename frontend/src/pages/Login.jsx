import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {login,reset} from "../features/authentication/authSlice";
import Spinner from "../components/Spinner";

function Login() {

    //state for the form
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })

    //de-structure the fields from that
    const {email, password} = formData;
    console.log(formData)

    //de-structure the form data
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )

    useEffect( ()=>{

        if(isError){
            toast.error("Invalid Login")
        }

        if(isSuccess || user){
            navigate('/home')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])


    //Remember if you set these inputs to state values we need to
    //take care of the event. so when we type in that fields on change
    //fires off, and we need to update the state
    //So, we do that by calling setFormData
    //setting it to whatever we are typing.
    //setFormData is a one object
    const onChange = (e) => {
        //we pass function to set form data
        //we are setting form data to an object
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name] : e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>Login to Your SuperMarket Branch</h1>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            name='email'
                            value={email}
                            placeholder='Please Enter your Branch email'
                            onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='password'
                            className='form-control'
                            id='password'
                            name='password'
                            value={password}
                            placeholder='Please Enter Password'
                            onChange={onChange}
                        />
                    </div>

                    <div className='form-group'>
                        <button type='submit' className='submit-btn'>
                            Login
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login;