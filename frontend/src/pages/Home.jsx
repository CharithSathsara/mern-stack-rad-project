import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";


function Home() {

    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth )

    useEffect(() => {

        if(!user){
            navigate('/login')
        }

    }, [user, navigate])

    return (
        <>
            <h1>Welcome to SuperMarket Management System</h1>
            <br/>
            <br/>
            <Link to='/products'>
                <button className='card-btn'>Go To Products</button>
            </Link>
            <Link to='/customers'>
                <button className='card-btn'>Go To Customers</button>
            </Link>
            <Link to='/distributors'>
                <button className='card-btn'>Go To Distributors</button>
            </Link>
            <Link to='/incomes'>
                <button className='card-btn'>Go To Incomes</button>
            </Link>
            <Link to='/expenditures'>
                <button className='card-btn'>Go To Expenditures</button>
            </Link>
        </>
    )

}

export default Home