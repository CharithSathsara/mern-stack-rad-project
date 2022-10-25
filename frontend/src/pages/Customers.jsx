import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
//use the useDispatch in order to get the customers
import {useSelector, useDispatch} from "react-redux";
import Spinner from '../components/Spinner'

//import the customer form components
import CustomerForm from "../components/customerComponents/CustomerForm";

import CustomerItem from "../components/customerComponents/CostomerItem";
import {getCustomers,reset} from "../features/customers/customerSlice";

function Customers() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth )
    const {customers, isLoading} = useSelector(
        (state) => state.customers
    )

    useEffect(() => {

        if(!user){
            navigate('/login')
        }

        //dispatch our customers
        // get the customers from the back end put in the line 19 goals, so we can access it
        dispatch(getCustomers())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch])

    if(isLoading){
        return <Spinner />
    }

    //now we want to show our goals using 19 line goals//from state
    //add expression

    return (
        <>
            <section className='heading'>
                <p>{user && user.name} Customers Dashboard</p>
            </section>

            <CustomerForm/>

            <section className='content'>
                {customers.length > 0 ? (
                    <div className='items'>
                        {customers.map((customer) => (
                            <CustomerItem key={customer._id} customer={customer} />
                        ))}
                    </div>
                ) : (
                    <h3>You have Not any Customers</h3>
                )}
            </section>

        </>
    )
}

export default Customers;