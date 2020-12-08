import './App.css';
import Map from "./Map";
import Banner from "./Banner";
import Modal from "./Modal";

function App() {
  return (
    <div className="App">
      <Modal/>
      <div className="header">
        <Banner/>
      </div>
      <div className="main">
        <div className="map">
          <Map/>
        </div>
      </div>
    </div>
  );
}

export default App;
