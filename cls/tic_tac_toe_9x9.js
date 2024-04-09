const TicTacToe9x9 = (()=>{

  const shadowDOM = //html
  `
    <style>
      * {
        margin:0;
        padding:0;
        box-sizing:border-box;
      }
      td {
        min-height:30px;
        min-width:30px;
        padding:10px;
        display:inline-block;
      }
      td:nth-child(-n + 2) {
        border-right:2px solid black;
      }
      tr {
        min-height:30px;
        display:block;
      }
      tr:nth-child(-n + 2) {
        border-bottom:2px solid black;
      }
    </style>
    <table>
      <tr>
        <td id="o11"><tic-tac-toe></tic-tac-toe></td>
        <td id="o12"><tic-tac-toe></tic-tac-toe></td>
        <td id="o13"><tic-tac-toe></tic-tac-toe></td>
      </tr>
      <tr>
        <td id="o21"><tic-tac-toe></tic-tac-toe></td>
        <td id="o22"><tic-tac-toe></tic-tac-toe></td>
        <td id="o23"><tic-tac-toe></tic-tac-toe></td>
      </tr>
      <tr>
        <td id="o31"><tic-tac-toe></tic-tac-toe></td>
        <td id="o32"><tic-tac-toe></tic-tac-toe></td>
        <td id="o33"><tic-tac-toe></tic-tac-toe></td>
      </tr>
    </table>
  `;

  class TicTacToe9x9 extends HTMLElement {
    
    connectedCallback() {
      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = shadowDOM;
      this.field = [[new TicTacToe()],[],[]];
      for (let i = 1; i<4; ++i) {
        for (let j = 1; j<4; ++j) {
          this.field[i-1][j-1] = shadow.querySelector(`#o${i}${j} tic-tac-toe`);
        }
      }
      this.bindTurns();
    }

    bindTurns() {
      const turn = ((el)=>{return function (x,y) {
        for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) el.field[i][j].unWaitTurn();
        if (el.field[x][y].waitTurn(el.turn)) for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) el.field[i][j].waitTurn(el.turn);;
        el.turn = el.turn == "X" ? "O" : "X";
        el.update();
      }})(this);
      for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) {
        this.field[i][j].turn_callback = turn;
        this.field[i][j].waitTurn(this.turn);
      }
      this.turn = this.turn == "X" ? "O" : "X";
    }

    update() {

    }
  };

  TicTacToe9x9.prototype.field = [[new TicTacToe()]]
  TicTacToe9x9.prototype.turn = "X";

  return TicTacToe9x9;
})();

customElements.define('tic-tac-toe-9x9', TicTacToe9x9);
