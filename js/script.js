"use strict";

const account1 = {
  owner: "moses mwangi",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2024-1-07T13:15:33.035Z",
    "2024-1-06T09:48:16.867Z",
    "2024-1-02T06:04:23.907Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "af", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2024-1-07T13:15:33.035Z",
    "2024-1-06T09:48:16.867Z",
    "2024-1-02T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];
// Elements

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

/*const account1 = {
  owner: "moses mwangi",
  movements: [200, -400, 3000, -650, -130, 70, 1300, 900, -870],
  interestRate: 1.2,
  pin: 11,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 22,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 33,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90, -500],
  interestRate: 1,
  pin: 44,
};
const accounts = [account1, account2, account3, account4];*/
const formatMovementDate = function (date, locale) {
  const calDayPassed = (day1, day2) => (day1 - day2) / (1000 * 60 * 60 * 24);
  const dayPass = Math.round(calDayPassed(new Date(), date));
  console.log(dayPass);
  if (dayPass === 0) return `Today`;
  else if (dayPass === 1) return `Yesterday`;
  else if (dayPass <= 7) return `${dayPass} days ago`;
  else {
    // const year = date.getFullYear();
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const dat = `${date.getDate()}`.padStart(2, 0);

    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const html = `
       <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
     <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  const balance = acc.movements.reduce((acc, mov, i, arr) => (acc += mov), 0);
  acc.balance = balance;
  labelBalance.textContent = `${acc.balance.toFixed(2) + "€"}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, cur) => (acc += cur));
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => (acc += cur));
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interestRate = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((intr, i, arr) => intr > 1)
    .reduce((acc, int) => (acc += int));
  labelSumInterest.textContent = `${interestRate.toFixed(2)}€`;
};

const creatUserName = function (accs) {
  accs.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
    console.log(acc.userName);
  });
};
creatUserName(accounts);

const updateUI = function (acc) {
  ///////// display movement////////
  displayMovements(acc);

  //   /////////display balance ////////////
  calcDisplayBalance(acc);

  //   /////////display summary //////////////
  calcDisplaySummary(acc);
};

/////////////////////event ///////////////////////

////////////////////////////////////////////////////////////////////////////
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.userName === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const optional = {
      hours: "numeric",
      minutes: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    const local = navigator.language;
    console.log(local);
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      optional
    ).format(now);

    inputLoginUsername.value = inputLoginPin.value = "";
    // inputLoginPin.blur();
    // ///////// display movement////////
    // displayMovements(currentAccount.movements);

    // /////////display balance ////////////
    // calcDisplayBalance(currentAccount);

    // /////////display summary //////////////
    // calcDisplaySummary(currentAccount);

    updateUI(currentAccount);
  }
});
/////////////////////////////////////////////////////////////////////
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.userName === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  console.log(currentAccount);

  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);

    inputTransferTo.value = inputTransferAmount.value = "";
  }
});
///////////////////////////////////////////////////////////////////////////
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Math.round(Number(inputLoanAmount.value));
  console.log(amount);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov > amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
  }
  updateUI(currentAccount);
  inputLoanAmount.value = "";
});
////////////////////////////////////////////////////////////////////////////////
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    // inputCloseUsername.value === currentAccount.username ||
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)
    accounts.splice(index, 1);
    // // Delete account
    console.log(accounts);

    // // Hide UI
    containerApp.style.opacity = 0;
  }
  inputCloseUsername = inputClosePin = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
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

//////////////////// pipeline or chainig method////////////
/*
const movements = [200, -150, 340, 300, -20, 50, 400, -460];
const euroToUsd = 1.1;
const totalDepositedUsd = movements
  .filter((move) => move > 0)
  .map((move) => move * euroToUsd)
  .reduce((acc, cur) => (acc += cur), 0);
console.log(totalDepositedUsd);*/

//////////////////////////////find method////////////////////////
/*
let cut;
const movements = [200, -400, -150, 340, 300, -20, 50, 400, -460];
const firstWithdrawal = movements.find((fir) => fir < 0);
console.log(firstWithdrawal);

console.log(accounts);
const account = accounts.find((acc) => acc.owner === "moses mwangi");
console.log(account);

cut = movements.find((mv) => mv < 0);
console.log(cut);*/

////////////////// findmethod prac ////////////////
/*
const account22 = [
  {
    owner: "Jessica Davis",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    interestRate: 1.5,
    pin: 2222,
  },
  {
    owner: "Steven Thomas Williams",
    movements: [200, -200, 340, -300, -20, 50, 400, -460],
    interestRate: 0.7,
    pin: 3333,
  },
];

let cure;
cure = account22.find((acc) => acc.pin === 3333);
console.log(cure);

let pin = 2222;

const callBack = (element) => element > pin === 3333;
const index = account22.findIndex(callBack);
console.log(index);*/

/*const movements = [200, -400, -150, 340, 300, -20, 50, 400, -460];
const some = movements.some((acc) => acc > 0);
console.log(some);

const som = movements.every((acc) => acc > 0);
console.log(som);

const allMovement = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, cur) => (acc += cur), 0);

console.log(allMovement2);

////////////flatmap////////////

const allMovement2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, cur) => (acc += cur), 0);

console.log(allMovement2);
*/
//const movements = [200, 20, -400, -150, 340, 300, -20, 50, 400, -460];

