import React, {useState} from "react";

const BAND_MEMBERS = [
  {
    id: 1,
    name: "Neil Peart",
    instrument: "Bateria",
  },
  {
    id: 2,
    name: "Alex Fifeson",
    instrument: "Guitarra",
  },
  {
    id: 3,
    name: "Geddy Lee",
    instrument: "Baixo",
  },
];

export default function Band() {
//nome da variável de estado, nome da funçao que vai alterá-la
  const [ bandMembers, setBandMembers ] = useState(BAND_MEMBERS);
  const [ bandName, setBandName ] = useState('Rush');
 
    return (
      <div>
        <h4>{bandName}</h4>
        <ul>
          {bandMembers.map(({ id, name, instrument }) => {
            return (
              <li key={id}>
                {name} - {instrument}
              </li>
            );
          })}
        </ul>
      </div>
    );
}
