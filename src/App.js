import React from 'react';
import './App.css';
import Message from './Message';
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
  checkGameWon(){
    const winningSolutions = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ];
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
  updateUserIcon(icon){
    console.log('updating user icon to', icon);
    let state = this.state;
    if(icon === "X"){
      state.userIcon = "X";
      state.playerTurn = "userTurn";
      state.messageShorthand = "userTurn";
    }
    if(icon === "O"){
      state.userIcon = "O";
      state.playerTurn = "compTurn";
      state.messageShorthand = "compTurn";
    }
    this.setState(state);
    if(icon==="O"){
      this.computerPick();
    }
  },
  userPick(i){
    let state = this.state;
    if(state.userIcon===undefined){
      state.errorMessage = "Please select X or O first.";
    }else if(state.playerTurn==="compTurn"){
      state.errorMessage = "It is the computer's turn. Please wait.";
    }else if(state.board[i]!==0){
      state.errorMessage = "That square already taken!";
    }else{
      state.board[i]=1;
      this.setState(state);
      let winner = this.checkGameWon();
      if(winner){
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
    this.setState(state);
    if(state.errorMessage){
      setTimeout(() => {
        state.errorMessage = undefined; 
        this.setState(state);
      }, 3000);
    }
  },
  computerPick(){
    let state = this.state;
    let firstBlank = state.board.indexOf(0);
    const timeout = Math.random()*1000+500;
    setTimeout(() => {
      state.board[firstBlank] = -1;
      this.setState(state);
      let winner = this.checkGameWon();
      if(winner){
      }else{
        state.playerTurn = "userTurn";
        state.messageShorthand = "userTurn";
        this.setState(state);
      }
    }, timeout);
  },
  render() {
    console.log('this.state', this.state)
    return (
      <div className="App">
        <div className="App-header">
          <h2>Tic-Tac-Toe</h2>
        </div>
        <Message 
          messageShorthand={this.state.messageShorthand}
          updateUserIcon={this.updateUserIcon}
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
