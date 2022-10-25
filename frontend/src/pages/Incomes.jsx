import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
//use the useDispatch in order to get the products
import {useSelector, useDispatch} from "react-redux";
import Spinner from '../components/Spinner'

//import the product form components
import IncomeForm from "../components/incomeComponents/IncomeForm";

import IncomeItem from "../components/incomeComponents/IncomeItem";
import {getIncomes,reset} from "../features/incomes/incomeSlice";

function Incomes() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth )
    const {incomes, isLoading} = useSelector(
        (state) => state.incomes
    )

    useEffect(() => {

        if(!user){
            navigate('/login')
        }

        //dispatch our incomes
        // get the incomes from the back end put in the line 19 goals, so we can access it
        dispatch(getIncomes())

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
                <p>{user && user.name} Incomes Dashboard</p>
            </section>

            <IncomeForm/>

            <section className='content'>
                {incomes.length > 0 ? (
                    <div className='items'>
                        {incomes.map((income) => (
                            <IncomeItem key={income._id} income={income} />
                        ))}
                    </div>
                ) : (
                    <h3>You have Not any Incomes</h3>
                )}
            </section>

        </>
    )
}

export default Incomes;