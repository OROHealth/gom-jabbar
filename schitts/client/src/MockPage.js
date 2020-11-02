import React, {useState, useEffect} from "react"
import "./App.css"
import BasicTable from "./Table"

const MockPage =()=>{
    const [numOfMeals, setNumOfMeals] = useState();
    const [earnings, setEarnings] = useState();
    const [median, setMedian] = useState();
    const [simulation, setSimulation] = useState(true);
    const [loader, setLoader] = useState(false);
    const [loader2, setLoader2] = useState(false);


    const getMoirasPerformance = () =>{
        setLoader2(true);
        fetch("/moiras_performance")
        .then((res) => res.json())
        .then((data) => {
        if(data.data[0]){
            setNumOfMeals(data.data[0].lvl8_meals)
            setEarnings(data.data[0].earnings)
            setMedian(data.median_rating)
            setLoader2(false);
        } else if (data.message.length === 0){
            console.log('Try again')
        } 
        });   
    };

    const startSimulation = ()=>{
        setLoader(true)
        fetch("/simulation", {
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                simulation
            }),
        })
        .then((res)=>res.json())
        .then((data)=>{
            setSimulation(false) 
            setLoader(false)    
        });       
    };
    const deleteSimulation =()=>{
        fetch("/simulation",{
            method: "DELETE"
        })
        .then((res)=>res.json())
        .then((data)=>{
            setSimulation(!simulation)
        });  
    };

return(
    <div className="MockPage">
            {simulation? (<button className="Button" onClick={(e)=>startSimulation()}>SART SIMULATION</button>)
                :(<button className="Button" onClick={(e) => deleteSimulation()}>DELETE SIMULATION</button>)}
                
            {loader? (<div>INSERTING 10 000 ORDERS, THIS MIGHT TAKE A FEW SECONDS..</div>):(<></>)}

            <div className="TableWrapper">
                <BasicTable numOfMeals={numOfMeals} earnings={earnings} median={median}/>
            </div>

            {loader2? (<div>FETCHING RESULTS...</div>):(<></>)}

            <button className="Button" onClick={(e)=> getMoirasPerformance()} disabled={simulation}>GET MOIRA'S RESULTS</button>
    </div>
    )
};



export default MockPage