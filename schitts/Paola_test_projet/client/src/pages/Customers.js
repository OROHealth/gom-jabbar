import React, { useState } from 'react';
import axios from 'axios';

//import style
import {StyleAddCustomers} from '../styles/styled-components/StyleAddCustomers';
//import { useHistory } from 'react-router-dom';

// Importing toastify module 
import {toast} from 'react-toastify'; 

const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}api/customer/search`
})

export default function Customers() {
    const [state, setState] = useState({customers: []});
    // const [name, setName] = useState("");
    const [type, setType] = useState("");


    const addCustomer = (e) =>{
        e.preventDefault();
        
        //query data from database
        try {
            api.get(`/${type}`, {
            }).then((res) => {
                if(res.data.errors){
                    toast.error("error get!!");
                }
                else{
                    setState({customers: [res.data]});
                } 
            });
        } catch(err){
            console.log(err);
        }
    }

    return(
        <StyleAddCustomers>
            <div className="container">
                <h4>Search customer</h4>
                 <form action="" onSubmit={addCustomer}> 
                    {/* <input 
                        placeholder="Enter customer" 
                        name="name" 
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    /> */}
                    <label htmlFor="type">Type of customer</label>
                    <input 
                        placeholder="Enter type of customer" 
                        name="type" 
                        id="type"
                        onChange={(e)=>setType(e.target.value)}
                        value={type}
                    />
                     <div id="buttons">
                        <button className="button" type="submit">Submit</button>
                    </div> 
                </form> 
            </div>
            <div className="containerfluide">
            <div className="results">
                <h4>Results</h4> 
                <div> 
                    {/* show query results */}
                    <table>
                        <thead>
                            <tr>
                                <th>Customers</th>
                                <th>Types</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                state.customers.map((cust) => 
                                    cust.map(((type, index) =>
                                        <tr key={index}>
                                            <td>{type.name_customer}</td>
                                            <td>{type.type_customer}</td>   
                                        </tr>                                            
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </StyleAddCustomers>
    );
};


