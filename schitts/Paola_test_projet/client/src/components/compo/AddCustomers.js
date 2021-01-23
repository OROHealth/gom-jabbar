import React, { useEffect, useState } from 'react';
import AddOrders from './AddOrders';
import { StyleAddCustomers } from '../../styles/styled-components/StyleAddCustomers';

// Importing toastify module 
import {toast} from 'react-toastify';  
  
// Import toastify css file 
import 'react-toastify/dist/ReactToastify.css';  
  
 // toast-configuration method,  
 // it is compulsory method. 
toast.configure() 


const axios = require('axios').default;


const AddCustomers = ({TheOrderId, numberCustomer}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState("");

    const [customerStillAdd, setCustomerStillAdd] = useState(numberCustomer);
    const [state, setState] = useState({newCustomer: []});
    const [showCustomerForm, setShowCustomerForm] = useState(true);
    const [showOrderButton, setShowOrderButton] = useState(false);
    const [showOrderComponent, setShowOrderComponent] = useState(false);
    

    //
    useEffect(() => {
        (customerStillAdd === 0) ? toast.info(`all customers have been added`)
            : toast.info(`Still ${customerStillAdd} customers to add`);
    }, [customerStillAdd]);


    //
    function handleAddCustomer(e) {
        e.preventDefault();

        if (customerStillAdd <= 0) {
            toast.info("all customers have been added");
            return;
        } else {
            
            // post the customer's name and type in database
            axios({
                method: "post",
                url: `${process.env.REACT_APP_API_URL}api/customer/`,
                withCredentials: true,
                data: {
                    name_customer: name,
                    type_customer: type
                },
            }).then((res) => {
                if(res.data.errors){
                    toast.error("error post!!");
                }
                else{
                    setState({newCustomer: [res.data]})
                }
            }).catch((err)=>{
                console.log(err);
            });
            
            setCustomerStillAdd((oldNumber) => oldNumber - 1);                    
        }

        setShowOrderButton(true);
    }

    //change state
    function handleChangeState(){
        setShowCustomerForm(false);
        setShowOrderButton(false);
        setShowOrderComponent(true);
    }

    return(
        <StyleAddCustomers>
            {
                //add name and type of customer
                showCustomerForm &&
                <div className="container">
                <h4>New customer</h4>
                <form action="" onSubmit={handleAddCustomer}>
                    <label htmlFor="name">Name</label>
                    <input 
                        placeholder="Enter customer" 
                        name="name" 
                        id="name"
                        required="required"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <label htmlFor="type">Type</label>
                    <input 
                        placeholder="Enter type of customer" 
                        name="type" 
                        id="type"
                        required="required"
                        onChange={(e) => setType(e.target.value)}
                        value={type}
                    />
                    <div id="buttons">
                        <button className="button" type="submit">Submit</button>
                    </div>
                </form>
                {
                    //is show when the customer was add
                    showOrderButton && 
                    <div id="bout"><button className="button1" onClick={handleChangeState}>Associate an order</button></div>
                }
            </div>               
            }
            {
                //is show when we click on "associate an order"
                showOrderComponent && 
                state.newCustomer.map(cus => 
                    <AddOrders
                        key={cus.toString()} 
                        TheCustomerId = {cus._id}
                        TheOrderId={TheOrderId}
                        numberCustomer={numberCustomer}
                    />)
            }     
        </StyleAddCustomers>
    );
};

export default AddCustomers;


