function convertName(name) {
  // remove spaces from the beginning and end of the name
  name = name.trim();
  // convert all letters to lowercase
  name = name.toLowerCase();
  // capitalize the first letter of each word
  name = name.replace(/\b\w/g, (l) => l.toUpperCase());
  // replace all spaces with underscores
  name = name.replace(/ /g, "_");
  return name;
}

document.querySelector("#submitScore").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.querySelector("#name").value;
  const username = convertName(name);

  // update the username in the localStorage
  localStorage.username = JSON.stringify(username);

  if (highScore <= 0) return;

  // Send the score to the server
  const response = await fetch("/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, score: highScore }),
  });

  // Get the response from the server
  const data = await response.json();

  if (data.status === "failed") {
    alert(`The user ${username} has already been submitted an higher score`);
  } else {
    alert(
      `The user ${username} has been submitted with a score of ${highScore}`
    );
  }
});

// Show the previous name used in the input field
let previousUsername = localStorage.username
  ? JSON.parse(localStorage.username)
  : "";

document.querySelector("#name").value = previousUsername;