///////////////// ascending order///////////////
/////return < 0 a,b keep order
/////return > 0 b,a switch order
/*movements.sort((a, b) => {
  if (a > b) {
    return 1;
  }
  if (b > a) {
    return -1;
  }
});

movements.sort((a, b) => a - b);
console.log(movements);
*/
/////////////// descending order///////////////
/////return > 0 a,b keep order
/////return < 0 b,a switch order
/*movements.sort((a, b) => {
  if (a > b) {
    return -1;
  }
  if ( a < b) {
    return 1;
  }
});

movements.sort((a, b) => b - a);

console.log(movements);
*/
/*
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
const arr2 = new Array(7);
arr2.fill(4, 3, 6);
arr.fill(2, 4, 6);
console.log(arr, arr2);

const arr3 = Array.from({ length: 8 }, () => 1);
const arr4 = Array.from({ length: 8 }, (cur, i) => i + 1);

console.log(arr3, arr4);

labelBalance.addEventListener("click", function () {
  const movementsUI = Array.from(document.querySelector(".movements__value"));
  console.log(movementsUI);
});
*/
/*
//(1)
const bankDepositSum = accounts
  .flatMap((acc) => acc.movements)
  .filter((mov) => mov > 0)
  .reduce((sum, cur) => (sum += cur), 0);
console.log(bankDepositSum);

//(2)
// const numDeposit1000 = accounts
//   .flatMap((acc) => acc.movements)
//   .filter((mov) => mov >= 1000).length;

const numDeposit1000 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);
console.log(numDeposit1000);

//(3)
const sums = accounts
  .flatMap((acc) => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposit += cur) : (sums.withdraw += cur);
      sums[cur > 0 ? "deposit" : "withdraw"] += cur;
      return sums;
    },
    { deposit: 0, withdraw: 0 }
  );
console.log(sums);

const capital = function (title) {
  const exceptions = ["an", "a", "and", "but"];
  const cap = title
    .toLowerCase()
    .split(" ")
    .map((word) =>
      exceptions.includes(word) ? word : word[0].toUpperCase() + word.slice(1)
    )
    .join(" ");

  return cap;
};
console.log(capital("this is a nice guy and GOOD buT HES dirty"));
*/

/*
console.log(Number.parseInt(10.5));
console.log(Number.parseFloat(10.5));
console.log(Number.parseInt("30px", 10));
console.log(Number.parseInt("3.55px"));
console.log(Number.parseFloat("30px"));
console.log(Number.parseFloat("3.55px"));

console.log("---------------------------");
console.log(Number.isNaN(10));
console.log(Number.isNaN("3.55px"));
console.log(Number.isNaN(+"30px"));
console.log(Number.isNaN(3.55));

console.log("---------------------------");
console.log(Number.isFinite(10));
console.log(Number.isFinite("3.55px"));
console.log(Number.isFinite(+"30px"));
console.log(Number.isFinite(3.55));

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));

console.log(Math.max(25, 40, 50, 60, 70, 80));
console.log(Math.max(12, 25, 47, 19, 20));

console.log(Math.PI * Number.parseFloat("10") ** 2);
console.log(Math.trunc(Math.random() * 6) + 1);

const randomIntegers = (min, max) =>
  Math.trunc(Math.random() * (max - min) + 1) + min;
console.log(randomIntegers(10, 20));

console.log("---------------------------");
console.log(Math.trunc(23.3));
console.log(Math.trunc(23.6));

console.log("---------------------------");
console.log(Math.round(23));
console.log(Math.round(23.6));

console.log("---------------------------");
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.6));

console.log("---------------------------");
console.log(Math.floor(23.3));
console.log(Math.floor(23.6));

console.log("---------------------------");
console.log(+(23.3).toFixed(2));
console.log(+(23.6246).toFixed(3));*/
///////////////// reminder operater //////////////////
/*
console.log(5 % 2);
const rem = (n) => n % 2 === 0;
rem();
console.log(rem(8));
console.log(rem(9));
console.log(rem(10));
console.log(rem(11));

labelBalance.addEventListener("click", function () {
  [...document.querySelectorAll(".movements__row")].forEach(function (row, i) {
    if (i % 2 === 0) row.style.backgroundColor = "red";
  });
});*/

console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);
console.log(66666_6666666666666666666666666666666666n);
console.log(BigInt(98882529999));

///////////////////creating date///////////////////////
/*
const date = new Date();
console.log(date);

console.log(new Date("December, 25, 2023"));
console.log(new Date(2023, 11, 25, 6, 20, 40));

console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

console.log("------------------------------------------------------");
const future = new Date(2023, 11, 6, 30, 46);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getDate());
console.log(future.getHours());
console.log(future.getDay());
console.log(future.toISOString());
console.log(future.getTime());
console.log(new Date(1701920760000));
console.log(Date.now());
console.log(new Date(1704551722321));
console.log(new Date());

const n = new Date();
console.log(n.toISOString());
*/

const future = new Date(2023, 11, 6, 30, 46);
console.log(+future);

const calDayPassed = (day1, day2) => (day2 - day1) / (1000 * 60 * 60 * 24);
const day = calDayPassed(new Date(2023, 11, 6), new Date(2023, 11, 16));
console.log(day);
