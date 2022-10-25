import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
//use the useDispatch in order to get the products
import {useSelector, useDispatch} from "react-redux";
import Spinner from '../components/Spinner'

//import the product form components
import ProductForm from "../components/productComponents/ProductForm";

import ProductItem from "../components/productComponents/ProductItem";
import {getProducts,reset} from "../features/products/productSlice";

function Products() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user} = useSelector((state) => state.auth )
    const {products, isLoading} = useSelector(
        (state) => state.products
    )

    useEffect(() => {

        if(!user){
            navigate('/login')
        }

        //dispatch our products
        // get the products from the back end put in the line 19 goals, so we can access it
        dispatch(getProducts())

        return () => {
            dispatch(reset())
        }

    }, [user, navigate, dispatch])

    if(isLoading){
        return <Spinner />
    }

    //now we want to show our products using 19 line goals//from state
    //add expression

    return (
        <>
            <section className='heading'>
                <p>{user && user.name} Products Dashboard</p>
            </section>

            <ProductForm/>

            <section className='content'>
                {products.length > 0 ? (
                    <div className='items'>
                        {products.map((product) => (
                            <ProductItem key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <h3>You have Not any Products</h3>
                )}
            </section>

        </>
    )
}

export default Products;