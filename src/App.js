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
      board: [0,0,0,0,0,0,0,1,-1],
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
  },
  userPick(i){
    let state = this.state;
    if(state.board[i]!==0){
      state.errorMessage = "That square already taken!"
    }else if(state.userIcon===undefined){
      state.errorMessage = "Please select X or O first"
    }else if(state.playerTurn==="compTurn"){
      state.errorMessage = "It is the computer's turn. Please wait."
    }else{
      state.board[i]=1;
      state.playerTurn = "compTurn";
      state.messageShorthand = "compTurn";
      state.errorMessage = undefined;
    }
    this.setState(state);
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
