import React, {useRef, useState } from 'react';
import Select from 'react-select';
import Home from '../../pages/Home';
import {StyleAddOrder} from '../../styles/styled-components/StyleAddOrder';

const axios = require('axios').default;

const options = [
    {value: 'Group', label: 'Group'},
    {value: 'Person', label: 'Person'},
    {value: 'Ratios', label: 'Ratios'},
];

const Bill = ({TheOrderId}) => {
    const div = useRef(null);
    const [feedback, setFeedback] = useState("");
    const [splitBill, setSplitBill] = useState("");
    const [state, setState] = useState({total: []});

    const [billTrue, setBillTrue] = useState(false);
    const [totalBi, setTotalBi] = useState(true);
    const [home, setHome] = useState(false);

    const [lock, setLock] = useState(false);

    function open(){
        setBillTrue(true);
        setTotalBi(false);

        //get the total bill
        axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/order/total/${TheOrderId}`,
        }).then((res) => {
            if(res.data.errors){
                alert("error");
            }
            else{
                setState({total: [...res.data]});
            }
        }).catch((err)=>{
            console.log(err);
        })
    };

    function EndOrder(e) {
        e.preventDefault();

        //update the created order by adding the bill and feedback
        axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/order/${TheOrderId}`,
            withCredentials: true,
            data: {
                bill: parseInt(state.total.map(totalB => 
                        totalB.totalBill
                ), 10),
                split_bill: splitBill.value,
                feedback: feedback
            },
        }).then((res) => {
            if(res.data.errors){
                alert("problem!!");
            }
            else{
                setHome(true);
                setLock(true);
                div.current.style.display = 'none';
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    //changing the split bill state
    const handleChange = splitBill =>{
        setSplitBill(splitBill);
        console.log(splitBill.value);
    }

    return(
        <div>
        <StyleAddOrder ref={div}>
            {
                //appears after click on "Click here to see the total of bill"
                billTrue &&
                    <div>
                        <div className="containeur">
                            <form id="form1" action="" onSubmit={EndOrder}>
                                <div>
                                    <h4>Total bill</h4>
                                    {
                                        state.total.map((totalB, index) => 
                                            <div key={index}>
                                                <h5>${totalB.totalBill}</h5>
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="option3">
                                    <label>Split of the bill</label>
                                    <Select 
                                        value={splitBill}
                                        onChange={handleChange} 
                                        options={options}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="feedback">Feedback</label>
                                    <textarea 
                                        id="feedback"
                                        name="feedback"
                                        placeholder="Enter feedback"
                                        rows={7}
                                        onChange={(e) => setFeedback(e.target.value)}
                                        value={feedback}
                                    />
                                </div>
                                <div id="buttons">
                                    <button className="button" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
            } 
            {
                //main screen
                totalBi &&
                <div className="buttonTotalBill">
                    <button id ="buttonTotal" onClick={open}>Click here to see the total of bill</button>
                </div>
                
            }
        </StyleAddOrder>
        <div>
            {
                //return to home page when we submit the bill
                home &&
                    <Home lock={lock}/>
            }
        </div>

        </div>
    );
};

export default Bill;
