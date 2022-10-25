import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
//use the useDispatch in order to get the distributors
import { useSelector, useDispatch } from "react-redux";
import Spinner from '../components/Spinner'

//import the distributor form components
import DistributorForm from "../components/distributorComponent/DistributorForm";

import DistributorItem from "../components/distributorComponent/DistributorItem";
import { getDistributors, reset } from "../features/distributers/distributerSlice";

function Distributors() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user } = useSelector((state) => state.auth)
    const { distributors, isLoading } = useSelector(
        (state) => state.distributors
    )

    useEffect(() => {

        if (!user) {
            navigate('/login')
        }

        //dispatch our distributors
        // get the distributors from the back end put in the line 19 goals, so we can access it
        dispatch(getDistributors())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    //now we want to show our goals using 19 line goals//from state
    //add expression

    return (
        <>
            <section className='heading'>
                <p>{user && user.name} Distributors Dashboard</p>
            </section>

            <DistributorForm />

            <section className='content'>
                {distributors.length > 0 ? (
                    <div className='items'>
                        {distributors.map((distributor) => (
                            <DistributorItem key={distributor._id} distributor={distributor} />
                        ))}
                    </div>
                ) : (
                    <h3>You have Not any Distributors</h3>
                )}
            </section>

        </>
    )
}

export default Distributors;