let Gameboard = {
  gameboard: document.querySelector(".gameboard"),
  fields: document.querySelectorAll(".field"),
  wins: 0,
  xo: "X",
  gameover: false,
};
let Player = { wins: 0, score: document.querySelector(".player") };
let AI = { wins: 0, score: document.querySelector(".opponent") };

let Game = (function () {
  let blur = document.querySelector(".content");
  let cases = function (one, two, three, xo, ox) {
    if (
      Gameboard.fields[one].textContent == xo &&
      Gameboard.fields[two].textContent == xo &&
      Gameboard.fields[three].textContent == xo
    ) {
      Player.wins++;
      return true;
    } else if (
      Gameboard.fields[one].textContent == ox &&
      Gameboard.fields[two].textContent == ox &&
      Gameboard.fields[three].textContent == ox
    ) {
      AI.wins++;
      return true;
    }
  };

  let stuff = function () {
    blur.style.filter = "blur(5px)";
    Gameboard.gameover = true;
  };

  let winCon = function (xo, ox) {
    switch (true) {
      case cases(0, 1, 2, xo, ox):
        stuff();
        break;
      case cases(3, 4, 5, xo, ox):
        stuff();
        break;
      case cases(6, 7, 8, xo, ox):
        stuff();
        break;
      case cases(0, 4, 8, xo, ox):
        stuff();
        break;
      case cases(2, 4, 6, xo, ox):
        stuff();
        break;
      case cases(0, 3, 6, xo, ox):
        stuff();
        break;
      case cases(1, 4, 7, xo, ox):
        stuff();
        break;
      case cases(2, 5, 8, xo, ox):
        stuff();
        break;
    }
  };

  let gaming = function (e) {
    if (e.target.classList.contains("field") && e.target.textContent == "") {
      e.target.textContent = Gameboard.xo;

      if (Gameboard.xo == "X") {
        Gameboard.xo = "O";
      } else Gameboard.xo = "X";
    }
  };

  let gameIsOver = function () {
    document.querySelector(".again").style.display = "block";
    document.querySelector(".again").addEventListener("click", (e) => {
      e.preventDefault();
      Gameboard.fields.forEach((field) => (field.textContent = ""));
      document.querySelector(".again").style.display = "none";
      Gameboard.gameover = false;
      blur.style.filter = "none";
    });
  };

  return {
    ticTacToe: function () {
      Gameboard.gameboard.addEventListener("click", (e) => {
        let i = 0;

        if (Gameboard.gameover == false) {
          gaming(e);

          // win or draw
          if (winCon("X", "O") == true) return;
          else {
            Gameboard.fields.forEach((field) => {
              if (field.textContent != "") i++;
              if (i == 9) {
                Gameboard.gameover = true;
                blur.style.filter = "blur(5px)";
              }
            });
          }

          Player.score.textContent = `Player: ${Player.wins}`;
          AI.score.textContent = `Enemy: ${AI.wins}`;
        }

        if (Gameboard.gameover == true) gameIsOver();
      });
    },
  };
})();

Game.ticTacToe();
