const blue = document.getElementById("blue");
const violet = document.getElementById("violet");
const orange = document.getElementById("orange");
const green = document.getElementById("green");
const btnStart = document.getElementById("btnStart");
const btnMenssage = document.getElementById("btnMenssage");
const markerLevel = document.getElementById("markerLevel");
const LAST_LEVEL = 5;
const MENSAJE_INICIAL = "Start!";

class Game {
  constructor() {
    this.initialize();
    this.generateSequence();
    setTimeout(this.nextLevel.bind(this), 500);
  }

  initialize() {
    this.setColor = this.setColor.bind(this);
    this.toggleBtnEmpezar();
    this.level = 1;
    markerLevel.textContent = this.level;
    this.colors = {
      blue,
      violet,
      orange,
      green,
    };
  }

  toggleBtnEmpezar() {
    if (btnStart.classList.contains("hide")) {
      btnStart.classList.remove("hide");
    } else {
      btnStart.classList.add("hide");
    }
  }

  generateSequence() {
    this.sequence = new Array(10)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }

  nextLevel() {
    this.subnivel = 0;
    if (this.level === 1) {
      this.iluminarSecuencia();
      this.addEventClick();
    } else {
      btnMenssage.textContent = `Level ${this.level}`;
      btnMenssage.classList.remove("hide");
      markerLevel.textContent = this.level;
      setTimeout(() => {
        btnMenssage.classList.add("hide");
        setTimeout(() => {
          this.iluminarSecuencia.call(this);
          this.addEventClick.call(this);
        }, 200);
      }, 500);
    }
  }

  transformNumberToColor(number) {
    switch (number) {
      case 0:
        return "blue";
      case 1:
        return "violet";
      case 2:
        return "orange";
      case 3:
        return "green";
      default:
        break;
    }
  }

  transformColorToNumber(color) {
    switch (color) {
      case "blue":
        return 0;
      case "violet":
        return 1;
      case "orange":
        return 2;
      case "green":
        return 3;
      default:
        break;
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformNumberToColor(this.sequence[i]);
      console.log(`seciuencia ${color}`);
      setTimeout(this.turnOnColor.bind(this, color), i * 1000);
    }
  }

  turnOnColor(color) {
    this.colors[color].classList.add("light");
    setTimeout(this.turnOffColor.bind(this, color), 350);
  }

  turnOffColor(color) {
    this.colors[color].classList.remove("light");
  }

  addEventClick() {
    let coloresArray = ["blue", "violet", "orange", "green"];
    coloresArray.map((color) =>
      this.colors[color].addEventListener("click", this.setColor)
    );
  }

  removeEventClick() {
    let coloresArray = ["blue", "violet", "orange", "green"];
    coloresArray.map((color) =>
      this.colors[color].removeEventListener("click", this.setColor)
    );
  }

  setColor(ev) {
    const nameColor = ev.target.dataset.color;
    const numberColor = this.transformColorToNumber(nameColor);
    this.turnOnColor(nameColor);
    if (numberColor === this.sequence[this.subnivel]) {
      this.subnivel++;
      if (this.subnivel === this.level) {
        this.level++;
        this.removeEventClick();
        if (this.level === LAST_LEVEL + 1) {
          this.wonGame();
        } else {
          setTimeout(this.nextLevel.bind(this), 1500);
        }
      }
    } else {
      this.lostGame();
    }
  }

  wonGame() {
    setTimeout(() => {
      Swal.fire("You Win", "Good job! You have won, Simon says", "success").then(
        this.initialize.bind(this)
      );
    }, 350);
  }

  lostGame() {
    setTimeout(() => {
      Swal.fire("You lose", "You can try again, Simon says", "error").then(
        () => {
          this.removeEventClick();
          this.initialize();
        }
      );
    }, 350);
  }
}

function startGame() {
  var game = new Game();
}
