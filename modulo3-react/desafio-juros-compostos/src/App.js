import React, { useState } from "react";
import Form from "./components/Form";

export default function App() {
  const [initialValue, setInitialValue] = useState("");
  const [interest, setInterest] = useState("");
  const [months, setMonths] = useState("");

  const handleChangeInputInitialValue = (event) => {
    const newText = event.target.value;
    setInitialValue(newText);
  };
  const handleChangeInputInterest = (event) => {
    const newText = event.target.value;
    setInterest(newText);
  };

  const handleChangeInputMonths = (event) => {
    const newText = event.target.value;
    setMonths(newText);
  };

  return (
    <div>
      <h1>Juros Compostos com React</h1>
      <Form
        initialValue={initialValue}
        months={months}
        interest={interest}
        onChangeInitialValue={handleChangeInputInitialValue}
        onChangeInterest={handleChangeInputInterest}
        onChangeMonths={handleChangeInputMonths}
      />
    </div>
  );
}
