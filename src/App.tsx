import { useState } from "react";
import EnemyList from "./shared/components/enemyList";
import "./App.css";
import SelectChamps from "./shared/components/selects/selectChamps";

function App() {
  const [information, setMoreInformation] = useState(false);

  const popUp = () => {
    setMoreInformation(!information);
  };

  return (
    <div className="App">
      <h1 className="colorLetter">Please select you champ: </h1>
      <SelectChamps isSelectionEnemy={false}/>
      <h3
        className="colorLetter colorLetter--link"
        style={{ cursor: "pointer", marginTop: '20px' }}
        onClick={popUp}
      >
        Do you want to give more information?
      </h3>
      <small style={{ color: "white" }}>
        🚀 This is the first page with AI than will to improve your skills in
        LOL🏆
      </small>
      {information ? <EnemyList/>  : <></>}
      <button style={{display: 'block', borderColor: 'white', marginRight: 'auto', marginLeft:'auto', marginTop:'15px'}}> 🔮 AI show me the way!</button>
    </div>
  );
}

export default App;
