
const TicTacToe = (()=>{

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
        display:inline-block;
        padding:3px 7px 2px;
        font-size:20px;
      }
      td:nth-child(-n + 2) {
        border-right:1px solid black;
      }
      tr {
        min-height:30px;
        display:block;
      }
      tr:nth-child(-n + 2) {
        border-bottom:1px solid black;
      }
      .ready {
        background:green;
      }
    </style>
    <table>
      <tr><td id="o11"></td><td id="o12"></td><td id="o13"></td></tr>
      <tr><td id="o21"></td><td id="o22"></td><td id="o23"></td></tr>
      <tr><td id="o31"></td><td id="o32"></td><td id="o33"></td></tr>
    </table>
  `;

  const winPatterns = [
    '000102',
    '101112',
    '202122',
    '001020',
    '011121',
    '021222',
    '001122',
    '021120',
  ]

  class TicTacToe extends HTMLElement {    
    connectedCallback() {
      const shadow = this.attachShadow({mode: 'open'});
      shadow.innerHTML = shadowDOM;
      this.field = [[document.createElement("td")],[],[]];
      for (let i = 1; i<4; ++i) {
        for (let j = 1; j<4; ++j) {
          this.field[i-1][j-1] = shadow.querySelector(`#o${i}${j}`);
        }
      }
      this.status = this.statuses.inProgress;
      const turn = ((el)=>{return function  () {
        if (el.status == el.statuses.inProgressTurn && this.innerText == "") {
          this.innerText = el.now_turn;
          el.update();
          el.turn_callback(this.id[1]-1, this.id[2]-1);
        }
      }})(this);
      for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) this.field[i][j].addEventListener('click', turn);
    }

    waitTurn(now_turn) {
      if (this.status == this.statuses.inProgress) {
        this.status = this.statuses.inProgressTurn;
        this.now_turn = now_turn;
        for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) {
          if (this.field[i][j].innerText == "") this.field[i][j].classList.add("ready");
        }
        return 0;
      } else {
        return -1;
      }
    }
    
    unWaitTurn() {
      for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) this.field[i][j].classList.remove('ready');
      if (this.status == this.statuses.inProgressTurn) {
        this.status = this.statuses.inProgress;
      }
    }

    update() {
      if (this.status == this.statuses.inProgressTurn)
        winPatterns.forEach((item)=>{
          if (this.field[+item[0]][+item[1]].innerText + this.field[+item[2]][+item[3]].innerText + this.field[+item[4]][+item[5]].innerText == "XXX") this.status = this.statuses.winX;
          if (this.field[+item[0]][+item[1]].innerText + this.field[+item[2]][+item[3]].innerText + this.field[+item[4]][+item[5]].innerText == "OOO") this.status = this.statuses.winO;
        });
        if (this.status == this.statuses.inProgressTurn) {
          let l = "";
          for (let i = 0; i < 3; ++i) for (let j = 0; j < 3; ++j) l += this.field[i][j].innerText;
          if (l.length == 9) this.status = this.statuses.tie;
        }
    }
  };

  TicTacToe.prototype.field = [[document.createElement("td")]];
  TicTacToe.prototype.statuses = {
    inProgress:0,
    winX:1,
    winO:2,
    tie:3,
    inProgressTurn:4,
  }
  TicTacToe.prototype.status = TicTacToe.prototype.statuses.inProgress;
  TicTacToe.prototype.now_turn = "";
  TicTacToe.prototype.turn_callback = ()=>{};

  return TicTacToe;
})();

customElements.define('tic-tac-toe', TicTacToe);
