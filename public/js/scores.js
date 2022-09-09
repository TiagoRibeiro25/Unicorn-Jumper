// By default, show top 10 scores
const top10 = 10;
let showQuantity = top10;

async function getData(quantity) {
  const response = await fetch("/api");
  const data = await response.json();
  const dataArr = data.sort((a, b) => b.score - a.score);

  // If the top 10 button is selected,
  // return the only the top 10 scores
  return quantity === "all" ? dataArr : dataArr.slice(0, quantity);
}

function resetBtnsVisuals() {
  document.querySelectorAll("button").forEach((btn) => {
    btn.style.backgroundColor = "#f2f2f2";
  });
}

function resetTable() {
  document.querySelector("table").innerHTML = `
    <tr>
      <th>Position</th>
      <th>Username</th>
      <th>Score</th>
      <th>Date</th>
    </tr>
  `;
}

async function renderTable() {
  resetTable();

  const data = await getData(showQuantity);

  for (let i = 0; i < data.length; i++) {
    // Convert to human readable date
    // and then remove the hours, minutes and seconds
    const date = new Date(data[i].timestamp).toLocaleDateString();

    document.querySelector("table").innerHTML += `
      <tr>
        <td>${i + 1}</td>
        <td>${data[i].username}</td>
        <td>${data[i].score}</td>
        <td>${date}</td>
      </tr>
    `;
  }
}

// add event listener to top buttons
//to change the quantity of scores to show

document.querySelector("#top10Btn").addEventListener("click", () => {
  /* resetBtnsVisuals();
  document.querySelector("#top10Btn").style.backgroundColor = "#d9d9d9"; */

  showQuantity = top10;
  renderTable();
});

document.querySelector("#allBtn").addEventListener("click", () => {
  /* resetBtnsVisuals();
  document.querySelector("#allBtn").style.backgroundColor = "#d9d9d9"; */

  showQuantity = "all";
  renderTable();
});

// On load render the table with the top 10 scores
/* document.querySelector("#top10Btn").style.backgroundColor = "#d9d9d9"; */
renderTable();
