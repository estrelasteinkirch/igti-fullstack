import React, { useState, useEffect } from "react";
import User from "./User";

export default function Users({ users }) {
  const [secondsVisible, setSecondsVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsVisible(secondsVisible + 1);
    }, 1000);
    return () => {
     clearInterval(interval);
    };
  }, [secondsVisible]);
  //[] vazios faz uma vez só, se colocar elementos do estado, o react verifica se alterou. Se alterar ele roda de novo

  return (
    <div>
      <p>Componente Users visíveis por {secondsVisible} segundos</p>
      <ul>
        {users.map((user) => {
          const { login } = user;
          return (
            <li key={login.uuid}>
              <User user={user} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
