import React, {useRef, useState} from 'react';
import axios from 'axios';

//import components
import Modal from '../components/compo/Modal';
import AddCustomers from "../components/compo/AddCustomers";

//import image
import table from '../styles/assets/table.jpg';
import occupied from '../styles/assets/Capture.PNG'

//import style
import '../styles/sass/style.scss';
import {StyleHome} from '../styles/styled-components/StyleHome';


const Home = ({lock, id}) => {
    const buttonOpen = useRef(null);
    const modalElement = useRef(null);

    const [numberCustomer, setNumberCustomer] = useState(" ");
    const [state, setState] = useState({newOrder: []});
    const [showAddCustomersComponent, setShowAddCustomersComponent] = useState(false);
    const [showModalComponent, setShowModalComponent] = useState(true);
    const [showHome, setShowHome] = useState(true);

    function handleAddNumber(e) {
        e.preventDefault();
        
        modalElement.current.style.display = 'none';

        setShowHome(false);
        setShowModalComponent(false);
        setShowAddCustomersComponent(true);

        // post the number of customer and create the order in database
        axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/order/`,
            withCredentials: true,
            data: {
                nbr_customer: numberCustomer,
            },
        }).then((res) => {
            if(res.data.errors){
                alert("problem!!");
            }else{
                setState({newOrder: [res.data]});
            }
        }).catch((err)=>{
            console.log(err);
        })
    }
    console.log(id);

    return(
        <div>
            {
                //appears after entering the number of customers
                showAddCustomersComponent &&
                <div >
                    {/* { Add order ID as a props to associate the customer with the order */
                        state.newOrder.map(or => 
                            <AddCustomers 
                                key={or.toString()}
                                TheOrderId={or._id}
                                numberCustomer={numberCustomer}
                            />)
                    }
                    {/* <AddCustomers TheOrderId = {state.newOrder._id}/> */}
                </div> 
            }
            {
                //main screen
                showHome && 
                <StyleHome>
                    <h3>ROOM</h3>
                    <div className="contain">
                        <div className="table">
                            {
                                lock ?
                                    <img src={occupied} ref={buttonOpen} alt="table" /> 
                                    : <img src={table} ref={buttonOpen} alt="table" />
                            }
                            <h5>Table 1</h5>
                        </div>
                        <div className="table">
                            <img src={table} alt="table"/>
                            <h5>Table 2</h5>
                        </div>
                        <div className="table1">
                            <img src={table} alt="table"/>
                            <h5>Table 3</h5>
                        </div>
                        <div className="table">
                            <img src={table} alt="table"/>
                            <h5>Table 4</h5>
                        </div>
                        <div className="table">
                            <img src={table} alt="table"/>
                            <h5>Table 5</h5>
                        </div>
                    </div>
                </StyleHome>
            }

            {/*  modal screen for add the number of customer */
                showModalComponent && 
                <StyleHome>
                    <div id="numberModal" ref={modalElement}>
                        <Modal
                            handleAddNumber={handleAddNumber}
                            buttonOpen={buttonOpen}
                            modalElement={modalElement}
                            number={numberCustomer}
                            setNumber={setNumberCustomer}
                        />
                    </div>
                </StyleHome>
            }

        </div>
    );
};

export default Home;