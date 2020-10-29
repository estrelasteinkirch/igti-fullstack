import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Installments from "./components/Installments";
import { calculetedCoumpoundInterest } from "./helpers/compound-interest";

export default function App() {
  const [initialValue, setInitialValue] = useState("1000");
  const [tax, setTax] = useState("0.5");
  const [months, setMonths] = useState("0");
  const [installments, setInstallments] = useState([]);

  useEffect(() => {
    const showHTML = calculetedCoumpoundInterest(
      parseFloat(initialValue),
      parseFloat(tax),
      parseInt(months)
    );

    setInstallments(showHTML);
  }, [initialValue, tax, months]);

  const handleChangeInputInitialValue = (event) => {
    const { value } = event.target;
    let newText;
    if (value === "") {
      newText = "0";
    } else {
      newText = value;
    }
    setInitialValue(newText);
  };
  const handleChangeInputTax = (event) => {
    const { value } = event.target;
    let newText;
    if (value === "") {
      newText = "0";
    } else {
      newText = value;
    }
    setTax(newText);
  };

  const handleChangeInputMonths = (event) => {
    const { value } = event.target;
    let newText;
    if (value === "" || parseInt(value) < 0) {
      newText = "0";
    } else {
      newText = value;
    }
    setMonths(newText);
  };

  return (
    <div>
      <h1 className="center">Juros Compostos com React</h1>
      <Form
        initialValue={initialValue}
        months={months}
        tax={tax}
        onChangeInitialValue={handleChangeInputInitialValue}
        onChangeTax={handleChangeInputTax}
        onChangeMonths={handleChangeInputMonths}
      />
      <Installments installments={installments} />
    </div>
  );
}
