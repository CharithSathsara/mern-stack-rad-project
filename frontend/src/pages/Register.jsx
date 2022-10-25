import React from "react";
import {useState, useEffect} from "react";
//we have to dispatch the register function
import {useSelector, useDispatch} from "react-redux";
//useSelector => use to select something from state, bring the user, isLoading things
//useDispatch => dispatch the function
import {useNavigate} from "react-router-dom";
//useNavigate => in order to redirect
import {toast} from "react-toastify";
import {register, reset } from '../features/authentication/authSlice'
import Spinner from '../components/Spinner'

function Register() {

    //state for the form
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:''
    })

    //de-structure the fields from that
    const {name, email, password} = formData;
    console.log(formData)

    //de-structure the form data
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )

    useEffect( ()=>{

        if(isError){
            toast.error(message)
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
            name,
            email,
            password
        }

        //when we submit, we want to dispatch our register function
        dispatch(register(userData))
    }

    if(isLoading){
        return <Spinner />
    }

    return (

        <>
            <section className='heading'>
                <h1>Register Your SuperMarket Branch</h1>
            </section>

            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type='text'
                               id='name'
                               name='name'
                               value={name}
                               placeholder='Enter Your Branch Name'
                               onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input type='email'
                               id='email'
                               name='email'
                               value={email}
                               placeholder='Enter Your Email'
                               onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <input type='password'
                               id='password'
                               name='password'
                               value={password}
                               placeholder='Enter Your Password'
                               onChange={onChange}
                        />
                    </div>
                    <div className='form-group'>
                        <button type='submit' className='submit-btn'>
                            Register
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Register;