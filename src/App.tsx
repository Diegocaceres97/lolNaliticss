import { useEffect, useState } from "react";
import champsLOL from './models/champs.json';
import "./App.css";

function App() {

  const champs = champsLOL;

  const [data, setData] = useState(champs);


  return (
    <div className="App">
      <h1 className="colorLetter">Please select you champ: </h1>
      <select style={{width: '15vw', height: '5vh', fontSize: '20px', cursor: 'pointer'}}>
        {champs.map(champ => 
        (
          <option key={champ.id}>{champ.name}</option>
        ))}
      </select>
      <h3 className="colorLetter colorLetter--link" style={{cursor:'pointer'}}>Do you want to give more information?</h3>
      <small style={{color: 'white'}}>🚀 This is the first page with IA than will to improve your skills in gaming on LOL🏆</small>
    </div>
  );
}

export default App;
