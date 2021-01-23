import React, {useEffect} from "react";
import {StyleModal} from '../../styles/styled-components/StyleModal';

export default function Modal(props) {
    
    function closeModal() {
        props.modalElement.current.style.display = 'none';
    }
    function openModal() {
        props.modalElement.current.style.display = 'block';
    }

    useEffect(() => {
        props.buttonOpen.current.onclick = openModal;
    });

return (
    <StyleModal>
        <div className="container">
            <h4>Number of customers</h4>
            <form action="" id='numberForm' onSubmit={e => props.handleAddNumber(e)}>
                <input 
                    placeholder="Enter number" 
                    name="number" 
                    required="required"
                    onChange={(e) => props.setNumber(e.target.value)}
                    value={props.numberCustomer}
                />
                <div id="buttons">
                    <button className="button1" type="submit">Submit</button>
                    <button className="button2" type="button" onClick={closeModal}>Cancel</button>
                </div>
            </form>
        </div>
    </StyleModal>
);
}