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
  let cases = (one, two, three, xo) => {
    if (
      Gameboard.fields[one].textContent == xo &&
      Gameboard.fields[two].textContent == xo &&
      Gameboard.fields[three].textContent == xo
    )
      return true;
  };
  let stuff = () => {
    Player.wins++;
    blur.style.filter = "blur(5px)";
    Gameboard.gameover = true;
  };
  let winCon = function (xo) {
    switch (true) {
      case cases(0, 1, 2, xo):
        stuff();
        break;
      case cases(3, 4, 5, xo):
        stuff();
        break;
      case cases(6, 7, 8, xo):
        stuff();
        break;
      case cases(0, 4, 8, xo):
        stuff();
        break;
      case cases(2, 4, 6, xo):
        stuff();
        break;
      case cases(0, 3, 6, xo):
        stuff();
        break;
      case cases(1, 4, 7, xo):
        stuff();
        break;
      case cases(2, 5, 8, xo):
        stuff();
        break;
    }
  };

  return {
    ticTacToe: function () {
      Gameboard.gameboard.addEventListener("click", (e) => {
        if (Gameboard.gameover == false) {
          e.preventDefault();
          if (
            e.target.classList.contains("field") &&
            e.target.textContent == ""
          ) {
            e.target.textContent = Gameboard.xo;

            if (Gameboard.xo == "X") {
              Gameboard.xo = "O";
            } else Gameboard.xo = "X";
          }

          winCon("X");

          Player.score.textContent = `Player: ${Player.wins}`;
          AI.score.textContent = `Enemy: ${AI.wins}`;
        }

        if (Gameboard.gameover == true) {
          document.querySelector(".again").style.display = "block";
          document.querySelector(".again").addEventListener("click", (e) => {
            e.preventDefault();
            Gameboard.fields.forEach((field) => (field.textContent = ""));
            document.querySelector(".again").style.display = "none";
            Gameboard.gameover = false;
            blur.style.filter = "none";
          });
        }
      });
    },
  };
})();

Game.ticTacToe();
