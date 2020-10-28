import React from "react";

const MAX_VALUE_INTEREST = -12;
const MIN_VALUE_INTEREST = 12;

export default function Form({
  initialValue,
  months,
  interest,
  onChangeInitialValue,
  onChangeInterest,
  onChangeMonths,
}) {
  return (
    <form style={styles.flexRow}>
      <div className="input-field">
        <label className="active" htmlFor="inputInitialValue">
          Capital Inicial
        </label>
        <input
          id="inputInitialValue"
          type="number"
          value={initialValue}
          step="1000"
          onChange={onChangeInitialValue}
          autoFocus
        />
      </div>
      <div className="input-field">
        <label className="active" htmlFor="inputInterest">
          Taxa de juros mensal:
        </label>
        <input
          id="inputInitialValue"
          type="number"
          value={interest}
          step="1"
          onChange={onChangeInterest}

          // size="5000"
          // min={MIN_VALUE_INTEREST}
          // max={MAX_VALUE_INTEREST}
        />
      </div>
      <div className="input-field">
        <label className="active" htmlFor="inputMonths">
          Período (meses):
        </label>
        <input
          id="inputMonths"
          type="number"
          value={months}
          step="1"
          onChange={onChangeMonths}
        />
      </div>
    </form>
  );
}

const styles = {
  flexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: "40px",
  },

  // title: {
  //   fontSize: "1.3rem",
  //   fontWeight: "bold",
  // },
  // errorMessage: {
  //   color: "red",
  //   fontWeight: "bold",
  // },
};
