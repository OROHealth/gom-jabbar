import './App.css';
import Map from "./Map";
import Banner from "./Banner";

function App() {
  return (
    <div className="App">
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
