import { useState } from "react";
import { useDispatch } from "react-redux";
//we have to create a thunk function for creating a goal
import { createDistributor } from '../../features/distributers/distributerSlice'

function DistributorForm() {

    //state for the form
    const [formData, setFormData] = useState({
        name: '',
        product: '',
        address: '',
    })

    //de-structure the fields from that
    const { name, product , address } = formData;

    const dispatch = useDispatch()

    const onChange = (e) => {
        //we pass function to set form data
        //we are setting form data to an object
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = e => {
        e.preventDefault()

        const distributorData = {
            name,
            product,
            address,
        }

        //dispatch the function call createDistributor
        //pass the object with the text
        dispatch(createDistributor(distributorData))
        //clear the form
        //setText('')
    }

    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <label htmlFor="name">Distributor Name</label>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        value={name}
                        onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="product">Distributor Product</label>
                    <input
                        type="text"
                        name='product'
                        id='product'
                        value={product}
                        onChange={onChange} />
                </div>
                <div className='form-group'>
                    <label htmlFor="address">Distributor Address</label>
                    <input
                        type="text"
                        name='address'
                        id='address'
                        value={address}
                        onChange={onChange} />
                </div>
                <div className='form-group'>
                    <button
                        className='submit-btn'
                        type='submit'>
                        ADD DISTRIBUTOR
                    </button>

                </div>
            </form>
        </section>

    )
}


export default DistributorForm