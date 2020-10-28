import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import * as api from "../api/apiService";

Modal.setAppElement("#root");

export default function ModalGrade({ onSave, onClose, selectedGrade }) {
  const { id, student, subject, type } = selectedGrade;

  const [gradeValue, setGradeValue] = useState(selectedGrade.value);
  const [gradeValidation, setGradeValidation] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getValidation = async () => {
      const validation = await api.getValidationFromGradeType(type);
      setGradeValidation(validation);
    };
    getValidation();
  }, [type]);
  //fica escutando o type, se acontecer algo, ele executa fazendo a validaçao de novo

  useEffect(() => {
    const { minValue, maxValue } = gradeValidation;
    if (gradeValidation < minValue || gradeValue > maxValue) {
      setErrorMessage(
        `O valor da nota deve ser entre ${minValue} e ${maxValue} (inclusive)`
      );
      return;
    }
    setErrorMessage("");
  }, [gradeValue, gradeValidation]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      onClose(null);
    }
  };

  const handleClose = () => {
    onClose(null);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = {
      id, 
      newValue: gradeValue,
    };
    onSave(formData);
  };

  const handleGradeChange = (event) => {
    //o + transforma string para inteiro
    setGradeValue(+event.target.value);
  };

  return (
    <div>
      <Modal isOpen={true}>
        <div style={styles.flexRow}>
          <span style={styles.title}>Manutenção de Notas</span>
          <button
            className="wavez-effect waves-lights btn red dark-4"
            onClick={handleClose}
          >
            X
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <div className="input-field">
            <input id="inputName" type="text" value={student} readOnly />
            <label className="active" htmlFor="inputName">
              Nome do Aluno:
            </label>
          </div>
          <div className="input-field">
            <input id="inputSubject" type="text" value={subject} readOnly />
            <label className="active" htmlFor="inputSubject">
              Disciplina:
            </label>
          </div>
          <div className="input-field">
            <input id="inputType" type="text" value={type} readOnly />
            <label className="active" htmlFor="inputType">
              Tipo de Avaliação:
            </label>
          </div>
          <div className="input-field">
            <input
              id="inputGrade"
              type="number"
              value={gradeValue}
              min={gradeValidation.minValue}
              max={gradeValidation.maxValue}
              step="1"
              autoFocus
              onChange={handleGradeChange}
            />
            <label className="active" htmlFor="inputGrade">
              Nota:
            </label>
          </div>
          <div style={styles.flexRow}>
            <button
              className="wavez-effect waves-lights btn"
              disabled={errorMessage.trim() !== ""}
            >
              Salvar
            </button>
            <span style={styles.errorMessage}>{errorMessage}</span>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "40px",
  },
  title: {
    fontSize: "1.3rem",
    fontWeight: "bold",
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
  },
};
