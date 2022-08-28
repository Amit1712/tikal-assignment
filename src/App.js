import "./assets/App.css";
import BarChart from "./components/BarChart";
import CharacterDisplay from "./components/CharacterDisplay";

function App() {
  return (
    <div className="App">
      <h1>Part 1 - Who is the most unpopular being from Earh C-137?</h1>
      <CharacterDisplay />
      <h1>Part 2 - Bar chart</h1>
      <BarChart />
    </div>
  );
}

export default App;
