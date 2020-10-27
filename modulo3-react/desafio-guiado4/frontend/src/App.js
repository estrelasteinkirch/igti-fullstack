import React, { useEffect, useState } from "react";
import * as api from "./api/apiService";
import GradesControl from "./components/GradesControl";
import Spinner from "./components/Spinner";

export default function App() {
  const [allGrades, setAllGrades] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const testApi = async () => {
  //   const result = await api.getAllGrades();
  //   console.log(result);
  // };

  // testApi();

  useEffect(() => {
    const getGrades = async () => {
      const grades = await api.getAllGrades();
      setTimeout(() => {
        setAllGrades(grades);
      }, 2000);
    };
    //outro jeito, nem tao bom:
    // api.getAllGrades().then((grades) => {
    //   setTimeout(() => {
    //     setAllGrades(grades);
    //   }, 2000);
    // });
    getGrades();
  }, []);
  // nao tem dependencia, o [] vazio é pra quando precisa buscar só uma vez
  
  const handleDelete = () =>{

  }

  const handlePersist = () =>{

  }


  return (
    <div>
      <h1 className="center"> Controle de Notas</h1>
      {/* sendo verdadeiro, faça isso */}
      {allGrades.length == 0 && <Spinner />}
      {allGrades.length > 0 && (
        <GradesControl
          grades={allGrades}
          onDelete={handleDelete}
          onPersist={handlePersist}
        />
      )}
    </div>
  );
}
