class Unicorn {
  constructor() {
    this.r = 110;
    this.x = this.r;
    this.y = height - this.r;
    this.vy = 0;
    this.gravity = 1;
  }

  jump() {
    this.vy = this.y === height - this.r ? -20 : 0;
  }

  hits(train) {
    return collideRectCircle(
      train.x,
      train.y,
      train.r,
      train.r,
      this.x,
      this.y,
      this.r
    );
  }

  move() {
    this.y += this.vy;
    this.vy += this.gravity;
    this.y = constrain(this.y, 0, height - this.r);
  }

  show() {
    image(uImg, this.x, this.y, this.r, this.r);
    // Show the hit box
    /* fill(255, 50);
    ellipseMode(CORNER);
    ellipse(this.x, this.y, this.r, this.r); */
  }
}
