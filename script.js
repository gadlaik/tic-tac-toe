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

          switch (true) {
            case Gameboard.fields[0].textContent == "X" &&
              Gameboard.fields[1].textContent == "X" &&
              Gameboard.fields[2].textContent == "X":
              Player.wins++;
              Gameboard.gameover = true;
              break;
          }

          Player.score.textContent = `Player: ${Player.wins}`;
        }
        if (Gameboard.gameover == true) {
          document.querySelector(".again").style.display = "block";
          document.querySelector(".again").addEventListener("click", (e) => {
            e.preventDefault();
            Gameboard.fields.forEach((field) => (field.textContent = ""));
            document.querySelector(".again").style.display = "none";
            Gameboard.gameover = false;
          });
        }
      });
    },
  };
})();

Game.ticTacToe();
