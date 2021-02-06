import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [roleOptions, setRoleOptions] = useState(["Engineer", "Chef"]);
  const [locationOptions, setLocationOptions] = useState([
    "San-Francisco",
    "New-York",
  ]);

  const [roleSelection, setRoleSelection] = useState();
  const [citySelection, setCitySelection] = useState();

  const [score, setScore] = useState();

  const mapOptions = (options) => {
    return options.map((option, key) => (
      <option key={key} value={option} key={key}>
        {option}
      </option>
    ));
  };

  useEffect(() => {
    fetch(`/http://localhost:8000`)
      .then((res) => res.json())
      .then(
        (data) => setRoleOptions(data.positions),
        setLocationOptions(data.locations)
      );
  });

  const fetchScore = (ev) => {
    ev.preventDefault();

    fetch(
      `/http://localhost:8000/score?location=${citySelection}?position=${roleSelection}`
    )
      .then((res) => res.json())
      .then((data) => setScore(data));
  };

  return (
    <div className="App">
      <header className="App-header">WizeHire </header>
      <form>
        <div className="Role-Selection">
          <label htmlFor="Role-Options" className="Role-Dropdown">
            Choose Role:
          </label>
          <select
            type="text"
            name="stage"
            id="Role-Options"
            defaultValue={"DEFAULT"}
            value={roleSelection}
            onChange={(ev) => setRoleSelection(ev.target.value)}
          >
            <option value="DEFAULT">Select </option>
            {mapOptions(roleOptions)}
          </select>
        </div>
        <div className="Location-Selection">
          <label htmlFor="Location-Options" className="Role-Dropdown">
            Choose Location:
          </label>
          <select
            type="text"
            name="stage"
            id="Location-Options"
            defaultValue={"DEFAULT"}
            value={roleSelection}
            onChange={(ev) => setRoleSelection(ev.target.value)}
          >
            <option value="DEFAULT">Select </option>
            {mapOptions(locationOptions)}
          </select>
        </div>
        <button onClick={fetchScore}>Get Score</button>
      </form>

      <div>Here's R/J Score: {score}</div>
    </div>
  );
}

export default App;
