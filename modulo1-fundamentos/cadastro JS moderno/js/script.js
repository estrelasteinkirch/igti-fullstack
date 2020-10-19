let globalNames = ["Rayto", "Pushito", "Pizzo", "Coreto", "Dani"];
let inputName = null;
let currentIndex = null;
let isEditing = false;

window.addEventListener("load", () => {
  inputName = document.querySelector("#inputName");
  preventFormSubmit();
  activateInput();
  render();
});

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  let form = document.querySelector("form");
  form.addEventListener("submit", handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    //globalNames.push(newName);
    globalNames = [...globalNames, newName];
  }

  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (event.key === "Enter" && event.target.value.trim() !== "") {
      if (isEditing) {
        updateName(event.target.value);
      } else {
        insertName(event.target.value);
      }
      render();
      isEditing = false;
      clearInput();
    }
  }
  inputName.addEventListener("keyup", handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      // globalNames.splice(index, 1);
      // globalNames = globalNames.filter((name, i) => {
      //   if (i === index) {
      //     return false;
      //   }
      //   return true;
      // });

      globalNames = globalNames.filter((_, i) => i !== index);
      render();
    }
    let button = document.createElement("button");
    button.classList.add("deleteButton");
    button.textContent = "x";
    button.addEventListener("click", deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    let span = document.createElement("span");
    span.classList.add("clickable");
    span.textContent = name;
    span.addEventListener("click", editItem);

    return span;
  }

  let divNames = document.querySelector("#names");
  divNames.innerHTML = "";
  let ul = document.createElement("ul");
  //Criar ul
  // Fazer n li, conforme o tamanho do vetor (globalNames)

  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];
    let li = document.createElement("li");
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);

    ul.appendChild(button);
    ul.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

// function clearInput() {
//   inputName.value = "";
//   inputName.focus();
// }

const clearInput = () => {
  inputName.value = "";
  inputName.focus();
};
