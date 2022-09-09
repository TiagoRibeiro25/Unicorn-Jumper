let unicorn;
let uImg;
let tImg;
let bImg;
let trains = [];
let highScore = localStorage.highScore ? JSON.parse(localStorage.highScore) : 0;
let score = 0;

function preload() {
  uImg = loadImage("assets/unicorn.png");
  tImg = loadImage("assets/train.png");
  bImg = loadImage("assets/background.jpg");
}

function setup() {
  createCanvas(1200, 500);
  unicorn = new Unicorn();
}

function keyPressed() {
  if (key == " ") {
    unicorn.jump();
  }
}

function draw() {
  if (random(1) < 0.01) {
    trains.push(new Train());

    // Update current score and high score
    score++;
    highScore += score > highScore ? 1 : 0;

    // Update DOM
    document.querySelector("#score").innerText = score;
    document.querySelector("#highScore").innerText = highScore;
  }

  background(bImg);

  for (const t of trains) {
    t.show();
    t.move();

    // If the unicorn hits a train, reset the game
    if (unicorn.hits(t)) {
      console.log("game over");
      noLoop();

      // Show the hit box (train)
      fill(255, 50);
      ellipseMode(CORNER);
      ellipse(t.x, t.y, t.r, t.r);

      // Show the hit box (unicorn)
      fill(255, 50);
      ellipseMode(CORNER);
      ellipse(unicorn.x, unicorn.y, unicorn.r, unicorn.r);

      // Show reset button
      const resetButton = createButton("Reset");
      resetButton.position(width / 2 - 27, height / 2 + 80);
      resetButton.mousePressed(resetSketch);
      // make the button large and red and round
      resetButton.style("font-size", "20px");
      resetButton.style("width", "100px");
      resetButton.style("background-color", "#ff0000");
      resetButton.style("border-radius", "10px");
      resetButton.style("padding", "10px");
      resetButton.style("color", "#ffffff");

      // Show Game Over text
      const gameOverText = createP("Game Over");
      gameOverText.position(width / 2 - 100, 40 + 120);
      gameOverText.style("font-size", "40pt");
      gameOverText.style("color", "red");
      gameOverText.style("text-shadow", "2px 2px 4px #ffffff");

      // Update high score in localStorage
      localStorage.highScore = JSON.stringify(highScore);

      // add event listener to reset button
      function resetSketch() {
        // remove the content that shows when "game over"
        // (the reset button, the game over text, and the hit boxes)
        resetButton.remove();
        gameOverText.remove();

        // reset score
        document.querySelector("#score").innerText = 0;
        score = 0;

        trains = [];
        loop();
      }
    }
  }

  unicorn.show();
  unicorn.move();
}
