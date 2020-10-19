import React, { useEffect, useState } from "react";
import { getNewTimestamp } from "./helpers/dateTimeHelpers.js";

export default function App() {
  const [clickArray, setClickArray] = useState([]);

  useEffect(() => {
    document.title = clickArray.length;
  });

  //const declara variáveis e funções
  //funçao dentro de funçao: closure. Pega todo escopo da funçao acima
  const handleClick = () => {
    const newClickArray = Object.assign([], clickArray);
    newClickArray.push(getNewTimestamp()); //cópia do objeto e insere num novo vazio
    setClickArray(newClickArray);
    //this.setState({ clickArray: newClickArray }); // substitui todo o estado = imutabilidade
  };

  return (
    <div>
      <h1>
        React e <em>Hooks</em>
      </h1>

      <button onClick={handleClick}>Click aqui</button>
      <ul>
        {clickArray.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
