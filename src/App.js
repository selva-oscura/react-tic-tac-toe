import React from 'react';
import './App.css';
import Message from './Message';
import Scores from './Scores';
import Board from './Board';
import ErrorMessage from './ErrorMessage';

const App = React.createClass ({
  getInitialState(){
    return {
      userScore: 0,
      computerScore: 0,
      userIcon: undefined,
      playerTurn: undefined,
      board: [0,0,0,0,0,0,0,0,0],
      messageShorthand: "XorO",
      errorMessage: undefined,
    }
  },
  winningSolutions(){
    return [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
  },
  playAgain(){
    let state = this.state;
    state.userIcon = undefined;
    state.playerTurn = undefined;
    state.board = [0,0,0,0,0,0,0,0,0];
    state.messageShorthand = "XorO";
    state.errorMessage = undefined;
    this.setState(state);
  },
  concludeGame(winner){
    let state = this.state;
    if(winner==="user"){
      state.userScore += 10;
      state.messageShorthand = "userWin";
    }else if(winner==="comp"){
      state.computerScore += 10;
      state.messageShorthand = "compWin";
    }else{
      state.messageShorthand = "tie";
    }
    this.setState(state);
  },
  checkGameWon(){
    const winningSolutions = this.winningSolutions();
    const board = this.state.board;
    // check for computer or user win
    let winner = false;
    for (let i = 0; i<winningSolutions.length; i++){
      let sum = 0;
      let possibleSolution = winningSolutions[i];
      for(let j=0; j<possibleSolution.length; j++){
        sum += board[possibleSolution[j]];
      }
      // check for user win
      if(sum === 3){
        winner = "user";
        break;  
      // check for computer win
      }else if(sum === -3){
        winner = "comp";
        break;
      }
    }
    if(!winner && board.indexOf(0)===-1){
      winner = "tie";
    }
    return winner;
  },
  checkPotentialWin(){
    const winningSolutions = this.winningSolutions();
    const board = this.state.board;
    // check for player potential win
    let targetSquares = {
      squareToWin: null,
      squareToBlock: null,
    }
    for (let i = 0; i<winningSolutions.length; i++){
      let sum = 0; 
      let emptySquare;
      let possibleSolution = winningSolutions[i];
      for(let j = 0; j<possibleSolution.length; j++){
        sum += board[possibleSolution[j]];
        if(board[possibleSolution[j]]===0){
          emptySquare = possibleSolution[j];
        }
      }
      if(sum === -2){
        targetSquares.squareToWin = emptySquare;
      }
      if(sum === 2){
        targetSquares.squareToBlock = emptySquare;
      }
    }
    return targetSquares;
  },
  updateUserIcon(icon){
    let state = this.state;
    state.errorMessage = undefined;
    if(icon === "X"){
      state.userIcon = "X";
      state.playerTurn = "userTurn";
      state.messageShorthand = "userTurn";
      this.setState(state);
    }
    if(icon === "O"){
      state.userIcon = "O";
      state.playerTurn = "compTurn";
      state.messageShorthand = "compTurn";
      this.setState(state);
      this.computerPick();
    }
  },
  userPick(i){
    let state = this.state;
    if(state.userIcon===undefined){
      state.errorMessage = "Please select X or O first.";
    }else if(state.messageShorthand==="userWin"){
      state.errorMessage = "Game Already Over. (You won!)";
    }else if(state.messageShorthand === "compWin"){
      state.errorMessage = "Game Already Over. (Computer won.)";
    }else if(state.messageShorthand==="tie"){
      state.errorMessage = "Game Over. (It was a tie.)";
    }else if(state.playerTurn==="compTurn"){
      state.errorMessage = "It is the computer's turn. Please wait.";
    }else if(state.board[i]!==0){
      state.errorMessage = "That square already taken!";
    }else{
      state.board[i]=1;
    }
    this.setState(state);
    if(!state.errorMessage){
      let winner = this.checkGameWon();
      if(winner){
        this.concludeGame(winner);
        return;
      }else{
        state.playerTurn = "compTurn";
        state.messageShorthand = "compTurn";
        state.errorMessage = undefined;
        this.setState(state);
        this.computerPick();
        return;
      }
    }
  },
  computerPick(){
    let state = this.state;
    let targetSquare;
    let targetSquares = this.checkPotentialWin();
    // check for square needed for immediate Win
    if(targetSquares.squareToWin!==null){
      targetSquare = targetSquares.squareToWin;
    // check for square needed to preven immediate loss
    }else if(targetSquares.squareToBlock!==null){
      targetSquare = targetSquares.squareToBlock;
    // pick center square if not already picked
    }else if(state.board[4]===0){
      targetSquare = 4;
    // prevent opposite corners picked by opponent with adjacent corner as next pick leading to automatic win by opponent
    }else if(state.board[0]===1 && state.board[8]===1){
      if(state.board[1]!==-1 && state.board[2]!==-1 && state.board[5]!==-1){
        if(state.board[1]===0){
          targetSquare = 1;
        }else if(state.board[5]===0){
          targetSquare = 5;
        }else if(state.board[2]===0){
          targetSquare = 2;
        }
      }else if(state.board[7]!==-1 && state.board[6]!==-1 && state.board[3]!==-1){
        if(state.board[7]===0){
          targetSquare = 7;
        }else if(state.board[3]===0){
          targetSquare = 3;
        }else if(state.board[6]===0){
          targetSquare = 6;
        }
      }
    // prevent opposite corners picked by opponent with adjacent corner as next pick leading to automatic win by opponent
    }else if(state.board[2]===1 && state.board[6]===1){
      if(state.board[1]!==-1 && state.board[0]!==-1 && state.board[3]!==-1){
        if(state.board[1]===0){
          targetSquare = 1;
        }else if(state.board[3]===0){
          targetSquare = 3;
        }else if(state.board[0]===0){
          targetSquare = 0;
        }
      }else if(state.board[5]!==-1 && state.board[8]!==-1 && state.board[7]!==-1){
        if(state.board[5]===0){
          targetSquare = 5;
        }else if(state.board[7]===0){
          targetSquare = 7;
        }else if(state.board[8]===0){
          targetSquare = 8;
        }
      }
    }else{
      // pick corner if available
      [0, 2, 6, 8].forEach(function(spot){ 
        if(state.board[spot] === 0 ){
          targetSquare = spot;
        }
      });
      if(targetSquare===undefined){
        // else pick side
        [1, 7, 3, 5].forEach(function(spot){ 
          if(state.board[spot] === 0 ){
            targetSquare = spot;
          }
        });
      }
    }
    const timeout = Math.random()*500+250;
    setTimeout(() => {
      state.board[targetSquare] = -1;
      this.setState(state);
      let winner = this.checkGameWon();
      if(winner){
        this.concludeGame(winner);
      }else{
        state.playerTurn = "userTurn";
        state.messageShorthand = "userTurn";
        this.setState(state);
      }
    }, timeout);
  },
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tic-Tac-Toe</h2>
        </div>
        <Scores
          userScore={this.state.userScore}
          computerScore={this.state.computerScore}
        />
        <Message 
          messageShorthand={this.state.messageShorthand}
          updateUserIcon={this.updateUserIcon}
          playAgain={this.playAgain}
        />
        <Board 
          board={this.state.board} 
          userIcon={this.state.userIcon}
          userPick={this.userPick} 
        />
        <ErrorMessage 
          errorMessage={this.state.errorMessage}
        />
      </div>
    );
  }
});

export default App;