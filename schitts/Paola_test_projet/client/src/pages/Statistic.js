import React, { useState } from 'react';
import axios from 'axios';

import CanvasJSReact from '../assets/canvasjs.react';
import {StyleStatistic } from '../styles/styled-components/StyleStatistic';

//var CanvasJSReact = require('./canvasjs.react');
let CanvasJS = CanvasJSReact.CanvasJS;
let CanvasJSChart = CanvasJSReact.CanvasJSChart;
//let Component = React.Component;


const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}api/order`
});

const Statistic = () => {

    const [showText, setShowText] = useState(true);
    const [state, setState] = useState({ orders: [] });
    const [myResults, setMyResults] = useState({median: "", totalEarned: ""});
    const [canva, setCanva] = useState(false);
    const [myAppearsButton, setMyAppearsButton] = useState(true);
    const [myDisappearsButton, setMyDisappearsButton] = useState(false);
    const [showTextForTable, setShowTextForTable] = useState(true);

    //get data filter by level cookedness
    function handleDiagramData(){   

        //query data from database       
        try {
            api.get('/diner'
            ).then(({ data }) => {
                let myData = data
                setState({orders: myData});
            });
     
        } catch(err){
            console.log("err.status");
        }

        setCanva(true); 
        setMyAppearsButton(false);
        setShowTextForTable(false);
        setMyDisappearsButton(true);
    };

    //disappears function
    function handleHideDiagram() {
        setCanva(false); 
        setMyAppearsButton(true);
        setMyDisappearsButton(false);
    }

    //extract data for diagram
    const dataPoints = state.orders.map(dataP =>{
      return  {label : dataP.createdAt, y: dataP.total}
    });


    //get the median value
    function handleResults(){   

        //query data from database       
        try {
            api.get('/mean', {
            }).then(({ data }) => {
                let myData = data
                setMyResults(myData);
            });
     
        } catch(err){
            console.log(err);
        }
        setShowText(false)
    };
    

    //options of canvajs diagram
    const options = {
        
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "statistic of 8-rated overcooked"
        },
        axisX:{
            title: "Date",
            valueFormatString: "DD MMM HH MM",
            crosshair: {
                enabled: true,
                snapToDataPoint: true
            }
        },
        axisY: {
            title: "Price (in DOLLAR)",
            valueFormatString: "$##0.00",
            crosshair: {
                enabled: true,
                snapToDataPoint: true,
                labelFormatter: function(e) {
                    return "$" + CanvasJS.formatNumber(e.value, "##0.00");
                }
            }
        },
 
        data: [{
            type: "area",
            xValueFormatString: "DD MMM  HH MM",
            yValueFormatString: "€##0.00",
            dataPoints: dataPoints
        }],
    }

    return(
        <StyleStatistic>
            <div className="containeurFluid">
                <div className="myCanva">
                    {/* appears canvajs diagram */}
                    {
                        myAppearsButton &&
                        <div id="buttons">
                            <button className="myButtons" onClick={handleDiagramData}>Click here to show the diagram
                            {
                                    showTextForTable &&
                                   <p>and fill in the table</p> 
                            }
                            </button>
                        </div> 
                    }

                    {/* canvajs diagram */}
                    {
                        canva &&
                        <CanvasJSChart options = {options}/>
                    }

                    {/* disappears canvajs diagram */}
                    {
                        myDisappearsButton &&
                        <div id="buttons">
                            <button className="myButtons" onClick={handleHideDiagram}>Click here to hide the diagram</button>
                        </div> 
                    }
                </div>
            </div>
            <div>
                <div className="containeurFluid"> 
                    {/* show the query results */}
                    <div className="myBody">
                        <h4>Results</h4>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Date</th>
                                    {
                                        state.orders.map((gaga, index) =>
                                            <td key={index}>
                                            {    
                                                gaga.createdAt
                                            }                          
                                            </td>
                                        ) 
                                    }
                                </tr>
                                <tr>
                                    <th>Money</th>
                                    {
                                        state.orders.map((gaga, index) =>
                                            <td key={index}>$
                                            {    
                                                gaga.total
                                            }                          
                                            </td>
                                        ) 
                                    }
                                </tr>
                            </tbody>
                        </table>
                        <div className="myResults">
                            <div>
                                {
                                    <p>Twyla serve __<span>{state.orders.length}</span>__   8-rated overcooked in the last 2 months </p>
                                }
                            </div>
                            <div >
                                <button className="myBut" onClick={handleResults}>
                                    {
                                        showText &&
                                        <p>Show </p>
                                    }
                                    <p>total and median value</p>
                                </button>
                            </div>
                            
                            <div>
                                {
                                    <p>We earned __<span>${myResults.totalEarned}</span>__  and the median value is __<span>{ myResults.median}</span>__</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </StyleStatistic>
    );
};

export default Statistic;
