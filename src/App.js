import "./assets/App.css";
import BarChart from "./components/BarChart";
import CharacterDisplay from "./components/CharacterDisplay";
import BrandLogo from './assets/brand-logo.js';

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="brand-logo">
          <BrandLogo />
        </div>
      </div>
      <div className="content">
        <div className="col">
          <div className="title">
            Who is the most unpopular character from Earh C-137?
          </div>
          <CharacterDisplay />
        </div>
        <div className="col">
          <div className="title">Smith' Family Popularity</div>
          <BarChart />
        </div>
      </div>
    </div>
  );
}

export default App;
