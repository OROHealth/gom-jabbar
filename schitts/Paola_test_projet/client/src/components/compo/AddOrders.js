import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AddCustomers from "./AddCustomers";
import Bill from './Bill';
import { StyleAddOrder } from '../../styles/styled-components/StyleAddOrder';

// Importing toastify module 
import {toast} from 'react-toastify';  
  
// Import toastify css file 
import 'react-toastify/dist/ReactToastify.css';  

  
 // toast-configuration method,  
 // it is compulsory method. 
toast.configure(); 

const axios = require('axios').default;

//value for cooking level
const options = [
    {value: 1, label: 'level 1'},
    {value: 2, label: 'level 2'},
    {value: 3, label: 'level 3'},
    {value: 4, label: 'level 4'},
    {value: 5, label: 'level 5'},
    {value: 6, label: 'level 6'},
    {value: 7, label: 'level 7'},
    {value: 8, label: 'level 8'},
    {value: 9, label: 'level 9'},
    {value: 10, label: 'level 10'},
];

//value for the customer's tone
const optionsTone = [
    {value: 'Angry', label: 'Angry'},
    {value: 'Happy', label: 'Happy'},
    {value: 'Pregnant', label: 'Pregnant'},
    {value: 'Bored', label: 'Bored'},
    {value: 'Overwhelmed', label: 'Overwhelmed'},
    {value: 'Moody', label: 'Moody'},
    {value: 'Excited', label: 'Excited'},
]

const AddOrders = ({TheOrderId, TheCustomerId, numberCustomer}) => {
    const [food, setFood] = useState("");
    const [drink, setDrink] = useState("");
    const [priceFood, setPriceFood] = useState("");
    const [priceDrink, setPriceDrink] = useState("");
    const [levelCookedness, setLevelCookedness] = useState("");
    const [tone, setTone] = useState("");

    const [orderStillAdd, setdecrementNumber] = useState(numberCustomer);
    const [showComponentAddCustomer, setShowComponentAddCustomer] = useState(false);
    const [showOrderForm, setShowOrderForm] = useState(true);
    const [showComponentBill, setshowComponentBill] = useState(false);
    const [showButtonBill, setShowButtonBill] = useState(false);
    const [showButtonAddCustomer, setShowButtonAddCustomer] = useState(true);

    //
    useEffect(() => {
        if ((orderStillAdd === 0)) {
            toast.info("all order have been added");
            setShowButtonAddCustomer(false);
            setShowButtonBill(true); 
        } else {
            toast.info(`Still ${orderStillAdd} orders to add`); 
        }
    }, [orderStillAdd]);
    

    function handleAddCustomer() {
        setShowComponentAddCustomer(true);
        setShowOrderForm(false);
        setshowComponentBill(false);   
    };

    function handelSwitchToBill(){
        setShowComponentAddCustomer(false);
        setShowOrderForm(false);
        setshowComponentBill(true);
    }

    function handleAddOrder(e) {
        e.preventDefault();
        
        if (orderStillAdd <= 0) {
            setShowButtonAddCustomer(false);
            setShowButtonBill(true);
        } else {
            //patch the order item into the order
            axios({
                method: "patch",
                url: `${process.env.REACT_APP_API_URL}api/order/add-order/${TheOrderId}`,
                withCredentials: true,
                data: {
                    customerId: TheCustomerId,
                    food: food,
                    drink: drink,
                    priceFood: priceFood,
                    priceDrink: priceDrink,
                    level_cookedness: levelCookedness.value,
                    tone: tone.value,
                },
            }).then((res) => {
                if (res.data.errors) {
                    toast.error("problem!!");
                }
            }).catch((err) => {
                console.log(err);
            });        

            setdecrementNumber((oldNumber) => oldNumber - 1);
        }
    }


    //changing the cooking level state
    const handleChangeLevel = levelCookedness =>{
        setLevelCookedness(levelCookedness);
        console.log(levelCookedness.value);
    }

    //changing the tone state
    const handleChangeTone = tone =>{
        setTone(tone);
        console.log(tone.value);
    }

    return(
        <StyleAddOrder>
            {
                //appears when we want to add another customer in the order
                showComponentAddCustomer &&
                <div >
                    {
                            <AddCustomers 
                                TheOrderId={TheOrderId}
                                numberCustomer={numberCustomer-1}
                            />
                    }
                    {/* <AddCustomers TheOrderId = {state.newOrder._id}/> */}
                </div> 
            }
            {
                //main screen 
                showOrderForm &&
                    <div>
                        <div className="containeur">
                            <h4>New Order</h4>
                            <form id="form" action="" onSubmit={handleAddOrder}>
                                <div className="food">
                                    <div >
                                        <label htmlFor="food">Food</label>
                                        <input 
                                        id="food"
                                        placeholder="Enter food" 
                                        name="food" 
                                        onChange={(e) => setFood(e.target.value)}
                                        value={food}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="pricef">Price</label>
                                        <input 
                                        id="pricef"
                                        placeholder="Enter price of food" 
                                        name="priceFood" 
                                        onChange={(e) => setPriceFood(e.target.value)}
                                        value={priceFood}
                                        />
                                    </div>
                                </div>
                                <div className="drink">
                                    <div>
                                        <label htmlFor="drink">Drink</label>
                                        <input 
                                        id="drink"
                                        placeholder="Enter drink" 
                                        name="drink" 
                                        required="required"
                                        onChange={(e) => setDrink(e.target.value)}
                                        value={drink}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="priced">Price</label>
                                        <input 
                                        id="priced"
                                        placeholder="Enter price of drink" 
                                        name="priceDrink" 
                                        required="required"
                                        onChange={(e) => setPriceDrink(e.target.value)}
                                        value={priceDrink}
                                        />
                                    </div>
                                </div>
                                <div className="option">
                                    <div className="option1">
                                        <label>Level cookedness</label>
                                        <Select 
                                            value={levelCookedness}
                                            onChange={handleChangeLevel} 
                                            options={options}
                                        />
                                    </div>
                                    <div className="option2">
                                        <label>Tone</label>
                                        <Select 
                                            value={tone}
                                            onChange={handleChangeTone} 
                                            options={optionsTone}
                                        />
                                    </div>
                                </div>
                                <div id="buttons">
                                    <button className="button" type="submit">Submit</button>
                                </div>
                        </form>
                        {
                            showButtonAddCustomer && 
                            <button id="buttonFlui" onClick={handleAddCustomer}>add customer</button>                           
                        }
                        
                        {
                            showButtonBill &&
                            <button id="buttonBill" onClick={handelSwitchToBill}>Bill --</button>
                        }               
                        </div>
                    </div>
            } 
            {
                //appears when we click on "bill"
                showComponentBill &&
                <Bill TheOrderId = {TheOrderId} />
            }
        </StyleAddOrder>
    );
};

export default AddOrders;
