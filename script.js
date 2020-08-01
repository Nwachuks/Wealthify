const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random use and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

function addData(obj) {
    data.push(obj);

    updateUI();
}

// Update UI
function updateUI(providedData = data) {
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(person => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${person.name}</strong> ${formatAsMoney(person.money)}`;
        main.appendChild(element);
    });
}

// Format number as money
function formatAsMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&, ');
}

// Double all users' money
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 }
    });

    updateUI();
}

// Sort by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    updateUI();
}

// Filter only millionaires
function showOnlyMillionaires() {
    data = data.filter(person => person.money >= 1000000);
    updateUI();
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showOnlyMillionaires);
