"use strict";
// const accounts = [account1, account2, account3, account4];
// Elements

// const movementDep = document.querySelector(
//   ".movements__type movements__type--deposit"
// );
// const movementWith = document.querySelector(
//   ".movements__type movements__type--withdrawal"
// );
// const movementValue = document.querySelector(".movementValue");

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const account1 = {
  owner: "moses mwangi",
  movements: [200, -400, 3000, -650, -130, 70, 1300, 900, -870],
  interestRate: 1.2,
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const displayMovements = function (movements) {
  containerMovements.innerHTML = "";
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
       <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovements(account1.movements);

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov, i, arr) => (acc += mov), 0);
  labelBalance.textContent = balance;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => (acc += cur));
  labelSumIn.textContent = `${incomes}€`;
};
calcDisplaySummary(account1.movements);

/*const user = "Steven Thomas William";
const userName = user.toLocaleLowerCase().split(" ");

const ma = userName.map(function (val) {
  return val[0];
});
console.log(ma.join(""));*/

/*
///////////////// map //////////////////////
const movements = [200, -200, 340, -300, -20, 50, 400, -460];
const euroToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * euroToUsd;
// });

const movementsUSD = movements.map((mov) => Math.abs(mov) * euroToUsd);
console.log(movementsUSD);

const movementdescription = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `movement ${i + 1}: Deposited ${mov}`;
  } else {
    return `movement ${i + 1}: Withdraw ${Math.abs(mov)}....`;
  }

  console.log(movementdescription);
  ///////////////////// or ////////////////////////////
});
const movementsdescription = movements.map(
  (mov, i, arr) =>
    `movement ${i + 1}: ${mov > 0 ? "Deposited" : "Withdraw"} ${Math.abs(mov)}`
);
console.log(movementsdescription);
*/

///////////////// filter ///////////////////////////
/*
const movements = [200, -200, 340, -300, -20, 50, 400, -460];
const deposit = movements.filter(function (mov) {
  return mov > 0;
});
const depositArr = movements.filter((mov) => mov < 0);
console.log(deposit, depositArr);*/
///////////////////////// reduced /////////////////////////////////

/*const movements = [200, -150, 340, 300, -20, 50, 400, -460];
const balance = movements.reduce(function (acc, cur, i, arr) {
  console.log(`Iteration ${i} : ${acc}`);
  return acc + cur;
}, 0);

const balanceArr = movements.reduce((acc, cur, i, arr) => acc + cur, 0);

console.log(balance, balanceArr);
console.log();
console.log();

/////////////// max value //////////////
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);*/

//////////////////// pipeline////////////
/*
const movements = [200, -150, 340, 300, -20, 50, 400, -460];
const euroToUsd = 1.1;
const totalDepositedUsd = movements
  .filter((move) => move > 0)
  .map((move) => move * euroToUsd)
  .reduce((acc, cur) => (acc += cur), 0);
console.log(totalDepositedUsd);*/
