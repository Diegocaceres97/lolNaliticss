
import { useState } from "react";
import champsLOL from "../../../models/champs.json";
import Swal from 'sweetalert2'

const SelectChamps = ({ isSelectionEnemy }: any) => {
  const [actualChamps, setActualChamps] = useState<string[]>([]);
  const [enemyChamps, setEnemyChamps] = useState<string[]>([]);

  function champSelect(event: any) {
    let value = event.target.value;
    if (isSelectionEnemy) {
      if (enemyChamps.length < 5) {
        setEnemyChamps((prevChamps) => [...prevChamps, value]);
      } else {
        Swal.fire({
          title: "Error!",
          text: "You can't choose more enemies",
          icon: "error",
          confirmButtonText: "Cool",
        });
      }
    } else {
      setActualChamps((prevChamps) => [...prevChamps, value]);
    }
  }

  return (
    <>
      <select
        style={{
          width: "39.5%",
          height: "5vh",
          fontSize: "20px",
          cursor: "pointer",
        }}
        onChange={champSelect}
      >
        {champsLOL.map((champ) => (
          <option key={champ.id} value={champ.name}>
            {champ.name}
          </option>
        ))}
      </select>
      <div>
        {isSelectionEnemy ? (
          <p style={{color: 'white'}}>
            Enemys selected:{" "}
            {enemyChamps.length > 0
              ? enemyChamps.map((name, index) => (
                  <b key={index}>{name}, </b>
                ))
              : <span> 0? 🧐 </span>}
          </p>
        ) : null}
      </div>
    </>
  );
};

export default SelectChamps;
