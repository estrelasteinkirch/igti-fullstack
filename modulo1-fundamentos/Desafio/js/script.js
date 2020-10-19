//variáveis
let tabUsers = null;
let tabStatistics = null;

let allUsers = [];
let inputName = " ";
let filteredNames = [];
let userFilter = [];

let name = 0;

let countMasc = 0;
let countFem = 0;
let agesSum = 0;
let agesAvg = 0;

tabUsers = document.querySelector("#filteredNames");
tabStatistics = document.querySelector("#statistics");

countMasc = document.querySelector("#countMasc");
countFem = document.querySelector("#countFem");
agesSum = document.querySelector("#agesSum");
agesAvg = document.querySelector("#agesAvg");

//busca das variáveis na aplicação
window.addEventListener("load", () => {
  fetchUsers();
});
//fetch

async function fetchUsers() {
  const res = await fetch(
    "https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo"
  );
  const json = await res.json();

  allUsers = json.results.map((user) => {
    //destructuring:
    const {
      name: { first, last },
      gender,
      dob: { age },
      picture: { thumbnail },
    } = user;
    return {
      // quanto repete, pode deixar só um, exemplo:
      name: first + ` ${last}`,
      gender,
      age,
      photo: thumbnail,
    };
  });

  render();
}

// render
function render() {
  renderUsersFound();
  renderStatistics();
}

function renderUsersFound() {
  let usersHTML = "<div>";

  filteredNames.forEach((user) => {
    const { photo, name, age } = user;
    const userHTML = `
    <div class="user">
      <div>
        <img src="${photo}" alt="${name}">
      </div>
      <div>
        <p>${name}, ${age} anos. </p>
      </div>
    </div>
    `;
    usersHTML += userHTML;
  });

  tabUsers.innerHTML = usersHTML;
}

function renderStatistics() {
  calculateStatistics();

  let statisticsHTML = "<div>";
  // const { age } = user;
  const userHTML = `
  <p>Total de pessoas: ${filteredNames.length}</p>
  <p>Homens: ${countMasc}</p>
  <p>Mulheres: ${countFem}</p>
  <p>Soma das idades: ${agesSum}</p>
  <p>Média de idade: ${agesAvg}</p>
  `;
  tabStatistics.innerHTML = userHTML;
}

function nameInput() {
  inputName = document.querySelector("#inputName");
  inputName.addEventListener("keyup", handleTyping);
}

function handleTyping(event) {
  inputName = event.target.value;
  lowercaseInputName = inputName.toLowerCase();
  console.log("o input é " + inputName);

  filteredNames = allUsers.filter((user) => {
    lowercaseName = user.name.toLowerCase();
    return lowercaseName.includes(lowercaseInputName);
  });

  render();
}

function calculateStatistics() {
  countMasc = filteredNames.reduce((accumulator, value) => {
    if (value.gender == "male") {
      return (accumulator += 1);
    }
    return accumulator;
  }, 0);

  countFem = filteredNames.reduce((accumulator, value) => {
    if (value.gender == "female") {
      return (accumulator += 1);
    }
    return accumulator;
  }, 0);

  agesSum = filteredNames.reduce((accumulator, value) => {
    return accumulator + value.age;
  }, 0);

  agesAvg = agesSum / (filteredNames.length || 1);
}

nameInput();
