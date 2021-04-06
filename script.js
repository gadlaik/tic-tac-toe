let Game = (function () {
  let Gameboard = {
    gameboard: document.querySelector(".gameboard"),
    fields: document.querySelectorAll(".field"),
    wins: 0,
    xo: "X",
    gameover: false,
  };
  let Player = { wins: 0, score: document.querySelector(".player") };
  let AI = {
    wins: 0,
    score: document.querySelector(".opponent"),
    uprising(field) {
      if (field[4].textContent == "") field[4].textContent = "O";
      else if (field[7].textContent == "X" && field[3].textContent == "")
        field[3].textContent = "O";
      else if (
        field[2].textContent == "X" &&
        field[3].textContent == "O" &&
        field[1].textContent == ""
      )
        field[1].textContent = "O";
      else if (
        field[2].textContent == "X" &&
        field[3].textContent == "O" &&
        field[1].textContent == "O" &&
        field[7].textContent == ""
      )
        field[7].textContent = "O";
      else if (
        field[2].textContent == "X" &&
        field[3].textContent == "O" &&
        field[1].textContent == "O" &&
        field[8].textContent == ""
      )
        field[8].textContent = "O";
      else if (field[0].textContent == "") field[0].textContent = "O";
      else if (field[2].textContent == "") field[2].textContent = "O";
      else if (field[1].textContent == "") field[1].textContent = "O";
      else if (field[6].textContent == "") field[6].textContent = "O";
      else if (field[8].textContent == "") field[8].textContent = "O";
      else if (field[7].textContent == "") field[7].textContent = "O";
      else if (field[5].textContent == "") field[5].textContent = "O";
      else if (field[3].textContent == "") field[3].textContent = "O";
    },
  };

  let blur = document.querySelector(".content");
  let winner = document.querySelector(".winner");

  let cases = function (one, two, three, xo, ox) {
    if (
      Gameboard.fields[one].textContent == xo &&
      Gameboard.fields[two].textContent == xo &&
      Gameboard.fields[three].textContent == xo
    ) {
      Player.wins++;
      winner.textContent = "YOU WON!";
      winner.style.color = "limegreen";
      Gameboard.fields[one].style.color = "gold";
      Gameboard.fields[two].style.color = "gold";
      Gameboard.fields[three].style.color = "gold";
      return true;
    } else if (
      Gameboard.fields[one].textContent == ox &&
      Gameboard.fields[two].textContent == ox &&
      Gameboard.fields[three].textContent == ox
    ) {
      AI.wins++;
      winner.textContent = "ENEMY WON :(";
      winner.style.color = "orangered";

      Gameboard.fields[one].style.color = "gold";
      Gameboard.fields[two].style.color = "gold";
      Gameboard.fields[three].style.color = "gold";
      return true;
    }
  };

  let winCon = function (xo, ox) {
    switch (true) {
      case cases(0, 1, 2, xo, ox):
        gameIsOver();
        return true;
      case cases(3, 4, 5, xo, ox):
        gameIsOver();
        return true;
      case cases(6, 7, 8, xo, ox):
        gameIsOver();
        return true;
      case cases(0, 4, 8, xo, ox):
        gameIsOver();
        return true;
      case cases(2, 4, 6, xo, ox):
        gameIsOver();
        return true;
      case cases(0, 3, 6, xo, ox):
        gameIsOver();
        return true;
      case cases(1, 4, 7, xo, ox):
        gameIsOver();
        return true;
      case cases(2, 5, 8, xo, ox):
        gameIsOver();
        return true;
    }
  };

  let gaming = function (e) {
    let turn = document.querySelector(".turn");

    if (e.target.classList.contains("field") && e.target.textContent == "") {
      e.target.textContent = Gameboard.xo;

      if (winCon("X", "O")) gameIsOver();
      else if (Gameboard.xo == "X") {
        Gameboard.xo = "O";
        turn.textContent = "ENEMY TURN";
        turn.style.color = "orangered";
        if (turn.textContent == "ENEMY TURN") {
          AI.uprising(Gameboard.fields);
          Gameboard.xo = "X";
          turn.textContent = "PLAYER TURN";
          turn.style.color = "limegreen";
        }
      }
    }
  };

  let gameIsOver = function () {
    document.querySelector(".again").style.display = "block";
    blur.style.filter = "blur(5px)";
    document.querySelector(".playAgain").addEventListener("click", (e) => {
      e.preventDefault();
      Gameboard.fields.forEach((field) => {
        field.textContent = "";
        field.style.color = "black";
      });
      document.querySelector(".again").style.display = "none";
      Gameboard.gameover = false;
      blur.style.filter = "none";
    });
  };

  return {
    ticTacToe: function () {
      Gameboard.gameboard.addEventListener("click", (e) => {
        let i = 0;
        let info = e;
        if (Gameboard.gameover == true) info = null;

        if (Gameboard.gameover == false) {
          gaming(info);

          // win or draw
          if (winCon("X", "O")) Gameboard.gameover = true;
          else {
            Gameboard.fields.forEach((field) => {
              if (field.textContent != "") i++;
              if (i == 9) {
                Gameboard.gameover = true;
                blur.style.filter = "blur(5px)";
                winner.style.color = "gray";
                winner.textContent = "DRAW";
                gameIsOver();
              }
            });
          }

          Player.score.textContent = `Player: ${Player.wins}`;
          AI.score.textContent = `Enemy: ${AI.wins}`;
        }
      });
    },
  };
})();

Game.ticTacToe();
