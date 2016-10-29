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
  updateScore(winner){
    if(winner==="user"){

    }else{

    }
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
      console.log('should not hit this until after select x or o')
      state.board[i]=1;
      state.playerTurn = "compTurn";
      state.messageShorthand = "compTurn";
      state.errorMessage = undefined;
      this.setState(state);
      this.computerPick();
      return;
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
      state.playerTurn = "userTurn";
      state.messageShorthand = "userTurn";
      this.setState(state);
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
