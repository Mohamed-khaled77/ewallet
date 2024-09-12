let balance = 2000;
let passwordInput = document.querySelector("#password");
let balanceP = document.querySelector("#balance");
let showButton = document.querySelector("#showBtn");
let actionsDiv = document.querySelector("#actions");
let amountInput = document.querySelector("#amount");
let table = document.querySelector("table tbody");

let myLogs = [];

function showPassword() {
  if (passwordInput.classList.contains("d-none")) {
    passwordInput.classList.replace("d-none", "d-block");
  } else {
    if (passwordInput.value == "1234") {
      balanceP.innerText = balance;
      passwordInput.remove();
      showButton.remove();
      actionsDiv.classList.replace("d-none", "d-flex");
      renderLogs();
    } else {
      alert("Wrong Password");
    }
  }
}

function deposit() {
  let oBalance = balance;
  balance = balance + +amountInput.value;
  balanceP.innerText = balance;
  let obj = {
    beforeBalance: oBalance,
    type: "deposit",
    amount: +amountInput.value,
    afterBalance: balance,
  };
  myLogs.push(obj);
  renderLogs();
}

function withdraw() {
  if (+amountInput.value <= balance) {
    let oBalance = balance;
    balance = balance - +amountInput.value;
    balanceP.innerText = balance;

    let obj = {
      beforeBalance: oBalance,
      type: "withdraw",
      amount: +amountInput.value,
      afterBalance: balance,
    };
    myLogs.push(obj);
    renderLogs();
  } else {
    alert("انت كحيان يلا");
  }
}

function renderLogs() {
  table.innerHTML = "";
  myLogs.forEach((log, index) => {
    table.innerHTML += `
            <tr>
                <th>${index + 1}</th>
                <th>${log.beforeBalance}</th>
                <th>${log.type}</th>
                <th>${log.amount}</th>
                <th>${log.afterBalance}</th>
                <th><button class="delete-btn btn"><i class="fa-solid fa-xmark"></i></button></th>
            </tr>
        `;
  });

  // Add event listener to delete buttons
  let deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteRow(index);
    });
  });
}

function deleteRow(index) {
  table.deleteRow(index);
  balance = myLogs[index].beforeBalance;
  balanceP.innerText = balance;
  myLogs.splice(index, 1);
  renderLogs();
}
